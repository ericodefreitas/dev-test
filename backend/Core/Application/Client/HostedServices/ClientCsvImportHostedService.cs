using Application.Client.Commands.CreateClient;
using Application.Client.Models;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.IO;
using System.Text;
using System.Threading;
using System.Threading.Channels;
using System.Threading.Tasks;

namespace Application.Client.Services
{
    public class ClientCsvImportHostedService : BackgroundService
    {
        private readonly Channel<string> _channel = Channel.CreateUnbounded<string>();
        private readonly IServiceScopeFactory _scopeFactory;
        private readonly string _importDir;

        public ClientCsvImportHostedService(IServiceScopeFactory scopeFactory)
        {
            _scopeFactory = scopeFactory;
            _importDir = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "App_Data", "Imports");
            Directory.CreateDirectory(_importDir);
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            var monitorTask = MonitorDirectoryAsync(stoppingToken);
            var processTask = ProcessQueueAsync(stoppingToken);
            await Task.WhenAll(monitorTask, processTask);
        }

        private async Task MonitorDirectoryAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                var files = Directory.GetFiles(_importDir, "*.csv");
                foreach (var file in files)
                {
                    await _channel.Writer.WriteAsync(file, stoppingToken);
                }
                await Task.Delay(TimeSpan.FromSeconds(5), stoppingToken);
            }
        }

        private async Task ProcessQueueAsync(CancellationToken stoppingToken)
        {
            await foreach (var filePath in _channel.Reader.ReadAllAsync(stoppingToken))
            {
                using var scope = _scopeFactory.CreateScope();
                var mediator = scope.ServiceProvider.GetRequiredService<IMediator>();

                try
                {
                    using var stream = new FileStream(filePath, FileMode.Open, FileAccess.Read);
                    using var reader = new StreamReader(stream, Encoding.UTF8);

                    string? headerLine = await reader.ReadLineAsync(stoppingToken);
                    if (headerLine == null) continue;

                    while (!reader.EndOfStream)
                    {
                        var line = await reader.ReadLineAsync(stoppingToken);
                        if (string.IsNullOrWhiteSpace(line)) continue;

                        var columns = line.Split(',');

                        var client = new ClientModel
                        {
                            FirstName = columns[0],
                            LastName = columns[1],
                            PhoneNumber = columns[2],
                            Email = columns[3],
                            DocumentNumber = columns[4],
                            BirthDate = DateOnly.Parse(columns[5]),
                            Address = new AddressModel
                            {
                                PostalCode = columns[6],
                                AddressLine = columns[7],
                                Number = columns[8],
                                Complement = columns[9],
                                Neighborhood = columns[10],
                                City = columns[11],
                                State = columns[12]
                            }
                        };

                        var command = new CreateClientCommandRequest
                        {
                            FirstName = client.FirstName,
                            LastName = client.LastName,
                            PhoneNumber = client.PhoneNumber,
                            Email = client.Email,
                            DocumentNumber = client.DocumentNumber,
                            BirthDate = client.BirthDate,
                            Address = client.Address
                        };

                        await mediator.Send(command, stoppingToken);
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Erro ao processar importação de clientes: {ex}");
                }
                finally
                {
                    try
                    {
                        File.Delete(filePath);
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Erro ao excluir arquivo {filePath}: {ex}");
                    }
                }
            }
        }
    }
}
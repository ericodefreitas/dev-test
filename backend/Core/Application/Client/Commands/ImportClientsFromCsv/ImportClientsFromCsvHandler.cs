using Application.Client.Services;
using MediatR;
using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Client.Commands.ImportClientsFromCsv
{
    public class ImportClientsFromCsvHandler : IRequestHandler<ImportClientsFromCsvRequest, Unit>
    {

        public ImportClientsFromCsvHandler()
        {
        }

        public async Task<Unit> Handle(ImportClientsFromCsvRequest request, CancellationToken cancellationToken)
        {
            var importDir = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "App_Data", "Imports");
            Directory.CreateDirectory(importDir);
            var filePath = Path.Combine(importDir, $"{Guid.NewGuid()}_{request.FileName}");
            await File.WriteAllBytesAsync(filePath, request.CsvData, cancellationToken);

            return Unit.Value;
        }
    }
}
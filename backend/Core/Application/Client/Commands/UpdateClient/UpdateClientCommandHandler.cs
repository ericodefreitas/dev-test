using Application.Common.Exceptions;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Client.Commands.UpdateClient
{
    public class UpdateClientCommandHandler : IRequestHandler<UpdateClientCommandRequest, Guid>
    {
        private readonly IClientControlContext _context;

        public UpdateClientCommandHandler(IClientControlContext context)
        {
            _context = context;
        }

        public async Task<Guid> Handle(UpdateClientCommandRequest request, CancellationToken cancellationToken)
        {
            var client = await _context.Clients.FirstOrDefaultAsync(x => x.Id == request.Id) ?? throw new BadRequestException("Client not found");

            if (await _context.Clients.AnyAsync(x => x.DocumentNumber == client.DocumentNumber && x.Id != request.Id))
                throw new BadRequestException("Document already exists");

            client.Update(
                request.FirstName,
                request.LastName,
                request.PhoneNumber,
                request.Email,
                request.DocumentNumber,
                new Domain.Address(
                    request.Address.PostalCode,
                    request.Address.AddressLine,
                    request.Address.Number,
                    request.Address.Complement,
                    request.Address.Neighborhood,
                    request.Address.City,
                    request.Address.State));

            _context.Clients.Update(client);
            await _context.SaveChangesAsync(cancellationToken);

            return client.Id;
        }
    }
}

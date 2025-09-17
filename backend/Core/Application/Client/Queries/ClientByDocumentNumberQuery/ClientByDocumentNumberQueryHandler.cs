using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Client.Queries.ClientByDocumentNumberQuery
{
    public class ClientByDocumentNumberQueryHandler : IRequestHandler<ClientByDocumentNumberQueryRequest, ClientByDocumentNumberQueryResponse>
    {
        private readonly IClientControlContext _context;

        public ClientByDocumentNumberQueryHandler(IClientControlContext context)
        {
            _context = context;
        }

        public async Task<ClientByDocumentNumberQueryResponse> Handle(ClientByDocumentNumberQueryRequest request, CancellationToken cancellationToken)
        {
            var client = await _context.Clients
                .Where(x=>x.DocumentNumber == request.DocumentNumber)
                .Select(x => new ClientByDocumentNumberQueryResponse
                {
                    Id = x.Id,
                    CreatedAt = x.CreatedAt,
                    FirstName = x.FirstName,
                    LastName = x.LastName,
                    Email = x.Email,
                    PhoneNumber = x.PhoneNumber,
                    DocumentNumber = x.DocumentNumber,
                    BirthDate = x.BirthDate,
                    Address = new Models.AddressModel
                    {
                        PostalCode = x.Address.PostalCode,
                        AddressLine = x.Address.AddressLine,
                        Number = x.Address.Number,
                        Complement = x.Address.Complement,
                        Neighborhood = x.Address.Neighborhood,
                        City = x.Address.City,
                        State = x.Address.State
                    }
                })
                .FirstOrDefaultAsync(cancellationToken: cancellationToken);

            return client;
        }
    }
}

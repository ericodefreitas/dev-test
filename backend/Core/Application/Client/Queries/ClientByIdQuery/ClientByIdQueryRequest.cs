using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Client.Queries.ClientByIdQuery
{
    public class ClientByIdQueryRequest : IRequest<ClientByIdQueryResponse>
    {
        public Guid Id { get; set; }
    }
}

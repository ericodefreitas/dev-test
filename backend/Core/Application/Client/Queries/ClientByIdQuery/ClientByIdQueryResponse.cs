using Application.Client.Models;
using System;

namespace Application.Client.Queries.ClientByIdQuery
{
    public class ClientByIdQueryResponse : ClientModel
    {
        public Guid Id { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}

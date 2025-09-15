using Application.Client.Models;
using System;

namespace Application.Client.Queries.ClientByDocumentNumberQuery
{
    public class ClientByDocumentNumberQueryResponse : ClientModel
    {
        public Guid Id { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}

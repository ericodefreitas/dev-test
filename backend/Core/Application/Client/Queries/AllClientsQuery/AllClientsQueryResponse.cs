using Application.Client.Models;
using System;

namespace Application.Client.Queries.AllClientsQuery
{
    public class AllClientsQueryResponse : ClientModel
    {
        public Guid Id { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}

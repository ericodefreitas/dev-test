using MediatR;

namespace Application.Client.Queries.ClientByDocumentNumberQuery
{
    public class ClientByDocumentNumberQueryRequest : IRequest<ClientByDocumentNumberQueryResponse>
    {
        public string DocumentNumber { get; set; }
    }
}

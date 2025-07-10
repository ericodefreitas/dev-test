using MediatR;
using System.Collections.Generic;
using System.Text;

namespace Application.Client.Queries.AllClientsQuery
{
    public class AllClientsQueryRequest : IRequest<IEnumerable<AllClientsQueryResponse>>
    {
    }
}

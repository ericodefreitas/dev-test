
using MediatR;
using System.Collections.Generic;

namespace Application.User.Queries.AllUsersQuery
{
    public class AllUsersQueryRequest : IRequest<IEnumerable<AllUsersQueryResponse>>
    {
    }
}

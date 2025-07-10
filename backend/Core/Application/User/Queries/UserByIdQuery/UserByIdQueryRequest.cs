
using MediatR;
using System;

namespace Application.User.Queries.UserByIdQuery
{
    public class UserByIdQueryRequest : IRequest<UserByIdQueryResponse>
    {
        public Guid Id { get; set; }
    }
}

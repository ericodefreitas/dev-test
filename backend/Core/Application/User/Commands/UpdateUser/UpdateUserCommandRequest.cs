
using MediatR;
using System;

using Domain;
using Domain.Entities;

namespace Application.User.Commands.UpdateUser
{
    public class UpdateUserCommandRequest : IRequest
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public Profile Profile { get; set; }
    }
}

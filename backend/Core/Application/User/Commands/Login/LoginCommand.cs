using MediatR;
using Application.User.Models;

namespace Application.User.Commands.Login
{
    public class LoginCommand : IRequest<LoginResponse>
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}

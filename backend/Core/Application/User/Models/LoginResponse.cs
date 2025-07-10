using Domain;
using Domain.Entities;

namespace Application.User.Models
{
    public class LoginResponse
    {
        public LoginResponseUser User { get; set; }
        public string Token { get; set; }
        public int ExpiresIn { get; set; }
    }

    public class LoginResponseUser
    {
        public string Username { get; set; }
        public Profile Profile { get; set; }
    }
}

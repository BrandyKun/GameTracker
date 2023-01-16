using Microsoft.AspNetCore.Identity;

namespace Domain.Entities.Identity;
    public class User : IdentityUser
    {
        public string? DisplayName { get; set; }
        public string? Bio { get; set; }
    }
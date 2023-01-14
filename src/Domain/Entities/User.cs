using Gaming.Domain.Common;

namespace Gaming.Domain.Entities;
public class User : BaseAuditableEntity
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
    public DateTime? EmailVerifiedAt { get; set; }
    public string Password { get; set; }
    public string? RememberToken { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? DeletedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
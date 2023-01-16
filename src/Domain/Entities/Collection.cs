using Domain.Entities.Identity;
using Gaming.Domain.Common;

namespace Gaming.Domain.Entities;
public class Collection : BaseAuditableEntity
{
    public int Id { get; set; }
    public Guid UUID { get; set; }
    public string Name { get; set; }
    public string Colour { get; set; }
    public User User { get; set; }
}
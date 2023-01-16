using Gaming.Domain.Common;

namespace Gaming.Domain.Entities;
public class CollectionGame : BaseAuditableEntity
{
    public int Id { get; set; }
    public string GameId { get; set; }
    public Collection Collection { get; set; }
}   
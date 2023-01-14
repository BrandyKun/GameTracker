using Gaming.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Gaming.Infrastructure;
public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {

    }

    public DbSet<User> Users => Set<User>();
    public DbSet<Collection> Collections => Set<Collection>();
    public DbSet<CollectionGame> CollectionGames => Set<CollectionGame>();
}
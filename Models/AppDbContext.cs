using Microsoft.EntityFrameworkCore;

namespace sem_2_k_2.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Product> Products => Set<Product>();
        public DbSet<Tournament> Tournaments => Set<Tournament>();
    }
}

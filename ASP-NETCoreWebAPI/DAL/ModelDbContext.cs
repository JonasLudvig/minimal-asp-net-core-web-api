using ASP_NETCoreWebAPI.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace ASP_NETCoreWebAPI.DAL
{
    public class ModelDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Item> Items { get; set; }

        protected readonly IConfiguration Configuration;

        public ModelDbContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            var connectionString = Configuration.GetConnectionString("DbConnectionString");
            options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
        }
    }

}
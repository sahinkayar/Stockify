using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using api.models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
namespace api.Data
{
    public class StockDBContext : IdentityDbContext<AppUser>
    {
        public StockDBContext(DbContextOptions<StockDBContext> dbContextOptions)
            : base(dbContextOptions)
        {
        }

        public DbSet<Stock> Stock { get; set; }
        public DbSet<Comment> Comment { get; set; }
        public DbSet<Portfolio> Portfolios { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Portfolio>(x => x.HasKey(p => new { p.AppUserId, p.StockId }));

            builder.Entity<Portfolio>()
            .HasOne(u => u.AppUser)
            .WithMany(u => u.Portfolios)
            .HasForeignKey(p => p.AppUserId);

            builder.Entity<Portfolio>()
           .HasOne(u => u.Stock)
           .WithMany(u => u.Portfolios)
           .HasForeignKey(p => p.StockId);

            string adminRoleId = "cb2b5b71-1d57-4b71-9d10-e7f093bc2f21";
            string userRoleId = "8d184081-3001-4475-9276-85750059c256";
            List<IdentityRole> roles = new List<IdentityRole>
            {
               new IdentityRole
               {
                Id = adminRoleId,
                   Name ="Admin",
                   NormalizedName="ADMIN"
               } ,
                new IdentityRole
               {
                Id = userRoleId,
                   Name ="User",
                   NormalizedName="USER"
               },

            };
            builder.Entity<IdentityRole>().HasData(roles);
        }
    }
}
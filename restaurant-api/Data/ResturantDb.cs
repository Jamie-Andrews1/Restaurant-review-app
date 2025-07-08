using Microsoft.EntityFrameworkCore;
using RestaurantStore.Models;

namespace RestaurantStore.DB;

public class RestaurantDb : DbContext
{
    public RestaurantDb(DbContextOptions<RestaurantDb> options)
        : base(options) { }

    public DbSet<Restaurant> Restaurants { get; set; }
    public DbSet<Review> Reviews { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Restaurant>()
            .HasMany(e => e.Reviews)
            .WithOne(e => e.Restaurant)
            .HasForeignKey(e => e.RestaurantId)
            .IsRequired();
    }
}


using Microsoft.EntityFrameworkCore;
using RestaurantStore.Models;

namespace RestaurantStore.DB;

public class LeaderboardDb(DbContextOptions<LeaderboardDb> options) : DbContext(options)
{
    public DbSet<LeaderboardEntry> LeaderboardEntries { get; set; }
}
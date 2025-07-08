
namespace RestaurantStore.Models;
public record LeaderboardEntry
{
    public int Id { get; set; } // Same as Restaurant.Id
    public string? RestaurantName { get; set; }
    public double AverageRating { get; set; }
    public int ReviewCount { get; set; }
    public double AverageSentiment { get; set; }
}
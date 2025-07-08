namespace RestaurantStore.Models;
public record Review
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public string? Comment { get; set; }
    public int Rating { get; set; }
    public int RestaurantId { get; set; }
    public Restaurant Restaurant { get; set; } = null!;
    public string SentimentLabel { get; set; } = "NEUTRAL"; // Non-nullable with default
    public float SentimentScore { get; set; } // 0 to 1
}
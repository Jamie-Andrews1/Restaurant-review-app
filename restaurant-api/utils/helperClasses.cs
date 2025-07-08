namespace RestaurantStore.Helpers;

public record SentimentResult(string Text, string Label, float Score);
public record ReviewInput
{
    public string? Title { get; set; }
    public int Rating { get; set; }
    public string? Comment { get; set; }
}

public record ReviewDto
{
    public int Id { get; init; }
    public int RestaurantId { get; init; }
    public string? Title { get; init; }
    public int Rating { get; init; }
    public string? Comment { get; init; }
    public string? SentimentLabel { get; init; }
    public float SentimentScore { get; init; }
}
public record CreateRestaurantDto(string Name, string Location, IFormFile Image);

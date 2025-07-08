
namespace RestaurantStore.Models;
public class Restaurant
{
    public int Id { get; set; }
    public string? ImagePath { get; set; }
    public string? Name { get; set; }
    public string? Location { get; set; }
    public ICollection<Review> Reviews { get; } = [];
}
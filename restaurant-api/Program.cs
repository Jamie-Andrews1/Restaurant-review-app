using System.Diagnostics;
using System.Text.Json;
using DotNetEnv;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantStore.DB;
using RestaurantStore.Helpers;
using RestaurantStore.Models;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;

Env.Load();

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddLogging(logging => logging.AddConsole());
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
    policy =>
    {
        policy.WithOrigins("http://localhost:80")
                                .AllowAnyHeader()
                                .AllowAnyMethod();
    });
});

var connectionString = Environment.GetEnvironmentVariable("DATABASE_CONNECTION");

builder.Services.AddDbContext<RestaurantDb>(option => option.UseNpgsql(connectionString));

builder.Services.AddDbContext<LeaderboardDb>(options =>
    options.UseInMemoryDatabase("LeaderboardDb"));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddDistributedMemoryCache();

builder.Services.AddOpenApiDocument(config =>
{
    config.DocumentName = "RestaurantAPI";
    config.Title = "RestaurantAPI v1";
    config.Version = "v1";

}
);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseOpenApi();
    app.UseSwaggerUi(config =>
    {
        config.DocumentTitle = "RestaurantAPI";
        config.Path = "/swagger";
        config.DocumentPath = "/swagger/{documentName}/swagger.json";
        config.DocExpansion = "list";
    });
}

app.UseStaticFiles();
app.UseRouting();

var restaurants = app.MapGroup("/restaurants");

restaurants.MapGet("/", GetAllRestaurants);

restaurants.MapGet("/{id}", GetRestaurant);

restaurants.MapPost("/", CreateRestaurant).DisableAntiforgery();

restaurants.MapPut("/{id}", UpdateRestaurant).DisableAntiforgery();

restaurants.MapDelete("/{id}", DeleteRestaurant);

restaurants.MapGet("/{id}/reviews", GetReviews);

restaurants.MapGet("/{id}/reviews/{reviewId}", GetReview);

restaurants.MapPost("/{id}/reviews", CreateReview);

restaurants.MapPut("/{id}/reviews/{reviewId}", UpdateReview);

restaurants.MapDelete("/{id}/reviews/{reviewId}", DeleteReview);

app.MapGet("/leaderboard", leaderboard);

app.UseCors();

app.Run();

async Task<IResult> leaderboard(RestaurantDb db, LeaderboardDb leaderboardDb)
{
    await UpdateLeaderboard(db, leaderboardDb);

    var leaderboard = await leaderboardDb.LeaderboardEntries
        .OrderByDescending(e => e.AverageRating)
        .ThenByDescending(e => e.AverageSentiment)
        .Take(10)
        .ToListAsync();

    return TypedResults.Ok(leaderboard);
}

async Task<IResult> GetAllRestaurants(RestaurantDb db)
{
    var restaurants = await db.Restaurants.ToArrayAsync();
    if (restaurants.Length == 0)
        return TypedResults.Ok(new List<Restaurant>());


    return TypedResults.Ok(restaurants);
}

async Task<IResult> GetRestaurant(int id, RestaurantDb db)
{

    var restaurant = await db.Restaurants.FindAsync(id);

    if (restaurant == null)
        return TypedResults.NotFound("Restaurant Not Found");

    return TypedResults.Ok(restaurant);
}

static async Task<IResult> GetReviews(int id, RestaurantDb db)
{
    var restaurant = await db.Restaurants
    .Include(r => r.Reviews)
    .FirstOrDefaultAsync(r => r.Id == id);

    if (restaurant == null)
        return TypedResults.NotFound("Resturant Not Found");


    var reviewDtos = restaurant.Reviews.Select(r => new ReviewDto
    {
        Id = r.Id,
        RestaurantId = r.RestaurantId,
        Title = r.Title,
        Rating = r.Rating,
        Comment = r.Comment,
        SentimentLabel = r.SentimentLabel,
        SentimentScore = r.SentimentScore
    }).ToList();

    return TypedResults.Ok(reviewDtos);
}

static async Task<IResult> GetReview(int id, int reviewId, RestaurantDb db)
{
    var review = await db.Reviews
        .AsNoTracking()
        .FirstOrDefaultAsync(r => r.RestaurantId == id && r.Id == reviewId);

    if (review == null)
        return TypedResults.NotFound("Review Not Found");

    var reviewDto = new ReviewDto
    {
        Id = review.Id,
        RestaurantId = review.RestaurantId,
        Title = review.Title,
        Rating = review.Rating,
        Comment = review.Comment,
        SentimentLabel = review.SentimentLabel,
        SentimentScore = review.SentimentScore
    };

    return TypedResults.Ok(reviewDto);
}

async Task<IResult> CreateRestaurant([FromForm] CreateRestaurantDto create, RestaurantDb db)
{

    if (create.Image == null || create.Image.Length == 0)
        return TypedResults.NotFound("Image Not Found");

    var myPath = Path.GetRandomFileName() + create.Image.FileName;

    var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Images", myPath);

    using (var image = Image.Load(create.Image.OpenReadStream()))
    {
        image.Mutate(x => x.Resize(0, 800));

        image.Save(filePath);
    }

    var restaurant = new Restaurant
    {
        ImagePath = "Images/" + myPath,
        Name = create.Name,
        Location = create.Location
    };
    db.Add(restaurant);
    await db.SaveChangesAsync();
    return TypedResults.Created($"/restaurants/{restaurant.Id}", restaurant);

}


async Task<IResult> CreateReview(int id, ReviewInput review, RestaurantDb db, LeaderboardDb leaderboardDb)
{
    var restaurant = await db.Restaurants.FindAsync(id);
    if (restaurant == null)
        return TypedResults.NotFound("Restaurant Not Found");

    SentimentResult sentiment;
    if (!string.IsNullOrEmpty(review.Comment))
    {
        sentiment = await AnalyzeComment(review.Comment);
    }
    else
    {
        sentiment = new SentimentResult(review.Comment ?? "", "NEUTRAL", 0);
    }

    var rev = new Review
    {
        RestaurantId = id,
        Title = review.Title,
        Rating = review.Rating,
        Comment = review.Comment,
        SentimentLabel = sentiment.Label,
        SentimentScore = sentiment.Score
    };

    db.Reviews.Add(rev);
    await db.SaveChangesAsync();

    await UpdateLeaderboard(db, leaderboardDb);

    var reviewDto = new ReviewDto
    {
        Id = rev.Id,
        RestaurantId = rev.RestaurantId,
        Title = rev.Title,
        Rating = rev.Rating,
        Comment = rev.Comment,
        SentimentLabel = rev.SentimentLabel,
        SentimentScore = rev.SentimentScore
    };

    return TypedResults.Created($"/restaurants/{id}/reviews/{rev.Id}", reviewDto);
}

static async Task<IResult> UpdateRestaurant(int id, [FromForm] string Name, [FromForm] string Location, [FromForm] IFormFile? formImage, RestaurantDb db)
{
    var restaurant = await db.Restaurants.FindAsync(id);

    if (restaurant is null) return TypedResults.NotFound();

    if (formImage != null && formImage.Length > 0)
    {
        var oldImage = restaurant.ImagePath;
        if (oldImage != null)
        {
            File.Delete(oldImage);
        }

        var myPath = Path.GetRandomFileName() + formImage.FileName;
        var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Images", myPath);

        using (var image = Image.Load(formImage.OpenReadStream()))
        {
            image.Mutate(x => x.Resize(0, 800));

            image.Save(filePath);
        }
        restaurant.ImagePath = "Images/" + myPath;
    }

    restaurant.Name = Name;
    restaurant.Location = Location;

    db.Update(restaurant);
    await db.SaveChangesAsync();

    return TypedResults.NoContent();
}

async Task<IResult> UpdateReview(int id, int reviewId, ReviewDto updatedReview, RestaurantDb db, LeaderboardDb leaderboardDb)
{
    var review = await db.Reviews
        .FirstOrDefaultAsync(r => r.RestaurantId == id && r.Id == reviewId);
    if (review != null)
    {
        if (!string.IsNullOrEmpty(updatedReview.Comment))
        {
            var sentiment = await AnalyzeComment(updatedReview.Comment);

            review.Rating = updatedReview.Rating;
            review.Comment = updatedReview.Comment;
            review.Title = updatedReview.Title;
            review.SentimentLabel = sentiment.Label;
            review.SentimentScore = sentiment.Score;
        }

        await db.SaveChangesAsync();

        await UpdateLeaderboard(db, leaderboardDb);

        return TypedResults.Ok(review);
    }

    return TypedResults.NotFound("Review Not Found");
}


static async Task<IResult> DeleteRestaurant(int id, RestaurantDb db)
{
    if (await db.Restaurants.FindAsync(id) is Restaurant restaurant)
    {
        var filePath = restaurant.ImagePath;
        if (filePath != null)
        {
            File.Delete(filePath);
        }

        db.Restaurants.Remove(restaurant);
        await db.SaveChangesAsync();

        return TypedResults.NoContent();

    }
    return TypedResults.NotFound();
}

static async Task<IResult> DeleteReview(int id, int reviewId, RestaurantDb db)
{
    var review = await db.Reviews
        .FirstOrDefaultAsync(r => r.RestaurantId == id && r.Id == reviewId);

    if (review is null)
        return TypedResults.NotFound("Review Not Found");

    db.Reviews.Remove(review);
    await db.SaveChangesAsync();
    return TypedResults.NoContent();
}

async Task UpdateLeaderboard(RestaurantDb restaurantDb, LeaderboardDb leaderboardDb)
{

    try
    {
        // Clear existing leaderboard entries
        leaderboardDb.LeaderboardEntries.RemoveRange(await leaderboardDb.LeaderboardEntries.ToListAsync());

        // Compute leaderboard entries
        var query = restaurantDb.Restaurants
            .Include(r => r.Reviews) // Eagerly load Reviews
            .AsNoTracking(); // Read-only query for performance

        // Compute new leaderboard from PostgreSQL data
        var leaderboard = await query
            .Select(r => new LeaderboardEntry
            {
                Id = r.Id,
                RestaurantName = r.Name,
                AverageRating = r.Reviews.Count != 0 ? r.Reviews.Average(rev => rev.Rating) : 0,
                ReviewCount = r.Reviews.Count,
                AverageSentiment = r.Reviews.Count != 0
                    ? r.Reviews.Average(rev => rev.SentimentLabel == "POSITIVE" ? rev.SentimentScore : (rev.SentimentLabel == "NEGATIVE" ? -rev.SentimentScore : 0))
                    : 0
            })
            .ToListAsync();

        // Save to in-memory database
        leaderboardDb.LeaderboardEntries.AddRange(leaderboard);
        await leaderboardDb.SaveChangesAsync();
    }
    catch (Exception ex)
    {
        Console.WriteLine($"{ex}");
    }
}

async Task<SentimentResult> AnalyzeComment(string comment)
{
    var pythonPath = "python";
    var scriptPath = Path.Combine(Directory.GetCurrentDirectory(), "utils", "analyzeReviews.py");
    var jsonInput = JsonSerializer.Serialize(new[] { comment });
    var tempFile = Path.GetTempFileName();
    await File.WriteAllTextAsync(tempFile, jsonInput);

    var process = new Process
    {
        StartInfo = new ProcessStartInfo
        {
            FileName = pythonPath,
            Arguments = $"\"{scriptPath}\" \"{tempFile}\"",
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            UseShellExecute = false,
            CreateNoWindow = true
        }
    };

    try
    {
        process.Start();
        string output = await process.StandardOutput.ReadToEndAsync();
        string error = await process.StandardError.ReadToEndAsync();
        await process.WaitForExitAsync();

        if (!string.IsNullOrWhiteSpace(error))
            Console.Error.WriteLine("Python STDERR: " + error);

        if (string.IsNullOrWhiteSpace(output))
            throw new Exception("Python produced no output");

        var sentimentResults = JsonSerializer.Deserialize<List<SentimentResult>>(output, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });
        return sentimentResults?.FirstOrDefault() ?? new SentimentResult(comment, "NEUTRAL", 0);
    }
    finally
    {
        if (File.Exists(tempFile))
            File.Delete(tempFile);
    }
}

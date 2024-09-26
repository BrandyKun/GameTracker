using IGDB.Models;

namespace Gaming.Application.Dtos;

public class PlatformGameResultsDto : Game
{
    public bool IsGame { get; set; } = true;
    public string? ImageUrl { get; set; }
}

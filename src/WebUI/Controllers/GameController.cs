using Application;
using IGDB;
using IGDB.Models;
using Microsoft.AspNetCore.Mvc;

namespace WebUI.Controllers;

[ApiController]
[Route("[controller]")]
public class GameController : ControllerBase
{
    private readonly IConfiguration _config;
    private readonly IGDBClient _client;

    public GameController(IConfiguration config)
    {
        _config = config;
        _client = new IGDBClient(_config["IGDB_CLIENT_ID"], _config["IGDB_CLIENT_SECRET"]);
    }

    private async Task<List<T>> GetAsync<T>(string endpoint, string query = "", int limit = 20)
    {
        var builtQuery = string.IsNullOrEmpty(query) ? $"fields *; limit {limit};" : $"{query} limit {limit};";
        var model = await _client.QueryAsync<T>(endpoint, builtQuery);
        return model.ToList();
    }

    [HttpPost, Route("games")]
    public async Task<IEnumerable<Game>> GetGames([FromBody] RequestBodyDto request)
    {
        return await GetAsync<Game>(IGDBClient.Endpoints.Games, request.Query, request.Limit);
    }

    [HttpPost, Route("newRelease")]
    public async Task<IEnumerable<Game>> GetNewRelease([FromBody] RequestBodyDto request)
    {
        var queryBuild = string.IsNullOrEmpty(request.Date) ? DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString() : request.Date;
        request.Query += $" where date < {queryBuild};";
        var releases = await GetAsync<ReleaseDate>(IGDBClient.Endpoints.ReleaseDates, request.Query, request.Limit);

        var gameIds = releases.Select(x => x.Game.Value.Id);
        var commaList = String.Join(",", gameIds);

        var newReleasedGames = await GetAsync<Game>(IGDBClient.Endpoints.Games, $"fields name,cover.*; where id= ({commaList});", request.Limit);

        return newReleasedGames;
    }
}
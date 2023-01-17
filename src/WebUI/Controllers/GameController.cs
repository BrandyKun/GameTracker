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
        var model = await _client.QueryAsync<T>(endpoint, query:builtQuery);
        return model.ToList();
    }

    [HttpPost, Route("games")]
    public async Task<IEnumerable<Game>> GetGames([FromBody] RequestBodyDto request)
    {
        //  var builtQuery = string.IsNullOrEmpty(request.Query) ? $"fields *; limit {request.Limit};" : $"{request.Query} limit {request.Limit};";
        // return await _client.QueryAsync<Game>(IGDBClient.Endpoints.Games, query: builtQuery);
        return await GetAsync<Game>(IGDBClient.Endpoints.Games, request.Query, request.Limit);
    }
}
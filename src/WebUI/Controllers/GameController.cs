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
        _client = new IGDBClient(_config["IGDB_CLIENT_ID"],_config["IGDB_CLIENT_SECRET"]);
    }

    public async Task<IEnumerable<Game>> GetGames()
    {
        var games = await _client.QueryAsync<Game>(IGDBClient.Endpoints.Games, query: "fields name; limit 50;");
        return games.ToList();
    }
}
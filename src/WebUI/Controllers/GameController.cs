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
    //change if limti is 0 we remove teh limit from quesry and return all teh results
    private async Task<List<T>> GetAsync<T>(string endpoint, string query = "", int limit = 20, string sorts = "")
    {
        var builtQuery = string.IsNullOrEmpty(query) ? $"fields *; limit {limit};" : $"{query} limit {limit};";
        string sort = string.IsNullOrEmpty(sorts) ? "" : sorts;
        builtQuery += sort;
        var model = await _client.QueryAsync<T>(endpoint, builtQuery);
        return model.ToList();
    }

    /// <summary>
    /// Get games with specific 
    /// </summary>
    /// <param name="request"></param>
    /// <returns></returns>
    [HttpPost, Route("games")]
    public async Task<IEnumerable<Game>> GetGames([FromBody] RequestBodyDto request)
    {
        return await GetAsync<Game>(IGDBClient.Endpoints.Games, request.Query, request.Limit);
    }

    /// <summary>
    /// get a single game from id
    /// </summary>
    /// <param name="request"></param>
    /// <returns> single game</returns>
    [HttpPost, Route("games/{id}")]
    public async Task<Game> GetGameById([FromBody] RequestBodyDto request)
    {
       var games = await GetAsync<Game>(IGDBClient.Endpoints.Games, request.Query, request.Limit);
        return games.FirstOrDefault();
    }

    [HttpPost, Route("screenshots/{id}")]
    public async Task<IEnumerable<Screenshot>> GetScreenshotsById([FromBody] RequestBodyDto request)
    {
       var screenshots = await GetAsync<Screenshot>(IGDBClient.Endpoints.Screenshots, request.Query, request.Limit);
        return screenshots;
    }

    /// <summary>
    /// get games that will be realesed int eh next year counting from toy
    /// </summary>
    /// <param name="request"></param>
    /// <returns></returns>
    [HttpPost, Route("awaiting")]
    public async Task<IEnumerable<Game>> GetNewRelease()
    {
        IEnumerable<Game> upcomingGames = new List<Game>();

        //calculating date in milliseconds to get the popular games from th past 6 months
        DateTimeOffset currentDate = DateTime.UtcNow;
        var dateInMilliseconds = currentDate.ToUnixTimeSeconds();

        //1st calling games from ps4/ps5
        string psQuery = $"fields name,cover.*, rating,release_dates.*,aggregated_rating,  hypes,artworks.url,platforms.*; where hypes > 10 & category = 0 & release_dates.date > {dateInMilliseconds} & platforms= (167,48); sort hypes;";
        IEnumerable<Game> psGames = await GetAsync<Game>(IGDBClient.Endpoints.Games, psQuery, 5);
        upcomingGames = upcomingGames.Concat(psGames);

        string xboxQuery = $"fields name,cover.*, rating,release_dates.*,aggregated_rating,  hypes,artworks.url,platforms.*; where hypes > 10 &  category= 0 & release_dates.date > {dateInMilliseconds} & platforms= (45,165); sort hypes ;";
        IEnumerable<Game> xboxGames = await GetAsync<Game>(IGDBClient.Endpoints.Games, xboxQuery, 5);
        upcomingGames = upcomingGames.Concat(xboxGames);

        string nintendoQuery = $"fields name,cover.*, rating,release_dates.*,aggregated_rating,  hypes,artworks.url,platforms.*; where hypes > 10 & category =0 & release_dates.date > {dateInMilliseconds} & platforms= (130); sort hypes;";
        IEnumerable<Game> nintendoGames = await GetAsync<Game>(IGDBClient.Endpoints.Games, nintendoQuery, 5);
        upcomingGames = upcomingGames.Concat(nintendoGames);

        return upcomingGames.GroupBy(x => x.Id).Select(y => y.FirstOrDefault());
    }

    [HttpPost, Route("justReleased")]
    public async Task<IEnumerable<Game>> GetLatestReleases()
    {
        IEnumerable<Game> upcomingGames = new List<Game>();

        //calculating date in milliseconds to get the popular games from th past 6 months
        DateTimeOffset currentDate = DateTime.UtcNow;
        var dateInMilliseconds = currentDate.ToUnixTimeSeconds();

        //1st calling games from ps4/ps5
        string psQuery = $"fields name,cover.*, rating,release_dates.*,aggregated_rating,  hypes,artworks.url,platforms.*; where category = 0 & release_dates.date < {dateInMilliseconds} & platforms= (167,48); sort first_release_date desc;";
        IEnumerable<Game> psGames = await GetAsync<Game>(IGDBClient.Endpoints.Games, psQuery, 5);
        upcomingGames = upcomingGames.Concat(psGames);

        string xboxQuery = $"fields name,cover.*, rating,release_dates.*,aggregated_rating,  hypes,artworks.url,platforms.*; where category= 0 & release_dates.date < {dateInMilliseconds} & platforms= (45,165); sort first_release_date desc;";
        IEnumerable<Game> xboxGames = await GetAsync<Game>(IGDBClient.Endpoints.Games, xboxQuery, 5);
        upcomingGames = upcomingGames.Concat(xboxGames);

        string nintendoQuery = $"fields name,cover.*, rating,release_dates.*,aggregated_rating,  hypes,artworks.url,platforms.*; where category =0 & release_dates.date < {dateInMilliseconds} & platforms= (130); sort first_release_date desc;";
        IEnumerable<Game> nintendoGames = await GetAsync<Game>(IGDBClient.Endpoints.Games, nintendoQuery, 5);
        upcomingGames = upcomingGames.Concat(nintendoGames);

        return upcomingGames.GroupBy(x => x.Id).Select(y => y.FirstOrDefault()).OrderByDescending(item => item.FirstReleaseDate);
    }

    /// <summary>
    /// 
    /// </summary>
    /// <returns></returns>
    [HttpPost, Route("platform")]
    public async Task<IEnumerable<Platform>> GetPlatformsAsync()
    {
        string query = "fields created_at, generation, name, platform_family.*, summary, versions, websites;";
        string sort = "sort name;";
        return await GetAsync<Platform>(IGDBClient.Endpoints.Platforms, query, 500, sort);
    }


    [HttpPost, Route("popular")]
    public async Task<IEnumerable<Game>> GetMostPopular()
    {
        IEnumerable<Game> popularGames = new List<Game>();

        //calculating date in milliseconds to get the popular games from th past 6 months
        DateTime currentDate = DateTime.UtcNow;
        DateTimeOffset pastSixMonthsDate = currentDate.AddMonths(-6);
        var dateInMilliseconds = pastSixMonthsDate.ToUnixTimeMilliseconds();

        //1st calling games from ps4/ps5
        string psQuery = $"fields name,cover.*, rating,release_dates.*,aggregated_rating,  hypes,artworks.url,platforms.*; where rating > 75 & hypes > 8 & category =0  & release_dates.date > {dateInMilliseconds} & platforms= (167,48); sort rating desc;";
        IEnumerable<Game> psGames = await GetAsync<Game>(IGDBClient.Endpoints.Games, psQuery, 5);
        popularGames = popularGames.Concat(psGames);

        string xboxQuery = $"fields name,cover.*, rating,release_dates.*,aggregated_rating,  hypes,artworks.url,platforms.*; where rating > 75 & hypes > 8 & category =0  & release_dates.date > {dateInMilliseconds} & platforms= (45,165); sort rating desc;";
        IEnumerable<Game> xboxGames = await GetAsync<Game>(IGDBClient.Endpoints.Games, xboxQuery, 5);
        popularGames = popularGames.Concat(xboxGames);

        string nintendoQuery = $"fields name,cover.*, rating,release_dates.*,aggregated_rating,  hypes,artworks.url,platforms.*; where rating > 75 & hypes > 8 & category =0  & release_dates.date > {dateInMilliseconds} & platforms= (130); sort rating desc;";
        IEnumerable<Game> nintendoGames = await GetAsync<Game>(IGDBClient.Endpoints.Games, nintendoQuery, 5);
        popularGames = popularGames.Concat(nintendoGames);

        return popularGames.GroupBy(x => x.Id).Select(y => y.FirstOrDefault());
    }
}
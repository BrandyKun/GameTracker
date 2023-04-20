using Application;
using Application.Dtos;
using AutoMapper;
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
    private readonly IMapper _mapper;

    public GameController(IConfiguration config, IMapper mapper)
    {
        _mapper = mapper;
        _config = config;
        _client = new IGDBClient(_config["IGDB_CLIENT_ID"], _config["IGDB_CLIENT_SECRET"]);
    }
    //change if limti is 0 we remove teh limit from quesry and return all teh results
    private async Task<List<T>> GetAsync<T>(string endpoint, string query = "", int limit = 150, string sorts = "")
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
        string psQuery = $"fields name,cover.*, rating,release_dates.*,aggregated_rating,  hypes,artworks.url,platforms.*; where hypes > 10 & category = 0 & first_release_date > {dateInMilliseconds} & platforms= (167,48); sort hypes;";
        IEnumerable<Game> psGames = await GetAsync<Game>(IGDBClient.Endpoints.Games, psQuery, 5);
        upcomingGames = upcomingGames.Concat(psGames);

        string xboxQuery = $"fields name,cover.*, rating,release_dates.*,aggregated_rating,  hypes,artworks.url,platforms.*; where hypes > 10 &  category= 0 & first_release_date > {dateInMilliseconds} & platforms= (45,165); sort hypes ;";
        IEnumerable<Game> xboxGames = await GetAsync<Game>(IGDBClient.Endpoints.Games, xboxQuery, 5);
        upcomingGames = upcomingGames.Concat(xboxGames);

        string nintendoQuery = $"fields name,cover.*, rating,release_dates.*,aggregated_rating,  hypes,artworks.url,platforms.*; where hypes > 10 & category =0 & first_release_date > {dateInMilliseconds} & platforms= (130); sort hypes;";
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
        string psQuery = $"fields name,cover.*, rating,release_dates.*,aggregated_rating,  hypes,artworks.url,platforms.*; where category = 0 & first_release_date < {dateInMilliseconds} & platforms= (167,48); sort first_release_date desc;";
        IEnumerable<Game> psGames = await GetAsync<Game>(IGDBClient.Endpoints.Games, psQuery, 5);
        upcomingGames = upcomingGames.Concat(psGames);

        string xboxQuery = $"fields name,cover.*, rating,release_dates.*,aggregated_rating,  hypes,artworks.url,platforms.*; where category= 0 & first_release_date < {dateInMilliseconds} & platforms= (45,165); sort first_release_date desc;";
        IEnumerable<Game> xboxGames = await GetAsync<Game>(IGDBClient.Endpoints.Games, xboxQuery, 5);
        upcomingGames = upcomingGames.Concat(xboxGames);

        string nintendoQuery = $"fields name,cover.*, rating,release_dates.*,aggregated_rating,  hypes,artworks.url,platforms.*; where category =0 & first_release_date < {dateInMilliseconds} & platforms= (130); sort first_release_date desc;";
        IEnumerable<Game> nintendoGames = await GetAsync<Game>(IGDBClient.Endpoints.Games, nintendoQuery, 5);
        upcomingGames = upcomingGames.Concat(nintendoGames);

        return upcomingGames.GroupBy(x => x.Id).Select(y => y.FirstOrDefault()).OrderByDescending(item => item.FirstReleaseDate);
    }

    /// <summary>
    ///returns all teh platforms available to from the 
    /// </summary>
    /// <returns></returns>
    [HttpPost, Route("platform")]
    public async Task<IEnumerable<Platform>> GetPlatformsAsync()
    {
        string query = "fields created_at, generation, name, platform_family.*,platform_logo.* ,summary, versions, websites;";
        string sort = "sort name;";
        return await GetAsync<Platform>(IGDBClient.Endpoints.Platforms, query, 500, sort);
    }

    /// <summary>
    ///return Platform family
    /// </summary>
    /// <returns></returns>
    [HttpPost, Route("platformFamily")]
    public async Task<IEnumerable<PlatformFamily>> GetPlatformFamilyAsync()
    {
        string query = "fields name, slug;";
        string sort = "sort id;";
        return await GetAsync<PlatformFamily>(IGDBClient.Endpoints.Platforms, query, 500, sort);
    }

    /// <summary>
    ///return and process the popular games
    /// </summary>
    /// <returns>IGBD games model</returns>
    [HttpPost, Route("popular")]
    public async Task<IEnumerable<Game>> GetMostPopular()
    {
        IEnumerable<Game> popularGames = new List<Game>();

        //calculating date in milliseconds to get the popular games from th past 6 months
        DateTime currentDate = DateTime.UtcNow;
        DateTimeOffset pastSixMonthsDate = currentDate.AddMonths(-6);
        var dateInMilliseconds = pastSixMonthsDate.ToUnixTimeMilliseconds();

        //1st calling games from ps4/ps5
        string psQuery = $"fields name,cover.*, rating,release_dates.*,aggregated_rating,  hypes,artworks.url,platforms.*; where rating > 75 & hypes > 8 & category =0  & first_release_date > {dateInMilliseconds} & platforms= (167,48); sort rating desc;";
        IEnumerable<Game> psGames = await GetAsync<Game>(IGDBClient.Endpoints.Games, psQuery, 5);
        popularGames = popularGames.Concat(psGames);

        string xboxQuery = $"fields name,cover.*, rating,release_dates.*,aggregated_rating,  hypes,artworks.url,platforms.*; where rating > 75 & hypes > 8 & category =0  & first_release_date > {dateInMilliseconds} & platforms= (45,165); sort rating desc;";
        IEnumerable<Game> xboxGames = await GetAsync<Game>(IGDBClient.Endpoints.Games, xboxQuery, 5);
        popularGames = popularGames.Concat(xboxGames);

        string nintendoQuery = $"fields name,cover.*, rating,release_dates.*,aggregated_rating,  hypes,artworks.url,platforms.*; where rating > 75 & hypes > 8 & category =0  & first_release_date > {dateInMilliseconds} & platforms= (130); sort rating desc;";
        IEnumerable<Game> nintendoGames = await GetAsync<Game>(IGDBClient.Endpoints.Games, nintendoQuery, 5);
        popularGames = popularGames.Concat(nintendoGames);

        return popularGames.GroupBy(x => x.Id).Select(y => y.FirstOrDefault());
    }

    /// <summary>
    /// search endpoint that return results for a search
    /// </summary>
    /// <param name="searchQuery"></param>
    /// <returns>IGDB Search model</returns>
    [HttpPost, Route("search")]
    public async Task<IEnumerable<SearchResultsToReturnDto>> GetSearchesAsync([FromBody] SearchResultsDto searchQuery)
    {
        string query = string.IsNullOrEmpty(searchQuery.SearchQuery) ? "fields game.*;" : $"fields *; search \"{searchQuery.SearchQuery}\";";
        var searches = await GetAsync<Search>(IGDBClient.Endpoints.Search, query);

        var resultType = await SortAndFilterSearchResult(searches);

        return resultType;
    }

    private async Task<IEnumerable<SearchResultsToReturnDto>> SortAndFilterSearchResult(IEnumerable<Search> results)
    {

        IList<Game> gameCover = new List<Game>();
        IList<Platform> platformLogo = new List<Platform>();
        IList<Character> characters = new List<Character>();

        if (results == null)
        {
            throw new Exception("search yielded no results");
        }

        var convertedResults = _mapper.Map<IEnumerable<Search>, IEnumerable<SearchResultsToReturnDto>>(results);

        if (convertedResults == null)
        {
            throw new Exception("error while mapping");
        }

        var gameIds = String.Join(",", convertedResults.Where(c => c.IsGame).Select(x => x.Game.Id));
        var platformIds = String.Join(",", convertedResults.Where(c => c.IsPlatform).Select(x => x.Platform.Id));
        var characterIds = String.Join(",", convertedResults.Where(c => c.IsCharacter).Select(x => x.Character.Id));

        if (!String.IsNullOrEmpty(gameIds))
        {
            string coverQuery = $"fields name, cover.*; where id = ({gameIds});";
            gameCover = await GetAsync<Game>(IGDBClient.Endpoints.Games, coverQuery);
        }

        if (!String.IsNullOrEmpty(platformIds))
        {
            string platfomrQuery = $"fields *, platform_logo.*; where id = ({platformIds});";
            platformLogo = await GetAsync<Platform>(IGDBClient.Endpoints.Platforms, platfomrQuery);
        }
        if (!String.IsNullOrEmpty(characterIds))
        {
            string platfomrQuery = $"fields *, mug_shot.*; where id = ({characterIds});";
            characters = await GetAsync<Character>(IGDBClient.Endpoints.Characters, platfomrQuery);
        }

        foreach (var result in convertedResults)
        {
            if (result.IsGame)
            {
                var cover = gameCover.FirstOrDefault(x => x.Id == result.Game.Id);
                result.Id = result.Game.Id ?? 0;
                if ((cover != null) && (cover.Cover != null) )
                {
                    result.ImageUrl = cover?.Cover?.Value?.Url;
                }
            }

            if (result.IsPlatform)
            {
                var logo = platformLogo.FirstOrDefault(c => c.Id == result.Platform.Id);
                result.Id = result.Platform.Id ?? 0;

                if ((logo != null) && (logo.PlatformLogo != null))
                {
                    result.ImageUrl = logo?.PlatformLogo?.Value?.Url;
                }
            }
            if (result.IsCharacter)
            {
                var character = characters.FirstOrDefault(c => c.Id == result.Character.Id);
                result.Id = result.Character.Id ?? 0;
                if ((character != null) && (character.MugShot != null))
                {
                    result.ImageUrl = $"//images.igdb.com/igdb/image/upload/t_thumb/{character?.MugShot?.Value?.ImageId}.jpeg";
                }
            }
        }
        return convertedResults.OrderByDescending(x => x.PublishedAt);
    }
}
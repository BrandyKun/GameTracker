using Application.Interfaces;
using IGDB;
using Microsoft.AspNetCore.Mvc;

namespace WebUI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GameBaseController : ControllerBase, IGdbController
    {
        private readonly IConfiguration _config;
        private readonly IGDBClient _client;

        public GameBaseController(IConfiguration config)
        {
            _config = config;
            _client = new IGDBClient(_config["IGDB_CLIENT_ID"], _config["IGDB_CLIENT_SECRET"]);
        }
        public async Task<List<T>> GetAsync<T>(string endpoint, string query = "", int limit = 20)
        {
            var builtQuery = string.IsNullOrEmpty(query) ? $"fields *; limit {limit};" : $"{query} limit {limit};";
            var model = await _client.QueryAsync<T>(endpoint, builtQuery);
            return model.ToList();
        }
    }
}
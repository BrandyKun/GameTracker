using IGDB.Models;

namespace Application
{
    public class GameDto : Game
    {
        IEnumerable<Screenshot> Screenshots {get;set;}
    }
}
namespace Application.Dtos
{
    public class SearchResultsToReturnDto : IGDB.Models.Search
    {
        public bool IsPlatform { get; set; }
        public bool IsGame { get; set; }
        public string ImageUrl { get; set; } = null!;
    }
}
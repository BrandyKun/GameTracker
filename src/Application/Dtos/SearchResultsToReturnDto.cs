namespace Application.Dtos
{
    public class SearchResultsToReturnDto : IGDB.Models.Search
    {
        public long Id { get; set; }
        public bool IsPlatform { get; set; }
        public bool IsGame { get; set; }
        public bool IsCharacter { get; set; }
        public string ImageUrl { get; set; } = null!;
    }
}
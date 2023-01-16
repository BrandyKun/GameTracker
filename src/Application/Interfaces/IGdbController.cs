namespace Application.Interfaces
{
    public interface IGdbController
    {
        Task<List<T>> GetAsync<T>(string endpoint, string query = "", int limit = 20);
    }
}
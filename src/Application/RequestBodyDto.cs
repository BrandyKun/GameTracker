namespace Application
{
    public class RequestBodyDto
    {
        public string EndPoint { get; set; }
        public string Query { get; set; }
        public string? Date {get;set;}
        public int Limit { get; set; }
    }
}
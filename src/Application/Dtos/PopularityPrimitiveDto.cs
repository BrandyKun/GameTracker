using Newtonsoft.Json;

namespace Application.Dtos;

public class PopularityPrimitiveDto
{
    public long? Id { get; set; }

    [JsonProperty("game_id")]
    public long? GameId { get; set; }

    public double? Value { get; set; }

    [JsonProperty("popularity_type")]
    public int? PopularityType { get; set; }
}

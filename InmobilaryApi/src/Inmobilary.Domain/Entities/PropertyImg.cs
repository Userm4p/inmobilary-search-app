using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Domain.Entities;

[BsonIgnoreExtraElements]
public class PropertyImg
{
    [BsonId]
    [BsonRepresentation(BsonType.String)]
    public string Id { get; set; } = string.Empty;

    [BsonRepresentation(BsonType.String)]
    public string PropertyId { get; set; } = string.Empty;

    public required string File { get; set; }
}

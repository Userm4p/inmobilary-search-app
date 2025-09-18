using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Domain.Entities;

[BsonIgnoreExtraElements]
public class Property
{
    [BsonId]
    [BsonRepresentation(BsonType.String)]
    public string Id { get; set; } = string.Empty;

    [BsonRepresentation(BsonType.String)]
    public string OwnerId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Address { get; set; }
    public decimal Price { get; set; }
}

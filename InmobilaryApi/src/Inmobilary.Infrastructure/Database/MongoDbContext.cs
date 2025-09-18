using Domain.Entities;
using MongoDB.Driver;

namespace Infrastructure.Database;

public class MongoDbContext
{
    private readonly IMongoDatabase _database;

    public MongoDbContext(string connectionString, string databaseName)
    {
        var client = new MongoClient(connectionString);
        _database = client.GetDatabase(databaseName);
    }

    public IMongoCollection<Owner> Owners => _database.GetCollection<Owner>("owners");
    public IMongoCollection<Property> Properties => _database.GetCollection<Property>("properties");
    public IMongoCollection<PropertyImg> PropertyImgs => _database.GetCollection<PropertyImg>("propertyImgs");
    public IMongoCollection<PropertyTrace> PropertyTraces => _database.GetCollection<PropertyTrace>("propertyTraces");
}

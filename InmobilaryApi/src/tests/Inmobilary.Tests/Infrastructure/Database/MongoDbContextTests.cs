using Infrastructure.Database;
using Domain.Entities;
using MongoDB.Driver;
using Moq;
using FluentAssertions;
using Xunit;

namespace Inmobilary.Tests.Infrastructure.Database;

public class MongoDbContextTests
{
    [Fact]
    public void MongoDbContext_ShouldInitializeWithConnectionStringAndDatabaseName()
    {
        // Arrange
        var connectionString = "mongodb://localhost:27017";
        var databaseName = "test_database";

        // Act
        var context = new MongoDbContext(connectionString, databaseName);

        // Assert
        context.Should().NotBeNull();
    }

    [Fact]
    public void MongoDbContext_ShouldHaveOwnersCollection()
    {
        // Arrange
        var connectionString = "mongodb://localhost:27017";
        var databaseName = "test_database";

        // Act
        var context = new MongoDbContext(connectionString, databaseName);

        // Assert
        context.Owners.Should().NotBeNull();
        context.Owners.Should().BeAssignableTo<IMongoCollection<Owner>>();
    }

    [Fact]
    public void MongoDbContext_ShouldHavePropertiesCollection()
    {
        // Arrange
        var connectionString = "mongodb://localhost:27017";
        var databaseName = "test_database";

        // Act
        var context = new MongoDbContext(connectionString, databaseName);

        // Assert
        context.Properties.Should().NotBeNull();
        context.Properties.Should().BeAssignableTo<IMongoCollection<Property>>();
    }

    [Fact]
    public void MongoDbContext_ShouldHavePropertyImgsCollection()
    {
        // Arrange
        var connectionString = "mongodb://localhost:27017";
        var databaseName = "test_database";

        // Act
        var context = new MongoDbContext(connectionString, databaseName);

        // Assert
        context.PropertyImgs.Should().NotBeNull();
        context.PropertyImgs.Should().BeAssignableTo<IMongoCollection<PropertyImg>>();
    }

    [Fact]
    public void MongoDbContext_ShouldHavePropertyTracesCollection()
    {
        // Arrange
        var connectionString = "mongodb://localhost:27017";
        var databaseName = "test_database";

        // Act
        var context = new MongoDbContext(connectionString, databaseName);

        // Assert
        context.PropertyTraces.Should().NotBeNull();
        context.PropertyTraces.Should().BeAssignableTo<IMongoCollection<PropertyTrace>>();
    }

    [Theory]
    [InlineData("mongodb://localhost:27017", "test_db")]
    [InlineData("mongodb://user:pass@localhost:27017", "production_db")]
    [InlineData("mongodb+srv://user:pass@cluster.mongodb.net", "cloud_db")]
    public void MongoDbContext_ShouldAcceptDifferentConnectionStringsAndDatabaseNames(
        string connectionString, string databaseName)
    {
        // Act
        var context = new MongoDbContext(connectionString, databaseName);

        // Assert
        context.Should().NotBeNull();
        context.Owners.Should().NotBeNull();
        context.Properties.Should().NotBeNull();
        context.PropertyImgs.Should().NotBeNull();
        context.PropertyTraces.Should().NotBeNull();
    }
}

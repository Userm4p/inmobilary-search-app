using Domain.Entities;
using FluentAssertions;
using MongoDB.Bson;
using Xunit;

namespace Inmobilary.Tests.Domain.Entities;

public class PropertyTests
{
    [Fact]
    public void Property_ShouldInitializeWithDefaultValues()
    {
        // Act
        var property = new Property
        {
            OwnerId = "owner123",
            Address = "123 Test Street"
        };

        // Assert
        property.Id.Should().BeEmpty();
        property.OwnerId.Should().Be("owner123");
        property.Name.Should().BeEmpty();
        property.Address.Should().Be("123 Test Street");
        property.Price.Should().Be(0);
    }

    [Fact]
    public void Property_ShouldSetAllProperties()
    {
        // Arrange
        var id = "property123";
        var ownerId = "owner123";
        var name = "Test Property";
        var address = "123 Test Street";
        var price = 150000.50m;

        // Act
        var property = new Property
        {
            Id = id,
            OwnerId = ownerId,
            Name = name,
            Address = address,
            Price = price
        };

        // Assert
        property.Id.Should().Be(id);
        property.OwnerId.Should().Be(ownerId);
        property.Name.Should().Be(name);
        property.Address.Should().Be(address);
        property.Price.Should().Be(price);
    }

    [Theory]
    [InlineData(0)]
    [InlineData(100000)]
    [InlineData(999999.99)]
    [InlineData(0.01)]
    public void Property_ShouldAcceptValidPrices(decimal price)
    {
        // Act
        var property = new Property
        {
            OwnerId = "owner123",
            Address = "123 Test Street",
            Price = price
        };

        // Assert
        property.Price.Should().Be(price);
    }

    [Fact]
    public void Property_ShouldHaveRequiredOwnerId()
    {
        // Act & Assert
        var property = new Property
        {
            OwnerId = "owner123",
            Address = "123 Test Street"
        };

        // OwnerId is required, so this should compile but we can test the behavior
        property.OwnerId.Should().NotBeNull();
    }

    [Fact]
    public void Property_ShouldHaveRequiredAddress()
    {
        // Act & Assert
        var property = new Property
        {
            OwnerId = "owner123",
            Address = "123 Test Street"
        };

        // Address is required, so this should compile but we can test the behavior
        property.Address.Should().NotBeNull();
    }
}

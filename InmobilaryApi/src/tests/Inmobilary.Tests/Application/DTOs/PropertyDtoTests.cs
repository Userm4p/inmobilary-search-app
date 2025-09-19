using Application.DTOs;
using FluentAssertions;
using Xunit;

namespace Inmobilary.Tests.Application.DTOs;

public class PropertyDtoTests
{
    [Fact]
    public void PropertyDto_ShouldInitializeWithDefaultValues()
    {
        // Act
        var propertyDto = new PropertyDto();

        // Assert
        propertyDto.Id.Should().BeEmpty();
        propertyDto.OwnerId.Should().BeEmpty();
        propertyDto.Owner.Should().BeNull();
        propertyDto.Name.Should().BeEmpty();
        propertyDto.Address.Should().BeEmpty();
        propertyDto.Price.Should().Be(0);
        propertyDto.Images.Should().NotBeNull();
        propertyDto.Images.Should().BeEmpty();
        propertyDto.Traces.Should().NotBeNull();
        propertyDto.Traces.Should().BeEmpty();
    }

    [Fact]
    public void PropertyDto_ShouldSetAllProperties()
    {
        // Arrange
        var id = "property123";
        var ownerId = "owner123";
        var name = "Test Property";
        var address = "123 Test Street";
        var price = 150000.50m;
        var images = new List<string> { "image1.jpg", "image2.jpg" };
        var traces = new List<PropertyTraceDto>
        {
            new() { Id = "trace1", Name = "Sale", Value = 150000, Tax = 15000, PropertyId = "property123" }
        };
        var owner = new OwnerDto
        {
            Id = "owner123",
            Name = "John Doe",
            Address = "456 Owner Street",
            Photo = "photo.jpg",
            Birthday = "1990-01-01"
        };

        // Act
        var propertyDto = new PropertyDto
        {
            Id = id,
            OwnerId = ownerId,
            Owner = owner,
            Name = name,
            Address = address,
            Price = price,
            Images = images,
            Traces = traces
        };

        // Assert
        propertyDto.Id.Should().Be(id);
        propertyDto.OwnerId.Should().Be(ownerId);
        propertyDto.Owner.Should().Be(owner);
        propertyDto.Name.Should().Be(name);
        propertyDto.Address.Should().Be(address);
        propertyDto.Price.Should().Be(price);
        propertyDto.Images.Should().BeEquivalentTo(images);
        propertyDto.Traces.Should().BeEquivalentTo(traces);
    }

    [Theory]
    [InlineData(0)]
    [InlineData(100000)]
    [InlineData(999999.99)]
    [InlineData(0.01)]
    public void PropertyDto_ShouldAcceptValidPrices(decimal price)
    {
        // Act
        var propertyDto = new PropertyDto
        {
            Price = price
        };

        // Assert
        propertyDto.Price.Should().Be(price);
    }

    [Fact]
    public void PropertyDto_ShouldHandleEmptyImagesList()
    {
        // Act
        var propertyDto = new PropertyDto
        {
            Images = new List<string>()
        };

        // Assert
        propertyDto.Images.Should().NotBeNull();
        propertyDto.Images.Should().BeEmpty();
    }

    [Fact]
    public void PropertyDto_ShouldHandleEmptyTracesList()
    {
        // Act
        var propertyDto = new PropertyDto
        {
            Traces = new List<PropertyTraceDto>()
        };

        // Assert
        propertyDto.Traces.Should().NotBeNull();
        propertyDto.Traces.Should().BeEmpty();
    }
}

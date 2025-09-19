using Domain.Entities;
using FluentAssertions;
using Xunit;

namespace Inmobilary.Tests.Domain.Entities;

public class OwnerTests
{
    [Fact]
    public void Owner_ShouldInitializeWithDefaultValues()
    {
        // Act
        var owner = new Owner();

        // Assert
        owner.Id.Should().BeEmpty();
        owner.Name.Should().BeEmpty();
        owner.Address.Should().BeEmpty();
        owner.Photo.Should().BeEmpty();
        owner.Birthday.Should().BeEmpty();
    }

    [Fact]
    public void Owner_ShouldSetAllProperties()
    {
        // Arrange
        var id = "owner123";
        var name = "John Doe";
        var address = "456 Owner Street";
        var photo = "photo.jpg";
        var birthday = "1990-01-01";

        // Act
        var owner = new Owner
        {
            Id = id,
            Name = name,
            Address = address,
            Photo = photo,
            Birthday = birthday
        };

        // Assert
        owner.Id.Should().Be(id);
        owner.Name.Should().Be(name);
        owner.Address.Should().Be(address);
        owner.Photo.Should().Be(photo);
        owner.Birthday.Should().Be(birthday);
    }

    [Theory]
    [InlineData("")]
    [InlineData("John Doe")]
    [InlineData("A")]
    [InlineData("Very Long Name That Should Still Work")]
    public void Owner_ShouldAcceptValidNames(string name)
    {
        // Act
        var owner = new Owner
        {
            Name = name
        };

        // Assert
        owner.Name.Should().Be(name);
    }

    [Theory]
    [InlineData("")]
    [InlineData("123 Main St")]
    [InlineData("Apt 4B, 123 Main Street, City, State 12345")]
    public void Owner_ShouldAcceptValidAddresses(string address)
    {
        // Act
        var owner = new Owner
        {
            Address = address
        };

        // Assert
        owner.Address.Should().Be(address);
    }
}

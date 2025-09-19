using Application.DTOs;
using FluentAssertions;
using Xunit;

namespace Inmobilary.Tests.Application.DTOs;

public class OwnerDtoTests
{
    [Fact]
    public void OwnerDto_ShouldInitializeWithDefaultValues()
    {
        // Act
        var ownerDto = new OwnerDto();

        // Assert
        ownerDto.Id.Should().BeEmpty();
        ownerDto.Name.Should().BeEmpty();
        ownerDto.Address.Should().BeEmpty();
        ownerDto.Photo.Should().BeEmpty();
        ownerDto.Birthday.Should().BeEmpty();
    }

    [Fact]
    public void OwnerDto_ShouldSetAllProperties()
    {
        // Arrange
        var id = "owner123";
        var name = "John Doe";
        var address = "456 Owner Street";
        var photo = "photo.jpg";
        var birthday = "1990-01-01";

        // Act
        var ownerDto = new OwnerDto
        {
            Id = id,
            Name = name,
            Address = address,
            Photo = photo,
            Birthday = birthday
        };

        // Assert
        ownerDto.Id.Should().Be(id);
        ownerDto.Name.Should().Be(name);
        ownerDto.Address.Should().Be(address);
        ownerDto.Photo.Should().Be(photo);
        ownerDto.Birthday.Should().Be(birthday);
    }

    [Theory]
    [InlineData("")]
    [InlineData("John Doe")]
    [InlineData("A")]
    [InlineData("Very Long Name That Should Still Work")]
    public void OwnerDto_ShouldAcceptValidNames(string name)
    {
        // Act
        var ownerDto = new OwnerDto
        {
            Name = name
        };

        // Assert
        ownerDto.Name.Should().Be(name);
    }

    [Theory]
    [InlineData("")]
    [InlineData("123 Main St")]
    [InlineData("Apt 4B, 123 Main Street, City, State 12345")]
    public void OwnerDto_ShouldAcceptValidAddresses(string address)
    {
        // Act
        var ownerDto = new OwnerDto
        {
            Address = address
        };

        // Assert
        ownerDto.Address.Should().Be(address);
    }
}

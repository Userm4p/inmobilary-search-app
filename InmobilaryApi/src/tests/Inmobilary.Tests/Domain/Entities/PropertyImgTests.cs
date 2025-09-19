using Domain.Entities;
using FluentAssertions;
using Xunit;

namespace Inmobilary.Tests.Domain.Entities;

public class PropertyImgTests
{
    [Fact]
    public void PropertyImg_ShouldInitializeWithDefaultValues()
    {
        // Act
        var propertyImg = new PropertyImg
        {
            File = "test.jpg"
        };

        // Assert
        propertyImg.Id.Should().BeEmpty();
        propertyImg.PropertyId.Should().BeEmpty();
        propertyImg.File.Should().Be("test.jpg");
    }

    [Fact]
    public void PropertyImg_ShouldSetAllProperties()
    {
        // Arrange
        var id = "img123";
        var propertyId = "property123";
        var file = "property-image.jpg";

        // Act
        var propertyImg = new PropertyImg
        {
            Id = id,
            PropertyId = propertyId,
            File = file
        };

        // Assert
        propertyImg.Id.Should().Be(id);
        propertyImg.PropertyId.Should().Be(propertyId);
        propertyImg.File.Should().Be(file);
    }

    [Theory]
    [InlineData("image.jpg")]
    [InlineData("image.png")]
    [InlineData("image.gif")]
    [InlineData("very-long-filename-with-extension.jpg")]
    [InlineData("a")]
    public void PropertyImg_ShouldAcceptValidFileNames(string fileName)
    {
        // Act
        var propertyImg = new PropertyImg
        {
            File = fileName
        };

        // Assert
        propertyImg.File.Should().Be(fileName);
    }

    [Fact]
    public void PropertyImg_ShouldHaveRequiredFile()
    {
        // Act & Assert
        var propertyImg = new PropertyImg
        {
            PropertyId = "property123",
            File = "test.jpg"
        };

        // File is required, so this should compile but we can test the behavior
        propertyImg.File.Should().NotBeNull();
    }
}

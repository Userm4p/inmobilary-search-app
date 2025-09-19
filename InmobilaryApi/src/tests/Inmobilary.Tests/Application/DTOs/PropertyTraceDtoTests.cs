using Application.DTOs;
using FluentAssertions;
using Xunit;

namespace Inmobilary.Tests.Application.DTOs;

public class PropertyTraceDtoTests
{
    [Fact]
    public void PropertyTraceDto_ShouldInitializeWithDefaultValues()
    {
        // Act
        var propertyTraceDto = new PropertyTraceDto();

        // Assert
        propertyTraceDto.Id.Should().BeEmpty();
        propertyTraceDto.DateScale.Should().BeEmpty();
        propertyTraceDto.Name.Should().BeEmpty();
        propertyTraceDto.Value.Should().Be(0);
        propertyTraceDto.Tax.Should().Be(0);
        propertyTraceDto.PropertyId.Should().BeEmpty();
    }

    [Fact]
    public void PropertyTraceDto_ShouldSetAllProperties()
    {
        // Arrange
        var id = "trace123";
        var dateScale = "2024-01-01";
        var name = "Property Sale";
        var value = 150000.50m;
        var tax = 15000.05m;
        var propertyId = "property123";

        // Act
        var propertyTraceDto = new PropertyTraceDto
        {
            Id = id,
            DateScale = dateScale,
            Name = name,
            Value = value,
            Tax = tax,
            PropertyId = propertyId
        };

        // Assert
        propertyTraceDto.Id.Should().Be(id);
        propertyTraceDto.DateScale.Should().Be(dateScale);
        propertyTraceDto.Name.Should().Be(name);
        propertyTraceDto.Value.Should().Be(value);
        propertyTraceDto.Tax.Should().Be(tax);
        propertyTraceDto.PropertyId.Should().Be(propertyId);
    }

    [Theory]
    [InlineData(0)]
    [InlineData(100000)]
    [InlineData(999999.99)]
    [InlineData(0.01)]
    public void PropertyTraceDto_ShouldAcceptValidValues(decimal value)
    {
        // Act
        var propertyTraceDto = new PropertyTraceDto
        {
            Value = value
        };

        // Assert
        propertyTraceDto.Value.Should().Be(value);
    }

    [Theory]
    [InlineData(0)]
    [InlineData(10000)]
    [InlineData(99999.99)]
    [InlineData(0.01)]
    public void PropertyTraceDto_ShouldAcceptValidTaxes(decimal tax)
    {
        // Act
        var propertyTraceDto = new PropertyTraceDto
        {
            Tax = tax
        };

        // Assert
        propertyTraceDto.Tax.Should().Be(tax);
    }

    [Theory]
    [InlineData("")]
    [InlineData("2024-01-01")]
    [InlineData("Sale")]
    [InlineData("Property Purchase")]
    public void PropertyTraceDto_ShouldAcceptValidNames(string name)
    {
        // Act
        var propertyTraceDto = new PropertyTraceDto
        {
            Name = name
        };

        // Assert
        propertyTraceDto.Name.Should().Be(name);
    }
}

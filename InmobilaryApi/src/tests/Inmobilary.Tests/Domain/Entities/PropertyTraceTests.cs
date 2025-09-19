using Domain.Entities;
using FluentAssertions;
using Xunit;

namespace Inmobilary.Tests.Domain.Entities;

public class PropertyTraceTests
{
    [Fact]
    public void PropertyTrace_ShouldInitializeWithDefaultValues()
    {
        // Act
        var propertyTrace = new PropertyTrace();

        // Assert
        propertyTrace.Id.Should().BeEmpty();
        propertyTrace.DateScale.Should().BeEmpty();
        propertyTrace.Name.Should().BeEmpty();
        propertyTrace.Value.Should().Be(0);
        propertyTrace.Tax.Should().Be(0);
        propertyTrace.PropertyId.Should().BeEmpty();
    }

    [Fact]
    public void PropertyTrace_ShouldSetAllProperties()
    {
        // Arrange
        var id = "trace123";
        var dateScale = "2024-01-01";
        var name = "Property Sale";
        var value = 150000.50m;
        var tax = 15000.05m;
        var propertyId = "property123";

        // Act
        var propertyTrace = new PropertyTrace
        {
            Id = id,
            DateScale = dateScale,
            Name = name,
            Value = value,
            Tax = tax,
            PropertyId = propertyId
        };

        // Assert
        propertyTrace.Id.Should().Be(id);
        propertyTrace.DateScale.Should().Be(dateScale);
        propertyTrace.Name.Should().Be(name);
        propertyTrace.Value.Should().Be(value);
        propertyTrace.Tax.Should().Be(tax);
        propertyTrace.PropertyId.Should().Be(propertyId);
    }

    [Theory]
    [InlineData(0)]
    [InlineData(100000)]
    [InlineData(999999.99)]
    [InlineData(0.01)]
    public void PropertyTrace_ShouldAcceptValidValues(decimal value)
    {
        // Act
        var propertyTrace = new PropertyTrace
        {
            Value = value
        };

        // Assert
        propertyTrace.Value.Should().Be(value);
    }

    [Theory]
    [InlineData(0)]
    [InlineData(10000)]
    [InlineData(99999.99)]
    [InlineData(0.01)]
    public void PropertyTrace_ShouldAcceptValidTaxes(decimal tax)
    {
        // Act
        var propertyTrace = new PropertyTrace
        {
            Tax = tax
        };

        // Assert
        propertyTrace.Tax.Should().Be(tax);
    }

    [Theory]
    [InlineData("")]
    [InlineData("2024-01-01")]
    [InlineData("Sale")]
    [InlineData("Property Purchase")]
    public void PropertyTrace_ShouldAcceptValidNames(string name)
    {
        // Act
        var propertyTrace = new PropertyTrace
        {
            Name = name
        };

        // Assert
        propertyTrace.Name.Should().Be(name);
    }
}

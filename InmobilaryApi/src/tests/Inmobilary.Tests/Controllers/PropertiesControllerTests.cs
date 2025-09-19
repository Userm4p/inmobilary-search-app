using InmobilaryApi.Controllers;
using Application.DTOs;
using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Moq;
using FluentAssertions;
using Xunit;

namespace Inmobilary.Tests.Controllers;

public class PropertiesControllerTests
{
    private readonly Mock<IPropertyService> _mockPropertyService;
    private readonly PropertiesController _controller;

    public PropertiesControllerTests()
    {
        _mockPropertyService = new Mock<IPropertyService>();
        _controller = new PropertiesController(_mockPropertyService.Object);
    }

    [Fact]
    public async Task GetAll_WithNoParameters_ShouldReturnOkWithProperties()
    {
        // Arrange
        var properties = new List<PropertyDto>
        {
            new() { Id = "1", Name = "Property 1", Address = "Address 1", Price = 100000 },
            new() { Id = "2", Name = "Property 2", Address = "Address 2", Price = 200000 }
        };

        _mockPropertyService.Setup(x => x.GetPropertiesAsync(null, null, null, null))
            .ReturnsAsync(properties);

        // Act
        var result = await _controller.GetAll(null, null, null, null);

        // Assert
        result.Should().BeOfType<ActionResult<IEnumerable<PropertyDto>>>();
        var okResult = result.Result as OkObjectResult;
        okResult.Should().NotBeNull();
        okResult!.Value.Should().BeEquivalentTo(properties);
    }

    [Fact]
    public async Task GetAll_WithNameParameter_ShouldCallServiceWithName()
    {
        // Arrange
        var name = "Villa";
        var properties = new List<PropertyDto>
        {
            new() { Id = "1", Name = "Villa", Address = "Address 1", Price = 100000 }
        };

        _mockPropertyService.Setup(x => x.GetPropertiesAsync(name, null, null, null))
            .ReturnsAsync(properties);

        // Act
        var result = await _controller.GetAll(name, null, null, null);

        // Assert
        _mockPropertyService.Verify(x => x.GetPropertiesAsync(name, null, null, null), Times.Once);
        var okResult = result.Result as OkObjectResult;
        okResult.Should().NotBeNull();
        okResult!.Value.Should().BeEquivalentTo(properties);
    }

    [Fact]
    public async Task GetAll_WithAddressParameter_ShouldCallServiceWithAddress()
    {
        // Arrange
        var address = "Main Street";
        var properties = new List<PropertyDto>
        {
            new() { Id = "1", Name = "Property 1", Address = "Main Street", Price = 100000 }
        };

        _mockPropertyService.Setup(x => x.GetPropertiesAsync(null, address, null, null))
            .ReturnsAsync(properties);

        // Act
        var result = await _controller.GetAll(null, address, null, null);

        // Assert
        _mockPropertyService.Verify(x => x.GetPropertiesAsync(null, address, null, null), Times.Once);
        var okResult = result.Result as OkObjectResult;
        okResult.Should().NotBeNull();
        okResult!.Value.Should().BeEquivalentTo(properties);
    }

    [Fact]
    public async Task GetAll_WithMinPriceParameter_ShouldCallServiceWithMinPrice()
    {
        // Arrange
        var minPrice = "100000";
        var properties = new List<PropertyDto>
        {
            new() { Id = "1", Name = "Property 1", Address = "Address 1", Price = 150000 }
        };

        _mockPropertyService.Setup(x => x.GetPropertiesAsync(null, null, minPrice, null))
            .ReturnsAsync(properties);

        // Act
        var result = await _controller.GetAll(null, null, minPrice, null);

        // Assert
        _mockPropertyService.Verify(x => x.GetPropertiesAsync(null, null, minPrice, null), Times.Once);
        var okResult = result.Result as OkObjectResult;
        okResult.Should().NotBeNull();
        okResult!.Value.Should().BeEquivalentTo(properties);
    }

    [Fact]
    public async Task GetAll_WithMaxPriceParameter_ShouldCallServiceWithMaxPrice()
    {
        // Arrange
        var maxPrice = "200000";
        var properties = new List<PropertyDto>
        {
            new() { Id = "1", Name = "Property 1", Address = "Address 1", Price = 150000 }
        };

        _mockPropertyService.Setup(x => x.GetPropertiesAsync(null, null, null, maxPrice))
            .ReturnsAsync(properties);

        // Act
        var result = await _controller.GetAll(null, null, null, maxPrice);

        // Assert
        _mockPropertyService.Verify(x => x.GetPropertiesAsync(null, null, null, maxPrice), Times.Once);
        var okResult = result.Result as OkObjectResult;
        okResult.Should().NotBeNull();
        okResult!.Value.Should().BeEquivalentTo(properties);
    }

    [Fact]
    public async Task GetAll_WithAllParameters_ShouldCallServiceWithAllParameters()
    {
        // Arrange
        var name = "Villa";
        var address = "Main Street";
        var minPrice = "100000";
        var maxPrice = "200000";
        var properties = new List<PropertyDto>
        {
            new() { Id = "1", Name = "Villa", Address = "Main Street", Price = 150000 }
        };

        _mockPropertyService.Setup(x => x.GetPropertiesAsync(name, address, minPrice, maxPrice))
            .ReturnsAsync(properties);

        // Act
        var result = await _controller.GetAll(name, address, minPrice, maxPrice);

        // Assert
        _mockPropertyService.Verify(x => x.GetPropertiesAsync(name, address, minPrice, maxPrice), Times.Once);
        var okResult = result.Result as OkObjectResult;
        okResult.Should().NotBeNull();
        okResult!.Value.Should().BeEquivalentTo(properties);
    }

    [Fact]
    public async Task GetById_WithValidId_ShouldReturnOkWithProperty()
    {
        // Arrange
        var id = "1";
        var property = new PropertyDto
        {
            Id = id,
            Name = "Property 1",
            Address = "Address 1",
            Price = 100000,
            Owner = new OwnerDto
            {
                Id = "owner1",
                Name = "Owner 1",
                Address = "Owner Address 1",
                Photo = "photo1.jpg",
                Birthday = "1990-01-01"
            },
            Images = new List<string> { "image1.jpg" },
            Traces = new List<PropertyTraceDto>
            {
                new() { Id = "trace1", Name = "Sale", DateScale = "2024-01-01", Value = 100000, Tax = 10000, PropertyId = "1" }
            }
        };

        _mockPropertyService.Setup(x => x.GetByIdAsync(id))
            .ReturnsAsync(property);

        // Act
        var result = await _controller.GetById(id);

        // Assert
        result.Should().BeOfType<ActionResult<PropertyDto>>();
        var okResult = result.Result as OkObjectResult;
        okResult.Should().NotBeNull();
        okResult!.Value.Should().BeEquivalentTo(property);
    }

    [Fact]
    public async Task GetById_WithInvalidId_ShouldReturnNotFound()
    {
        // Arrange
        var id = "nonexistent";
        _mockPropertyService.Setup(x => x.GetByIdAsync(id))
            .ReturnsAsync((PropertyDto?)null);

        // Act
        var result = await _controller.GetById(id);

        // Assert
        result.Should().BeOfType<ActionResult<PropertyDto>>();
        var notFoundResult = result.Result as NotFoundObjectResult;
        notFoundResult.Should().NotBeNull();
        notFoundResult!.Value.Should().Be($"No se encontró la propiedad con ID: {id}");
    }

    [Fact]
    public async Task GetById_WithEmptyId_ShouldCallServiceWithEmptyId()
    {
        // Arrange
        var id = "";
        _mockPropertyService.Setup(x => x.GetByIdAsync(id))
            .ReturnsAsync((PropertyDto?)null);

        // Act
        var result = await _controller.GetById(id);

        // Assert
        _mockPropertyService.Verify(x => x.GetByIdAsync(id), Times.Once);
        var notFoundResult = result.Result as NotFoundObjectResult;
        notFoundResult.Should().NotBeNull();
    }

    [Fact]
    public async Task GetById_WithNullId_ShouldCallServiceWithNullId()
    {
        // Arrange
        string? id = null;
        _mockPropertyService.Setup(x => x.GetByIdAsync(id!))
            .ReturnsAsync((PropertyDto?)null);

        // Act
        var result = await _controller.GetById(id!);

        // Assert
        _mockPropertyService.Verify(x => x.GetByIdAsync(id!), Times.Once);
        var notFoundResult = result.Result as NotFoundObjectResult;
        notFoundResult.Should().NotBeNull();
    }
}

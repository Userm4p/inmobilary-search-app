using Application.DTOs;
using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace InmobilaryApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PropertiesController : ControllerBase
{
    private readonly IPropertyService _propertyService;

    public PropertiesController(IPropertyService propertyService)
    {
        _propertyService = propertyService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PropertyDto>>> GetAll(
        [FromQuery] string? name,
        [FromQuery] string? address,
        [FromQuery] string? minPrice,
        [FromQuery] string? maxPrice)
    {
        var properties = await _propertyService.GetPropertiesAsync(name, address, minPrice, maxPrice);
        return Ok(properties);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<PropertyDto>> GetById(string id)
    {
        var property = await _propertyService.GetByIdAsync(id);
        
        if (property == null)
        {
            return NotFound($"No se encontró la propiedad con ID: {id}");
        }
        
        return Ok(property);
    }
}

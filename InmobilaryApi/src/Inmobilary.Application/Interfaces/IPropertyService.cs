using Application.DTOs;

namespace Application.Interfaces;

public interface IPropertyService
{
    Task<IEnumerable<PropertyDto>> GetPropertiesAsync(string? name, string? address, string? minPrice, string? maxPrice);
    Task<PropertyDto?> GetByIdAsync(string id);
}

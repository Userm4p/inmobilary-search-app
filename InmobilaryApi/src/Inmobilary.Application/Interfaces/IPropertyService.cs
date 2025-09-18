using Application.DTOs;

namespace Application.Interfaces;

public interface IPropertyService
{
    Task<IEnumerable<PropertyDto>> GetPropertiesAsync(string? nombre, string? direccion, decimal? minPrecio, decimal? maxPrecio);
    Task<PropertyDto?> GetByIdAsync(string id);
}

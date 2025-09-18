namespace Application.DTOs;

public class PropertyDto
{
    public string Id { get; set; } = string.Empty;
    public string OwnerId { get; set; } = string.Empty;
    public OwnerDto? Owner { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public List<string> Images { get; set; } = new();
    public List<PropertyTraceDto> Traces { get; set; } = new();
}

public class OwnerDto
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string Photo { get; set; } = string.Empty;
    public string Birthday { get; set; } = string.Empty;
}

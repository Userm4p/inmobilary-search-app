namespace Application.DTOs;

public class PropertyTraceDto
{
    public string Id { get; set; } = string.Empty;
    public string DateScale { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public decimal Value { get; set; }
    public decimal Tax { get; set; }
    public string PropertyId { get; set; } = string.Empty;
}

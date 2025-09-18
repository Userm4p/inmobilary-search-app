using Infrastructure.Database;
using Domain.Entities;
using Application.DTOs;
using Application.Interfaces;
using MongoDB.Driver;


namespace Infrastructure.Repositories;

public class PropertyRepository : IPropertyService
{
    private readonly MongoDbContext _context;

    public PropertyRepository(MongoDbContext context)
    {
        _context = context;
    }
    public async Task<IEnumerable<PropertyDto>> GetPropertiesAsync(
        string? name, string? address, decimal? minPrice, decimal? maxPrice)
    {
        var filterBuilder = Builders<Property>.Filter;
        var filter = filterBuilder.Empty;

        if (!string.IsNullOrEmpty(name))
            filter &= filterBuilder.Regex(p => p.Name, new MongoDB.Bson.BsonRegularExpression(name, "i"));

        if (!string.IsNullOrEmpty(address))
            filter &= filterBuilder.Regex(p => p.Address, new MongoDB.Bson.BsonRegularExpression(address, "i"));

        if (minPrice.HasValue)
            filter &= filterBuilder.Gte(p => p.Price, minPrice.Value);

        if (maxPrice.HasValue)
            filter &= filterBuilder.Lte(p => p.Price, maxPrice.Value);

        var properties = await _context.Properties.Find(filter).ToListAsync();
        var result = new List<PropertyDto>();

        foreach (var property in properties)
        {
            var imgs = await _context.PropertyImgs
                .Find(img => img.PropertyId == property.Id)
                .ToListAsync();

            var owner = await _context.Owners
                .Find(o => o.Id == property.OwnerId)
                .FirstOrDefaultAsync();

            OwnerDto? ownerDto = null;
            if (owner != null)
            {
                ownerDto = new OwnerDto
                {
                    Id = owner.Id,
                    Name = owner.Name,
                    Address = owner.Address,
                    Photo = owner.Photo,
                    Birthday = owner.Birthday
                };
            }

            var traces = await _context.PropertyTraces
                .Find(t => t.PropertyId == property.Id)
                .ToListAsync();

            var traceDtos = traces.Select(t => new PropertyTraceDto
            {
                Id = t.Id,
                Name = t.Name,
                DateScale = t.DateScale,
                Value = t.Value,
                Tax = t.Tax,
                PropertyId = t.PropertyId
            }).ToList();

            result.Add(new PropertyDto
            {
                Id = property.Id,
                OwnerId = property.OwnerId,
                Owner = ownerDto,
                Name = property.Name,
                Address = property.Address,
                Price = property.Price,
                Images = imgs.Select(i => i.File).ToList(),
                Traces = traceDtos
            });
        }

        return result;
    }


    public async Task<PropertyDto?> GetByIdAsync(string id)
    {
        var property = await _context.Properties
            .Find(p => p.Id == id)
            .FirstOrDefaultAsync();

        if (property == null) return null;

        var imgs = await _context.PropertyImgs
            .Find(img => img.PropertyId == property.Id)
            .ToListAsync();

        var owner = await _context.Owners
            .Find(o => o.Id == property.OwnerId)
            .FirstOrDefaultAsync();

        OwnerDto? ownerDto = null;
        if (owner != null)
        {
            ownerDto = new OwnerDto
            {
                Id = owner.Id,
                Name = owner.Name,
                Address = owner.Address,
                Photo = owner.Photo,
                Birthday = owner.Birthday
            };
        }

        var traces = await _context.PropertyTraces
            .Find(t => t.PropertyId == property.Id)
            .ToListAsync();

        var traceDtos = traces.Select(t => new PropertyTraceDto
        {
            Id = t.Id,
            Name = t.Name,
            DateScale = t.DateScale,
            Value = t.Value,
            Tax = t.Tax,
            PropertyId = t.PropertyId
        }).ToList();

        return new PropertyDto
        {
            Id = property.Id,
            OwnerId = property.OwnerId,
            Owner = ownerDto,
            Name = property.Name,
            Address = property.Address,
            Price = property.Price,
            Images = imgs.Select(i => i.File).ToList(),
            Traces = traceDtos
        };
    }

}

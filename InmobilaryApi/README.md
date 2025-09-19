# InmobilaryApi

REST API for real estate property management, built with .NET (ASP.NET Core) and MongoDB. Includes sample data and endpoint documentation.

## Features
- Layered architecture: Application, Domain, Infrastructure, Api
- Persistence with MongoDB via `MongoDB.Driver`
- Automatic data seeding using `mongo-init.js` (via Docker)
- Property search and filtering by name, address, and price range
- Swagger/OpenAPI enabled in Development

## Project structure
```
InmobilaryApi/
├─ Dockerfile
├─ docker-compose.yml (at repository root)
├─ mongo-init.js              # Seeds Owners, Properties, PropertyImgs, PropertyTraces
└─ src/
   ├─ Inmobilary.Domain/      # Domain entities (MongoDB)
   │  └─ Entities/
   │     ├─ Owner.cs
   │     ├─ Property.cs
   │     ├─ PropertyImg.cs
   │     └─ PropertyTrace.cs
   ├─ Inmobilary.Application/ # DTOs and interfaces
   │  ├─ DTOs/
   │  │  ├─ PropertyDto.cs
   │  │  └─ PropertyTraceDto.cs
   │  └─ Interfaces/
   │     └─ IPropertyService.cs
   ├─ Inmobilary.Infrastructure/ # Data access (MongoDbContext, repositories)
   │  ├─ Database/
   │  │  └─ MongoDbContext.cs
   │  └─ Repositories/
   │     └─ PropertyRepository.cs
   ├─ InmobilaryApi/          # ASP.NET Core API
   │  ├─ Controllers/
   │  │  └─ PropertiesController.cs
   │  ├─ Program.cs
   │  ├─ appsettings.json
   │  └─ appsettings.Development.json
   └─ tests/                  # Test project
      └─ Inmobilary.Tests/    # Unit tests (88 tests)
         ├─ Domain/Entities/  # Entity tests
         ├─ Application/DTOs/ # DTO tests
         ├─ Infrastructure/   # Infrastructure tests
         ├─ Controllers/      # Controller tests
         └─ README.md         # Test documentation
```

## Configuration
`appsettings.json` in `src/InmobilaryApi/` defines the connection:
```json
{
  "MongoSettings": {
    "ConnectionString": "mongodb://root:example@mongo:27017",
    "DatabaseName": "inmobilarydb"
  }
}
```
- In Docker, host `mongo` resolves to the `docker-compose` service.
- For local runs without Docker, change `ConnectionString` to `mongodb://root:example@localhost:27017` and ensure MongoDB is running with those credentials.

## Run
### Option 1: Docker (recommended)
1. From the repository root:
```bash
docker compose up --build
```
2. Services:
- API: exposed at `http://localhost:5000`
- MongoDB: `localhost:27017` with user `root`/`example`
3. Seed data: loaded automatically from `mongo-init.js` when the Mongo container starts.

### Option 2: Local (without Docker)
1. Start MongoDB locally (or via Docker) and adjust `appsettings.json`.
2. From `src/InmobilaryApi/`:
```bash
dotnet restore
dotnet run
```
3. The API will be exposed on the port shown in the console (typically `https://localhost:7xxx` and `http://localhost:5xxx`).

## Architecture
- `Domain`: Entities mapped to Mongo collections (`Property`, `Owner`, `PropertyImg`, `PropertyTrace`).
- `Application`: DTOs and contracts. `IPropertyService` defines:
```csharp
Task<IEnumerable<PropertyDto>> GetPropertiesAsync(string? nombre, string? direccion, decimal? minPrecio, decimal? maxPrecio);
Task<PropertyDto?> GetByIdAsync(string id);
```
- `Infrastructure`:
  - `MongoDbContext`: collection accessors (`Owners`, `Properties`, `PropertyImgs`, `PropertyTraces`).
  - `PropertyRepository`: `IPropertyService` implementation with filters by name, address, and price, projecting to `PropertyDto` including images, traces, and owner data.
- `Api`:
  - `Program.cs`: configures `MongoDbContext`, registers `IPropertyService` -> `PropertyRepository`, controllers, and Swagger.
  - `PropertiesController`: exposes property endpoints.

## Endpoints
Base URL: `http://localhost:5000/api`

### GET /api/Properties
Lists properties with optional filters.
- Query params:
  - `name` (string)
  - `address` (string)
  - `minPrice` (decimal)
  - `maxPrice` (decimal)
- Response: `200 OK` with an array of `PropertyDto`.

Example:
```bash
curl "http://localhost:5000/api/Properties?name=Casa&minPrice=300000&maxPrice=900000"
```

`PropertyDto` shape (abridged):
```json
{
  "id": "P1",
  "ownerId": "O1",
  "owner": { "id": "O1", "name": "Juan Pérez", "address": "Calle 123", "photo": "...", "birthday": "1985-05-15" },
  "name": "Apartamento Norte",
  "address": "Av Siempre Viva 123",
  "price": 250000,
  "images": ["https://picsum.photos/400/300?..."],
  "traces": [
    { "id": "T1", "name": "Venta Inicial", "dateScale": "2021-01-02T00:00:00.000Z", "value": 210000, "tax": 5100, "propertyId": "P1" }
  ]
}
```

### GET /api/Properties/{id}
Fetches a property by `id` (contract available in `IPropertyService`). If you add this endpoint to the controller, map it to `GetByIdAsync`.

## Data and collections
`mongo-init.js` creates and populates:
- `owners` (10 records)
- `properties` (20 records)
- `propertyImgs` (40 records)
- `propertyTraces` (30 records)

Sample IDs: `O1..O10`, `P1..P20`, `IMG1..IMG40`, `T1..T30`.

## Testing

The project includes a comprehensive test suite with **88 unit tests** covering all layers:

### Test Structure
- **Domain Tests**: Entity validation and behavior (32 tests)
- **Application Tests**: DTO mapping and interfaces (24 tests)  
- **Infrastructure Tests**: Database context and collections (6 tests)
- **Controller Tests**: API endpoint behavior (16 tests)

### Running Tests
```bash
# Navigate to test project
cd src/tests/Inmobilary.Tests

# Run all tests
dotnet test

# Run with code coverage
dotnet test --collect:"XPlat Code Coverage" --results-directory ./TestResults --logger trx --settings coverlet.runsettings

# Run with PowerShell script
.\run-tests.ps1
```

### Test Features
- **Framework**: xUnit with Moq and FluentAssertions
- **Coverage**: Detailed code coverage reporting with Coverlet
- **Mocking**: Comprehensive mocking of dependencies
- **Isolation**: All tests run independently without external dependencies

See `src/tests/Inmobilary.Tests/README.md` for detailed test documentation.

## Development
- Swagger UI enabled in Development (`/swagger`).
- Dependency injection in `Program.cs`:
```csharp
builder.Services.AddSingleton(sp => new MongoDbContext(connectionString, databaseName));
builder.Services.AddScoped<IPropertyService, PropertyRepository>();
```

## Notes and decisions
- Entities use `MongoDB.Bson` attributes and `BsonRepresentation(BsonType.String)` for string IDs.
- Search filters use case-insensitive regex on `Name` and `Address`.
- `PropertyDto` aggregates owner, images, and trace data in a single response.

## Suggested next steps
- Expose `GET /api/Properties/{id}` in the controller.
- Add pagination and sorting to `GET /api/Properties`.
- Validate parameters and price limits.
- Add authentication if protected access is required.

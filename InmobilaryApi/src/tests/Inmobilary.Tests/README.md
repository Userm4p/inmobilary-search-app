# Inmobilary Tests

This project contains comprehensive unit and integration tests for the Inmobilary API backend.

## Test Coverage

The test suite includes **88 unit tests** with comprehensive coverage across all layers:

- **Domain Layer**: 32 tests for all entities (Property, Owner, PropertyImg, PropertyTrace)
- **Application Layer**: 24 tests for DTOs and interfaces
- **Infrastructure Layer**: 6 tests for database context and collections
- **API Layer**: 16 tests for controllers and API behavior
- **Total**: 88 tests with 100% pass rate

## Test Categories

### Unit Tests
- **Entity Tests**: Test domain entities and their properties (32 tests)
- **DTO Tests**: Test data transfer objects (24 tests)
- **Database Context Tests**: Test MongoDB context and collections (6 tests)
- **Controller Tests**: Test API controllers with mocked services (16 tests)

### Test Strategy
- **Mocking**: Comprehensive use of Moq for dependency injection
- **Isolation**: All tests run independently without external dependencies
- **Coverage**: Detailed code coverage reporting with Coverlet
- **Assertions**: FluentAssertions for readable and maintainable test assertions

## Running Tests

### Prerequisites
- .NET 8.0 SDK
- No external dependencies required (all tests use mocks)

### Run All Tests
```bash
dotnet test
```

### Run Tests with Code Coverage
```bash
dotnet test --collect:"XPlat Code Coverage" --results-directory ./TestResults --logger trx --settings coverlet.runsettings
```

### Run Tests with PowerShell Script
```powershell
.\run-tests.ps1
```

## Test Structure

```
Inmobilary.Tests/
├── Domain/
│   └── Entities/
│       ├── PropertyTests.cs
│       ├── OwnerTests.cs
│       ├── PropertyImgTests.cs
│       └── PropertyTraceTests.cs
├── Application/
│   └── DTOs/
│       ├── PropertyDtoTests.cs
│       ├── OwnerDtoTests.cs
│       └── PropertyTraceDtoTests.cs
├── Infrastructure/
│   └── Database/
│       └── MongoDbContextTests.cs
├── Controllers/
│   └── PropertiesControllerTests.cs
├── appsettings.Test.json
├── coverlet.runsettings
└── run-tests.ps1
```

## Test Data

Tests use mock data and in-memory collections to ensure:
- **Fast execution**: No database or network calls
- **Deterministic results**: Consistent test outcomes
- **No external dependencies**: All dependencies are mocked
- **Isolated test scenarios**: Each test runs independently
- **Comprehensive coverage**: All major code paths tested

## Coverage Reports

Code coverage reports are generated in Cobertura format and can be viewed in:
- Visual Studio
- VS Code with coverage extensions
- ReportGenerator tool for HTML reports

## Dependencies

- **xUnit**: Testing framework
- **Moq**: Mocking framework
- **FluentAssertions**: Fluent assertion library
- **Microsoft.AspNetCore.Mvc.Testing**: Integration testing
- **coverlet.collector**: Code coverage collection

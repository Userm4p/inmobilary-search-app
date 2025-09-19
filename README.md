# Inmobilary — Monorepo (Frontend + API)

This repository contains a full‑stack application composed of a Next.js/React frontend and a .NET 8 Web API with MongoDB. Here you will find a high‑level overview of the architecture and how to work with the project. Each subproject includes its own README with more details.

## Repository structure

```
/
├─ inmobilary-frontend/     # Frontend (Next.js + TypeScript + Tailwind + shadcn/ui)
├─ InmobilaryApi/           # Backend (.NET 8 Web API + MongoDB)
├─ docker-compose.yml       # Orchestration for local dev (API + MongoDB; frontend optional)
```

- **Frontend**: `inmobilary-frontend/README.md`
- **API**: `InmobilaryApi/README.md`

## High‑level architecture

- **Client (SPA/SSR with Next.js)**: Renders pages and UI components; manages local/view state (e.g., `HomeContext`, `PropertyContext`). Consumes the API via `src/api/axios.ts` and services like `property.service.ts`.
- **API (.NET 8 Web API)**: Exposes REST endpoints (e.g., `PropertiesController`) that delegate to services/repositories to read/write from MongoDB.
- **Persistence (MongoDB)**: Domain entities (`Property`, `Owner`, `PropertyImg`, `PropertyTrace`) and data access via `MongoDbContext` and `PropertyRepository`.
- **Communication**: The frontend consumes JSON from the API. The base URL is configured in the frontend (see `config/envs.ts` and `api/axios.ts`), and the API uses `appsettings*.json` for MongoDB connection details.

## Simplified flow

1. The user interacts with the UI (search, filters, property detail).
2. The frontend calls the API using typed helpers/services.
3. The API queries MongoDB through repositories and returns DTOs (`PropertyDto`, `PropertyTraceDto`).
4. The frontend renders the data with components and handles navigation (Next.js `app/` routes and `property/[id]`).

## Local development

Options:

- With Docker (recommended for API + DB):
  - `docker-compose up -d` brings up MongoDB and the API. You can add the frontend if you extend the compose.
- Without Docker:
  - API: `cd InmobilaryApi/InmobilaryApi` and `dotnet run` (requires .NET 8 and a local MongoDB).
  - Frontend: `cd inmobilary-frontend` and `pnpm dev` or `npm run dev` (requires Node 18+).

Check the specific READMEs for environment variables, scripts, and more details.

## Testing

### Frontend Testing (inmobilary-frontend)
The frontend includes comprehensive unit testing with Jest 30 and React Testing Library:

#### Test Coverage
- **27 test suites** covering all major components and functionality
- **96 individual tests** with 100% pass rate
- **95.65% statement coverage** with detailed coverage reports
- **Complete test structure** including components, hooks, contexts, API services, and utilities

#### Test Categories
- **Component Tests**: UI components, pages, and layouts
- **Hook Tests**: Custom React hooks (`useHome`, `useProperty`)
- **Context Tests**: React Context providers and consumers
- **API Service Tests**: Axios-based service layer testing
- **Utility Tests**: Helper functions and utilities

#### Key Features
- **Mocking Strategy**: Comprehensive mocks for external libraries (Embla Carousel, Axios)
- **Module Aliases**: All `@/` paths properly configured for Jest
- **Coverage Reports**: Detailed HTML and LCOV reports in `coverage/` directory
- **Test Utilities**: Custom render functions and mock data helpers

#### Running Frontend Tests
```bash
cd inmobilary-frontend

# Run all tests
pnpm test

# Run with coverage
pnpm test --coverage

# Run specific test patterns
pnpm test -- --testPathPattern="hooks|components"
```

### Backend Testing (InmobilaryApi)
- **Current Status**: Placeholder structure in `InmobilaryApi/tests/`
- **Planned**: Unit tests for controllers, services, and repositories
- **Integration Tests**: API endpoint testing with test database
- **Test Database**: Separate MongoDB instance for testing

#### Backend Test Structure (Planned)
```
InmobilaryApi/tests/
├── Unit/
│   ├── Controllers/        # Controller unit tests
│   ├── Services/          # Business logic tests
│   └── Repositories/      # Data access tests
├── Integration/
│   ├── API/              # Endpoint integration tests
│   └── Database/         # Database integration tests
└── TestData/             # Test fixtures and seed data
```

### Test Configuration

#### Frontend (Jest)
- **Environment**: `jsdom` for browser simulation
- **Coverage**: Enabled with detailed reporting
- **Module Mapping**: All `@/` aliases configured
- **Mocking**: External libraries properly mocked

#### Backend (Planned - xUnit)
- **Framework**: xUnit for .NET testing
- **Database**: In-memory or test MongoDB instance
- **Mocking**: Moq for dependency injection
- **Coverage**: Coverlet for code coverage

### Continuous Integration
Both frontend and backend tests are designed to run in CI/CD pipelines:

```yaml
# Example CI configuration
test-frontend:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
    - run: cd inmobilary-frontend && pnpm install && pnpm test

test-backend:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-dotnet@v3
    - run: cd InmobilaryApi && dotnet test
```

### Test Best Practices

1. **Frontend**:
   - Use React Testing Library for user-centric testing
   - Mock external dependencies (APIs, libraries)
   - Test user interactions and component behavior
   - Maintain high coverage while focusing on meaningful tests

2. **Backend** (Planned):
   - Unit test business logic in isolation
   - Integration test API endpoints
   - Use test database for data-dependent tests
   - Mock external services and dependencies

3. **General**:
   - Write descriptive test names
   - Follow Arrange-Act-Assert pattern
   - Keep tests independent and isolated
   - Regular test maintenance and updates

## Deployment (overview)

- **Frontend**: Static/SSR build (`next build`) and deploy on your preferred platform.
- **API**: Docker image or deploy to a .NET hosting platform. Configure `appsettings.Production.json` and secrets.
- **Database**: Managed MongoDB (Atlas or on‑prem). Adjust `mongo-init.js` if you need seed data.

## Project READMEs

- Frontend: see `inmobilary-frontend/README.md` for commands, conventions, component structure, and variables.
- API: see `InmobilaryApi/README.md` for endpoints, DTOs, repository/service patterns, and MongoDB configuration.

If you need a more detailed guide for any area, open an issue or review the READMEs inside each project.

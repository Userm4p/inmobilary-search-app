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

- Frontend: Jest/RTL (`inmobilary-frontend` includes `__tests__` and coverage setup).
- API: Placeholder in `InmobilaryApi/tests` for application/integration tests.

## Deployment (overview)

- **Frontend**: Static/SSR build (`next build`) and deploy on your preferred platform.
- **API**: Docker image or deploy to a .NET hosting platform. Configure `appsettings.Production.json` and secrets.
- **Database**: Managed MongoDB (Atlas or on‑prem). Adjust `mongo-init.js` if you need seed data.

## Project READMEs

- Frontend: see `inmobilary-frontend/README.md` for commands, conventions, component structure, and variables.
- API: see `InmobilaryApi/README.md` for endpoints, DTOs, repository/service patterns, and MongoDB configuration.

If you need a more detailed guide for any area, open an issue or review the READMEs inside each project.

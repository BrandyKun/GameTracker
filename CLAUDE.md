# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Backend (.NET)
```bash
# Run the full app (starts both .NET and React SPA proxy)
dotnet run --project src/WebUI/WebUI.csproj

# Build the solution
dotnet build game.sln

# EF Core migrations (run from repo root)
dotnet ef migrations add <MigrationName> --project src/Infrastructure --startup-project src/WebUI
dotnet ef database update --project src/Infrastructure --startup-project src/WebUI
```

### Frontend (React)
```bash
cd src/WebUI/ClientApp

npm start        # dev server on https://localhost:44469
npm run build    # production build
npm test         # run tests (CI mode)
npm run lint     # ESLint
```

## Architecture

Clean Architecture with four layers:

| Layer | Project | Purpose |
|---|---|---|
| Domain | `src/Domain` | Entities, base classes, domain events |
| Application | `src/Application` | Interfaces (contracts), DTOs |
| Infrastructure | `src/Infrastructure` | EF Core `ApplicationDbContext`, `TokenService` |
| WebUI | `src/WebUI` | ASP.NET Core controllers, AutoMapper profiles, React SPA |

Dependency direction: WebUI → Infrastructure → Application → Domain (Domain has no outward deps).

### Backend key points

- **IGDB integration**: `GameController` directly instantiates `IGDBClient` using `IGDB_CLIENT_ID` / `IGDB_CLIENT_SECRET` from config. All game data (games, platforms, screenshots, characters, search) comes from the IGDB API — there is no local game data store.
- **Auth**: ASP.NET Identity + JWT Bearer. `TokenService` (Infrastructure) creates 7-day tokens signed with `Token:Key`. The key is in user secrets / `appsettings.Development.json`, not in `appsettings.json`.
- **Database**: SQL Server via EF Core. Only `Collection` and `CollectionGame` are persisted locally. Identity tables are standard ASP.NET Identity.
- **OpenAPI**: NSwag serves Swagger UI at `/api`.
- **SPA proxy**: In development, .NET runs on `https://localhost:7156` and the React dev server on `https://localhost:44469`. The `package.json` proxy points to `https://localhost:7156`.

### Frontend key points

- React 18, React Router v6, Bootstrap 5 + Reactstrap, Framer Motion for animations.
- `GameContext` (in `src/context/GameContext.js`) is the global state store — holds search results, platform/genre filters, modal state, and screenshots.
- All API calls go through `src/components/Service.js` (Axios) to the .NET backend.
- Routes are declared in `AppRoutes.js` and rendered via `App.js`.

## Configuration / Secrets

Sensitive values are stored in .NET user secrets (not committed). Set them with:

```bash
dotnet user-secrets set "IGDB_CLIENT_ID" "<value>" --project src/WebUI
dotnet user-secrets set "IGDB_CLIENT_SECRET" "<value>" --project src/WebUI
dotnet user-secrets set "Token:Key" "<value>" --project src/WebUI
dotnet user-secrets set "Token:Issuer" "https://localhost:7156" --project src/WebUI
```

The SQL Server connection string lives in `appsettings.json` → `ConnectionStrings:DefaultConnection`.

## Namespace conventions

- Domain/Infrastructure entities use the `Gaming.*` namespace prefix (e.g. `Gaming.Domain.Entities`, `Gaming.Infrastructure`).
- Application and WebUI layers drop the `Gaming.` prefix (e.g. `Application.Interfaces`, `WebUI.Controllers`).

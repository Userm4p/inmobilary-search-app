# Etapa 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copiar csproj primero (para cache eficiente)
COPY Inmobilary.sln ./
COPY src/InmobilaryApi/InmobilaryApi.csproj src/InmobilaryApi/
COPY src/Inmobilary.Application/Inmobilary.Application.csproj src/Inmobilary.Application/
COPY src/Inmobilary.Domain/Inmobilary.Domain.csproj src/Inmobilary.Domain/
COPY src/Inmobilary.Infrastructure/Inmobilary.Infrastructure.csproj src/Inmobilary.Infrastructure/

# Restaurar dependencias
RUN dotnet restore Inmobilary.sln

# Copiar el resto del código
COPY . .

# ✅ Publicar explícitamente el proyecto de la API
RUN dotnet publish src/InmobilaryApi/InmobilaryApi.csproj -c Release -o /app

# Etapa 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "InmobilaryApi.dll"]

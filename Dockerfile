FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src


COPY api/ ./api/
WORKDIR /src/api


RUN dotnet restore
RUN dotnet publish -c Release -o /app/publish


FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:10000
EXPOSE 10000


ENTRYPOINT ["dotnet", "api.dll"]

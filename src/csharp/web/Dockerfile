FROM mcr.microsoft.com/dotnet/core/aspnet:2.1
WORKDIR /app
COPY /bin/Debug/netcoreapp2.1/publish/. /app
EXPOSE 5000
CMD ["dotnet", "web.dll"]

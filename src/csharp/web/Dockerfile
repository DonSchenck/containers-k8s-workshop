FROM registry.centos.org/dotnet/dotnet-21-runtime-centos7:latest
WORKDIR /app
COPY /bin/Debug/netcoreapp2.1/centos.7-x64/publish/. /app
EXPOSE 5000
CMD ["dotnet", "web.dll"]
using Microsoft.Extensions.Configuration;
using System;

namespace Common
{
    public static class Configuration
    {
        public static IConfigurationRoot _configuration;

        public static void Build(string pathJsonFile)
        {
            var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            var builder = new ConfigurationBuilder()
                .SetBasePath(pathJsonFile)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: false)
                .AddJsonFile($"appsettings.{environment}.json", optional: true, reloadOnChange: false)
                .AddJsonFile("secrets/appsettings.secrets.json", optional: true, reloadOnChange: false)
                .AddEnvironmentVariables();

            _configuration = builder.Build();
        }

        public static IConfiguration GetConfiguration()
        {
            return _configuration;
        }
        public static string ConnectionString => _configuration.GetConnectionString("ConnectionString");

        public static string ClientControlApiUrl => _configuration.GetSection("ApplicationUrls")["ClientControlApi"];
    }
}

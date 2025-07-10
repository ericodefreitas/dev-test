using Application.Common.Interfaces;
using Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace Persistence
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddPersistence(this IServiceCollection services)
        {
            services.AddDbContext<ClientControlContext>(options =>
            {
                options.UseMySql(Configuration.ConnectionString, new MySqlServerVersion(new Version(8, 0, 0)),
                    mySqlOptionsAction: sqlOptions =>
                    {
                        sqlOptions.EnableRetryOnFailure(
                            maxRetryCount: 5,
                            maxRetryDelay: TimeSpan.FromSeconds(10),
                            errorNumbersToAdd: null);
                    });
            },
                ServiceLifetime.Scoped
            );

            services.AddScoped<IClientControlContext, ClientControlContext>();

            return services;
        }
    }
}

using movies_app.Data;
using movies_app.EndPoints;
using movies_app.Repository;
using movies_app.DataContext;
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Builder;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<ICinemaRepository, CinemaRepository>();
builder.Services.AddDbContext<CinemaContext>();

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "Movies_Api",
        Description = "Movies_Api",
        Contact = new OpenApiContact
        {
            Name = "Ntina_B",
        }
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();

app.UseCors(x => x
   .AllowAnyMethod()
   .AllowAnyHeader()
   .SetIsOriginAllowed(origin => true)
   .AllowCredentials());

app.MapControllers();

app.ConfigureMoviesApi();
app.ConfigureTicketsApi();
app.ConfigureScreeningsApi();
 
app.Initialize();

app.Run();
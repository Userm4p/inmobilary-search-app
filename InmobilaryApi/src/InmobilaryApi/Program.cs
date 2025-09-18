using Infrastructure.Database;
using Infrastructure.Repositories;
using Application.Interfaces;

var builder = WebApplication.CreateBuilder(args);

var mongoSettings = builder.Configuration.GetSection("MongoSettings");
string connectionString = mongoSettings.GetValue<string>("ConnectionString");
string databaseName = mongoSettings.GetValue<string>("DatabaseName");

if (string.IsNullOrEmpty(connectionString))
    throw new Exception("MongoDB connection string is not configured.");

builder.Services.AddSingleton(sp => new MongoDbContext(connectionString, databaseName));

builder.Services.AddScoped<IPropertyService, PropertyRepository>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();

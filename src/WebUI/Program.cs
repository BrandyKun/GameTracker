using Domain.Entities.Identity;
using Gaming.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Infrastructure.Services;
using Application.Interfaces;
using Gaming.Domain.Entities.Appsettings;

var builder = WebApplication.CreateBuilder(args);

var sentrySettings = builder.Configuration.GetSection("Sentry");
builder.Services.Configure<SentrySettings>(sentrySettings);
// Add services to the container.

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddControllersWithViews(options => options.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes = true).AddNewtonsoftJson();
// builder.Services.
builder.Services.AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>().AddSignInManager<SignInManager<User>>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(opt =>//what we want to do to validate this token
        {
            opt.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF7.GetBytes(builder.Configuration["Token:Key"])),
                ValidIssuer = builder.Configuration["Token:Issuer"],
                ValidateIssuer = true,
                ValidateAudience = false
            };
        });
builder.WebHost.UseSentry(o =>
{
    o.Dsn = sentrySettings.;
    // When configuring for the first time, to see what the SDK is doing:
    o.Debug = true;
    // Set TracesSampleRate to 1.0 to capture 100%
    // of transactions for tracing.
    // We recommend adjusting this value in production
    o.TracesSampleRate = 1.0;
    o.MaxBreadcrumbs = 50;
});
// builder.Services.AddCors( op => {
//     op.AddPolicy(name: "NextPolicy", 
//     policy => {
//         policy.WithOrigins("https://localhost:44469")
//                 .AllowAnyHeader()
//                 .AllowAnyOrigin();
//     });
// });

builder.Services.AddAutoMapper(typeof(Program));

builder.Services.AddAuthorization();

builder.Services.AddSwaggerDocument();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseOpenApi();
app.UseSwaggerUi(settings =>
{
    settings.Path = "/api";
});
app.UseRouting();

// app.UseCors("NextPolicy");

//defines what type of auth we want to use
app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

SentrySdk.CaptureMessage("Hello Sentry");

app.Run();
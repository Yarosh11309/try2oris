using Microsoft.Extensions.FileProviders;
using Microsoft.EntityFrameworkCore;
using sem_2_k_2.Models;
using System.IO;

namespace sem_2_k_2
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllersWithViews();
            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

            var app = builder.Build();

            using (var scope = app.Services.CreateScope())
            {
                var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                db.Database.EnsureCreated();
                if (!db.Products.Any())
                {
                    db.Products.AddRange(
                        new Product { Name = "Baseball Cap", Price = 50, ImageUrl = "assets/img/product/1.png" },
                        new Product { Name = "Baseball Cap", Price = 50, ImageUrl = "assets/img/product/2.png" }
                    );
                }
                if (!db.Tournaments.Any())
                {
                    db.Tournaments.AddRange(
                        new Tournament { Name = "Escape Room", Prize = "$35000", ImageUrl = "assets/img/tournament/7.png" },
                        new Tournament { Name = "Escape Room", Prize = "$35000", ImageUrl = "assets/img/tournament/8.png" }
                    );
                }
                db.SaveChanges();
            }

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(builder.Environment.ContentRootPath, "Views", "Home")),
                RequestPath = ""
            });

            app.UseRouting();

            app.UseAuthorization();

            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");

            app.Run();
        }
    }
}

using Microsoft.EntityFrameworkCore;
using movies_app.Models.UserModel;
using movies_app.Models.MovieModel;
using movies_app.Models.TicketModel;
using movies_app.Models.ScreeningModel;

namespace movies_app.DataContext
{
    public class CinemaContext : DbContext
    {
        private string connectionString;

        public CinemaContext()
        {
            var configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
            connectionString = configuration.GetValue<string>("ConnectionStrings:DefaultConnectionString");
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(connectionString);
        }

        public DbSet<Screening> Screenings { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
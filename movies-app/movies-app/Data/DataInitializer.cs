using movies_app.DataContext;
using movies_app.Models.UserModel;
using movies_app.Models.MovieModel;
using movies_app.Models.TicketModel;
using Microsoft.EntityFrameworkCore;
using movies_app.Models.ScreeningModel;
using Newtonsoft.Json;

namespace movies_app.Data
{
    public static class DataInitializer
    {
        public static void Initialize(this WebApplication app)
        {
            using (var db = new CinemaContext())
            {
                var movies = GetMoviesFromFrontend();

                foreach (var movie in movies)
                {
                    db.Movies.Add(movie);
                    db.SaveChanges();

                    for (int i = 1; i <= 7; i++)
                    {
                        var screening = new Screening
                        {
                            MovieId = movie.Id,
                            // Set other screening details, e.g., Showtime
                        };
                        db.Screenings.Add(screening);

                        for (int j = 1; j <= 100; j++)
                        {
                            var ticket = new Ticket
                            {
                                ScreeningId = screening.Id,
                                // Set other ticket details
                            };
                            db.Tickets.Add(ticket);
                        }
                    }
                }
                db.SaveChanges();
            }
        }

        private static List<Movie> GetMoviesFromFrontend()
        {
            using (var client = new HttpClient())
            {
                var frontendApiUrl = "http://localhost:3000";

                var response = client.GetAsync(frontendApiUrl).Result;

                if (response.IsSuccessStatusCode)
                {
                    var moviesJson = response.Content.ReadAsStringAsync().Result;
                    var movies = JsonConvert.DeserializeObject<List<Movie>>(moviesJson);

                    return movies;
                }
                else
                {
                    throw new Exception("Failed to fetch movies from the frontend API.");
                }
            }
        }
    }
}

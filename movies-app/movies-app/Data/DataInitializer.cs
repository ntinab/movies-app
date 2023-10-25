using movies_app.DataContext;
using Microsoft.EntityFrameworkCore;
using movies_app.Models.UserModel;
using movies_app.Models.MovieModel;
using movies_app.Models.TicketModel;
using movies_app.Models.ScreeningModel;

namespace movies_app.Data
{
    public static class DataInitializer
    {
        private static readonly Random Random = new Random();

        public static void Initialize(this WebApplication app)
        {
            using (var db = new CinemaContext())
            {
                var users = new List<User>();
                var movies = new List<Movie>();
                var tickets = new List<Ticket>();
                var screenings = new List<Screening>();

                if (!db.Movies.Any())
                {
                    for (int x = 1; x <= movies.Count; x++)
                    {
                        Movie movie = new Movie();

                        movie.Id = x;
                        // movie.Title = ;
                        // movie.Runtime = ;
                        // movie.Genres = ;
                        // movie.Overview = ;
                        // movie.ReleaseDate = ;

                        movies.Add(movie);
                    }
                    db.Movies.AddRange(movies);
                }

                if (!db.Users.Any())
                {
                    for (int x = 1; x <= users.Count; x++)
                    {
                        User user = new User();

                        user.Id = x;
                        // user.UserUID = ;
                        // user.Identifier = ;

                        users.Add(user);
                    }
                    db.Users.AddRange(users);
                }

                if (!db.Screenings.Any())
                {
                    int screeningId = 1;

                    foreach (var movie in movies)
                    {
                        for (int x = 1; x <= Random.Next(5, 10); x++)
                        {
                            Screening screening = new Screening();

                            screening.Id = screeningId++;
                            screening.MovieId = movie.Id;
                            // screening.Date = ;
                            screening.IsAvailable = true;
                            screening.AvailableTickets = 117; 

                            screenings.Add(screening);
                        }
                    }
                    db.Screenings.AddRange(screenings);
                }

                if (!db.Tickets.Any())
                {
                    int ticketId = 1;

                    foreach (var screening in screenings)
                    {
                        foreach (var user in users)
                        {
                            Ticket ticket = new Ticket();

                            ticket.Id = ticketId++;
                            ticket.Price = 7;
                            ticket.Seat = ticket.Id;
                            ticket.IsBooked = false;
                            ticket.UserId = user.Id;
                            ticket.ScreeningId = screening.Id;
                            ticket.BookedDate = screening.Date;

                            tickets.Add(ticket);
                        }
                    }
                    db.Tickets.AddRange(tickets);
                }
                db.SaveChanges();
            }
        }

        //public void CreateScreeningsAndTicketsForMovie(int movieId, int numberOfScreenings, int ticketsPerScreening)
        //{
        //    for (int i = 0; i < numberOfScreenings; i++)
        //    {
        //        var screening = new Screening
        //        {
        //            MovieID = movieId,
        //            // Set other screening properties like time and location
        //        };
        //        _context.Screenings.Add(screening);

        //        for (int j = 1; j <= ticketsPerScreening; j++)
        //        {
        //            var ticket = new Ticket
        //            {
        //                ScreeningID = screening.ScreeningID,
        //                // Set other ticket properties like user, seat number, and booking status
        //            };
        //            _context.Tickets.Add(ticket);
        //        }
        //    }

        //    _context.SaveChanges();
        //}
    }
}

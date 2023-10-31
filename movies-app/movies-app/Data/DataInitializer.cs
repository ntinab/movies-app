//using Newtonsoft.Json;
//using movies_app.DataContext;
//using movies_app.Models.UserModel;
//using movies_app.Models.MovieModel;
//using movies_app.Models.TicketModel;
//using Microsoft.EntityFrameworkCore;
//using movies_app.Models.ScreeningModel;
//using System.Runtime.CompilerServices;
//using static System.Runtime.InteropServices.JavaScript.JSType;

//namespace movies_app.Data
//{
//    public class DataInitializer
//    {
//        public void Initialize(this WebApplication app)
//        {
//            using (var db = new CinemaContext())
//            {
//                var screenings = new List<Screening>();
//                var tickets = new List<Ticket>();

//                DateTime initialDate = DateTime.Today.AddHours(21);

//                foreach (var movie in movies)
//                {
//                    db.Movies.Add(movie);

//                    for (int i = 1; i <= 7; i++)
//                    {
//                        var screening = new Screening
//                        {
//                            MovieId = movie.id,
//                            Date = initialDate,
//                            IsAvailable = true,
//                            AvailableTickets = 100
//                        };
//                        db.Screenings.Add(screening);

//                        for (int j = 1; j <= 100; j++)
//                        {
//                            var ticket = new Ticket
//                            {
//                                ScreeningId = screening.Id,
//                                Seat = j,
//                                Price = 11,
//                                IsBooked = false,
//                                BookedDate = initialDate
//                            };
//                            db.Tickets.Add(ticket);
//                        }
//                    }
//                }
//                db.SaveChanges();
//            }
//        }
//    }
//}
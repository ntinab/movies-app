using movies_app.Models.MovieModel;
using movies_app.Models.TicketModel;
using movies_app.Models.ScreeningModel;

namespace movies_app.Repository
{
    public interface ICinemaRepository
    {
        IEnumerable<Movie> GetAllMovies();
        Movie GetMovie(int id);
        bool AddMovie(Movie movie);
        bool UpdateMovie(Movie movie);
        bool DeleteMovie(int id);


        IEnumerable<Screening> GetAllScreenings();
        Screening GetScreening(int id);
        bool AddScreening(Screening screening);
        bool UpdateScreening(Screening screening);
        bool DeleteScreening(int id);


        IEnumerable<Ticket> GetAllTickets();
        Ticket GetTicket(int id);
        bool BookTicket(Ticket ticket);
        bool UpdateTicket(Ticket ticket);
        bool DeleteTicket(int id);
    }
}
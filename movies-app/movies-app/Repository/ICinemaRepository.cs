using movies_app.Models.TicketModel;
using movies_app.Models.ScreeningModel;

namespace movies_app.Repository
{
    public interface ICinemaRepository
    {
        IEnumerable<Screening> GetAllScreenings();
        Screening GetScreening(int id);
        bool AddScreening(Screening screening);
        bool UpdateScreening(Screening screening);
        bool DeleteScreening(int id);
        // bool AddAvailableTickets(int screeningId, int count);

        IEnumerable<Ticket> GetAllTickets();
        Ticket GetTicket(int id);
        bool BookTicket(Ticket ticket);
        bool UpdateTicket(Ticket ticket);
        bool DeleteTicket(int id);
    }
}
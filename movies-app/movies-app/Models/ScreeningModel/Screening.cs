using movies_app.Models.TicketModel;
using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations.Schema;

namespace movies_app.Models.ScreeningModel
{
    public class Screening
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public bool IsAvailable { get; set; }
        public int AvailableTickets { get; set; }
        public IEnumerable<Ticket> Tickets { get; set; }

        [JsonIgnore]
        // [ForeignKey("Movie")]
        public int MovieId { get; set; }
    }
}
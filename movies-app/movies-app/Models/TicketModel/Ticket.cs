using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations.Schema;

namespace movies_app.Models.TicketModel
{
    public class Ticket
    {
        public int Id { get; set; }
        public int Seat { get; set; }
        public int Price { get; set; }
        public bool IsBooked { get; set; }
        public DateTime BookedDate { get; set; }

        [JsonIgnore]
        // [ForeignKey("User")]
        public string UserUID { get; set; }

        [JsonIgnore]
        //[ForeignKey("Movie")]
        public int MovieId { get; set; }

        [JsonIgnore]
        [ForeignKey("Screening")]
        public int ScreeningId { get; set; }      
    }
}

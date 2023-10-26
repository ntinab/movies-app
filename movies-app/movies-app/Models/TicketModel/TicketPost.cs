using Microsoft.Extensions.Configuration.UserSecrets;

namespace movies_app.Models.TicketModel
{
    public class TicketPost
    {
        public string UserUID { get; set; }
        public int MovieId { get; set; }
        public int ScreeningId { get; set; }
    }
}
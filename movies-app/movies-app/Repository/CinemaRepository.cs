using movies_app.DataContext;
using Microsoft.EntityFrameworkCore;
using movies_app.Models.TicketModel;
using movies_app.Models.ScreeningModel;

namespace movies_app.Repository
{
    public class CinemaRepository : ICinemaRepository
    {
        public IEnumerable<Screening> GetAllScreenings()
        {
            try
            {
                using (var db = new CinemaContext())
                {
                    return db.Screenings.ToList();
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public Screening GetScreening(int id)
        {
            using (var db = new CinemaContext())
            {
                Screening result = db.Screenings.FirstOrDefault(s => s.Id == id);
                return result;
            }
        }

        public bool AddScreening(Screening screening)
        {
            try
            {
                using (var db = new CinemaContext())
                {
                    db.Screenings.Add(screening);
                    int affectedRows = db.SaveChanges();
                    return affectedRows > 0;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool UpdateScreening(Screening screening)
        {
            try
            {
                using (var db = new CinemaContext())
                {
                    db.Screenings.Update(screening);
                    int affectedRows = db.SaveChanges();
                    return affectedRows > 0;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool DeleteScreening(int id)
        {
            try
            {
                using (var db = new CinemaContext())
                {
                    var screeningToDelete = db.Screenings.FirstOrDefault(s => s.Id == id);
                    if (screeningToDelete != null)
                    {
                        db.Screenings.Remove(screeningToDelete);
                        int affectedRows = db.SaveChanges();
                        if (affectedRows > 0)
                        {
                            return true;
                        }
                    }
                    return false;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }


        public IEnumerable<Ticket> GetAllTickets()
        {
            try
            {
                using (var db = new CinemaContext())
                {
                    return db.Tickets.ToList();
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public Ticket GetTicket(int id)
        {
            using (var db = new CinemaContext())
            {
                Ticket result = db.Tickets.FirstOrDefault(t => t.Id == id);
                return result;
            }
        }

        public bool BookTicket(Ticket ticket)
        {
            try
            {
                using (var db = new CinemaContext())
                {
                    db.Tickets.Add(ticket);
                    int affectedRows = db.SaveChanges();
                    return affectedRows > 0;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool UpdateTicket(Ticket ticket)
        {
            try
            {
                using (var db = new CinemaContext())
                {
                    db.Tickets.Update(ticket);
                    int affectedRows = db.SaveChanges();
                    return affectedRows > 0;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool DeleteTicket(int id)
        {
            try
            {
                using (var db = new CinemaContext())
                {
                    var ticketToDelete = db.Tickets.FirstOrDefault(t => t.Id == id);
                    if (ticketToDelete != null)
                    {
                        db.Tickets.Remove(ticketToDelete);
                        int affectedRows = db.SaveChanges();
                        if (affectedRows > 0)
                        {
                            return true;
                        }
                    }
                    return false;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        //public bool AddAvailableTickets(int screeningId, int count)
        //{
        //    try
        //    {
        //        using (var db = new CinemaContext())
        //        {
        //            var screening = db.Screenings.FirstOrDefault(s => s.Id == screeningId);

        //            if (screening != null)
        //            {
        //                screening.AvailableTickets += count;
        //                db.SaveChanges();
        //                return true;
        //            }

        //            return false;
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return false;
        //    }
        //}
    }
}
using movies_app.Models;
using movies_app.Repository;
using Microsoft.AspNetCore.Mvc;
using movies_app.Models.TicketModel;

namespace movies_app.EndPoints
{
    public static class TicketsApi
    {
        public static void ConfigureTicketsApi(this WebApplication app)
        {
            app.MapPost("screenings/{screeningId}/tickets", BookTicket);
            app.MapGet("screenings/{screeningId}/tickets", GetTickets);
            app.MapGet("screenings/{screeningId}/tickets/{ticketId}", GetTicket);
            app.MapPut("screenings/{screeningId}/tickets/{ticketId}", UpdateTicket);
            app.MapDelete("screenings/{screeningId}/tickets/{ticketId}", DeleteTicket);

            //  app.MapPost("/customers/{customerId}/screenings/{screeningId}", BookTicket);
        }


        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        private static async Task<IResult> BookTicket(Ticket ticket, ICinemaRepository service)
        {
            try
            {
                if (service.BookTicket(ticket))
                {
                    return Results.Created($"/tickets/{ticket.Id}", new
                    {
                        Message = "The Ticket with ID {ticket.Id} was added successfully!",
                        Ticket = ticket
                    });
                }
                return Results.BadRequest("The Ticket could not be added. Please check that all required fields are correct!");
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        //    [ProducesResponseType(StatusCodes.Status201Created)]
        //    [ProducesResponseType(StatusCodes.Status400BadRequest)]
        //    private static async Task<IResult> BookTicket(int userId, int screeningId, Ticket ticket, ICinemaRepository service)
        //    {
        //        try
        //        {
        //            return await Task.Run(() =>
        //            {
        //                Ticket ticket = new Ticket()
        //                {
        //                    UserId = userId,
        //                    ScreeningId = screeningId,
        //                    Seat = ticket.Seat,
        //                };

        //                service.BookTicket(ticket);

        //                Payload<Ticket> payload = new Payload<Ticket>()
        //                {
        //                    data = ticket
        //                };

        //                return Results.Created($"/customers/{userId}/screenings/{screeningId}", payload);
        //            });
        //        }
        //        catch (Exception ex)
        //        {
        //            return Results.Problem(ex.Message);
        //        }
        //    }

        [ProducesResponseType(StatusCodes.Status200OK)]
        private static async Task<IResult> GetTickets(ICinemaRepository service)
        {
            try
            {
                return await Task.Run(() =>
                {
                    return Results.Ok(service.GetAllTickets());
                });
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        //    [ProducesResponseType(StatusCodes.Status200OK)]
        //    private static async Task<IResult> GetTickets(int userId, int screeningId, ICinemaRepository service)
        //    {
        //        try
        //        {
        //            return await Task.Run(() =>
        //            {
        //                Payload<IEnumerable<Ticket>> payload = new Payload<IEnumerable<Ticket>>()
        //                {
        //                    data = service.GetAllTickets().Where(t => t.UserId == userId && t.ScreeningId == screeningId).ToList()
        //                };

        //                return Results.Ok(payload);
        //            });
        //        }
        //        catch (Exception ex)
        //        {
        //            return Results.Problem(ex.Message);
        //        }
        //    }
        //}

        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        private static async Task<IResult> GetTicket(int id, ICinemaRepository service)
        {
            try
            {
                return await Task.Run(() =>
                {
                    var ticket = service.GetTicket(id);
                    if (ticket == null) return Results.NotFound($"No Ticket with ID {id} was found!");
                    return Results.Ok(ticket);
                });
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        private static async Task<IResult> UpdateTicket(Ticket ticket, ICinemaRepository service)
        {
            try
            {
                return await Task.Run(() =>
                {
                    if (service.UpdateTicket(ticket))
                    {
                        return Results.Ok(new
                        {
                            Message = "The Ticket with ID {ticket.Id} was updated successfully!",
                            Ticket = ticket
                        });
                    }
                    return Results.NotFound($"No Ticket with ID {ticket.Id} was found!");
                });
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        private static async Task<IResult> DeleteTicket(int id, ICinemaRepository service)
        {
            try
            {
                if (service.DeleteTicket(id)) return Results.Ok($"The Ticket with ID {id} was deleted successfully!");
                return Results.NotFound($"No Ticket with ID {id} was found!");
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }
    }
}

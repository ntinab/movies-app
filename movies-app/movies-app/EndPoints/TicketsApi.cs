using movies_app.Repository;
using Microsoft.AspNetCore.Mvc;
using movies_app.Models.UserModel;
using movies_app.Models.MovieModel;
using movies_app.Models.TicketModel;
using movies_app.Models.ScreeningModel;
using Microsoft.AspNetCore.Builder;

namespace movies_app.EndPoints
{
    public static class TicketsApi
    {
        public static void ConfigureTicketsApi(this WebApplication app)
        {
            app.MapGet("/tickets", GetUserTickets);
            app.MapGet("/movies/{id}/tickets", GetMovieTickets);
            app.MapPost("screenings/{screeningId}/tickets", BookTicket);
            app.MapGet("screenings/{screeningId}/tickets", GetScreeningTickets);
            app.MapGet("screenings/{screeningId}/tickets/{ticketId}", GetTicket);
            app.MapPut("screenings/{screeningId}/tickets/{ticketId}", UpdateTicket);
            app.MapDelete("screenings/{screeningId}/tickets/{ticketId}", DeleteTicket);
        }

        //[ProducesResponseType(StatusCodes.Status201Created)]
        //[ProducesResponseType(StatusCodes.Status400BadRequest)]
        //private static async Task<IResult> BookTicket(Ticket ticket, ICinemaRepository service)
        //{
        //    try
        //    {
        //        if (service.BookTicket(ticket))
        //        {
        //            return Results.Created($"/tickets/{ticket.Id}", new
        //            {
        //                Message = "The Ticket with ID {ticket.Id} was added successfully!",
        //                Ticket = ticket
        //            });
        //        }
        //        return Results.BadRequest("The Ticket could not be added!");
        //    }
        //    catch (Exception ex)
        //    {
        //        return Results.Problem(ex.Message);
        //    }
        //}

        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        private static async Task<IResult> BookTicket(TicketPost model, ICinemaRepository service)
        {
            try
            {
                return await Task.Run(() =>
                {
                    Ticket ticket = new Ticket()
                    {
                        // UserUID = model.UserUID,
                        // MovieId = model.MovieId,
                        ScreeningId = model.ScreeningId,
                        // Seat = 1,
                        // Price = 7,
                        // IsBooked = true,
                        // BookedDate = ticket.BookedDate
                    };

                    service.BookTicket(ticket);

                    return Results.Created($"/tickets/{ticket.Id}", new
                    {
                        Message = "The Ticket with ID {ticket.Id} was added successfully!",
                        Ticket = ticket
                    });
                });
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        //[ProducesResponseType(StatusCodes.Status201Created)]
        //[ProducesResponseType(StatusCodes.Status400BadRequest)]
        //    private static async Task<IResult> BookTicket(int screeningId, Ticket ticket, ICinemaRepository service)
        //    {
        //        try
        //        {
        //            return await Task.Run(() =>
        //            {
        //                Ticket ticket = new Ticket()
        //                {
        //                    ScreeningId = screeningId,
        //                    Seat = ticket.Seat,
        //
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
        private static async Task<IResult> GetUserTickets(ICinemaRepository service)
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

        [ProducesResponseType(StatusCodes.Status200OK)]
        private static async Task<IResult> GetMovieTickets(int id, ICinemaRepository service)
        {
            try
            {
                return await Task.Run(() =>
                {
                    return Results.Ok(service.GetAllTickets().Where(t => t.MovieId == id).ToList());
                });
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        [ProducesResponseType(StatusCodes.Status200OK)]
        private static async Task<IResult> GetScreeningTickets(int screeningId, ICinemaRepository service)
        {
            try
            {
                return await Task.Run(() =>
                {
                    return Results.Ok(service.GetAllTickets().Where(t => t.ScreeningId == screeningId).ToList());
                });
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

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
                return await Task.Run(() =>
                {
                    var ticket = service.GetTicket(id);

                    //var screeningToDelete = service.GetAllScreenings().Where(s => s.MovieId == id).ToList();

                    //screeningToDelete.ForEach(x =>
                    //{
                    //    service.DeleteMovie(x.Id);
                    //});

                    if (service.DeleteTicket(id)) return Results.Ok($"The Ticket with ID {id} was deleted successfully!");
                    return Results.NotFound($"No Ticket with ID {id} was found!");
                });
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }
    }
}

﻿using movies_app.Repository;
using Microsoft.AspNetCore.Mvc;
using movies_app.Models.UserModel;
using movies_app.Models.TicketModel;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using movies_app.Models.ScreeningModel;

namespace movies_app.EndPoints
{
    public static class TicketsApi
    {
        public static void ConfigureTicketsApi(this WebApplication app)
        {
            app.MapGet("/tickets", GetUserTickets);
            //app.MapGet("/movies/{id}/tickets", GetMovieTickets);
            app.MapPost("screenings/{screeningId}/tickets", BookTicket);
            app.MapGet("screenings/{screeningId}/tickets", GetScreeningTickets);
            app.MapGet("screenings/{screeningId}/tickets/{ticketId}", GetTicket);
            app.MapPut("screenings/{screeningId}/tickets/{ticketId}", UpdateTicket);
            app.MapDelete("screenings/{screeningId}/tickets/{ticketId}", DeleteTicket);
        }

        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        private static async Task<IResult> BookTicket(int screeningId, ICinemaRepository service)
        {
            try
            {
                var screening = service.GetScreening(screeningId);
                var ticket = new Ticket();
                ticket.ScreeningId = screeningId;
                int countTickets = service.GetAllTickets().Where(t => t.ScreeningId == screeningId).ToList().Count;
                ticket.Seat = countTickets + 1;
                ticket.Price = 11;
                ticket.IsBooked = true;
                ticket.BookedDate = screening.Date;
                service.BookTicket(ticket);

                return Results.Created($"/screenings/{screeningId}/tickets/{ticket.Id}", new
                {
                    Message = "The Ticket was booked successfully!",
                    Ticket = ticket
                });

            //    if (screening != null && screening.AvailableTickets > 0)
            //    {
            //    ticket.IsBooked = true;

            //        if (screening.AvailableTickets > 0)
            //        {
            //            screening.AvailableTickets--;

            //            if (service.UpdateScreening(screening))
            //        {
            //            if (service.BookTicket(ticket))
            //                {
            //                    return Results.Created($"/screenings/{screeningId}/tickets/{ticket.Id}", new
            //                    {
            //                        Message ="The Ticket was booked successfully!",
            //                        Ticket = ticket
            //                    });
            //                }
            //            }
            //        }
            //    }
            //    return Results.BadRequest("The Ticket could not be booked!");

            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

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
        //private static async Task<IResult> GetMovieTickets(int id, ICinemaRepository service)
        //{
        //    try
        //    {
        //        return await Task.Run(() =>
        //        {
        //            return Results.Ok(service.GetAllTickets().Where(t => t.MovieId == id).ToList());
        //        });
        //    }
        //    catch (Exception ex)
        //    {
        //        return Results.Problem(ex.Message);
        //    }
        //}

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
                    if (ticket == null) return Results.NotFound("No Ticket with this ID was found!");
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
                            Message = "The Ticket was updated successfully!",
                            Ticket = ticket
                        });
                    }
                    return Results.NotFound("No Ticket with this ID was found!");
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
                    if (service.DeleteTicket(id)) return Results.Ok("The Ticket was deleted successfully!");
                    return Results.NotFound("No Ticket with this ID was found!");
                });
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }
    }
}
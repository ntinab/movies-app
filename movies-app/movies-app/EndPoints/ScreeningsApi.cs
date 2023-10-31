using movies_app.Repository;
using Microsoft.AspNetCore.Mvc;
using movies_app.Models.TicketModel;
using movies_app.Models.ScreeningModel;

namespace movies_app.EndPoints
{
    public static class ScreeningsApi
    {
        public static void ConfigureScreeningsApi(this WebApplication app)
        {
            app.MapPost("/movies/{id}/screenings", AddScreening);
            app.MapGet("/movies/{id}/screenings", GetScreenings);
            app.MapGet("/movies/{id}/screenings/{screeningId}", GetScreening);
            app.MapPut("/movies/{id}/screenings/{screeningId}", UpdateScreening);
            app.MapDelete("/movies/{id}/screenings/{screeningId}", DeleteScreening);
        }

        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        private static async Task<IResult> AddScreening(int id, Screening screening, ICinemaRepository service)
        {
            try
            {
                return await Task.Run(() =>
                {
                    //if (!service.GetAllScreenings().Any(x => x.MovieId == id))
                    //{
                    //    var scr = service.GetAllScreenings().FirstOrDefault(s => s.MovieId==id);
                    //    return Results.Created($"/screenings/{scr.Id}", new
                    //    {
                    //        Message = "The Screening was added successfully!",
                    //        Screening = scr
                    //    });
                    //}

                    if (service.AddScreening(screening))
                    {               
                        for (int i = 0; i < 7; i++)
                        {
                            var screeningDate = DateTime.UtcNow.Date.AddDays(i).AddHours(21);

                            var newScreening = new Screening
                            {
                                MovieId = id,
                                Date = screeningDate,
                                IsAvailable = true,
                                // AvailableTickets = 100
                            };

                            service.AddScreening(newScreening);
                            // service.AddAvailableTickets(newScreening.Id, 100);

                            //for (int j = 1; j <= 100; j++)
                            //{
                            //    var newTicket = new Ticket
                            //    {
                            //        Seat = j,
                            //        Price = 11,
                            //        IsBooked = true,
                            //        BookedDate = screeningDate,
                            //        ScreeningId = newScreening.Id
                            //    };
                            //}
                        }
                        return Results.Created($"/screenings/{screening.Id}", new
                        {
                            Message = "The Screening was added successfully!",
                            Screening = screening
                        });
                    }           
                    return Results.BadRequest("The Screening could not be added!");
                });
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        [ProducesResponseType(StatusCodes.Status200OK)]
        private static async Task<IResult> GetScreenings(int id, ICinemaRepository service)
        {
            try
            {
                return await Task.Run(() =>
                {
                    return Results.Ok(service.GetAllScreenings().Where(s => s.MovieId == id).ToList());
                });
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        private static async Task<IResult> GetScreening(int id, int screeningId, ICinemaRepository service)
        {
            try
            {
                return await Task.Run(() =>
                {
                    var screening = service.GetScreening(id);
                    if (screening == null) return Results.NotFound("No Screening with this ID was found!");
                    return Results.Ok(screening);
                });
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        private static async Task<IResult> UpdateScreening(int id, Screening screening, ICinemaRepository service)
        {
            try
            {
                return await Task.Run(() =>
                {
                    if (service.UpdateScreening(screening))
                    {
                        return Results.Ok(new
                        {
                            Message = "The Screening was updated successfully!",
                            Screening = screening
                        });
                    }
                    return Results.NotFound("No Screening with this ID was found!");
                });
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        private static async Task<IResult> DeleteScreening(int id, int screeningId, ICinemaRepository service)
        {
            try
            {
                return await Task.Run(() =>
                {
                    var screening = service.GetScreening(screeningId);

                    if (screening != null)
                    {
                        var ticketsToDelete = service.GetAllTickets().Where(t => t.ScreeningId == screeningId).ToList();
                        foreach (var ticket in ticketsToDelete)
                        {
                            service.DeleteTicket(ticket.Id);
                        }

                        if (service.DeleteScreening(screeningId))
                        {
                            return Results.Ok($"The Screening with ID {screeningId} and its associated tickets were deleted successfully!");
                        }
                    }
                    return Results.NotFound($"No Screening with this ID was found!");
                });
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }
    }
}
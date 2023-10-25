using movies_app.Models;
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

        //[ProducesResponseType(StatusCodes.Status201Created)]
        //private static async Task<IResult> AddScreening(int id, Screening screening, ICinemaRepository service)
        //{
        //    try
        //    {
        //        return await Task.Run(() =>
        //        {
        //            //if (model == null) return Results.NotFound();

        //            Screening screening = new Screening()
        //            {
        //                MovieId = id,
        //                ScreenNumber = screening.ScreenNumber,
        //                Capacity = screening.Capacity,
        //                StartsAt = screening.StartsAt,
        //            };

        //            service.AddScreening(screening);

        //            Payload<Screening> payload = new Payload<Screening>()
        //            {
        //                data = screening
        //            };

        //            return Results.Created($"/movies/{id}/screenings/{screening.Id}", payload);
        //        });
        //    }
        //    catch (Exception ex)
        //    {
        //        return Results.Problem(ex.Message);
        //    }
        //}

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
                    if (screening == null) return Results.NotFound($"No Screening with ID {id} was found!");
                    return Results.Ok(screening);
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
                            Message = "The Screening with ID {screening.Id} was updated successfully!",
                            Screening = screening
                        });
                    }
                    return Results.NotFound($"No Screening with ID {screening.Id} was found!");
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
                if (service.DeleteScreening(screeningId)) return Results.Ok($"The Screening with ID {id} was deleted successfully!");
                return Results.NotFound($"No Screening with ID {id} was found!");
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }
    }
}
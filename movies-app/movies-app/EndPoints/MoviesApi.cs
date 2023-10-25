using movies_app.Models;
using movies_app.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Builder;
using movies_app.Models.MovieModel;
using movies_app.Models.ScreeningModel;

namespace movies_app.EndPoints
{
    public static class MoviesApi
    {
        public static void ConfigureMoviesApi(this WebApplication app)
        {
            app.MapPost("/movies", AddMovie);
            app.MapGet("/movies", GetMovies);
            app.MapGet("/movies/{id}", GetMovie);
            app.MapPut("/movies/{id}", UpdateMovie);
            app.MapDelete("/movies/{id}", DeleteMovie);
        }

        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        private static async Task<IResult> AddMovie(Movie movie, ICinemaRepository service)
        {
            try
            {
                if (service.AddMovie(movie))
                {
                    if (movie.screenings.Any())
                    {
                        foreach (var screening in movie.screenings)
                        {
                            Screening screening = new Screening()
                            {
                                ScreenNumber = screening.ScreenNumber,
                                StartsAt = screening.StartsAt,
                                Capacity = screening.Capacity,
                                MovieId = movie.Id,
                            };

                            service.AddScreening(screening);
                        }
                    }
                    return Results.Created($"/movies/{movie.Id}", new
                    {
                        Message = "The Movie with ID {movie.Id} was added successfully!",
                        Movie = movie
                    });
                }
                return Results.BadRequest("The Movie could not be added. Please check that all required fields are correct!");
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        [ProducesResponseType(StatusCodes.Status200OK)]
        private static async Task<IResult> GetMovies(ICinemaRepository service)
        {
            try
            {
                return await Task.Run(() =>
                {
                    return Results.Ok(service.GetAllMovies());
                });
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        private static async Task<IResult> GetMovie(int id, ICinemaRepository service)
        {
            try
            {
                return await Task.Run(() =>
                {
                    var movie = service.GetMovie(id);
                    if (movie == null) return Results.NotFound($"No Movie with ID {id} was found!");
                    return Results.Ok(movie);
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
        private static async Task<IResult> UpdateMovie(Movie movie, ICinemaRepository service)
        {
            try
            {
                return await Task.Run(() =>
                {
                    if (service.UpdateMovie(movie))
                    {
                        return Results.Ok(new
                        {
                            Message = "The Movie with ID {movie.Id} was updated successfully!",
                            Movie = movie
                        });
                    }
                    return Results.NotFound($"No Movie with ID {movie.Id} was found!");
                });
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        private static async Task<IResult> DeleteMovie(int id, ICinemaRepository service)
        {
            try
            {
                if (service.DeleteMovie(id)) return Results.Ok($"The Movie with ID {id} was deleted successfully!");
                return Results.NotFound($"No Movie with ID {id} was found!");
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        private static async Task<IResult> DeleteMovie(int id, ICinemaRepository service)
        {
            try
            {
                return await Task.Run(() =>
                {
                    var movie = service.GetMovie(id);

                    var screeningToDelete = service.GetAllScreenings().Where(s => s.MovieId == id).ToList();

                    screeningToDelete.ForEach(x =>
                    {
                        service.DeleteMovie(x.Id);
                    });

                    if (service.DeleteMovie(id)) return Results.Ok($"The Movie with ID {id} was deleted successfully!");
                    return Results.NotFound($"No Movie with ID {id} was found!");
                });
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }
    }
}
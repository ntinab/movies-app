using movies_app.Repository;
using Microsoft.AspNetCore.Mvc;
using movies_app.Models.MovieModel;
using Microsoft.EntityFrameworkCore;
using movies_app.Models.ScreeningModel;
using movies_app.DataContext;
using movies_app.Data;
using Microsoft.AspNetCore.Builder;
using Newtonsoft.Json;


namespace movies_app.EndPoints
{
    public class MoviesApi
    {
        private readonly DataInitializer _dataInitializer;

        public MoviesApi(DataInitializer dataInitializer)
        {
            _dataInitializer = dataInitializer;
        }

        public void ConfigureMoviesApi(WebApplication app)
        {
            app.MapPost("/movies", UploadMovies);
            app.MapGet("/movies", GetMovies);
            app.MapGet("/movies/{id}", GetMovie);
            app.MapPut("/movies/{id}", UpdateMovie);
            app.MapDelete("/movies/{id}", DeleteMovie);
        }

        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        private async Task<IResult> AddMovie(Movie movie, ICinemaRepository service)
        {
            try
            {
                return await Task.Run(() =>
                {
                    if (service.AddMovie(movie))
                    {
                        return Results.Created($"/movies/{movie.id}", new
                        {
                            Message = "The Movie with ID {movie.id} was added successfully!",
                            Movie = movie
                        });
                    }
                    return Results.BadRequest("The Movie could not be added!");
                });         
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        //[ProducesResponseType(StatusCodes.Status201Created)]
        //[ProducesResponseType(StatusCodes.Status400BadRequest)]
        //private static async Task <IResult> AddMovies([FromBody] List<Movie> movies, ICinemaRepositoryService)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        foreach (var movie in movies)
        //        {
        //            _context.Movies.Add(movie);
        //        }
        //        _context.SaveChanges();

        //        return Results.Created("CreateMovies", movies);
        //    }
        //    else
        //    {
        //        return Results.BadRequest(ModelState);
        //    }
        //}

        // private async Task<IResult> UploadMovies([FromBody]List<Movie> movies, ICinemaRepository service)
        private async Task<IResult> UploadMovies([FromBody] string requestBody, ICinemaRepository service)

        {
            using (var db = new CinemaContext())
            {

                List<Movie> movies = JsonConvert.DeserializeObject<List<Movie>>(requestBody);

                foreach (var movie in movies)
                {
                    db.Movies.Add(movie);
                }

                await db.SaveChangesAsync();
            }

            return Results.Ok("Movies uploaded successfully");
 
            //_dataInitializer.Initialize(movies);

            //return Results.Ok("Movies uploaded successfully.");
        }

        [ProducesResponseType(StatusCodes.Status200OK)]
        private async Task<IResult> GetMovies(ICinemaRepository service)
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
        private async Task<IResult> GetMovie(int id, ICinemaRepository service)
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
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        private async Task<IResult> UpdateMovie(Movie movie, ICinemaRepository service)
        {
            try
            {
                return await Task.Run(() =>
                {
                    if (service.UpdateMovie(movie))
                    {
                        return Results.Ok(new
                        {
                            Message = "The Movie with ID {movie.id} was updated successfully!",
                            Movie = movie
                        });
                    }
                    return Results.NotFound($"No Movie with ID {movie.id} was found!");
                });
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        private async Task<IResult> DeleteMovie(int id, ICinemaRepository service)
        {
            try
            {
                return await Task.Run(() =>
                {
                    var movie = service.GetMovie(id);

                    if (movie != null)
                    {
                        var screeningsToDelete = service.GetAllScreenings().Where(s => s.MovieId == id).ToList();
                        foreach (var screening in screeningsToDelete)
                        {
                            service.DeleteScreening(screening.Id);
                        }

                        if (service.DeleteMovie(id))
                        {
                            return Results.Ok($"The Movie with ID {id} and its associated screenings were deleted successfully!");
                        }
                    }
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
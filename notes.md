## Movie App 



- movie card & movie modal : book ticket --- modal with booking details : movie title & image | date & time ? | seat ? | price | input email 
- send email with ticket information : movie tile & image | date & time | seat 17D | price | barcode 


- initializer !


- screenings : add ticket & book ticket ?
- delete screening & movie & ticket ?
- add tickets when adding screening ?
- tickets api ! 
- movies api !


- ticket with email input --- and not with user uid !
- my tickets --- user uid !
- users ?


- get all tickets for a movie ?



front-end

import axios from 'axios';

// The MovieID you want to send
const movieID = 123; // Replace with the actual MovieID

// Define the data you want to send (in this case, just the MovieID)
const data = {
  movieID: movieID,
};

// Make an HTTP POST request to your backend
axios.post('https://your-backend-api-url/associate-movie-with-screening', data)
  .then((response) => {
    // Handle the response from the backend, if needed
    console.log('Movie association successful', response.data);
  })
  .catch((error) => {
    // Handle errors, such as network issues or errors returned by the backend
    console.error('Error associating movie with screening', error);
  });


  back-end

  [ApiController]
[Route("api/movies")]
public class MovieController : ControllerBase
{
    [HttpPost("associate-movie-with-screening")]
    public IActionResult AssociateMovieWithScreening([FromBody] int movieID)
    {
        // Perform the association logic here, e.g., create a new screening with the specified MovieID

        return Ok(new { message = "Movie associated with screening successfully" });
    }
}


// send movie data from front to back 

import axios from 'axios';

const movieData = { /* Movie data from TMDB API */ };

axios.post('https://your-backend-api-url/movies', movieData)
  .then(response => {
    // Handle the response from the backend
    console.log('Movie data sent to the backend successfully', response.data);
  })
  .catch(error => {
    // Handle errors, such as network issues or errors returned by the backend
    console.error('Error sending movie data to the backend', error);
  });


  public IActionResult CreateMovie([FromBody] Movie movie)
{
    if (ModelState.IsValid)
    {
        // Add the movie to the database
        _context.Movies.Add(movie);
        _context.SaveChanges();

        return CreatedAtRoute("GetMovie", new { id = movie.MovieID }, movie);
    }
    else
    {
        return BadRequest(ModelState);
    }
}


import axios from 'axios';

const fetchMovies = async () => {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=YOUR_API_KEY');
    const movies = response.data.results;

    // Store 'movies' in your component state or context
    // or use Redux to manage the state
  } catch (error) {
    console.error('Error fetching movies from TMDB API', error);
  }
};


const sendMoviesToBackend = async (movies) => {
  try {
    const response = await axios.post('https://your-backend-api-url/movies', { movies });
    console.log('Movies sent to the backend successfully', response.data);
  } catch (error) {
    console.error('Error sending movies to the backend', error);
  }
};

// Call this function with the 'movies' list
sendMoviesToBackend(movies);


[Route("api/movies")]
[ApiController]
public class MovieController : ControllerBase
{
    [HttpPost]
    public IActionResult CreateMovies([FromBody] List<Movie> movies)
    {
        if (ModelState.IsValid)
        {
            // Add each movie to the database
            foreach (var movie in movies)
            {
                _context.Movies.Add(movie);
            }
            _context.SaveChanges();

            return CreatedAtAction("CreateMovies", movies);
        }
        else
        {
            return BadRequest(ModelState);
        }
    }
}


public IActionResult BookTicket([FromBody] TicketRequest ticketRequest)
{
    string userUID = GetCurrentUserUID(); // Function to get the user's Firebase UID

    // Create a new ticket and associate it with the user
    Ticket ticket = new Ticket
    {
        UserUID = userUID,
        // Other ticket properties
    };

    // Save the ticket to the database
    _context.Tickets.Add(ticket);
    _context.SaveChanges();

    return CreatedAtAction("BookTicket", ticket);
}


public IActionResult GetUserTickets(string userUID)
{
    var tickets = _context.Tickets.Where(t => t.UserUID == userUID).ToList();
    return Ok(tickets);
}


[HttpDelete("delete-ticket")]
public IActionResult DeleteTicket(string userUID, int ticketID)
{
    // Verify that the user has permission to delete the ticket, e.g., by checking ownership.
    var ticket = _context.Tickets.FirstOrDefault(t => t.TicketID == ticketID && t.UserUID == userUID);

    if (ticket == null)
    {
        // Ticket not found or user doesn't have permission to delete
        return NotFound();
    }

    // Delete the ticket
    _context.Tickets.Remove(ticket);
    _context.SaveChanges();

    return NoContent(); // Successful deletion
}


[HttpPost("book-ticket")]
public IActionResult BookTicket(string userUID, [FromBody] TicketRequest ticketRequest)
{
    // Verify user identity based on userUID (Firebase UID)
    // Create a new ticket and associate it with the user
    // Save the ticket to the database
    return CreatedAtAction("BookTicket", ticket);
}


[HttpGet("get-tickets")]
public IActionResult GetTickets(string userUID)
{
    // Retrieve all tickets associated with the userUID (Firebase UID)
    return Ok(tickets);
}


[HttpPut("edit-ticket/{ticketID}")]
public IActionResult EditTicket(string userUID, int ticketID, [FromBody] TicketRequest updatedTicket)
{
    // Verify user identity and ownership of the ticket
    // Update the ticket information in the database
    return NoContent();
}


[HttpDelete("delete-ticket/{ticketID}")]
public IActionResult DeleteTicket(string userUID, int ticketID)
{
    // Verify user identity and ownership of the ticket
    // Delete the ticket from the database
    return NoContent();
}

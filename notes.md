## Movie App 



- send email with ticket information : movie tile & image | date & time of the selected screening | seat | price | runtime | barcode !
- if not : react toastify notification to inform the user that his ticket is booked !


- ticket with email input --- and not with user uid !
- my tickets --- user uid !
- users ?


- add movie | add movies ?
- movies api ?
- ticketpost ?


- cinema context ?
- initializer ?



//    string userUID = GetCurrentUserUID(); // Function to get the user's Firebase UID


// send movie id to backend so as to associate it with screenings

const movieID = 123; // Replace with the actual MovieID

const data = {
  movieID: movieID,
};

axios.post('https://your-backend-api-url/associate-movie-with-screening', data)
  .then((response) => {
    console.log('Movie association successful', response.data);
  })
  .catch((error) => {
    console.error('Error associating movie with screening', error);
  });


public IActionResult AssociateMovieWithScreening([FromBody] int movieID)
{
        // Perform the association logic here, e.g., create a new screening with the specified MovieID
        return Ok(new { message = "Movie associated with screening successfully" });
}


// send movie data to backend

const movieData = { /* Movie data from TMDB API */ };

axios.post('https://your-backend-api-url/movies', movieData)
  .then(res => {
    console.log('Movie data sent to the backend successfully', res.data);
  })
  .catch(error => {
    console.error('Error sending movie data to the backend', error);
  });


// send movies to backend

const sendMoviesToBackend = async (movies) => {
  try {
    const res = await axios.post('https://your-backend-api-url/movies', { movies });
    console.log('Movies sent to the backend successfully', res.data);
  } catch (error) {
    console.error('Error sending movies to the backend', error);
  }
};

// Call this function with the 'movies' list
sendMoviesToBackend(movies);

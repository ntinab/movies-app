import { BookOutlined, CloseOutlined, EyeOutlined, HeartFilled, HeartOutlined, PlusOutlined } from '@ant-design/icons'
import { Card, Modal, Tag, message, Button, Input, Select } from 'antd'
import { setFavourites, setWatchlist } from '../redux/reducer'
import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { MoviesModel } from '../data'
import moment from 'moment'
import axios from 'axios'

const { Meta } = Card;

const MovieCard = ({ movie }) => {
  
  const dispatch = useDispatch();

  const { bearerAccessToken, userRDX, favourites, watchlist, genres } = useSelector((state) => state);

  const iframeRef = useRef();

  const [email, setEmail] = useState('');

  const [movieGenres, setMovieGenres] = useState([]);

  const [movieRuntime, setMovieRuntime] = useState([]);

  const [movieModal, setMovieModal] = useState(false);

  const [ticketModal, setTicketModal] = useState(false);

  const [selectedMovieID, setSelectedMovieID] = useState(0);

  const [selectedMovieKEY, setSelectedMovieKEY] = useState(0);

  const [availableScreenings, setAvailableScreenings] = useState([]);

  const [selectedScreeningId, setSelectedScreeningId] = useState(null);

  // useEffect ?
  const fetchAvailableScreenings = (movieId) => {
    MoviesModel.getMovieScreenings(movieId)
      .then((res) => {
        setAvailableScreenings(res.data);
      })
      .catch((err) => {
        console.error('Error fetching available screenings:', err);
      });
  };

  useEffect(() => {
    setMovieGenres(genres.filter((gen) => movie.genre_ids.includes(gen.id)));
  }, [movie]);

  useEffect(() => {
    const genreIds = movie.genre_ids;
    setMovieGenres(genres.filter((gen) => genreIds.includes(gen.id)));
  
    MoviesModel.getMovieRuntime(bearerAccessToken, movie.id)
      .then((res) => {
        setMovieRuntime(res.data.runtime);
      })
      .catch((err) => {
        console.error('Error fetching movie runtime:', err);
      });
  }, [movie]);

  useEffect(() => {
    movieModal &&
      selectedMovieID &&
      MoviesModel.getMovieTrailer(bearerAccessToken, selectedMovieID)
        .then((res) => {
          setSelectedMovieKEY(res.data.results[0].key);
        })
        .catch((err) => message.error(err.message));
  }, [movieModal, selectedMovieID]);

  if (movie.genres && movie.genres.length > 0) {
    var firstTwoGenres = movie.genres.slice(0, 2).map((genre) => genre.name);
  } else {
    firstTwoGenres = movie.genre_ids.slice(0, 2).map((genreId) => genres.find((genre) => genre.id === genreId)?.name);
}

function formatDate(dateString) {
  const options = { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', timeZone: 'UTC' };
  const formattedDate = new Date(dateString).toLocaleString('en-US', options);
  return formattedDate;
}

  return (
    <>
      <div className="movie-card-container">
        <Card
          hoverable
          style={{
            backgroundColor: "black",
            color: "white",
            borderStyle: "none",
            // display: "inline-flex",
            display: "inline-block",
            // flexWrap: "wrap",
          }}
          cover={
            <div style={{ position: "relative", display: "inline-block" }}>
              <img
                onClick={() => {
                  setMovieModal(true);
                  setSelectedMovieID(movie.id);
                }}
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt="Movie"
                style={{ width: "220px", height: "330px" }}
              />
              {/* <div style={{ position: 'absolute', top: 0, right: 0, backgroundColor: 'black' }}>
            <Popover trigger={'hover'} content={addedToFavourites ? 'Remove from my Favourites' : 'Add to my Favourites'}>
            <Popover trigger={'click'} content={addedToFavourites ? 'Movie added to Favourites!' : 'Movie removed from Favourites!'}>
              <Button type="text" style={{color: 'white'}} onClick={(e) => {
                e.stopPropagation(); 
                addMovieToFavourites(); }}
              > 
                {addedToFavourites ? <HeartFilled /> : <HeartOutlined/>}
              </Button> 
            </Popover>
            </Popover>
            <Popover trigger={'hover'} content={addedToWatchlist ? 'Remove from my Watchlist' : 'Add to my Watchlist'}>
            <Popover trigger={'click'} content={addedToWatchlist ? 'Movie added to Watchlist!' : 'Movie removed from Watchlist!'}>
              <Button type="text" style={{color: "white"}} onClick={(e) => {
                e.stopPropagation();
                addMovieToWatchlist(); }}
              > 
                {addedToWatchlist ? <CloseOutlined /> : <PlusOutlined/>}
              </Button> 
            </Popover>
            </Popover>
              </div> */}
            </div>
          }
          actions={[
            favourites.some((f) => f.id === movie.id) ? (
              <HeartFilled 
              style={{ color: "black" }}
                onClick={() => {
                  if (!userRDX) {
                    toast.info(
                      "To remove this movie from favourites, please log in."
                    );
                  } else
                    dispatch(
                      setFavourites(
                        favourites.filter(
                          (favMovie) => favMovie.id !== movie.id
                        )
                      )
                    );
                }}
              />
            ) : (
              <HeartOutlined 
                key="favourites-item"
                onClick={() => {
                  if (!userRDX) {
                    toast.info(
                      "To add this movie to favourites, please log in."
                    );
                  } else dispatch(setFavourites([...favourites, movie]));
                }}
              />
            ),
            watchlist.some((w) => w.id === movie.id) ? (
              <CloseOutlined 
                key="watchlist-item"
                onClick={() => {
                  if (!userRDX) {
                    toast.info(
                      "To remove this movie from watchlist, please log in."
                    );
                  } else
                    dispatch(
                      setWatchlist(
                        watchlist.filter(
                          (watchMovie) => watchMovie.id !== movie.id
                        )
                      )
                    );
                }}
              />
            ) : (
              <PlusOutlined 
                onClick={() => {
                  if (!userRDX) {
                    toast.info(
                      "To add this movie to watchlist, please log in."
                    );
                  } else dispatch(setWatchlist([...watchlist, movie]));
                }}
              />
            ),
            <BookOutlined 
              onClick={() => {
                setTicketModal(true);
                setSelectedMovieID(movie.id);
                fetchAvailableScreenings(movie.id);
              }}
            />,
            <EyeOutlined 
              onClick={() => {
                setSelectedMovieID(movie.id);
                setMovieModal(true);
              }}
            />
          ]}
          >
          <Meta
            style={{ cursor: "default", backgroundColor: 'black', color: 'white', width: '220px' }}
            title={<div className='card-title'><b>{movie.title}</b></div>}
            description={
              <div className="card-description" style={{backgroundColor: 'black', color: 'white'}}>
              <space>
                <p>
                  <b>Release Date: </b>
                  {moment(movie.release_date).format("MMM DD, YYYY")}
                </p>
                <p>
                  <b>Genres: </b>
                  <br />
                  <span style={{ display: "inline-flex", flexWrap: "wrap" }}>
                  {firstTwoGenres.map((genre, index) => (
                    <Tag key={index} style={{ backgroundColor: 'lightgray', marginRight:'5px', color: 'black', fontSize: '8px', marginTop: '5px' }}>
                      {genre}
                    </Tag>
                  ))}
                  </span>
                </p>
              </space>
              </div>
            }
          />
        </Card>
      </div>

      <Modal
        footer={null}
        width={1000}
        open={movieModal}
        onCancel={() => {
          iframeRef.current.src = "";
          setMovieModal(false);
        }}
      >
        {movie && (
          <div className="movie-page-container">
            <div className="movie-page-title">
              <h1>{movie.title}</h1>
            </div>
            <div style={{ position: "relative", display: "inline-block" }}>
              <iframe
                ref={iframeRef}
                title={selectedMovieID.title}
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${selectedMovieKEY}`}
                allowFullScreen
              ></iframe>
            </div>
            <p>{movie.overview}</p>
            <p>
              <b>Release Date: </b>
              {moment(movie.release_date).format("MMM DD, YYYY")}
            </p>
            <p>
              <b>Runtime: </b>
              {`${Math.floor(movieRuntime / 60)}h ${movieRuntime % 60}m`}
            </p>
            {movieGenres ? (
              <p>
                <b>Genres: </b>
                <span style={{ display: "inline-flex", flexWrap: "wrap" }}>
                  {movieGenres.map((mg) => (
                      <Tag
                        style={{
                          marginRight: 5,
                          backgroundColor: "black",
                          color: "white",
                          border: "none",
                        }}
                      >
                        {mg.name}
                      </Tag>
                    ))}
                </span>
              </p>
            ) : null}
          </div>
        )}
      </Modal>

      <Modal
        open={ticketModal}
        footer={null}
        width={1000}
        onCancel={() => {
          setTicketModal(false);
        }}
      >
        {movie && (
          <div className="movie-page-container">
            <div className="movie-page-title">
              <h1>{movie.title}</h1>
            </div>
            <div style={{ position: "relative", display: "inline-block" }}>    
            <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                alt="Movie"
                style={{ width: "560px", height: "315px" }}    
            />        
            </div>
            <p>
              <b>Runtime: </b>
              {`${Math.floor(movieRuntime / 60)}h ${movieRuntime % 60}m`}
            </p>
            <p>
              <b>Price:</b> 11$
            </p>
            <p>
              <b>Available Screenings: </b>
             <Select
              placeholder="Select a screening"
              style={{
                height: '27px'
              }}
              value={selectedScreeningId} 
              onChange={(value) => setSelectedScreeningId(value)} 
              options={availableScreenings.map((screening) => ({
                value: screening.id,
                label: formatDate(screening.date),
              }))}
            />
            </p>
            <p>
            <Input
            placeholder="Type your E-mail Address here"
            style={{
              width: '355px',  
              height: '27px',  
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            >
            </Input>
            </p>
            <p>
            <Button type="text" style={{marginTop: '17px', backgroundColor: 'black', color: 'white', borderRadius: '0px', height: '31px'}} 
           onClick={() => {
            if (selectedScreeningId) {
              axios.post(`https://localhost:7195/screenings/${selectedScreeningId}/tickets`, {
                // email: email,
              })
              .then((res) => {
                toast.success('Booked ticket successfully');
              })
              .catch((error) => {
                toast.error('Error booking ticket: ' + error.message);
              });
            } else {
              toast.info('Please select a screening to book a ticket.');
            }
          }}
            >
              Book Ticket 
            </Button>
            </p>
          </div>
        )}
      </Modal>     
    </>
  );
};

export default MovieCard;
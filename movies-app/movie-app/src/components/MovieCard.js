import { BookOutlined, CloseOutlined, EyeOutlined, HeartFilled, HeartOutlined, PlusOutlined } from '@ant-design/icons'
import { setFavourites, setWatchlist } from '../redux/reducer'
import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Modal, Tag, message } from 'antd'
import { toast } from 'react-toastify'
import { MoviesModel } from '../data'
import moment from 'moment'

const { Meta } = Card;

const MovieCard = ({ movie }) => {

  const dispatch = useDispatch();

  const { bearerAccessToken, userRDX, favourites, watchlist, genres } = useSelector((state) => state);

  const iframeRef = useRef();

  const [movieGenres, setMovieGenres] = useState([]);

  const [movieRuntime, setMovieRuntime] = useState([]);

  const [movieModal, setMovieModal] = useState(false);

  const [ticketModal, setTicketModal] = useState(false);

  const [selectedMovieID, setSelectedMovieID] = useState(0);

  const [selectedMovieKEY, setSelectedMovieKEY] = useState(0);

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

  return (
    <>
      <div className="movie-card-container">
        <Card
          hoverable
          style={{
            backgroundColor: "black",
            color: "white",
            borderStyle: "none",
            display: "inline-flex",
            flexWrap: "wrap",
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
              }}
            />,
            <EyeOutlined
              onClick={() => {
                setSelectedMovieID(movie.id);
                setMovieModal(true);
              }}
            />,
          ]}
        >
          <Meta
            style={{ cursor: "default" }}
            title=<h3>{movie.title}</h3>
            description={
              <space>
                <p>
                  <b>Release Date: </b>
                  {moment(movie.release_date).format("MMM DD, YYYY")}
                </p>
                <p>
                  <b>Genres: </b>
                  <br />
                  <span style={{ display: "inline-flex", flexWrap: "wrap" }}>
                  {/* {movieGenres.map((genre, index) => (
                    <Tag key={index} style={{ backgroundColor: 'lightgray', marginRight:'5px', color: 'black', fontSize: '8px', marginTop: '5px' }}>
                      {genre}
                    </Tag>
                  ))} */}
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
              </space>
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
              {/* {trailers.length > 0 && ( */}
              <iframe
                ref={iframeRef}
                title={selectedMovieID.title}
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${selectedMovieKEY}`}
                // src={`https://www.youtube.com/embed/${trailers[0].key}`}
                // title={`Trailer ${trailers[0].name}`}
                allowFullScreen
              ></iframe>
              {/* )} */}
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
                  {/* {movieGenres.map((genre) => (
                    <Tag
                      key={genre}
                      style={{
                        backgroundColor: "black",
                        marginRight: "5px",
                        color: "white",
                        fontSize: "8px",
                        marginTop: "5px",
                      }}
                    >
                      {genre}
                    </Tag>
                  ))} */}
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
        onCancel={() => {
          setTicketModal(false);
        }}
      >
        {/* add ticket modal  */}
      </Modal>
    </>
  );
};

export default MovieCard;
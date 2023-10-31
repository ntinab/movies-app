import { setMoviesRDX, setTotalItems } from '../redux/reducer'
import { useSelector, useDispatch } from 'react-redux'
import { ArrowUpOutlined } from '@ant-design/icons'
import React, { useState, useEffect } from 'react'
import { FloatButton, Spin, message } from 'antd'
import MovieCard from '../components/MovieCard'
import { MoviesModel } from '../data'
import axios from 'axios'

const Movies = () => {
  const { bearerAccessToken, page, moviesRDX, favourites, watchlist, searchInput } = useSelector((state) => state);

  const [header, setHeader] = useState("");

  const dispatch = useDispatch();

  const pathName = window.location.pathname;

  useEffect(() => {
    if (searchInput === "") {
      // id ?
      const addMovieScreenings = (movieId) => {
        axios.post(`https://localhost:7195/movies/${movieId}/screenings`, {movieId})
          .then((res) => {
            console.log(res.data.message);
          })
          .catch((error) => {
            console.error("Error adding screenings:", error);
          });
      };
      if (pathName === "/") {
        MoviesModel.getAllMovies(bearerAccessToken, page)
          .then((res) => {
            dispatch(setMoviesRDX(res.data.results));
            dispatch(setTotalItems(res.data.total_results));
            setHeader("Movies");
          })
          .catch((err) => message.error(err.message));
      } else if (pathName.includes("upcoming")) {
        MoviesModel.getUpcomingMovies(bearerAccessToken, page)
          .then((res) => {
            dispatch(setMoviesRDX(res.data.results));
            dispatch(setTotalItems(res.data.total_results));
            setHeader("Upcoming Movies");
          })
          .catch((err) => message.error(err.message));
      } else if (pathName.includes("trending")) {
        MoviesModel.getTrendingMovies(bearerAccessToken, page)
          .then((res) => {
            dispatch(setMoviesRDX(res.data.results));
            dispatch(setTotalItems(res.data.total_results));
            setHeader("Trending Movies");
          })
          .catch((err) => message.error(err.message));
      } else if (pathName.includes("popular")) {
        MoviesModel.getPopularMovies(bearerAccessToken, page)
          .then((res) => {
            dispatch(setMoviesRDX(res.data.results));
            dispatch(setTotalItems(res.data.total_results));
            setHeader("Popular Movies");
          })
          .catch((err) => message.error(err.message));
      } else if (pathName.includes("toprated")) {
        MoviesModel.getTopRatedMovies(bearerAccessToken, page)
          .then((res) => {
            dispatch(setMoviesRDX(res.data.results));
            dispatch(setTotalItems(res.data.total_results));
            setHeader("Top Rated Movies");
          })
          .catch((err) => message.error(err.message));
      } else if (pathName.includes("nowplaying")) {
        MoviesModel.getNowPlayingMovies(bearerAccessToken, page)
          .then((res) => {
            dispatch(setMoviesRDX(res.data.results));
            dispatch(setTotalItems(res.data.total_results));
            setHeader("Now Playing Movies");
          })
          .catch((err) => message.error(err.message));
      } else if (pathName.includes("favourites")) {
        dispatch(setMoviesRDX(favourites));
        setHeader("My favourites");
      } else if (pathName.includes("watchlist")) {
        dispatch(setMoviesRDX(watchlist));
        setHeader("My Watchlist");
      }
      if (moviesRDX && moviesRDX.length > 0) {
        moviesRDX.forEach((movie) => {
          addMovieScreenings(movie.id);
        });
      }
    } else {
      MoviesModel.searchMovie(bearerAccessToken, searchInput, page)
        .then((res) => {
          dispatch(setMoviesRDX(res.data.results));
          dispatch(setTotalItems(res.data.total_results));
        })
        .catch((err) => message.error(err.message));
    }
  }, [pathName, page, favourites, watchlist, searchInput]);

  return moviesRDX && moviesRDX.length > 0 ? (
    <>
      <div>
        <h1>{header}</h1>
        <div className="Movies">
          {moviesRDX.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
        <FloatButton.BackTop icon=<ArrowUpOutlined /> />
      </div>
    </>
  ) : !(
      window.location.pathname === "/favourites" ||
      window.location.pathname === "/watchlist"
    ) ? (
    <Spin size="medium" />
  ) : (
    "No movies added!"
  );
};

export default Movies;
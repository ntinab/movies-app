import { setMoviesListRDX, setTotalItems } from '../redux/reducer'
import { FloatButton, Row, Spin, message } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { ArrowUpOutlined } from '@ant-design/icons'
import MovieCard from '../components/MovieCard'
import { MoviesModel } from '../data'

const MoviesList = () => {
  const { bearerAccessToken, page, moviesListRDX, favourites, watchlist, searchInput } = useSelector((state) => state);

  const [header, setHeader] = useState("");

  const dispatch = useDispatch();

  const pathName = window.location.pathname;

  useEffect(() => {
    if (searchInput === "") {
      if (pathName === "/") {
        MoviesModel.getAllMovies(bearerAccessToken, page)
          .then((res) => {
            dispatch(setMoviesListRDX(res.data.results));
            dispatch(setTotalItems(res.data.total_results));
            setHeader("Movies");
            // setHeader("");
          })
          .catch((err) => message.error(err.message));
      } else if (pathName.includes("upcoming")) {
        MoviesModel.getUpcomingMovies(bearerAccessToken, page)
          .then((res) => {
            dispatch(setMoviesListRDX(res.data.results));
            dispatch(setTotalItems(res.data.total_results));
            setHeader("Upcoming Movies");
          })
          .catch((err) => message.error(err.message));
      } else if (pathName.includes("trending")) {
        MoviesModel.getTrendingMovies(bearerAccessToken, page)
          .then((res) => {
            dispatch(setMoviesListRDX(res.data.results));
            dispatch(setTotalItems(res.data.total_results));
            setHeader("Trending Movies");
          })
          .catch((err) => message.error(err.message));
      } else if (pathName.includes("popular")) {
        MoviesModel.getPopularMovies(bearerAccessToken, page)
          .then((res) => {
            dispatch(setMoviesListRDX(res.data.results));
            dispatch(setTotalItems(res.data.total_results));
            setHeader("Popular Movies");
          })
          .catch((err) => message.error(err.message));
      } else if (pathName.includes("toprated")) {
        MoviesModel.getTopRatedMovies(bearerAccessToken, page)
          .then((res) => {
            dispatch(setMoviesListRDX(res.data.results));
            dispatch(setTotalItems(res.data.total_results));
            setHeader("Top Rated Movies");
          })
          .catch((err) => message.error(err.message));
      } else if (pathName.includes("nowplaying")) {
        MoviesModel.getNowPlayingMovies(bearerAccessToken, page)
          .then((res) => {
            dispatch(setMoviesListRDX(res.data.results));
            dispatch(setTotalItems(res.data.total_results));
            setHeader("Now Playing Movies");
          })
          .catch((err) => message.error(err.message));
      } else if (pathName.includes("favourites")) {
        dispatch(setMoviesListRDX(favourites));
        // total items
        setHeader("My favourites");
      } else if (pathName.includes("watchlist")) {
        dispatch(setMoviesListRDX(watchlist));
        // total items
        setHeader("My Watchlist");
      }
    } else {
      MoviesModel.searchMovie(bearerAccessToken, searchInput, page)
        .then((res) => {
          dispatch(setMoviesListRDX(res.data.results));
          dispatch(setTotalItems(res.data.total_results));
        })
        .catch((err) => message.error(err.message));
    }
  }, [pathName, page, favourites, watchlist, searchInput]);

  return moviesListRDX && moviesListRDX.length > 0 ? (
    <>
      <h1>{header}</h1>
      <Row>
        {moviesListRDX.map((movie) => (
          <MovieCard
            movie={movie}
          />
        ))}
      </Row>
      <FloatButton.BackTop icon=<ArrowUpOutlined /> />
    </>
  ) : !(
      window.location.pathname === "/favourites" ||
      window.location.pathname === "/watchlist" ||
      window.location.pathname === "/tickets"
    ) ? (
    <Spin size="medium" />
  ) : (
    "No movies added yet!"
  );
};

export default MoviesList;
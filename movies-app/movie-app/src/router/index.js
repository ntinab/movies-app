import { useSelector, useDispatch } from 'react-redux'
import { setGenres } from '../redux/reducer'
import { useRoutes } from 'react-router-dom'
import React, { useEffect } from 'react'
import { MoviesModel } from '../data'
import Tickets from '../views/Tickets'
import MoviesList from '../views'
import { message } from 'antd'

const Router = () => {

  const dispatch = useDispatch();

  const { bearerAccessToken, genres } = useSelector((state) => state);

  useEffect(() => {
    !genres &&
      MoviesModel.getGenres(bearerAccessToken)
        .then((res) => {
          dispatch(setGenres(res.data.genres));
        })
        .catch((err) => message.error(err.message));
  }, []);

  let element = useRoutes([
    {
      path: "/",
      element: <MoviesList />,
    },
    {
      path: "/upcoming",
      element: <MoviesList />,
    },
    {
      path: "/trending",
      element: <MoviesList />,
    },
    {
      path: "/popular",
      element: <MoviesList />,
    },
    {
      path: "/toprated",
      element: <MoviesList />,
    },
    {
      path: "/nowplaying",
      element: <MoviesList />,
    },
    {
      path: "/favourites",
      element: <MoviesList />,
    },
    {
      path: "/watchlist",
      element: <MoviesList />,
    },
    {
      path: "/tickets",
      element: <Tickets />,
    },
  ]);

  return element;
};

export default Router;
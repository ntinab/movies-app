import { useSelector, useDispatch } from 'react-redux'
import { useRoutes } from 'react-router-dom'
import { setGenres } from '../redux/reducer'
import React, { useEffect } from 'react'
import { MoviesModel } from '../data'
import { message } from 'antd'
import Movies from '../views'

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
      element: <Movies />,
    },
    {
      path: "/upcoming",
      element: <Movies />,
    },
    {
      path: "/trending",
      element: <Movies />,
    },
    {
      path: "/popular",
      element: <Movies />,
    },
    {
      path: "/toprated",
      element: <Movies />,
    },
    {
      path: "/nowplaying",
      element: <Movies />,
    },
    {
      path: "/favourites",
      element: <Movies />,
    },
    {
      path: "/watchlist",
      element: <Movies />,
    }
  ]);

  return element;
};

export default Router;
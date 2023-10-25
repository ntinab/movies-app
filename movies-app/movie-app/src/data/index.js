import axios from 'axios'

export const MoviesModel = {
  getGenres: (token) =>
    axios.get(`https://api.themoviedb.org/3/genre/movie/list`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getAllMovies: (token, page) =>
    axios.get(`https://api.themoviedb.org/3/discover/movie?page=${page}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getUpcomingMovies: (token, page) =>
    axios.get(`https://api.themoviedb.org/3/movie/upcoming?page=${page}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getTrendingMovies: (token, page) =>
    axios.get(`https://api.themoviedb.org/3/trending/all/day?page=${page}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getPopularMovies: (token, page) =>
    axios.get(`https://api.themoviedb.org/3/movie/popular?page=${page}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getTopRatedMovies: (token, page) =>
    axios.get(`https://api.themoviedb.org/3/movie/top_rated?page=${page}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getNowPlayingMovies: (token, page) =>
    axios.get(`https://api.themoviedb.org/3/movie/now_playing?page=${page}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  searchMovie: (token, input, page) =>
    axios.get(`https://api.themoviedb.org/3/search/movie?query=${input}&page=${page}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  searchMoviesWithFilters: (token, page, genres, sortBy) =>
    axios.get(`https://api.themoviedb.org/3/discover/movie?page=${page}` +
        `${genres ? "&with_genres=" + genres : ""}` +
        `${sortBy ? "&sort_by=" + sortBy : ""}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }),

  getMovieTrailer: (token, id) =>
    axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getMovieRuntime: (token, id) =>
    axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};
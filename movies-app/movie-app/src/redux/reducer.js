import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  moviesListRDX: [],
  genres: [],
  page: 1,
  totalItems: [],
  favourites: [],
  watchlist: [], 
  searchInput: "",
  filters: null,
  userRDX: null,
  bearerAccessToken: process.env.REACT_APP_BEARER_ACCESS_TOKEN,
};

export const stateSlice = createSlice({
  name: "myApp",
  initialState,
  reducers: {
    setMoviesListRDX: (state, { payload }) => {
      state.moviesListRDX = payload;
    },
    setGenres: (state, { payload }) => {
      state.genres = payload;
    },
    setPage: (state, { payload }) => {
      state.page = payload;
    },
    setTotalItems: (state, { payload }) => {
      state.totalItems = payload;
    },
    setFavourites: (state, { payload }) => {
      state.favourites = payload;
    },
    setWatchlist: (state, { payload }) => {
      state.watchlist = payload; 
    },
    setSearchInput: (state, { payload }) => {
      state.searchInput = payload;
    },
    setFilters: (state, { payload }) => {
      state.filters = payload;
    },
    setUserRDX: (state, { payload }) => {
      state.userRDX = payload;
    },
    setBearerAccessToken: (state, { payload }) => {
      state.bearerAccessToken = payload;
    },
  },
});


export const { setMoviesListRDX, setBearerAccessToken, setGenres, setPage, setTotalItems, setFavourites, setWatchlist, setSearchInput, setFilters, setUserRDX } = stateSlice.actions;
export default stateSlice.reducer;
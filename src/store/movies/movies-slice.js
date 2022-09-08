import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  movie: [],
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    getNowPlayingMovies(state, action) {
      state.movies = action.payload;
    },
    getUpcomingMovie(state, action) {
      state.movies = action.payload;
    },
    getPopularMovies(state, action) {
      state.movies = action.payload;
    },
    getTopRatedMovies(state, action) {
      state.movies = action.payload;
    },
    getDetailMovie(state, action) {
      state.movie = action.payload;
    },
  },
});

export const moviesActions = moviesSlice.actions;

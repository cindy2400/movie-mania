import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  movie: [],
  favoriteMovies: [],
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
    setFavoriteMovie(state, action) {
      if (
        state.favoriteMovies.some((movie) => movie.id === action.payload.id)
      ) {
        console.log("sudah ada");
      } else {
        state.favoriteMovies.push(action.payload);
      }
    },
    removeFavoriteMovie(state, action) {
      state.favoriteMovies = state.favoriteMovies.filter(
        (movie) => movie.id !== action.payload
      );
    },
  },
});

export const moviesActions = moviesSlice.actions;

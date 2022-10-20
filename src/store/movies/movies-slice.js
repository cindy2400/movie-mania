import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  currentPage: 1,
  totalPages: 1,
  totalMovies: 0,
  movie: {},
  movieTrailer: {},
  favoriteMovies: [],
  searchMovies: [],
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    getNowPlayingMovies(state, action) {
      state.movies = action.payload.results;
      state.currentPage = action.payload.page;
      state.totalPages = action.payload.total_pages;
      state.totalMovies = action.payload.total_results;
    },
    getUpcomingMovie(state, action) {
      state.movies = action.payload.results;
      state.currentPage = action.payload.page;
      state.totalPages = action.payload.total_pages;
      state.totalMovies = action.payload.total_results;
    },
    getPopularMovies(state, action) {
      state.movies = action.payload.results;
      state.currentPage = action.payload.page;
      state.totalPages = action.payload.total_pages;
      state.totalMovies = action.payload.total_results;
    },
    getTopRatedMovies(state, action) {
      state.movies = action.payload.results;
      state.currentPage = action.payload.page;
      state.totalPages = action.payload.total_pages;
      state.totalMovies = action.payload.total_results;
    },
    getDetailMovie(state, action) {
      state.movie = action.payload;
    },
    removeDetailMovie(state) {
      state.movie = {};
    },
    getMovieTrailer(state, action) {
      state.movieTrailer = action.payload;
    },
    setFavoriteMovie(state, action) {
      state.favoriteMovies.push(action.payload);
    },
    removeFavoriteMovie(state, action) {
      state.favoriteMovies = state.favoriteMovies.filter(
        (movie) => movie.id !== action.payload
      );
    },
    setSearchMovie(state, action) {
      state.movies = action.payload.results;
      state.currentPage = action.payload.page;
      state.totalPages = action.payload.total_pages;
      state.totalMovies = action.payload.total_results;
    },
  },
});

export const moviesActions = moviesSlice.actions;

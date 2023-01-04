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
  movieActors: [],
  upcomingMoviesPreview: [],
  popularMoviesPreview: [],
  topratedMoviesPreview: [],
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
      state.upcomingMoviesPreview = action.payload.results;
    },
    getPopularMovies(state, action) {
      state.movies = action.payload.results;
      state.currentPage = action.payload.page;
      state.totalPages = action.payload.total_pages;
      state.totalMovies = action.payload.total_results;
      state.popularMoviesPreview = action.payload.results;
    },
    getTopRatedMovies(state, action) {
      state.movies = action.payload.results;
      state.currentPage = action.payload.page;
      state.totalPages = action.payload.total_pages;
      state.totalMovies = action.payload.total_results;
      state.topratedMoviesPreview = action.payload.results;
    },
    removeMovies(state) {
      state.movies = [];
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
    setMovieActors(state, action) {
      state.movieActors = action.payload.cast;
    },
    removeMovieActors(state) {
      state.movieActors = [];
    },
  },
});

export const moviesActions = moviesSlice.actions;

import axios from "axios";
import {
  GET_NOW_PLAYING,
  GET_POPULAR,
  GET_TOP_RATED,
  GET_UPCOMING,
} from "../../apiRoutes";
import { moviesActions } from "./movies-slice";

export const fetchNowPlayingMovies = (page, query) => {
  return async (dispatch) => {
    try {
      let response;
      if (query === "") {
        response = await axios.get(`${GET_NOW_PLAYING}&page=${page}`);
      } else {
        response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=27280631869f4ae80976e4df31f9823a&language=en-US&query=${query}&page=${page}`
        );
      }
      dispatch(moviesActions.getNowPlayingMovies(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchUpcomingMovies = (page, query) => {
  return async (dispatch) => {
    try {
      let response;
      if (query === "") {
        response = await axios.get(`${GET_UPCOMING}&page=${page}`);
      } else {
        response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=27280631869f4ae80976e4df31f9823a&language=en-US&query=${query}&page=${page}`
        );
      }
      dispatch(moviesActions.getUpcomingMovie(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchPopularMovies = (page, query) => {
  return async (dispatch) => {
    try {
      let response;
      if (query === "") {
        response = await axios.get(`${GET_POPULAR}&page=${page}`);
      } else {
        response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=27280631869f4ae80976e4df31f9823a&language=en-US&query=${query}&page=${page}`
        );
      }
      dispatch(moviesActions.getPopularMovies(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchTopRatedMovies = (page, query) => {
  return async (dispatch) => {
    try {
      let response;
      if (query === "") {
        response = await axios.get(`${GET_TOP_RATED}&page=${page}`);
      } else {
        response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=27280631869f4ae80976e4df31f9823a&language=en-US&query=${query}&page=${page}`
        );
      }
      dispatch(moviesActions.getTopRatedMovies(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchDetailMovie = (id) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=27280631869f4ae80976e4df31f9823a&language=en-US`
      );
      const data = await response.data;
      return data;
    };
    try {
      const movie = await fetchData();
      dispatch(moviesActions.getDetailMovie(movie));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchMovieTrailer = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=27280631869f4ae80976e4df31f9823a&language=en-US`
      );
      const data = response.data;
      dispatch(moviesActions.getMovieTrailer(data.results[0].key));
    } catch (e) {
      console.log(e);
    }
  };
};

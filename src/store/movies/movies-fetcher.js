import axios from "axios";
import {
  GET_NOW_PLAYING,
  GET_POPULAR,
  GET_TOP_RATED,
  GET_UPCOMING,
} from "../../apiRoutes";
import { moviesActions } from "./movies-slice";

export const fetchNowPlayingMovies = (page) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${GET_NOW_PLAYING}&page=${page}`);
      dispatch(moviesActions.getNowPlayingMovies(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchUpcomingMovies = (page) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${GET_UPCOMING}&page=${page}`);
      dispatch(moviesActions.getUpcomingMovie(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchPopularMovies = (page) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${GET_POPULAR}&page=${page}`);
      dispatch(moviesActions.getPopularMovies(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchTopRatedMovies = (page) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${GET_TOP_RATED}&page=${page}`);
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

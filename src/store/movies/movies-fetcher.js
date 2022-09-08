import axios from "axios";
import { moviesActions } from "./movies-slice";
import {
  GET_NOW_PLAYING,
  GET_UPCOMING,
  GET_POPULAR,
  GET_TOP_RATED,
} from "../../apiRoutes";

export const fetchNowPlayingMovies = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get(GET_NOW_PLAYING);
      const data = await response.data;
      return data;
    };

    try {
      const movies = await fetchData();
      dispatch(moviesActions.getNowPlayingMovies(movies.results));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchUpcomingMovies = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get(GET_UPCOMING);
      const data = await response.data;
      return data;
    };

    try {
      const movies = await fetchData();
      dispatch(moviesActions.getUpcomingMovie(movies.results));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchPopularMovies = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get(GET_POPULAR);
      const data = await response.data;
      return data;
    };

    try {
      const movies = await fetchData();
      dispatch(moviesActions.getPopularMovies(movies.results));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchTopRatedMovies = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get(GET_TOP_RATED);
      const data = await response.data;
      return data;
    };

    try {
      const movies = await fetchData();
      dispatch(moviesActions.getTopRatedMovies(movies.results));
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


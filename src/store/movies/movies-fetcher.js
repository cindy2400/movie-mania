import axios from "axios";
import {
  GET_NOW_PLAYING,
  GET_POPULAR,
  GET_TOP_RATED,
  GET_UPCOMING,
} from "../../apiRoutes";
import { moviesActions } from "./movies-slice";

export const fetchMovies = (page, query, year, type) => {
  return async (dispatch) => {
    dispatch(moviesActions.setIsLoading(true));
    try {
      let response;
      if (query === "") {
        if (type === "upcoming") {
          response = await axios.get(`${GET_UPCOMING}&page=${page}`);
        } else if (type === "popular") {
          response = await axios.get(`${GET_POPULAR}&page=${page}`);
        } else if (type === "top-rated") {
          response = await axios.get(`${GET_TOP_RATED}&page=${page}`);
        } else {
          response = await axios.get(`${GET_NOW_PLAYING}&page=${page}`);
        }
      } else {
        if (year === "all") {
          response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=27280631869f4ae80976e4df31f9823a&language=en-US&query=${query}&page=${page}`
          );
        } else {
          response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=27280631869f4ae80976e4df31f9823a&language=en-US&query=${query}&page=${page}&year=${year}`
          );
        }
      }
      if (type === "upcoming") {
        dispatch(moviesActions.getUpcomingMovie(response.data));
      } else if (type === "popular") {
        dispatch(moviesActions.getPopularMovies(response.data));
      } else if (type === "top-rated") {
        dispatch(moviesActions.getTopRatedMovies(response.data));
      } else {
        dispatch(moviesActions.getNowPlayingMovies(response.data));
      }
      dispatch(moviesActions.setIsLoading(false));
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

export const fetchDetailActor = (idActor) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/person/${idActor}?api_key=27280631869f4ae80976e4df31f9823a&language=en-US`
      );
      const data = await response.data;
      return data;
    };
    try {
      const actor = await fetchData();
      dispatch(moviesActions.setMovieActor(actor));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchMovieActors = (id) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=27280631869f4ae80976e4df31f9823a&language=en-US`
      );
      const data = await response.data;
      return data;
    };
    try {
      const actors = await fetchData();
      dispatch(moviesActions.setMovieActors(actors));
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

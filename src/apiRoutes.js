const BASE_URL = "https://api.themoviedb.org/3/movie/";
const API_KEY = "27280631869f4ae80976e4df31f9823a";

export const IMAGE_BASEURL = "https://image.tmdb.org/t/p/original/";

export const GET_NOW_PLAYING = `${BASE_URL}now_playing?api_key=${API_KEY}&language=en-US&page=1`;
export const GET_UPCOMING = `${BASE_URL}upcoming?api_key=${API_KEY}&language=en-US&page=1`;
export const GET_POPULAR = `${BASE_URL}popular?api_key=${API_KEY}&language=en-US&page=1`;
export const GET_TOP_RATED = `${BASE_URL}top_rated?api_key=${API_KEY}&language=en-US&page=1`;

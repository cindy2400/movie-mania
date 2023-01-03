import { configureStore } from "@reduxjs/toolkit";
import { moviesSlice } from "./movies/movies-slice";

const store = configureStore({
  reducer: {
    movies: moviesSlice.reducer,
  },
  devTools:
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(),
});

export default store;

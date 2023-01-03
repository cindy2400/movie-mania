import "antd/dist/antd.css";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import DetailMovie from "./components/DetailMovie";
import FavoriteMovies from "./components/FavoriteMovies";
import Header from "./components/Header";
import Home from "./components/Home";

function App() {
  return (
    <>
      <Header />
      <Route path="/" exact>
        <Redirect to="/movies" />
      </Route>
      <Route path="/movies" exact>
        <Home />
      </Route>
      <Route path="/upcoming">
        <Home type="upcoming" />
      </Route>
      <Route path="/popular">
        <Home type="popular" />
      </Route>
      <Route path="/top-rated">
        <Home type="top-rated" />
      </Route>
      <Route path="/favorites">
        <FavoriteMovies />
      </Route>
      <Route path="/movies/:movieId">
        <DetailMovie />
      </Route>
      <Route path="/search" exact>
        <Home />
      </Route>
    </>
  );
}

export default App;

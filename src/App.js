import "antd/dist/antd.css";
import React from "react";
import { Route } from "react-router-dom";
import DetailActor from "./components/DetailActor";
import DetailMovie from "./components/DetailMovie";
import FavoriteMovies from "./components/FavoriteMovies";
import Home from "./components/Home";
import Movies from "./components/Movies";
import Header from "./components/ui/Header";

function App() {
  return (
    <>
      <Header />
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/movies" exact>
        <Movies />
      </Route>
      <Route path="/upcoming">
        <Movies type="upcoming" />
      </Route>
      <Route path="/popular">
        <Movies type="popular" />
      </Route>
      <Route path="/top-rated">
        <Movies type="top-rated" />
      </Route>
      <Route path="/favorites">
        <FavoriteMovies />
      </Route>
      <Route path="/movies/:movieId">
        <DetailMovie />
      </Route>
      <Route path="/search" exact>
        <Movies />
      </Route>
      <Route path="/movieActor/:actorId">
        <DetailActor />
      </Route>
    </>
  );
}

export default App;

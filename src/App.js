import "antd/dist/antd.css";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import Auth from "./components/Auth";
import DetailMovie from "./components/DetailMovie";
import FavoriteMovies from "./components/FavoriteMovies";
import Header from "./components/Header";
import Home from "./components/Home";

function App() {
  const isLogin = useSelector((state) => state.auth.token);

  return (
    <>
      <Header />
      <Route path="/login">
        <Auth type="login" />
      </Route>
      <Route path="/register">
        <Auth type="register" />
      </Route>
      <Route path="/logout" exact>
        <Redirect to="/login" />
      </Route>
      <Route path="/" exact>
        <Redirect to="/login" />
      </Route>
      {isLogin && (
        <>
          <Route path="/login">
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
        </>
      )}
      {!isLogin && (
        <>
          <Route path="/movies">
            <Redirect to="/login" />
          </Route>
          <Route path="*">
            <Redirect to="/login" />
          </Route>
        </>
      )}
    </>
  );
}

export default App;

import React from "react";
import "antd/dist/antd.css";
import Auth from "./components/Auth";
import Home from "./components/Home";
import DetailMovie from "./components/DetailMovie";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./components/Header";

function App() {
  const isLogin = useSelector((state) => state.auth.isLogin);

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

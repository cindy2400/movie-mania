import { PageHeader } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import "../Header.css";
import { authActions } from "../store/auth/auth-slice";

const Header = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.token);

  const logoutHandler = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("loginToken");
  };

  return (
    <div className="site-page-header-ghost-wrapper">
      <PageHeader
        ghost={false}
        title={
          <Link className="title" to="/movies">
            Movie Mania
          </Link>
        }
        extra={
          isLogin
            ? [
                <NavLink activeClassName="link-active" key="4" to="/movies">
                  Now Playing
                </NavLink>,
                <NavLink activeClassName="link-active" key="5" to="/upcoming">
                  Upcoming
                </NavLink>,
                <NavLink activeClassName="link-active" key="6" to="/popular">
                  Popular
                </NavLink>,
                <NavLink activeClassName="link-active" key="7" to="/top-rated">
                  Top Rated
                </NavLink>,
                <NavLink activeClassName="link-active" key="8" to="/favorites">
                  Favorites
                </NavLink>,
                <NavLink
                  activeClassName="link-active"
                  key="3"
                  to="/logout"
                  onClick={logoutHandler}
                >
                  Logout
                </NavLink>,
              ]
            : [
                <NavLink activeClassName="link-active" key="1" to="/login">
                  Login
                </NavLink>,
                <NavLink activeClassName="link-active" key="2" to="/register">
                  Register
                </NavLink>,
              ]
        }
      />
    </div>
  );
};

export default Header;

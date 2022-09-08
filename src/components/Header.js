import React from "react";
import "../Header.css";
import { PageHeader } from "antd";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/auth/auth-slice";

const Header = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.isLogin);

  const logoutHandler = () => {
    dispatch(authActions.logout());
    // localStorage.removeItem('loginToken');
  };

  return (
    <div className="site-page-header-ghost-wrapper">
      <PageHeader
        ghost={false}
        title="Movie Mania"
        extra={
          isLogin
            ? [
                <Link key="4" to="/movies">
                  Now Playing
                </Link>,
                <Link key="5" to="/upcoming">
                  Upcoming
                </Link>,
                <Link key="6" to="/popular">
                  Popular
                </Link>,
                <Link key="7" to="/top-rated">
                  Top Rated
                </Link>,
                <Link key="3" to="/logout" onClick={logoutHandler}>
                  Logout
                </Link>,
              ]
            : [
                <Link key="1" to="/login">
                  Login
                </Link>,
                <Link key="2" to="/register">
                  Register
                </Link>,
              ]
        }
      />
    </div>
  );
};

export default Header;

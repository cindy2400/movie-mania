import { PageHeader } from "antd";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../Header.css";

const Header = () => {
  return (
    <div className="site-page-header-ghost-wrapper">
      <PageHeader
        ghost={false}
        title={
          <Link className="title" to="/movies">
            Movie Mania
          </Link>
        }
        extra={[
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
        ]}
      />
    </div>
  );
};

export default Header;

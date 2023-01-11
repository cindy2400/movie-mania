import { Button, PageHeader } from "antd";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../../Header.css";

const Header = () => {
  return (
    <div className="site-page-header">
      <PageHeader
        className="header-bg"
        ghost={false}
        title={
          <Link className="title" to="/">
            Movie Mania
          </Link>
        }
        extra={[
          <Button key="movies">
            <NavLink activeClassName="link-active" to="/movies?page=1&search=">
              Movies
            </NavLink>
          </Button>,
          <Button key="upcoming">
            <NavLink
              activeClassName="link-active"
              to="/upcoming?page=1&search="
            >
              Upcoming
            </NavLink>
          </Button>,
          <Button key="popular">
            <NavLink activeClassName="link-active" to="/popular?page=1&search=">
              Popular
            </NavLink>
          </Button>,
          <Button key="toprated">
            <NavLink
              activeClassName="link-active"
              to="/top-rated?page=1&search="
            >
              Top rated
            </NavLink>
          </Button>,
          <Button key="favorite" type="danger">
            <NavLink activeClassName="link-active" to="/favorites">
              Favorite
            </NavLink>
          </Button>,
        ]}
      ></PageHeader>
    </div>
  );
};

export default Header;

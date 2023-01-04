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
          <Button key="3">
            <NavLink activeClassName="link-active" to="/movies">
              Now playing
            </NavLink>
          </Button>,
          <Button key="2">
            <NavLink activeClassName="link-active" to="/upcoming">
              Upcoming
            </NavLink>
          </Button>,
          <Button key="2">
            <NavLink activeClassName="link-active" to="/popular">
              Popular
            </NavLink>
          </Button>,
          <Button key="2">
            <NavLink activeClassName="link-active" to="/top-rated">
              Top rated
            </NavLink>
          </Button>,
          <Button key="1" type="danger">
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

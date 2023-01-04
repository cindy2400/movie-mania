import { Empty, Space } from "antd";
import React from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IMAGE_BASEURL } from "../apiRoutes";
import Card from "./ui/Card";

const FavoriteMovies = () => {
  const favoriteMovies = useSelector((state) => state.movies.favoriteMovies);

  return (
    <>
      {favoriteMovies.length === 0 && (
        <div className="m-24">
          <Empty />
        </div>
      )}
      <div style={{ margin: "20px" }}>
        <Space size={[30, 30]} wrap>
          {favoriteMovies.map((movie) => (
            <Link key={movie.id} to={`/movies/${movie.id}`}>
              <Card
                image={`${IMAGE_BASEURL}${movie.poster_path}`}
                title={movie.title}
                date={movie.release_date}
                rating={movie.vote_average}
              />
            </Link>
          ))}
        </Space>
      </div>
    </>
  );
};

export default FavoriteMovies;

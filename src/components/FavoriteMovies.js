import React from "react";
import { useSelector } from "react-redux";
import { Card, Space, Badge, Empty } from "antd";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { IMAGE_BASEURL } from "../apiRoutes";
import { Link } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";

const FavoriteMovies = () => {
  const favoriteMovies = useSelector((state) => state.movies.favoriteMovies);

  return (
    <>
      {favoriteMovies.length === 0 && <Empty />}
      <Space size={[40, 40]} wrap>
        {favoriteMovies.map((movie) => (
          <Badge.Ribbon
            key={movie.id}
            text={movie.vote_average}
            color="volcano"
          >
            <Link to={`/movies/${movie.id}`}>
              <Card
                title={movie.title}
                style={{
                  width: 300,
                }}
              >
                <LazyLoadImage
                  width={250}
                  height="auto"
                  src={`${IMAGE_BASEURL}${movie.poster_path}`}
                  effect="blur"
                />
              </Card>
            </Link>
          </Badge.Ribbon>
        ))}
      </Space>
    </>
  );
};

export default FavoriteMovies;

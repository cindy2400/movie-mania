import { Badge, Card, Empty, Space } from "antd";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IMAGE_BASEURL } from "../apiRoutes";

const FavoriteMovies = () => {
  const favoriteMovies = useSelector((state) => state.movies.favoriteMovies);

  return (
    <>
      {favoriteMovies.length === 0 && <Empty />}
      <div style={{ margin: "20px" }}>
        <Space size={[30, 30]} wrap>
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
                    width: 220,
                  }}
                >
                  <LazyLoadImage
                    width={180}
                    height="auto"
                    src={`${IMAGE_BASEURL}${movie.poster_path}`}
                    effect="blur"
                  />
                </Card>
              </Link>
            </Badge.Ribbon>
          ))}
        </Space>
      </div>
    </>
  );
};

export default FavoriteMovies;

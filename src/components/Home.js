import React, { useEffect } from "react";
import { Card, Space, Image, Badge, Input } from "antd";
import {
  fetchNowPlayingMovies,
  fetchUpcomingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
} from "../store/movies/movies-fetcher";
import { useDispatch, useSelector } from "react-redux";
import { IMAGE_BASEURL } from "../apiRoutes";
import { Link } from "react-router-dom";

const Home = ({ type }) => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);

  useEffect(() => {
    if (type === "upcoming") {
      dispatch(fetchUpcomingMovies());
    } else if (type === "popular") {
      dispatch(fetchPopularMovies());
    } else if (type === "top-rated") {
      dispatch(fetchTopRatedMovies());
    } else {
      dispatch(fetchNowPlayingMovies());
    }
  }, [dispatch, type]);

  return (
    <>
    <br></br>
      <Input placeholder="Search" />
      <Space size={[40, 40]} wrap>
        {movies.map((movie) => (
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
                <Image src={`${IMAGE_BASEURL}${movie.poster_path}`} />
              </Card>
            </Link>
          </Badge.Ribbon>
        ))}
      </Space>
    </>
  );
};

export default Home;

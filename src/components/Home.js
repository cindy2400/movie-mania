import React, { useEffect, useState } from "react";
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
  const [search, setSearch] = useState("");
  const [searchMovies, setSearchMovies] = useState([]);

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

  useEffect(() => {
    const tempSearch = setTimeout(() => {
      const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(search)
      );
      setSearchMovies(filteredMovies);
    }, 500);
    return () => {
      clearTimeout(tempSearch);
    };
  }, [movies, search]);

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <br></br>
      <Input placeholder="Search" onChange={searchHandler} />
      <Space size={[40, 40]} wrap>
        {searchMovies.map((movie) => (
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

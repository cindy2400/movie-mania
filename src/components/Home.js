import React, { useEffect, useState } from "react";
import { Card, Space, Badge, Input, Select, Col, Row, Empty } from "antd";
import {
  fetchNowPlayingMovies,
  fetchUpcomingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
} from "../store/movies/movies-fetcher";
import { useDispatch, useSelector } from "react-redux";
import { IMAGE_BASEURL } from "../apiRoutes";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const { Option } = Select;

const Home = ({ type }) => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState("all");
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
      let filteredMovies = null;
      if (filtered === "all") {
        filteredMovies = movies.filter((movie) =>
          movie.title.toLowerCase().includes(search)
        );
      } else if (filtered !== "all" && search == "") {
        filteredMovies = movies.filter(
          (movie) => movie.original_language == filtered
        );
      } else {
        filteredMovies = movies.filter(
          (movie) =>
            movie.title.toLowerCase().includes(search) &&
            movie.original_language == filtered
        );
      }
      setSearchMovies(filteredMovies);
    }, 500);
    return () => {
      clearTimeout(tempSearch);
    };
  }, [movies, search, filtered]);

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  const handleChange = (value) => {
    setFiltered(value);
  };

  return (
    <>
      <Row style={{ margin: 20 }}>
        <Col span={18} push={6}>
          <Input placeholder="Search" onChange={searchHandler} />
        </Col>
        <Col span={6} pull={18}>
          <Select
            defaultValue="all"
            style={{
              width: 120,
            }}
            onChange={handleChange}
          >
            <Option value="all">All</Option>
            <Option value="en">English</Option>
            <Option value="es">Spain</Option>
            <Option value="hi">Indian</Option>
            <Option value="ja">Japan</Option>
          </Select>
        </Col>
      </Row>
      
      {(searchMovies.length == 0) && <Empty />}

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

export default Home;

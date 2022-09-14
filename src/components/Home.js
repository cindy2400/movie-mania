import { Badge, Card, Col, Input, Row, Select, Space } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IMAGE_BASEURL } from "../apiRoutes";
import {
  fetchNowPlayingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
} from "../store/movies/movies-fetcher";
import Pagination from "./Pagination";

const { Option } = Select;

const Home = ({ type }) => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState("all");
  const [searchMovies, setSearchMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 8;
  const indexOfLastMovie = useMemo(
    () => currentPage * moviesPerPage,
    [currentPage]
  );
  const indexOfFirstMovie = useMemo(
    () => indexOfLastMovie - moviesPerPage,
    [indexOfLastMovie]
  );
  const currentMovies = useMemo(
    () => movies.slice(indexOfFirstMovie, indexOfLastMovie),
    [indexOfFirstMovie, indexOfLastMovie, movies]
  );
  const languages = useMemo(
    () => [...new Set(movies.map((movie) => movie.original_language))],
    [movies]
  );

  const paginateHandler = (pageNumbers) => {
    setCurrentPage(pageNumbers);
  };

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
        filteredMovies = currentMovies.filter((movie) =>
          movie.title.toLowerCase().includes(search)
        );
      } else if (filtered !== "all" && search === "") {
        filteredMovies = currentMovies.filter(
          (movie) => movie.original_language === filtered
        );
      } else {
        filteredMovies = currentMovies.filter(
          (movie) =>
            movie.title.toLowerCase().includes(search) &&
            movie.original_language === filtered
        );
      }
      setSearchMovies(filteredMovies);
    }, 500);
    return () => {
      clearTimeout(tempSearch);
    };
  }, [currentMovies, search, filtered]);

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
            {languages.map((lang) => {
              return (
                <Option key={lang} value={lang}>
                  {lang}
                </Option>
              );
            })}
          </Select>
        </Col>
      </Row>

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
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{ minHeight: "15vh" }}
      >
        <Pagination
          moviesPerPage={moviesPerPage}
          totalMovies={movies.length}
          paginateHandler={paginateHandler}
        />
      </Row>
    </>
  );
};

export default Home;

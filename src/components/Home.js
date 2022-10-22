import { Badge, Card, Col, Input, Pagination, Row, Select, Space } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { IMAGE_BASEURL } from "../apiRoutes";
import {
  fetchNowPlayingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
} from "../store/movies/movies-fetcher";
import { moviesActions } from "../store/movies/movies-slice";
const { Option } = Select;

const Home = ({ type }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const movies = useSelector((state) => state.movies.movies);
  const totalResults = useSelector((state) => state.movies.totalMovies);

  const queryParams = new URLSearchParams(location.search);
  const pageParams =
    queryParams.get("page") == null ? 1 : queryParams.get("page");
  const searchQuery = queryParams.get("search");
  const [search, setSearch] = useState(searchQuery);
  const [currentPage, setCurrentPage] = useState(parseInt(pageParams));

  const languages = useMemo(
    () => [...new Set(movies.map((movie) => movie.original_language))],
    [movies]
  );

  const paginateHandler = (pageNumbers) => {
    setCurrentPage(pageNumbers);
  };

  useEffect(() => {
    if (type === "upcoming") {
      dispatch(fetchUpcomingMovies(pageParams, searchQuery));
    } else if (type === "popular") {
      dispatch(fetchPopularMovies(pageParams, searchQuery));
    } else if (type === "top-rated") {
      dispatch(fetchTopRatedMovies(pageParams, searchQuery));
    } else {
      dispatch(fetchNowPlayingMovies(pageParams, searchQuery));
    }
  }, [dispatch, type, pageParams, searchQuery]);

  useEffect(() => {
    const searchResult = setTimeout(() => {
      history.push(`${location.pathname}?page=${currentPage}&search=${search}`);
    }, 1000);

    return () => {
      clearTimeout(searchResult);
    };
  }, [search, dispatch, history, location.pathname, currentPage]);

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  const handleChange = (value) => {
    // setFiltered(value);
  };

  const removeDetailBeforeHandler = () => {
    dispatch(moviesActions.removeDetailMovie());
  };

  return (
    <>
      <Row style={{ margin: 20 }}>
        <Col span={18} push={6}>
          <Input placeholder="Search" onChange={searchHandler} value={search} />
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
        {movies.map((movie) => (
          <Badge.Ribbon
            key={movie.id}
            text={movie.vote_average}
            color="volcano"
          >
            <Link
              onClick={removeDetailBeforeHandler}
              to={`/movies/${movie.id}`}
            >
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
          pageSize={20}
          total={totalResults}
          onChange={paginateHandler}
          current={currentPage}
        />
        {/* <Pagination totalPages={totalPages} paginateHandler={paginateHandler} /> */}
      </Row>
    </>
  );
};

export default Home;

// useEffect(() => {
//   const tempSearch = setTimeout(() => {
//     let filteredMovies = null;
//     if (filtered === "all") {
//       filteredMovies = movies.filter((movie) =>
//         movie.title.toLowerCase().includes(search)
//       );
//     } else if (filtered !== "all" && search === "") {
//       filteredMovies = movies.filter(
//         (movie) => movie.original_language === filtered
//       );
//     } else {
//       filteredMovies = movies.filter(
//         (movie) =>
//           movie.title.toLowerCase().includes(search) &&
//           movie.original_language === filtered
//       );
//     }
//     setSearchMovies(filteredMovies);
//   }, 500);
//   return () => {
//     clearTimeout(tempSearch);
//   };
// }, [movies, search, filtered]);

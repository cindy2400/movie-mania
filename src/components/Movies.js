import { Col, Input, Pagination, Row, Select } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { IMAGE_BASEURL } from "../apiRoutes";
import { fetchMovies } from "../store/movies/movies-fetcher";
import { moviesActions } from "../store/movies/movies-slice";
import Card from "./ui/Card";
const { Option } = Select;

const Movies = ({ type }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const movies = useSelector((state) => state.movies.movies);
  const totalResults = useSelector((state) => state.movies.totalMovies);

  const queryParams = new URLSearchParams(location.search);
  const pageParams =
    queryParams.get("page") == null ? 1 : queryParams.get("page");
  const searchQuery = queryParams.get("search");
  const searchTemp = searchQuery === null ? "" : searchQuery;
  const [yearFilter, setYearFilter] = useState("all");
  const [search, setSearch] = useState(searchTemp);
  const [currentPage, setCurrentPage] = useState(parseInt(pageParams));

  const releaseYear = useMemo(() => {
    let arrYear = [];
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= 1990; i--) {
      arrYear.push(i);
    }
    return arrYear;
  }, []);

  const paginateHandler = (pageNumbers) => {
    setCurrentPage(pageNumbers);
  };

  useEffect(() => {
    dispatch(fetchMovies(pageParams, searchTemp, yearFilter, type));
  }, [dispatch, type, pageParams, searchTemp, yearFilter]);

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
    setYearFilter(value);
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
            disabled={searchTemp === ""}
            style={{
              width: 120,
            }}
            onChange={handleChange}
          >
            <Option value="all">All</Option>
            {releaseYear.map((year) => {
              return (
                <Option key={year} value={year}>
                  {year}
                </Option>
              );
            })}
          </Select>
        </Col>
      </Row>

      <div className="flex flex-wrap space-x-4 justify-center">
        {movies.map((movie) => (
          <Link to={`/movies/${movie.id}`}>
            <Card
              onClick={removeDetailBeforeHandler}
              image={`${IMAGE_BASEURL}${movie.poster_path}`}
              title={movie.title}
              date={movie.release_date}
              rating={movie.vote_average}
            />
          </Link>
        ))}
      </div>

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

export default Movies;

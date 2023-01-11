import { Empty, Pagination, Row, Select } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { IMAGE_BASEURL } from "../apiRoutes";
import { fetchMovies } from "../store/movies/movies-fetcher";
import { moviesActions } from "../store/movies/movies-slice";
import Card from "./ui/Card";
import Loading from "./ui/Loading";
const { Option } = Select;

const Movies = ({ type }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const movies = useSelector((state) => state.movies.movies);
  const totalResults = useSelector((state) => state.movies.totalMovies);
  const isLoading = useSelector((state) => state.movies.isLoading);

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

  const bodyElement = (isLoading, movies) => {
    if (isLoading) {
      return <Loading />;
    } else if (!isLoading && movies.length === 0) {
      return (
        <div className="m-24">
          <Empty />
        </div>
      );
    } else {
      return (
        <>
          <div className="flex flex-wrap">
            {movies.map((movie) => (
              <Link
                className="basis-1/5 grow"
                key={movie.id}
                to={`/movies/${movie.id}`}
              >
                <Card
                  onClick={removeDetailBeforeHandler}
                  image={`${IMAGE_BASEURL}${movie.poster_path}`}
                  title={movie.title}
                  date={movie.release_date}
                  rating={movie.vote_average}
                  className="m-auto mt-6"
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
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-sky-800 to-stone-500 mb-6">
        <div className="p-6">
          <p className="text-white text-2xl font-semibold m-0 capitalize">
            {type || "Movies"}
          </p>
          <div className="flex ">
            <input
              type="text"
              className="mb-2 mt-3 mr-6 pl-4 w-full h-12 rounded-full text-md"
              placeholder="Search movie title"
              onChange={searchHandler}
              value={search}
            />
            <div className="mt-5">
              <Select
                defaultValue="all"
                className="w-40"
                disabled={searchTemp === ""}
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
            </div>
          </div>
        </div>
      </div>

      {bodyElement(isLoading, movies)}
    </>
  );
};

export default Movies;

import React, { useEffect } from "react";
import { fetchDetailMovie } from "../store/movies/movies-fetcher";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Card, Row, Space, Image } from "antd";
import { IMAGE_BASEURL } from "../apiRoutes";
const { Meta } = Card;

const DetailMovie = () => {
  const dispatch = useDispatch();
  const movieDetail = useSelector((state) => state.movies.movie);
  const param = useParams();
  const { movieId } = param;

  useEffect(() => {
    dispatch(fetchDetailMovie(movieId));
  }, [dispatch, movieId]);

  return (
    <>
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{ minHeight: "100vh" }}
      >
        <Badge.Ribbon text={movieDetail.original_language} color="green">
          <Card
            hoverable
            style={{
              width: 800,
            }}
            cover={<img src={`${IMAGE_BASEURL}${movieDetail.backdrop_path}`} />}
          >
            {movieDetail.genres &&
              movieDetail.genres.map((genre) => {
                return <p>{genre.name}</p>;
              })}
            <Meta
              title={movieDetail.title}
              description={movieDetail.overview}
            />
          </Card>
        </Badge.Ribbon>
      </Row>
    </>
  );
};

export default DetailMovie;

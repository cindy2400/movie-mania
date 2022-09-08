import React, { useEffect } from "react";
import { fetchDetailMovie } from "../store/movies/movies-fetcher";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Card, Row, Button, message } from "antd";
import { IMAGE_BASEURL } from "../apiRoutes";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { moviesActions } from "../store/movies/movies-slice";

const { Meta } = Card;

const DetailMovie = () => {
  const dispatch = useDispatch();
  const data = useLocation();
  const history = useHistory();
  const movieDetail = useSelector((state) => state.movies.movie);
  const param = useParams();
  const { movieId } = param;

  useEffect(() => {
    dispatch(fetchDetailMovie(movieId));
  }, [dispatch, movieId]);

  const favoriteMovieHandler = (favoriteMovie) => {
    dispatch(moviesActions.setFavoriteMovie(favoriteMovie));
    message.success("Movie added to favorite");
  };

  const removeMovieHandler = (movieId) => {
    dispatch(moviesActions.removeFavoriteMovie(movieId));
    message.info("Movie removed from favorite");
    history.push("/favorites");
  };

  const favRemoveButton = () => {
    if (data.state != null) {
      return (
        <Button
          type="dashed"
          style={{ marginBottom: 20 }}
          danger
          onClick={() => removeMovieHandler(movieDetail.id)}
        >
          Remove
        </Button>
      );
    } else {
      return (
        <Button
          type="primary"
          style={{ marginBottom: 20 }}
          danger
          onClick={() => favoriteMovieHandler(movieDetail)}
        >
          Favorites
        </Button>
      );
    }
  };

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
            cover={
              <LazyLoadImage
                src={`${IMAGE_BASEURL}${movieDetail.backdrop_path}`}
              />
            }
          >
            {favRemoveButton()}

            {movieDetail.genres &&
              movieDetail.genres.map((genre) => {
                return <p key={genre.id}>{genre.name}</p>;
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

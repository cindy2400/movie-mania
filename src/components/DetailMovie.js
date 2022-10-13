import { Badge, Button, Card, message, Row } from "antd";
import React, { useEffect, useMemo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IMAGE_BASEURL } from "../apiRoutes";
import {
  fetchDetailMovie,
  fetchMovieTrailer,
} from "../store/movies/movies-fetcher";
import { moviesActions } from "../store/movies/movies-slice";

const { Meta } = Card;

const DetailMovie = () => {
  const dispatch = useDispatch();
  const movieDetail = useSelector((state) => state.movies.movie);
  const favMovie = useSelector((state) => state.movies.favoriteMovies);
  const movieTrailerInfo = useSelector((state) => state.movies.movieTrailer);
  const param = useParams();
  const { movieId } = param;
  const isFavoriteMovie = useMemo(
    () => favMovie.some((movie) => movieId == movie.id),
    [favMovie, movieId]
  );

  useEffect(() => {
    dispatch(fetchDetailMovie(movieId));
    dispatch(fetchMovieTrailer(movieId));
  }, [dispatch, movieId]);

  const favoriteMovieHandler = (favoriteMovie) => {
    dispatch(moviesActions.setFavoriteMovie(favoriteMovie));
    message.success("Movie added to favorite");
  };

  const removeMovieHandler = (movieId) => {
    dispatch(moviesActions.removeFavoriteMovie(movieId));
    message.info("Movie removed from favorite");
  };

  const favRemoveButton = (isFavoriteMovie) => {
    if (isFavoriteMovie) {
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
            {favRemoveButton(isFavoriteMovie)}

            {movieDetail.genres &&
              movieDetail.genres.map((genre) => {
                return <p key={genre.id}>{genre.name}</p>;
              })}
            <Meta
              title={movieDetail.title}
              description={movieDetail.overview}
            />
            <iframe
              width="500"
              height="300"
              style={{ marginTop: "20px" }}
              title="Movie Trailer"
              src={`https://www.youtube.com/embed/${movieTrailerInfo}`}
            />
          </Card>
        </Badge.Ribbon>
      </Row>
    </>
  );
};

export default DetailMovie;

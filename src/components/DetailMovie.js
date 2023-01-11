import { Card, message } from "antd";
import React, { useEffect, useMemo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { IMAGE_BASEURL } from "../apiRoutes";
import {
  fetchDetailMovie,
  fetchMovieActors,
  fetchMovieTrailer,
} from "../store/movies/movies-fetcher";
import { moviesActions } from "../store/movies/movies-slice";
import { isEmpty } from "../util/helper";
import Loading from "./ui/Loading";

const { Meta } = Card;

const DetailMovie = () => {
  const dispatch = useDispatch();
  const movieDetail = useSelector((state) => state.movies.movie);
  const favMovie = useSelector((state) => state.movies.favoriteMovies);
  const movieTrailerInfo = useSelector((state) => state.movies.movieTrailer);
  const movieActors = useSelector((state) => state.movies.movieActors);
  const param = useParams();
  const { movieId } = param;
  const isFavoriteMovie = useMemo(
    () => favMovie.some((movie) => +movieId === +movie.id),
    [favMovie, movieId]
  );

  useEffect(() => {
    dispatch(fetchDetailMovie(movieId));
    dispatch(fetchMovieTrailer(movieId));
    dispatch(fetchMovieActors(movieId));
    return () => dispatch(moviesActions.removeMovieActors());
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
        <div className="flex-1 m-2">
          <div className="flex">
            <button
              className="bg-yellow-800 p-3 pl-5 pr-5 m-2 text-white rounded-full border border-yellow-500"
              onClick={() => removeMovieHandler(movieDetail.id)}
            >
              &hearts;
            </button>
            <p className="text-white text-md font-semibold mt-3 w-24 ">
              Remove from favorite
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex-1 m-2">
          <div className="flex">
            <button
              className="bg-red-800 p-3 pl-5 pr-5 m-2 text-white rounded-full border border-red-500"
              onClick={() => favoriteMovieHandler(movieDetail)}
            >
              &hearts;
            </button>
            <p className="text-white text-md font-semibold mt-3 w-12 ">
              Add to favorite
            </p>
          </div>
        </div>
      );
    }
  };

  if (isEmpty(movieDetail)) return <Loading />;
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${IMAGE_BASEURL}${movieDetail.backdrop_path})`,
          width: "100%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundColor: "rgb(51 65 85)",
        }}
      >
        <div className="flex bg-[rgba(1,1,1,0.7)]">
          <div className="flex-none w-2/5">
            <LazyLoadImage
              src={`${IMAGE_BASEURL}${movieDetail.poster_path}`}
              className="w-3/5 m-9 ml-32 rounded-xl"
            />
          </div>

          <div className="flex-auto w-3/5 mt-9 mr-24">
            <p className="text-white text-4xl uppercase font-bold m-3">
              {movieDetail.title}
            </p>
            <p className="text-white text-md font-normal m-3">
              {movieDetail.status} &bull;{" "}
              {new Date(movieDetail.release_date).toLocaleDateString("en-us", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}{" "}
              &bull; {movieDetail.runtime} minutes
            </p>

            <div className="flex">
              <div className="flex-none m-2">
                <div className="flex">
                  <button className="bg-slate-800 p-3 pl-3 pr-3 m-2 text-white rounded-full border border-green-500">
                    {Math.ceil(movieDetail.vote_average) * 10}%
                  </button>
                  <p
                    className="text-white text-md
                   font-semibold mt-3 w-12"
                  >
                    User score
                  </p>
                </div>
              </div>
              {favRemoveButton(isFavoriteMovie)}
            </div>

            <p className="text-slate-300 text-xl font-normal m-3 italic">
              {movieDetail.tagline}
            </p>
            <p className="text-white text-xl font-semibold m-3">Overview</p>
            <p className="text-white text-md font-normal m-3">
              {movieDetail.overview}
            </p>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {movieDetail.production_companies?.map((company) => (
                <div>
                  <p className="text-white text-md font-semibold m-3 truncate">
                    {company.name}
                  </p>
                  <p className="text-white text-md font-normal m-3">
                    {company.origin_country}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div class="flex">
        <div class="basis-3/4 m-6 overflow-x-scroll">
          <p className="text-black text-2xl font-semibold">Actor</p>
          <div className=" flex overflow-x-scroll">
            {movieActors.map((actor) => (
              <Link to={`/movieActor/${actor.id}`}>
                <Card
                  hoverable
                  style={{
                    width: 150,
                    marginRight: 16,
                    marginBottom: 12,
                    borderRadius: 12,
                  }}
                  cover={
                    <LazyLoadImage
                      src={`${IMAGE_BASEURL}${actor.profile_path}`}
                      style={{
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                  }
                >
                  <Meta
                    title={actor.name}
                    className="truncate"
                    description={actor.character}
                    style={{
                      fontSize: 12,
                    }}
                  />
                </Card>
              </Link>
            ))}
          </div>

          <p className="text-black text-2xl font-semibold mt-5">Trailer</p>
          <iframe
            width="500"
            height="300"
            style={{ marginTop: "20px" }}
            title="Movie Trailer"
            allowFullScreen
            src={`https://www.youtube.com/embed/${movieTrailerInfo}`}
          />
        </div>

        <div class="basis-1/4 m-6">
          <p className="text-black text-lg font-bold">Original title</p>
          <p className="text-black text-md font-semibold">
            {movieDetail.original_title}
          </p>
          <p className="text-black text-lg font-bold">Genres</p>
          <p className="text-black text-md font-semibold">
            {movieDetail.genres?.map((genre) => (
              <p>{genre.name}</p>
            ))}
          </p>
          <p className="text-black text-lg font-bold">Spoken Language</p>
          {movieDetail.spoken_languages?.map((lang) => (
            <p className="text-black text-md font-semibold">{lang.name}</p>
          ))}
          <p className="text-black text-lg font-bold">Budget</p>
          <p className="text-black text-md font-semibold">
            {movieDetail.budget}
          </p>
        </div>
      </div>
    </>
  );
};

export default DetailMovie;

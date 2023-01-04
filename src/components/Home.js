import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IMAGE_BASEURL } from "../apiRoutes";
import { fetchMovies } from "../store/movies/movies-fetcher";
import Card from "./ui/Card";

const Home = () => {
  const dispatch = useDispatch();
  const upcomingMoviesPreview = useSelector(
    (state) => state.movies.upcomingMoviesPreview
  );
  const popularMoviesPreview = useSelector(
    (state) => state.movies.popularMoviesPreview
  );
  const topratedMoviesPreview = useSelector(
    (state) => state.movies.topratedMoviesPreview
  );

  useEffect(() => {
    dispatch(fetchMovies(1, "", "all", "upcoming"));
    dispatch(fetchMovies(1, "", "all", "popular"));
    dispatch(fetchMovies(1, "", "all", "top-rated"));
  }, [dispatch]);

  return (
    <>
      <div className="bg-gradient-to-r from-sky-800 to-stone-500">
        <div className="p-12">
          <p className="text-white text-5xl font-bold m-0">Welcome</p>
          <p className="text-white text-2xl font-semibold m-0">
            Millions of movies to discover. Explore now.
          </p>
          <input
            type="text"
            className="mb-4 mt-9 pl-4 w-full h-12 rounded-full text-md"
            placeholder="Search movie title"
          />
        </div>
      </div>
      <div className="m-9">
        <p className="text-black text-2xl font-semibold">Upcoming</p>
        <div className="flex overflow-x-scroll">
          {upcomingMoviesPreview?.map((movie) => (
            <Link to={`/movies/${movie.id}`}>
              <Card
                image={`${IMAGE_BASEURL}${movie.poster_path}`}
                title={movie.title}
                date={movie.release_date}
                rating={movie.vote_average}
              />
            </Link>
          ))}
        </div>
        <p className="text-black text-2xl font-semibold mt-8">Popular</p>
        <div className="flex overflow-x-scroll">
          {popularMoviesPreview?.map((movie) => (
            <Link to={`/movies/${movie.id}`}>
              <Card
                image={`${IMAGE_BASEURL}${movie.poster_path}`}
                title={movie.title}
                date={movie.release_date}
                rating={movie.vote_average}
              />
            </Link>
          ))}
        </div>
        <p className="text-black text-2xl font-semibold mt-8">Top rated</p>
        <div className="flex overflow-x-scroll">
          {topratedMoviesPreview?.map((movie) => (
            <Link to={`/movies/${movie.id}`}>
              <Card
                image={`${IMAGE_BASEURL}${movie.poster_path}`}
                title={movie.title}
                date={movie.release_date}
                rating={movie.vote_average}
              />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;

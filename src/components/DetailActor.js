import { useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IMAGE_BASEURL } from "../apiRoutes";
import { fetchDetailActor } from "../store/movies/movies-fetcher";
import { moviesActions } from "../store/movies/movies-slice";
import { isEmpty } from "../util/helper";
import Loading from "./ui/Loading";

const DetailActor = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { actorId } = params;
  const detailActor = useSelector((state) => state.movies.movieActor);

  useEffect(() => {
    dispatch(fetchDetailActor(actorId));

    return () => dispatch(moviesActions.removeMovieActor());
  }, [actorId, dispatch]);

  if (isEmpty(detailActor)) return <Loading />;
  return (
    <div className="flex flex-row m-9">
      <div className="basis-1/4">
        <LazyLoadImage
          src={`${IMAGE_BASEURL}${detailActor.profile_path}`}
          className="rounded-xl"
        />
      </div>
      <div className="basis-3/4">
        <div className="flex flex-col ml-9">
          <p className="text-4xl capitalize font-bold mt-2 mb-3">
            {detailActor.name}
          </p>

          <div className="flex">
            {detailActor.also_known_as?.map((name) => (
              <p className="text-normal capitalize font-semibold">
                {name + ","}&nbsp;&nbsp;
              </p>
            ))}
          </div>

          <div className="flex mb-6 mt-6">
            <div className="mr-12">
              <p className="text-xl font-semibold mb-2">Place of birth</p>
              <p>{detailActor.place_of_birth || "-"}</p>
            </div>
            <div className="mr-12">
              <p className="text-xl font-semibold mb-2">Birthday</p>
              <p>{detailActor.birthday || "-"}</p>
            </div>
            <div className="mr-12">
              <p className="text-xl font-semibold mb-2">known for department</p>
              <p>{detailActor.known_for_department || "-"}</p>
            </div>
          </div>

          <p className="text-xl font-semibold mb-4">Biography</p>
          <p className="font-normal">{detailActor.biography || "-"}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailActor;

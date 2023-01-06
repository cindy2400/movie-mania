import { Badge } from "antd";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Card = ({ image, title, date, rating, className, onClick }) => {
  return (
    <div
      className={`rounded-lg m-3 w-40 max-h-full ${className}`}
      onClick={onClick}
    >
      <Badge.Ribbon key={1} text={rating} color="volcano">
        <LazyLoadImage
          className="rounded-2xl w-64"
          height="auto"
          src={image}
          effect="blur"
        />
        <p className="text-black text-base font-bold m-0 truncate">{title}</p>
        <p className="text-black">{date}</p>
      </Badge.Ribbon>
    </div>
  );
};

export default Card;

import { FC } from "react";
import { FaRegStarHalfStroke, FaRegStar, FaStar } from "react-icons/fa6";

export const RatingStar: FC<{ rating: number }> = ({ rating }) => {
  const ratingStars = [];
  const fractionalRating = rating - Math.floor(rating);

  for (let i = 1; i <= Math.floor(rating); i++) {
    ratingStars.push(
      <FaStar key={i} style={{ color: "hsl(338, 80%, 65%)" }} />
    );
  }

  if (fractionalRating < 0.5 && fractionalRating != 0) {
    ratingStars.push(
      <FaRegStar
        key={fractionalRating}
        style={{ color: "hsl(338, 80%, 65%)" }}
      />
    );
  } else if (fractionalRating >= 0.5) {
    ratingStars.push(
      <FaRegStarHalfStroke
        key={fractionalRating}
        style={{ color: "hsl(338, 80%, 65%)" }}
      />
    );
  }

  for (let i = 5; i > Math.ceil(rating); i--) {
    ratingStars.push(
      <FaRegStar key={i * i + i} style={{ color: "hsl(338, 80%, 65%)" }} />
    );
  }

  return <div className="flex w-full justify-between">{...ratingStars}</div>;
};

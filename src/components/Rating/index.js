import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Rating = ({ value, maxValue }) => {
  const renderStars = () => {
    return Array(maxValue)
      .fill()
      .map((_, index) => {
        const StarIcon = index + 1 <= value ? AiFillStar : AiOutlineStar;
        return <StarIcon key={index} className="star" color={"orange"} />;
      });
  };

  return <div className="rating">{renderStars()}</div>;
};

export default Rating;

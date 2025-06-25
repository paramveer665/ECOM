// components/RatingBar.js
import React from "react";
import { Img } from "..";

const RatingBar = ({
  value,
  isEditable = false,
  color = "#000000",
  activeColor = "#000000",
  size = 20,
  className = "",
  onChange,
}) => {
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const handleClick = (newValue) => {
    if (isEditable && onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className={`flex items-center ${className}`}>
      {/* Full stars */}
      {[...Array(fullStars)].map((_, i) => (
        <button
          key={`full-${i}`}
          type="button"
          onClick={() => handleClick(i + 1)}
          disabled={!isEditable}
          className={isEditable ? "cursor-pointer" : "cursor-default"}
        >
          <Img
            src="star-svgrepo-com.svg" // You'll need to provide this image
            width={size}
            height={size}
            alt="Full star"
            style={{ color: activeColor }}
            className="h-[20px] w-[20px]"
          />
        </button>
      ))}

      {/* Half star */}
      {hasHalfStar && (
        <button
          type="button"
          onClick={() => handleClick(fullStars + 0.5)}
          disabled={!isEditable}
          className={isEditable ? "cursor-pointer" : "cursor-default"}
        >
          <Img
            src="star-half-svgrepo-com.svg" // You'll need to provide this image
            width={size}
            height={size}
            alt="Half star"
            style={{ color: activeColor }}
            className="h-[20px] w-[20px]"
          />
        </button>
      )}

      {/* Empty stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <button
          key={`empty-${i}`}
          type="button"
          onClick={() => handleClick(fullStars + (hasHalfStar ? 1 : 0) + i + 1)}
          disabled={!isEditable}
          className={isEditable ? "cursor-pointer" : "cursor-default"}
        >
          <Img
            src="empty-pentagram.svg" // You'll need to provide this image
            width={size}
            height={size}
            alt="Empty star"
            style={{ color }}
            className="h-[20px] w-[20px]"
          />
        </button>
      ))}
    </div>
  );
};

export default RatingBar;
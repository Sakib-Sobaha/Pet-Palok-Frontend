import React from "react";

function Rating({ rating }) {
  // Ensure the rating is within the valid range (0 to 5)
  const validRating = Math.max(0, Math.min(rating, 5));

  // Calculate the percentage for the radial progress
  const percentage = (validRating / 5) * 100;

  // Determine the color based on the rating
  let colorClass = "bg-orange-200 border-orange-400";
  if (validRating > 4) {
    colorClass = "bg-green-200 border-green-400";
  } else if (validRating < 1.5) {
    colorClass = "bg-red-200 border-red-400";
  }

  return (
    <div
      className={`radial-progress ${colorClass} progress-success text-primary-content border-4`}
      style={{ "--value": percentage , "--size": "4rem"  }}
      role="progressbar"
    >
      {Math.round(validRating * 10) / 10}
    </div>
  );
}

export default Rating;

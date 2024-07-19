import React from "react";

function Rating() {
  return (
    <div className="rating m-1 pl-2">
      <input
        type="radio"
        name="rating-4"
        className="mask mask-star-2 bg-green-500"
      />
      <input
        type="radio"
        name="rating-4"
        className="mask mask-star-2 bg-green-500"
        defaultChecked
      />
      <input
        type="radio"
        name="rating-4"
        className="mask mask-star-2 bg-green-500"
      />
      <input
        type="radio"
        name="rating-4"
        className="mask mask-star-2 bg-green-500"
        
      />
      <input
        type="radio"
        name="rating-4"
        className="mask mask-star-2 bg-green-500"
      />
    </div>
  );
}

export default Rating;

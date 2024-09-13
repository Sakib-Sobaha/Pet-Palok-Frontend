import React from "react";

const RatingInputCustom = ({ rating, setRating }) => {
  return (
    <div className="flex items-center align-middle ml-10 gap-0 space-x-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <label key={star} className="cursor-pointer">
          <input
            type="radio"
            name="rating"
            value={star}
            className="hidden" // Hide the default radio button
            checked={rating === star}
            onChange={() => setRating(star)}
          />
          <svg
            className={`w-6 h-6 ${
              rating >= star ? "text-orange-500" : "text-orange-200"
            } fill-current`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 .587l3.668 7.568L24 9.627l-6 5.849L19.335 24 12 19.897 4.665 24 6 15.476l-6-5.849 8.332-1.472z" />
          </svg>
        </label>
      ))}
    </div>
  );
};

export default RatingInputCustom;

import React from "react";

const LeftLayoutVetDirectory = ({ onSortChange, onSearchChange, onRatingRangeChange, ratingRange }) => {
  const handleMinRatingChange = (event) => {
    onRatingRangeChange((prevRange) => ({
      ...prevRange,
      min: Math.min(event.target.value, ratingRange.max - 0.1),
    }));
  };

  const handleMaxRatingChange = (event) => {
    onRatingRangeChange((prevRange) => ({
      ...prevRange,
      max: Math.max(event.target.value, ratingRange.min + 0.1),
    }));
  };

  const handleSearchChange = (event) => {
    onSearchChange(event.target.value);
  };

  return (
    <div className="flex-1 bg-base-200 p-2 min-h-screen rounded-lg">
      <div className="flex flex-auto">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-primary max-w-36 mb-4 mr-2"
          onChange={handleSearchChange}
        />
        <button className="btn btn-primary flex-auto w-4 mb-4">Search</button>
      </div>

      <div className="p-1 pt-0 mt-0 mb-3 flex flex-auto">
        <select className="select select-primary w-full h-10 rounded-md" onChange={(e) => onSortChange(e.target.value)}>
          <option value="" disabled>
            Sort by...
          </option>
          <option>Rating Low to High</option>
          <option>Rating High to Low</option>
        </select>
      </div>

      <p className="font-extrabold text-xl">
        <img
          src="https://img.icons8.com/ios/452/filter.png"
          alt="filter"
          className="w-6 h-6 float-left mr-3"
        />
        Filters:
      </p>

      <p className="font-bold pb-2 pl-1 pt-3">Rating</p>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <p className="font-semibold">From:</p>
          <input
            type="range"
            min={1}
            max={5}
            step={0.1}
            value={ratingRange.min}
            className="range"
            onChange={handleMinRatingChange}
          />
          <div className="pl-0 mt-2">
            <kbd className="text-lg kbd font-medium">{ratingRange.min}</kbd>
          </div>
        </div>

        <div>
          <p className="font-semibold">To:</p>
          <input
            type="range"
            min={1}
            max={5}
            step={0.1}
            value={ratingRange.max}
            className="range"
            onChange={handleMaxRatingChange}
          />
          <div className="pl-0 mt-2">
            <kbd className="text-lg kbd font-medium">{ratingRange.max}</kbd>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftLayoutVetDirectory;

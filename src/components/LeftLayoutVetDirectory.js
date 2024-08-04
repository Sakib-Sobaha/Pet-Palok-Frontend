import React, { useState } from "react";

const LeftLayoutVetDirectory = ({ type }) => {
  const [ageRange, setAgeRange] = useState({ min: 1, max: 20 });

  // Handler function to update age range
  const handleMinAgeChange = (event) => {
    setAgeRange((prevRange) => ({
      ...prevRange,
      min: Math.min(event.target.value, ageRange.max - 1),
    }));
  };

  const handleMaxAgeChange = (event) => {
    setAgeRange((prevRange) => ({
      ...prevRange,
      max: Math.max(event.target.value, ageRange.min + 1),
    }));
  };

  return (
    <div className="flex-1 bg-base-200 p-2 min-h-screen rounded-lg">
      <br />
      <button
        className="btn btn-primary rounded-md flex flex-auto items-center justify-center w-56 ml-2 mb-4"
        onClick={() =>
          document.getElementById("create_pet_profile").showModal()
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-5 w-5 flex"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            d="M12 4v16m8-8H4"
          />
        </svg>
        <span className="font-bold">Create Pet Profile</span>
      </button>

      <div className="flex flex-auto">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-primary max-w-36 mb-4 mr-2"
        />
        <button className="btn btn-primary flex-auto w-4 mb-4">Search</button>
      </div>

      <div className="p-1 pt-0 mt-0 mb-3 flex flex-auto">
        <select className="select select-primary w-full h-10 rounded-md">
          <option disabled selected>
            Sort by...
          </option>
          <option>Age Low to High</option>
          <option>Age High to Low</option>
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

      <p className="font-bold pb-2 pl-1 pt-3">Age</p>
      <div className="grid grid-cols-2 gap-2">
        {/* From Age */}
        <div>
          <p className="font-semibold">From:</p>
          <input
            type="range"
            min={1}
            max={20}
            value={ageRange.min}
            className="range"
            onChange={handleMinAgeChange}
          />
          <div className="pl-0 mt-2">
            <kbd className="text-lg kbd font-medium">{ageRange.min}</kbd>
          </div>
        </div>

        {/* To Age */}
        <div>
          <p className="font-semibold">To:</p>
          <input
            type="range"
            min={1}
            max={20}
            value={ageRange.max}
            className="range"
            onChange={handleMaxAgeChange}
          />
          <div className="pl-0 mt-2">
            <kbd className="text-lg kbd font-medium">{ageRange.max}</kbd>
          </div>
        </div>
      </div>

      <p className="font-bold pb-2 pl-1 pt-3">Type</p>
      <div className="flex flex-col">
        <label className="label cursor-pointer">
          <span className="label-text">Bird</span>
          <input type="checkbox" defaultChecked className="checkbox" />
        </label>
        <label className="label cursor-pointer">
          <span className="label-text">Fish</span>
          <input type="checkbox" defaultChecked className="checkbox" />
        </label>
        <label className="label cursor-pointer">
          <span className="label-text">Animal</span>
          <input type="checkbox" defaultChecked className="checkbox" />
        </label>
        

        <div className="flex">
          <button className="btn btn-primary w-28 mt-4 mr-1 align-middle">
            Apply
          </button>
          <button className="btn btn-secondary w-28 mt-4 align-middle">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeftLayoutVetDirectory;

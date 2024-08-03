import React from "react";
import { useState } from "react";
const LeftLayoutPets = ({ type }) => {
  const [age, setAge] = useState(0);

  // Handler function to update state when range input changes
  const handleRangeChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div className="flex-1 bg-base-200 p-4 min-h-screen h-full rounded-lg">
      {/* Your content for LeftLayout */}
      <br />
      <button className="btn btn-primary w-full mb-4">
        {" "}
        <b className="font-extrabold">
          <b>+</b>
        </b>
        Create New Pet-Profile
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
          {/* <option>Rating Low to High</option>
          <option>Rating High to Low</option> */}
        </select>
        {/* <button className="btn btn-primary flex-auto w-4 mb-4 rounded-md">Sort</button> */}
      </div>

      <p className="font-extrabold text-xl">
        <img
          src="https://img.icons8.com/ios/452/filter.png"
          alt="filter"
          className="w-6 h-6 float-left mr-3"
          color=""
        />
        Filters:
      </p>

      <p className="font-bold pb-2 pl-1 pt-3">Age</p>
      <input
        type="range"
        min={1}
        max={20}
        value={age} // Set the current value of the input
        className="range"
        onChange={handleRangeChange} // Update state on change
      />
      <div className="pl-0 mt-2">
        <kbd className="text-lg kbd font-medium">{age}</kbd>{" "}
        {/* Display the current value */}
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
        <label className="label cursor-pointer">
          <span className="label-text">Dog</span>
          <input type="checkbox" defaultChecked className="checkbox" />
        </label>

        <div className="flex">
          <button className="btn btn-primary w-28 mt-4 mr-1 align-middle">
            {/* <img src="https://cdn4.iconfinder.com/data/icons/essentials-73/24/040_-_Tick-512.png" alt="filter" className="w-6 h-6 float-left mr-3" /> */}
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

export default LeftLayoutPets;

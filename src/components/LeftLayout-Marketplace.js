import React from "react";
const LeftLayoutMarketPlace = ({ type }) => {
  return (
    <div className="flex-1 bg-base-200 p-4 min-h-screen h-auto rounded-lg">
      {/* Your content for LeftLayout */}
      <br />
      {/* <button className="btn btn-primary w-full mb-4">
        {" "}
        <b className="font-extrabold">
          <b>+</b>
        </b>
        Create New Pet-Profile
      </button> */}
      <div className="p-3 mb-3">Sort by select tag diye korte hobe</div>
      <div className="flex flex-auto">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-primary max-w-36 mb-4 mr-2"
        />
        <button className="btn btn-primary flex-auto w-4 mb-4">Search</button>
      </div>
      <p className="font-extrabold text-xl">
        <img
          src="https://img.icons8.com/ios/452/filter.png"
          alt="filter"
          className="w-6 h-6 float-left mr-3"
        />
        Filters:
      </p>

      <p className="font-bold pb-2 pl-1 pt-3">Price</p>
      <input type="range" min={0} max="100" value="30" className="range" />

      <p className="font-bold pb-2 pl-1 pt-3">Quantity</p>
      <input type="range" min={0} max="100" value="30" className="range" />

      <p className="font-bold pb-2 pl-1 pt-3">@ Item-type</p>
      <div className="flex flex-col">
        <label className="label cursor-pointer">
          <span className="label-text">Food</span>
          <input type="checkbox" defaultChecked className="checkbox" />
        </label>
        <label className="label cursor-pointer">
          <span className="label-text">Accessories</span>
          <input type="checkbox" defaultChecked className="checkbox" />
        </label>
        <label className="label cursor-pointer">
          <span className="label-text">Medicine</span>
          <input type="checkbox" defaultChecked className="checkbox" />
        </label>
      </div>

      <p className="font-bold pb-2 pl-1 pt-3">@ Pet-type</p>
      <div className="flex flex-col">
        <label className="label cursor-pointer">
          <span className="label-text">Animal</span>
          <input type="checkbox" defaultChecked className="checkbox" />
        </label>
        <label className="label cursor-pointer">
          <span className="label-text">Bird</span>
          <input type="checkbox" defaultChecked className="checkbox" />
        </label>
        <label className="label cursor-pointer">
          <span className="label-text">Fish</span>
          <input type="checkbox" defaultChecked className="checkbox" />
        </label>
      </div>

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
  );
};

export default LeftLayoutMarketPlace;

"use client";
import React from "react";
// import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

const CommunityFilterSearch = () => {
  // Access the history object
  // const history = useHistory();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Set isClient to true when component mounts in the browser
  }, []);

  // Handler for creating a community and redirecting to the create community page
  const handleCreateCommunity = () => {
    // Redirect to the create community page
    window.location.href = "/user/create-community";
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold">
        <p>Find the best Communities for Yourself</p>
      </h1>
      <div className="divider"></div>
      {/* {search bar} */}
      <label className=" flex items-center">
        <input type="text" className="grow" placeholder="Search" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
      <br />
      {/* <p>filter you communities</p>

      <br /> */}
      {/* <p>Number of Members:</p>

      <input
        type="range"
        min={0}
        max="100"
        value="50"
        className="range"
        step="25"
      />
      <div className="w-full flex justify-between text-xs px-2">
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
      </div>

      <div className="mt-7">
        <select className="select select-bordered w-full max-w-xs">
          <option disabled selected>
            Type of community:
          </option>
          <option>Food</option>
          <option>Cloth</option>
          <option>Shoes</option>
        </select>
      </div> */}

      <div className="divider">OR</div>
      <h1 className="text-2xl font-bold">
        <p>Communities You Have Already Joined</p>
      </h1>
      {isClient && window.location.pathname === "/communities" ? (
        <button
          className="btn btn-primary italic"
          onClick={() => (window.location.href = "/user/communities")}
        >
          My Communities
        </button>
      ) : (
        <button
          className="btn btn-primary italic"
          onClick={() => (window.location.href = "/communities")}
        >
          <h1 className="">All Communities</h1>
        </button>
      )}

      <div className="divider">OR</div>
      <div>
        <h1 className="text-2xl font-bold">
          <p>Build Your Own Community?</p>
        </h1>
        <br />
        {/* Call the handleCreateCommunity function when the button is clicked */}
        <button
          className="btn btn-primary italic"
          onClick={handleCreateCommunity}
        >
          Create Community
        </button>
      </div>
    </div>
  );
};

export default CommunityFilterSearch;

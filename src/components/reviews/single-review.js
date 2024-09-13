import React, { useEffect, useState } from "react";
import Rating from "../Rating";

const handleLogout = () => {
  localStorage.removeItem("authToken");
  window.location.href = "/login"; // Redirect to the login page
};

const timeAgo = (timestamp) => {
  const now = new Date();
  const then = new Date(timestamp);
  const diffInMs = now - then;

  // Convert milliseconds to minutes and hours
  const diffInMinutes = Math.floor(diffInMs / 1000 / 60);
  const hours = Math.floor(diffInMinutes / 60);
  const minutes = diffInMinutes % 60;

  if (hours > 0) {
    return `${hours} h ${minutes} m ago`;
  } else {
    return `${minutes} m ago`;
  }
};


function SingleReivew({ _review }) {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("authToken");

  const fetchUserUrl = `${process.env.REACT_APP_API_URL}/user/getUserById/${_review.userId}`;
  // Fetch reviews from API
  const fetchData = async (url) => {
    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    });

    const requestOptions = {
      method: "GET",
      headers: headers,
    };

    try {
      const response = await fetch(url, requestOptions);

      if (response.status === 401) {
        handleLogout(); // Token is likely expired, logout the user
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Network response was not ok. Status: ${response.status}, ${errorText}`
        );
      }

      const data = await response.json();
      setUser(data); // Set the fetched reviews to state
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchData(fetchUserUrl);
  }, [token, fetchUserUrl]);
  return (
    <div className="border border-content rounded-lg mb-2 p-2 flex items-center">
      {!_review.anonymous && (
          <div className="avatar m-2 mr-3">
            <div className="ring-info ring-offset-base-100 w-16 rounded-full ring ring-offset-2">
              <img src={user?.image} alt="user" />
            </div>
          </div>
        )}

        {_review.anonymous && (
          <div className="avatar m-2 mr-3">
            <div className="ring-warning-content ring-offset-base-100 w-16 rounded-full ring ring-offset-2">
              <img
                src="https://www.shutterstock.com/image-vector/anonymous-vector-icon-incognito-sign-600nw-1850222983.jpg"
                alt="anonymous"
              />
            </div>
          </div>
        )}

      <div className="w-full">
        <div className="float-right">
          <Rating rating={_review.itemRating} className="h-20" />
        </div>
        <div className="">
          <h1 className="font-bold text-content">
            {_review.anonymous
              ? "Anonymous Reviewer"
              : user?.firstname + user?.lastname}
          </h1>
        </div>
        {/* Render review text */}
        <h1 className="font-semibold">{_review.itemReview}</h1>
        <div className="flex">
          <svg
            viewBox="0 0 32 32"
            className="mr-2 fill-current text-content h-4 w-4 mt-1 stroke-current"
            strokeWidth="1.5"
          >
            <title />
            <g data-name="Layer 15" id="Layer_15">
              <path
                className="cls-1"
                d="M16,31A15,15,0,1,1,31,16,15,15,0,0,1,16,31ZM16,3A13,13,0,1,0,29,16,13,13,0,0,0,16,3Z"
              />
              <path
                className="cls-1"
                d="M20.24,21.66l-4.95-4.95A1,1,0,0,1,15,16V8h2v7.59l4.66,4.65Z"
              />
            </g>
          </svg>
          <p>{timeAgo(_review.timestamp)}</p>
        </div>
      </div>
    </div>
  );
}

export default SingleReivew;

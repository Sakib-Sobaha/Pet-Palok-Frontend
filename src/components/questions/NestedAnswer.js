import React, { useState, useEffect } from "react";

const handleLogout = () => {
  localStorage.removeItem("authToken");
  window.location.href = "/login"; // Redirect to the login page
};

const fetchSellerByIDAPI = async (token, sellerId) => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/seller/getSellerById/${sellerId}`;
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });

    const requestOptions = {
      method: "GET",
      headers: headers,
    };

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
    return data;
  } catch (error) {
    console.error("Failed to fetch seller", error);
    return null; // Return null in case of an error
  }
};

const fetchUserByIDAPI = async (token, userId) => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/user/getUserById/${userId}`;
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });

    const requestOptions = {
      method: "GET",
      headers: headers,
    };

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
    return data;
  } catch (error) {
    console.error("Failed to fetch user", error);
    return null; // Return null in case of an error
  }
};

// Utility function to calculate time ago in "h m ago" format
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

const NestedAnswer = ({ _reply }) => {
  const { text, timeStamp, anonymous, commenterId, userType } = _reply;
  const [profile, setProfile] = useState({ name: "", image: "" });

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchProfile = async () => {
      if (anonymous) {
        setProfile({ name: "Anonymous User", image: "default-image-url" });
      } else {
        let data;
        if (userType === "user") {
          data = await fetchUserByIDAPI(token, commenterId);
          if (data) {
            setProfile({
              name: `${data.firstname} ${data.lastname}`,
              image: data.image,
            });
          }
        } else if (userType === "seller") {
          data = await fetchSellerByIDAPI(token, commenterId);
          if (data) {
            setProfile({ name: data.name, image: data.image });
          }
        }
      }
    };

    fetchProfile();
  }, [commenterId, userType, anonymous, token]);

  return (
    <div className="flex">
      <div className="w-1/12 bg-base-100">
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 fill-secondary text-primary mt-2 ml-2"
        >
          <g>
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M5.455 15L1 18.5V3a1 1 0 0 1 1-1h15a1 1 0 0 1 1 1v12H5.455zm-.692-2H16V4H3v10.385L4.763 13zM8 17h10.237L20 18.385V8h1a1 1 0 0 1 1 1v13.5L17.545 19H9a1 1 0 0 1-1-1v-1z" />
          </g>
        </svg>
      </div>
      <div className="w-11/12 flex border border-base-100 bg-secondary rounded-lg p-2">
        <div className="avatar mr-3">
          <div className="ring-info ring-offset-base-100 w-10 h-10 rounded-full ring ring-offset-2 mt-2 ml-3">
            {!anonymous && <img src={profile.image} alt="user" className="h-5" />}
            {anonymous && <img src="https://www.shutterstock.com/image-vector/anonymous-vector-icon-incognito-sign-600nw-1850222983.jpg" alt="user" className="h-5" />}
          </div>
        </div>
        <div className="flex-1">
          <h1 className="font-bold text-content">{profile.name}</h1>
          <p className="font-semibold">{text}</p>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              className="mr-2 fill-current text-content h-4 w-4"
              strokeWidth="1.5"
            >
              <path d="M21 6H3M21 12H3M21 18H3" />
            </svg>
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
              <p>{timeAgo(timeStamp)}</p> {/* Display time ago format */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NestedAnswer;

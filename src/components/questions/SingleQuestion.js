import React, { useState, useEffect } from "react";
import NestedAnswer from "./NestedAnswer";



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

const fetchReplies = async (token, commentId) => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/marketplace/item/comment/getReplies/${commentId}`;
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
    console.error("Failed to fetch replies", error);
    return null; // Return null in case of an error
  }
};

const postReplyAPI = async (token, replyData) => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/marketplace/item/comment/reply`;
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(replyData),
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
    console.error("Failed to post reply", error);
    return null; // Return null in case of an error
  }
};

function SingleQuestion({ _comment }) {
  const {
    text,
    timeStamp,
    anonymous,
    commenterId,
    userType,
    id,
    marketItemId,
  } = _comment;
  const [profile, setProfile] = useState({ name: "", image: "" });
  const [replies, setReplies] = useState([]);
  const [newReplyText, setNewReplyText] = useState(""); // State for the reply text
  const [isAnonymousReply, setIsAnonymousReply] = useState("Non-Anonymous");
  const [error, setError] = useState(null); // State for handling errors

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

  useEffect(() => {
    const loadReplies = async () => {
      const fetchedReplies = await fetchReplies(token, id);
      if (fetchedReplies) {
        setReplies(fetchedReplies);
      }
    };

    loadReplies();
  }, [id, token]);

  const handleReplySubmit = async () => {
    if (!newReplyText) {
      setError("Reply text is required.");
      return;
    }

    const replyData = {
      text: newReplyText,
      marketItemId: marketItemId,
      userType: localStorage.getItem("userType"),
      anonymous: isAnonymousReply === "Anonymous",
      parent: id, // This is the ID of the comment being replied to
    };

    const result = await postReplyAPI(token, replyData);
    if (result) {
      setReplies((prevReplies) => [...prevReplies, result]); // Add the new reply to the list
      setNewReplyText(""); // Clear the reply input after successful submission
      setIsAnonymousReply("Non-Anonymous"); // Reset the anonymous option
      setError(null); // Clear any errors
    } else {
      setError("Failed to post the reply."); // Set error message on failure
    }
  };

  return (
    <div className="border border-base-100 bg-base-200 rounded-lg mb-0 p-0 items-center m-1">
      <div className="border border-base-100 bg-secondary rounded-lg p-1 items-center flex">
        {!anonymous && (
          <div className="avatar m-2 mr-3">
            <div className="ring-info ring-offset-base-100 w-16 rounded-full ring ring-offset-2">
              <img src={profile.image} alt="user" />
            </div>
          </div>
        )}

        {anonymous && (
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
          <div>
            <h1 className="font-bold text-content">{profile.name}</h1>
          </div>
          <h1 className="font-semibold">{text}</h1>
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
          </div>{" "}
        </div>
      </div>

      {/* Display replies */}
      {replies.length > 0 && (
        <div className="mt-0">
          {replies.map((reply, index) => (
            <NestedAnswer key={index} _reply={reply} />
          ))}
        </div>
      )}

      {/* Reply submission section */}
      <div>
        <div className="mt-0 flex items-center">
          <div className="w-2/12 bg-base-100">
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 fill-secondary mt-2 ml-4"
            >
              <g>
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M5.455 15L1 18.5V3a1 1 0 0 1 1-1h15a1 1 0 0 1 1 1v12H5.455zm-.692-2H16V4H3v10.385L4.763 13zM8 17h10.237L20 18.385V8h1a1 1 0 0 1 1 1v13.5L17.545 19H9a1 1 0 0 1-1-1v-1z" />
              </g>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Write a reply"
            className="input input-bordered border-1 input-secondary w-full rounded-lg"
            value={newReplyText}
            onChange={(e) => setNewReplyText(e.target.value)}
          />
          <select
            className="select select-bordered border-1 ml-0.5 w-40 select-secondary rounded-lg"
            value={isAnonymousReply}
            onChange={(e) => setIsAnonymousReply(e.target.value)} // Correctly update anonymous state
          >
            <option disabled>Select type</option>
            <option value="Anonymous">Anonymous</option>
            <option value="Non-Anonymous">Non-Anonymous</option>
          </select>

          <button
            className="btn btn-md rounded-lg ml-0.5 w-32 btn-ghost border-2 border-base-300"
            onClick={handleReplySubmit}
          >
            Submit
          </button>
        </div>
        {/* Display error message if there's an error */}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}

export default SingleQuestion;

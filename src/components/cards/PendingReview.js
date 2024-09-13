import { useState, useEffect } from "react";
import React from "react";
import WriteReview from "../modals/write-review";

const PendingReview = ({ _review }) => {
  const [loading, setLoading] = useState(true);
  const [review, setReview] = useState(_review);
  const [item, setItem] = useState(null);

  const token = localStorage.getItem("authToken");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login"; // Redirect to the login page
  };

  const fetchData = async (url) => {
    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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
  };

  const fetchItemAPI = async (token, itemId) => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/marketplace/item/${review.marketItemId}`;
      return await fetchData(url);
    } catch (error) {
      console.error("Failed to fetch item", error);
      return null; // Return null in case of an error
    }
  };

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      const fetchedItem = await fetchItemAPI(token, review.itemId);
      if (fetchedItem) {
        setItem(fetchedItem);
      }
      setLoading(false);
    };

    fetchItem();
  }, [token, _review.itemId]);

  if (loading) {
    return (
      <div>
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  } else
    return (
      <div className="card bg-white image-full w-72 h-60 m-1 shadow-lg">
        {item && <WriteReview element_id={"review" + item.id} _item={item} _pendingReview={review}/>}
        <figure>
          <img
            src={item.images[0]}
            alt="item"
            className="image-full opacity-90 bg-blend-overlay"
          />
        </figure>
        <div className="card-body bg-transparent">
          <h2 className="card-title">{item.name}</h2>
          {/* <p>If a dog chews shoes whose shoes does he choose?</p> */}
          <div className="card-actions justify-center ">
            <button
              className="btn btn-accent"
              onClick={() => {
                document.getElementById("review" + item.id).showModal();
              }}
            >
              Review Now
            </button>
          </div>
        </div>
      </div>
    );
};
export default PendingReview;

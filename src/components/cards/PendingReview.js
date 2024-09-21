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
      <div className="relative card w-72 h-60 m-1 shadow-lg">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-80"
          style={{
            backgroundImage: `url(${item.images[0]})`,
          }}
        ></div>

        {/* Semi-transparent Overlay */}
        <div className="absolute inset-0 bg-primary opacity-80"></div>

        {/* Main Content */}
        <div className="relative z-10 p-4">
          {item && (
            <WriteReview
              element_id={"review" + item.id}
              _item={item}
              _pendingReview={review}
            />
          )}

          <div className="card-body bg-transparent">
            <h2 className="card-title text-white dark:text-gray-200">{item.name}</h2>

            <div className="card-actions justify-center flex">
              <button
                className="btn btn-accent rounded-md w-32"
                onClick={() => {
                  document.getElementById("review" + item.id).showModal();
                }}
              >
                Review Now
              </button>
              <button className="btn btn-secondary rounded-md w-32"
                onClick={() => {
                  window.location.href = `/marketplace/item/${item.id}`;
                }
                }
              >
                View Item
              </button>
            </div>
          </div>
        </div>
      </div>
    );
};
export default PendingReview;

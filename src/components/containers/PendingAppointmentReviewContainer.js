import React, { useState, useEffect } from "react";
import PendingReview from "../cards/PendingAppointmentReview";

const handleLogout = () => {
  localStorage.removeItem("authToken");
  window.location.href = "/login"; // Redirect to the login page
};

const fetchData = async (token) => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/appointments/pendingReviews/fetchByUser`;
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
    console.error("Failed to fetch pending reviews :", error);
    return []; // Return empty array in case of an error
  }
};

const PendingReviewContainer = () => {
  const [pendingReviews, setPendingReviews] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchPendingReviews = async () => {
      setLoading(true); // Set loading to true before fetching data
      const fetchedPendingReviews = await fetchData(token);
      setPendingReviews(fetchedPendingReviews);
      setLoading(false); // Set loading to false after data is fetched
    };

    fetchPendingReviews();
  }, [token]);

  if (loading) return <span className="loading loading-bars loading-lg"></span>;
  else
    return (
      <>
        <div className="m-1 p-1 flex">
          <img
            src="https://cdn-icons-png.freepik.com/256/12377/12377209.png?semt=ais_hybrid"
            alt="icon"
            className="w-10 h-10 mr-4"
          />

          <h1 className="font-bold text-2xl">Finish your pending appointment reviews</h1>
        </div>
        <div className="overflow-auto">
          {/* Show loading spinner if loading */}
          {
            <div className="carousel rounded-box">
              {pendingReviews.length > 0 ? (
                pendingReviews.map((review) => (
                  <div className="carousel-item" key={review.id}>
                    <PendingReview _review={review} />
                  </div>
                ))
              ) : (
                <p>No pending reviews.</p>
              )}
            </div>
          }
        </div>
      </>
    );
};

export default PendingReviewContainer;


import React, { useState, useEffect } from "react";
import StoreCard from "../cards/Store-card";

const handleLogout = () => {
  localStorage.removeItem("authToken");
  window.location.href = "/login"; // Redirect to the login page
};

// Function to fetch vet data from the API
const fetchStores = async (token) => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/seller/getSellers`; // Update this to your vets endpoint
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
    console.error("Failed to fetch vets:", error);
    return []; // Return an empty array in case of an error
  }
};

const VetCardContainer = ({ sortCriteria, searchTerm, ratingRange }) => {
  const [storeData, setStoreData] = useState([]);
  const [vet, setVet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);
  const [isExpanded, setIsExpanded] = useState(false);
  const [vetId, setVetId] = useState(null);

  const fetch = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("No auth token found in local storage.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await fetchStores(token);
      setStoreData(data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-2 flex">
        <img
          className="h-10 mt-4 mr-2 w-10 flex"
          src="https://png.pngtree.com/png-clipart/20230811/original/pngtree-pet-shop-rgb-color-icon-service-supermarket-friend-vector-picture-image_10410931.png"
          alt="vet"
        />
        <p className="mt-4">Pet Stores</p>
      </h1>
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <span className="loading loading-ring loading-xs"></span>
          <span className="loading loading-ring loading-sm"></span>
          <span className="loading loading-ring loading-md"></span>
          <span className="loading loading-ring loading-lg"></span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-2 align-middle mr-1">
            {storeData.map((store) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
          {/* {JSON.stringify(storeData)} */}
        </>
      )}
    </div>
  );
};

export default VetCardContainer;

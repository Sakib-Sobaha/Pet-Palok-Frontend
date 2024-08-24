import React, { useState, useEffect } from "react";
import VetCard from "../cards/Vet-Card";

const handleLogout = () => {
  localStorage.removeItem("authToken");
  window.location.href = "/login"; // Redirect to the login page
};

// Function to fetch vet data from the API
const fetchVetData = async (token) => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/vet/getVets`; // Update this to your vets endpoint
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

const fetchVetAPI = async (token) => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/vet/whoami`;
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
    console.error("Failed to fetch vet: WHOAMI", error);
    return []; // Return an empty array in case of an error
  }
};

const VetCardContainer = ({ sortCriteria, searchTerm, ratingRange, setVetId }) => {
  const [vetData, setVetData] = useState([]);
  const [vet, setVet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);
  const [isExpanded, setIsExpanded] = useState(false);

  const fetchVets = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("No auth token found in local storage.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await fetchVetData(token);
      setVetData(data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchVet = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No auth token found in local storage.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await fetchVetAPI(token);
      setVet(data);
      setVetId(data.id);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVet();
  }, []);

  useEffect(() => {
    fetchVets();
  }, []);

  const getFilteredAndSortedVetData = () => {
    // Filtering by search term
    const filteredData = vetData.filter(
      (vet) =>
        (vet?.firstname.concat(" " + vet?.lastname))
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        vet?.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vet?.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vet?.postOffice.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vet?.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vet?.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vet?.clinic_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filtering by rating range
    const filteredByRatingData = filteredData.filter((vet) => {
      const rating = parseFloat(vet?.rating_vetvisit);
      return rating >= ratingRange.min && rating <= ratingRange.max;
    });

    // Sorting
    const sortedData = [...filteredByRatingData];
    if (sortCriteria === "Rating Low to High") {
      sortedData.sort(
        (a, b) => parseFloat(a.rating_vetvisit) - parseFloat(b.rating_vetvisit)
      );
    } else if (sortCriteria === "Rating High to Low") {
      sortedData.sort(
        (a, b) => parseFloat(b.rating_vetvisit) - parseFloat(a.rating_vetvisit)
      );
    }

    return sortedData;
  };

  const toggleVisibility = () => {
    setIsExpanded(!isExpanded);
    setVisibleCount(isExpanded ? 6 : vetData.length);
  };

  const filteredAndSortedVetData = getFilteredAndSortedVetData();

  return (
    <div>
      <h1 className="text-4xl font-bold mb-2 flex">
        <img
          className="h-20 w-20 flex"
          src="https://cdn4.iconfinder.com/data/icons/health-care-and-first-responders-with-masks/64/doctor-asian-female-coronavirus-2-512.png"
          alt="vet"
        />
        <p className="mt-4">Vet Directory</p>
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
            {filteredAndSortedVetData.slice(0, visibleCount).map((vet, index) => (
              <VetCard key={index} vet={vet} />
            ))}
          </div>
          {filteredAndSortedVetData.length > 6 && (
            <div className="flex justify-center mt-4">
              <button className="btn btn-primary w-28" onClick={toggleVisibility}>
                {isExpanded ? "See Less" : "See More"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VetCardContainer;

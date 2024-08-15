import React, { useState, useEffect } from "react";
import PetCard from "../cards/Pet-Card";

// Function to fetch pet data from the API
const fetchData = async (token) => {
  try {
    const url = "http://localhost:8080/api/v1/pets/getAllPets";
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });

    const requestOptions = {
      method: "GET",
      headers: headers,
    };

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      // Log the response status and text for debugging
      const errorText = await response.text();
      throw new Error(
        `Network response was not ok. Status: ${response.status}, ${errorText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch pets:", error);
    return []; // Return an empty array in case of an error
  }
};

const PetCardContainer = ({ searchTerm, filter, sortOrder }) => {
  const [petData, setPetData] = useState([]); // State to hold pet data
  const [visibleCount, setVisibleCount] = useState(6);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(true); // State to handle loading

  const fetchPets = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No auth token found in local storage.");
      setLoading(false);
      return [];
    }

    try {
      const data = await fetchData(token);
      setPetData(data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false); // Ensure loading is set to false after fetching
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const filterPets = () => {
    let filteredPets = petData;

    // Apply search filter
    if (searchTerm) {
      filteredPets = filteredPets.filter(
        (pet) =>
          pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pet.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply age filter
    if (filter) {
      filteredPets = filteredPets.filter(
        (pet) => pet.age >= filter.min && pet.age <= filter.max
      );
    }

    // Apply type filter
    if (filter && filter.types.length > 0) {
      filteredPets = filteredPets.filter((pet) =>
        filter.types.includes(pet.type)
      );
    }

    // Apply sorting
    if (sortOrder === "ageLowToHigh") {
      filteredPets.sort((a, b) => a.age - b.age);
    } else if (sortOrder === "ageHighToLow") {
      filteredPets.sort((a, b) => b.age - a.age);
    }

    return filteredPets;
  };

  const filteredPets = filterPets();

  const toggleVisibility = () => {
    setIsExpanded(!isExpanded);
    setVisibleCount(isExpanded ? 6 : filteredPets.length);
  };

  return (
    <div className="">
      <h1 className="text-3xl font-bold ml-3 mb-2">
        <img
          src="https://cdn2.iconfinder.com/data/icons/hearts-16/100/029-512.png"
          alt="paw"
          className="w-10 h-10 inline-block mr-3"
        />
        Pet Profiles
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
            {filteredPets.length > 0 ? (
              filteredPets
                .slice(0, visibleCount)
                .map((pet, index) => <PetCard key={index} pet={pet} />)
            ) : (
              <p>No pets found</p>
            )}
          </div>
          {filteredPets.length > 6 && (
            <div className="flex justify-center mt-4">
              <button
                className="btn btn-primary w-28"
                onClick={toggleVisibility}
              >
                {isExpanded ? "See Less" : "See More"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PetCardContainer;

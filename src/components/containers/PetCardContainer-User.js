import React, { useState, useEffect } from "react";
import PetCard from "../cards/Pet-Card-Public";

const handleLogout = () => {
  localStorage.removeItem("authToken");
  window.location.href = "/login"; // Redirect to the login page
};

function calculateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();

  // Adjust years and months if the current month is before the birth month
  if (months < 0) {
    years--;
    months += 12;
  }

  return years; // Return only the years
}

// Function to fetch pet data from the API
const fetchData = async (token, id) => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/pets/getAllPets`;
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
    console.error("Failed to fetch pets:", error);
    return []; // Return an empty array in case of an error
  }
};

const fetchUserAPI = async (token) => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/user/whoami`;
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
    console.error("Failed to fetch user: WHOAMI", error);
    return []; // Return an empty array in case of an error
  }
};

const PetCardContainer = ({ searchTerm, filter, sortOrder, setUserId }) => {
  const [petData, setPetData] = useState([]);
  const [user, setUser] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filteredPets, setFilteredPets] = useState([]);

  const fetchPets = async () => {
    const token = localStorage.getItem("authToken");

    if (!token || !user?.id) {
      console.error(
        "No auth token found in local storage or user ID is missing."
      );
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await fetchData(token, user.id);
      setPetData(data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No auth token found in local storage.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await fetchUserAPI(token);
      setUser(data);
      setUserId(data.id); // Pass the user ID to the parent component
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user?.id) {
      fetchPets();
    }
  }, [user]);

  useEffect(() => {
    // const filterPets = () => {
    //   let filtered = [...petData];

    //   if (searchTerm) {
    //     filtered = filtered.filter(
    //       (pet) =>
    //         pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //         pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //         pet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //         pet.type.toLowerCase().includes(searchTerm.toLowerCase())
    //     );
    //   }


    //   if (filter && filter.types.length > 0) {
    //     filtered = filtered.filter((pet) => filter.types.includes(pet.type));
    //   }

    //   if (filter && filter.min !== undefined && filter.max !== undefined) {
    //     filtered = filtered.filter((pet) => {
    //       const age = calculateAge(pet.dob);
    //       if(age === 0 && filter.min ===1) {
    //         return true;
    //       }
    //       return age >= filter.min && age <= filter.max;
    //     });
    //   }

    //   if (sortOrder === "ageLowToHigh") {
    //     filtered.sort((a, b) => a.age - b.age);
    //   } else if (sortOrder === "ageHighToLow") {
    //     filtered.sort((a, b) => b.age - a.age);
    //   }

    //   console.log("Filtered pets:", filtered);
    //   return filtered;
    // };

    setFilteredPets(petData);
  }, [petData]);

  const toggleVisibility = () => {
    setIsExpanded(!isExpanded);
    setVisibleCount(isExpanded ? 6 : filteredPets.length);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold ml-3 mb-2">
        <img
          src="https://cdn2.iconfinder.com/data/icons/hearts-16/100/029-512.png"
          alt="paw"
          className="w-10 h-10 inline-block mr-3"
        />
        Pet Profiles
        {/* {petData.length} */}
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

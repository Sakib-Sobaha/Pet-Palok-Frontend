import React, { useState, useEffect } from "react";
import CommunityCard from "../cards/CommunityCard";

const handleLogout = () => {
  localStorage.removeItem("authToken");
  window.location.href = "/login"; // Redirect to the login page
};


// Function to fetch pet data from the API
const fetchData = async (token, id) => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/communities/all`;
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
    const userType = localStorage.getItem("userType");
    const url = `${process.env.REACT_APP_API_URL}/${userType}/whoami`;
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
    console.error("Failed to fetch : WHOAMI", error);
    return []; // Return an empty array in case of an error
  }
};

const PetCardContainer = ({ }) => {
  const [communities, setcommunities] = useState([]);
  const [user, setUser] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(true);

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
      setcommunities(data);
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
      // setUserId(data.id); // Pass the user ID to the parent component
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

  const toggleVisibility = () => {
    setIsExpanded(!isExpanded);
    setVisibleCount(isExpanded ? 6 : communities.length);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold ml-3 mb-2">
        <img
          src="https://cdn-icons-png.freepik.com/512/2170/2170765.png"
          alt="community"
          className="w-10 h-10 inline-block mr-3"
        />
        Communities
        {/* {communities.length} */}
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
            {communities.length > 0 ? (
              communities
                .slice(0, visibleCount)
                .map((community, index) => <CommunityCard key={index} community={community} />)
            ) : (
              <p>No communities found</p>
            )}
          </div>
          {communities.length > 6 && (
            <div className="flex justify-center mt-4">
              <button
                className="btn btn-primary w-28"
                onClick={toggleVisibility}
              >
                {isExpanded ? "See Less" : "See More"}
              </button>
            </div>
          )}

          {/* {JSON.stringify(communities)} */}
        </>

      )}
    </div>
  );
};

export default PetCardContainer;

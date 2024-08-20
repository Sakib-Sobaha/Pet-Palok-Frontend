import { useState, useEffect } from "react";

// Handle logout function
const handleLogout = () => {
  localStorage.removeItem("authToken");
//   if (window.location.href != "/login") window.location.href = "/login"; // Redirect to the login page
};

// Reusable function to fetch user data
export const fetchUserData = async (endpoint, method = "GET", body = null) => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    console.error("No auth token found in local storage.");
    handleLogout();
    return null;
  }

  try {
    const url = `${process.env.REACT_APP_API_URL}${endpoint}`;
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });

    const requestOptions = {
      method: method,
      headers: headers,
      body: body ? JSON.stringify(body) : null,
    };

    const response = await fetch(url, requestOptions);

    if (response.status === 401) {
      handleLogout(); // Token is likely expired, logout the user
      return null;
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
    console.error("Failed to fetch user data:", error);
    return null; // Return null in case of an error
  }
};

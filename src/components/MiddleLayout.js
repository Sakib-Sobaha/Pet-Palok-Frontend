import React, { useEffect, useState } from "react";
import UserStatusIcon from "../components/video/UserStatus";

import { HandleNewMeeting } from "../components/video/HandleMeeting";
import { HandleJoinMeeting } from "./video/HandleJoinMeeting";
import PendingReviews from "./containers/PendingReviewContainer";
import PendingAppointmentReviews from "./containers/PendingAppointmentReviewContainer.js";
import SectionDivider from "./Section-Divider";
import MyPetsContainer from "./containers/MyPetsContainer.js";

const fetchData = async () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    console.error("No auth token found in local storage.");
    return [];
  }

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(JSON.stringify(response));

    if (!response.ok) {
      console.error("Failed to fetch users");
      return;
    }

    const data = await response.json();
    return data; // Assuming the response is an array of users
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};

const fetchVetData = async () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    console.error("No auth token found in local storage.");
    return [];
  }

  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/vet/getVets`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(JSON.stringify(response));

    if (!response.ok) {
      console.error("Failed to fetch users");
      return;
    }

    const data = await response.json();
    return data; // Assuming the response is an array of users
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};

const MiddleLayoutUserHome = () => {
  const [users, setUsers] = useState([]);
  const [vets, setVets] = useState([]);
  const [meetingId, setMeetingId] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      const usersData = await fetchData();
      setUsers(usersData);
    };

    loadUsers();
  }, []);

  useEffect(() => {
    const loadVets = async () => {
      const vetsData = await fetchVetData();
      setVets(vetsData);
    };

    loadVets();
  }, []);

  return (
    <div className="flex-1 bg-base-200 rounded-lg p-4 min-h-screen">
      <PendingReviews />

      <PendingAppointmentReviews />

      <SectionDivider
        title="Your Pets"
        icon="https://cdn-icons-png.flaticon.com/512/3047/3047928.png"
      />
      <MyPetsContainer />
    </div>
  );
};

export default MiddleLayoutUserHome;

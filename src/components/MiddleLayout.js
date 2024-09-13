import React, { useEffect, useState } from "react";
import UserStatusIcon from "../components/video/UserStatus";

import { HandleNewMeeting } from "../components/video/HandleMeeting";
import { HandleJoinMeeting } from "./video/HandleJoinMeeting";
import PendingReviews from "./containers/PendingReviewContainer";
import SectionDivider from "./Section-Divider";
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

const MiddleLayoutSellerHome = () => {
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

      {/* Display users */}
      <h1 className="text-xl font-bold mb-4">User List</h1>
      <ul>
        {users && users.length > 0 ? (
          users.map((user) => (
            <li key={user.id} className="mb-2">
              {user.firstname} - {user.email}
            </li>
          ))
        ) : (
          <li>No users found</li>
        )}
      </ul>

      <h1 className="text-xl font-bold mb-4">Vet List</h1>
      <ul>
        {vets.length > 0 ? (
          vets.map((vet) => (
            <li key={vet.id} className="mb-2">
              {vet.firstname} - {vet.email}
            </li>
          ))
        ) : (
          <li>No vets found</li>
        )}
      </ul>

      <div className="image-container">
        <img
          src="https://images.idgesg.net/images/article/2020/04/zoom_video_conferencing_online_meeting_remote_workers_one_user_connected_via_laptop_with_a_grid_of_twelve_participants_on_screen_2400x1600-100837446-large.jpg?auto=webp&quality=85,70"
          alt="Zoom Meeting"
          className="mb-4"
        />
      </div>

      <div className="main">
        <div className="new-meeting">
          <button
            id="newMeetingBtn"
            className="btn btn-primary mb-4"
            onClick={HandleNewMeeting}
          >
            Create a New Meeting
          </button>

          <div className="join-meeting flex mb-4">
            <input
              type="text"
              placeholder="Meeting ID"
              id="meetingName"
              value={meetingId}
              onChange={(e) => setMeetingId(e.target.value)}
              className="input input-bordered mr-2"
            />
            <button
              id="joinMeetingBtn"
              className="btn btn-secondary"
              onClick={HandleJoinMeeting}
            >
              Join
            </button>
          </div>
        </div>

        <div className="connected-users">
          <h2 className="text-xl font-bold">Connected Users</h2>
          <ul id="userList">
            {users.length > 0 ? (
              users.map((user) => (
                <li key={user.id} className="mb-2">
                  {/* Display user status icon */}
                  <span className="mr-2">
                    {user.status === "online" ? "🟢" : "🔴"}
                  </span>
                  {/* <UserStatusIcon status={user.status} /> */}
                  {user.firstname} - {user.email}
                </li>
              ))
            ) : (
              <li>No users found</li>
            )}
          </ul>
        </div>

        <div className="connected-vets">
          <h2 className="text-xl font-bold">Connected Vets</h2>
          <ul id="vetList">
            {vets.length > 0 ? (
              vets.map((vet) => (
                <li key={vet.id} className="mb-2">
                  {/* Display user status icon */}
                  <span className="mr-2">
                    {vet.status === "online" ? "🟢" : "🔴"}
                  </span>
                  {/* <UserStatusIcon status={user.status} /> */}
                  {vet.firstname} - {vet.email}
                </li>
              ))
            ) : (
              <li>No vets found</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MiddleLayoutSellerHome;

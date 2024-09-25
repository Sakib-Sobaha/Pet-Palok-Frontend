import React, { useEffect, useState } from "react";
import UserStatusIcon from "../components/video/UserStatus";

import { HandleNewMeeting } from "../components/video/HandleMeeting";
import { HandleJoinMeeting } from "./video/HandleJoinMeeting";
import AppointmentCompletedCard from "./cards/Appointment-small-card";

import SectionDivider from "./Section-Divider";
import Rating from "./Rating";
import VetReviews from "./containers/Vet-Review-Container";

const fetchData = async () => {
  const token = localStorage.getItem("authToken");
  const userType = localStorage.getItem("userType");

  if (!token) {
    console.error("No auth token found in local storage.");
    window.location.href = "/login";
    return [];
  }

  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/${userType}/whoami`,
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
      console.error("Failed to fetch vet(my) data");
      return;
    }

    const data = await response.json();
    return data; // Assuming the response is an array of users
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};

const MiddleLayoutVetHom = () => {
  const [appointmentRequests, setAppointmentRequests] = useState([]);

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [vets, setVets] = useState([]);
  const [meetingId, setMeetingId] = useState("");
  const [me, setMe] = useState(null);

  useEffect(() => {
    const fetchWhoAMI = async () => {
      setLoading(true);

      const meData = await fetchData();
      setLoading(false);

      setMe(meData);
    };
    fetchWhoAMI();
  }, []);
  useEffect(() => {
    // Fetch appointment requests data when the component mounts
    const fetchAppointments = async () => {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      const userType = localStorage.getItem("userType");
      if (!token) {
        console.error("No auth token found in local storage.");
        return;
      }

      try {
        const url = `${process.env.REACT_APP_API_URL}/appointments/completed`;
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
          const errorText = await response.json();
          throw new Error(
            `Network response was not ok. Status: ${response.status}, ${errorText}`
          );
        }

        const data = await response.json();
        setAppointments(data); // Set the fetched data to state
      } catch (error) {
        console.error("Failed to fetch appointment requests:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
    // Fetch appointment requests data when the component mounts
    const fetchAppointmentRequests = async () => {
      const token = localStorage.getItem("authToken");
      const userType = localStorage.getItem("userType");
      if (!token) {
        console.error("No auth token found in local storage.");
        return;
      }

      try {
        const url = `${process.env.REACT_APP_API_URL}/appointmentRequests/${userType}/myRequests`;
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
          const errorText = await response.json();
          throw new Error(
            `Network response was not ok. Status: ${response.status}, ${errorText}`
          );
        }

        const data = await response.json();
        setAppointmentRequests(data); // Set the fetched data to state
      } catch (error) {
        console.error("Failed to fetch appointment requests:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchAppointmentRequests();
  }, []);

  if (loading)
    return (
      <div className="flex-1 bg-base-200 rounded-lg p-4 min-h-screen">
        <span className="loading loading-lg loading-ring"></span>
      </div>
    );
  else
    return (
      <div className="flex-1 bg-base-200 rounded-lg p-4 min-h-screen">
        {/* Display users */}
        <h1 className="text-3xl font-bold mb-3">
          Welcome{" "}
          <strong className="text-4xl">
            {" "}
            {me?.firstname} {me?.lastname}
          </strong>
        </h1>

        <div>
          <div className="stats shadow mb-4">
            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-8 w-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Appointment Requests</div>
              <div className="stat-value">{appointmentRequests.length}</div>
              <div className="stat-desc">In last few days</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-8 w-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Appointments Completed</div>
              <div className="stat-value">{appointments.length}</div>
              <div className="stat-desc">↗︎ 400 (22%)</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-8 w-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">New Users</div>
              <div className="stat-value">1</div>
              <div className="stat-desc"></div>
            </div>
          </div>
          <br />
          <div>
            <h1 className="text-2xl font-bold mb-2">Recent Appointments</h1>
            <div className="grid grid-cols-2">
              {appointments.map((item, index) => (
                <AppointmentCompletedCard
                  key={index}
                  appointmentRequest={item}
                  userType="seller"
                />
              ))}
            </div>
          </div>
          <SectionDivider
            title="Ratings and Reviews"
            icon="https://cdn-icons-png.freepik.com/256/12377/12377209.png?semt=ais_hybrid"
          />{" "}
          <div className="flex justify-center mb-3">
            {/* {me?.rating} */}
            <Rating rating={me?.rating_vetvisit} />
          </div>
          <VetReviews vetId={me?.id} />
          
        </div>
      </div>
    );
};

export default MiddleLayoutVetHom;

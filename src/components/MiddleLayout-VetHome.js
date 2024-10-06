import React, { useEffect, useState } from "react";
import UserStatusIcon from "../components/video/UserStatus";
import { HandleNewMeeting } from "../components/video/HandleMeeting";
import { HandleJoinMeeting } from "./video/HandleJoinMeeting";
import AppointmentCompletedCard from "./cards/Appointment-small-card";
import SectionDivider from "./Section-Divider";
import Rating from "./Rating";
import VetReviews from "./containers/Vet-Review-Container";
import BarChart from "./chart/bar-chart-vet";
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

    if (!response.ok) {
      console.error("Failed to fetch vet(my) data");
      return [];
    }

    const data = await response.json();
    return data; // Assuming the response is user object
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};

const fetchDataUrl = async (url) => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    console.error("No auth token found in local storage.");
    window.location.href = "/login";
    return [];
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch data");
      return [];
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};

const MiddleLayoutVetHome = () => {
  const [appointmentRequests, setAppointmentRequests] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [recentAppointments, setRecentAppointments] = useState([]); // Separate state for filtered appointments
  const [loading, setLoading] = useState(false);
  const [me, setMe] = useState(null);
  const [stats1, setStats1] = useState(null);

  // Fetch current user info
  useEffect(() => {
    const fetchWhoAMI = async () => {
      setLoading(true);
      const meData = await fetchData();
      setMe(meData);
      setLoading(false);
    };
    fetchWhoAMI();
  }, []);

  // Fetch completed appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const url = `${process.env.REACT_APP_API_URL}/appointments/completed`;
        const data = await fetchDataUrl(url);
        setAppointments(data);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Filter recent appointments (within the last 10 days)
  useEffect(() => {
    if (appointments.length > 0) {
      const filteredAppointments = appointments.filter((appointment) => {
        const appointmentDate = new Date(appointment.bookingTime);
        const today = new Date();
        const diffTime = Math.abs(today - appointmentDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return diffDays <= 10; // Get appointments from the last 10 days
      });
      setRecentAppointments(filteredAppointments); // Update separate state
    }
  }, [appointments]); // This will only run when appointments change

  // Fetch appointment requests
  useEffect(() => {
    const fetchAppointmentRequests = async () => {
      setLoading(true);
      try {
        const url = `${process.env.REACT_APP_API_URL}/appointmentRequests/${me?.userType}/myRequests`;
        const data = await fetchDataUrl(url);
        setAppointmentRequests(data);
      } catch (error) {
        console.error("Failed to fetch appointment requests:", error);
      } finally {
        setLoading(false);
      }
    };

    if (me?.userType) fetchAppointmentRequests(); // Run only when userType is available
  }, [me?.userType]);

  // Fetch stats1 based on user ID
  useEffect(() => {
    const fetchStats = async () => {
      if (!me?.id) return;

      try {
        setLoading(true);
        const url = `${process.env.REACT_APP_API_URL}/appointments/stats/type1/${me?.id}`;
        const data = await fetchDataUrl(url);
        setStats1((prevStats) =>
          JSON.stringify(prevStats) !== JSON.stringify(data) ? data : prevStats
        );
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }

      setLoading(false);
    };

    fetchStats();

  }, [me?.id]); // Run only when `me.id` changes

  if (loading) {
    return (
      <div className="flex-1 bg-base-200 rounded-lg p-4 min-h-screen">
        <span className="loading loading-lg loading-ring"></span>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-base-200 rounded-lg p-4 min-h-screen">
      {/* Welcome message */}
      <h1 className="text-3xl font-bold mb-3">
        Welcome{" "}
        <strong className="text-4xl">
          {me?.firstname} {me?.lastname}
        </strong>
      </h1>
      {/* Stats section */}
      <div className="stats shadow">
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
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Appointments Completed</div>
          <div className="stat-value text-secondary">{appointments.length}</div>
          <div className="stat-desc">total appointments completed</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-primary">
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
          <div className="stat-title">Unique Pets Served</div>
          <div className="stat-value text-primary">{stats1?.uniquePets}</div>
          <div className="stat-desc text-primary">
            <strong className="text-xl">
              {(stats1?.uniquePets / appointments?.length) * 100}%{" "}
            </strong>{" "}
            new pets visited
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <div className="avatar online">
              <div className="w-16 rounded-full">
                <img src={me?.image} />
              </div>
            </div>
          </div>
          <div className="stat-value">{stats1?.uniqueUsers}</div>
          <div className="stat-title">Users Served</div>
          <div className="stat-desc">
            <strong className="text-xl">
              {(stats1?.uniqueUsers / appointments?.length) * 100}%{" "}
            </strong>
            {""}
            of new users
          </div>
        </div>
      </div>
      <SectionDivider
        title="Pet-wise Stats"
        icon="https://cdn-icons-png.flaticon.com/512/167/167486.png"
      />{" "}
      {stats1?.petTypeMap ? (
        <>
          <BarChart data={stats1?.petTypeMap} />
        </>
      ) : (
        <h1>no data</h1>
      )}
      <br />
      {/* Display recent appointments */}
      <h1 className="text-2xl font-bold mb-2">Recent Appointments</h1>
      <div className="grid grid-cols-2 gap-y-2">
        {recentAppointments.length === 0 ? (
          <div className="text-center text-lg text-content">
            No recent appointments
          </div>
        ) : (
          recentAppointments.map((item, index) => (
            <AppointmentCompletedCard
              key={index}
              appointmentRequest={item}
              userType="seller"
            />
          ))
        )}
      </div>
      {/* Ratings and Reviews */}
      <SectionDivider
        title="Ratings and Reviews"
        icon="https://cdn-icons-png.freepik.com/256/12377/12377209.png?semt=ais_hybrid"
      />
      <div className="flex justify-center mb-3">
        <h1 className="text-xl font-semibold mt-3 mr-2">Overall Rating:</h1>
        <Rating rating={me?.rating_vetvisit} />
      </div>
      <VetReviews vetId={me?.id} />
    </div>
  );
};

export default MiddleLayoutVetHome;

import React, { useState, useEffect } from "react";
import AppointmentCompleted from "../cards/AppointmentCompleted-card";

function AppointmentCompletedContainer({ text }) {
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  // Determine the number of items to show based on the state
  const itemsToShow = showAll ? appointments : appointments.slice(0, 6);
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

  if (loading) {
    return <span className="loading loading-dots"></span>;
  } else
    return (
      <div className="bg bg-base-200 m-0 p-0 mb-4 rounded-xl">
        <h1 className="text-3xl font-bold ml-3">{text}</h1>
        <div className="grid grid-cols-1 gap-1 align-middle overflow-y-auto h-[60vh]">
          {itemsToShow.length === 0 && (
            <div className="flex justify-center items-center h-full">
              No completed appointments yet.
              {/* <img src="https://img.freepik.com/free-vector/hand-drawn-flat-design-shrug-illustration_23-2149318820.jpg" className="object-contain" alt="No completed appointments found" /> */}
            </div>
          )}
          {itemsToShow.map((item, index) => (
            <AppointmentCompleted
              key={index}
              appointmentRequest={item}
              userType="seller"
            />
          ))}
        </div>
      </div>
    );
}

export default AppointmentCompletedContainer;

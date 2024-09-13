import React, { useState, useEffect } from "react";
import AppointmentRequest from "../cards/AppointmentRequest-card";

function AppointmentRequestContainer({ text }) {
  const [showAll, setShowAll] = useState(false);
  const [appointmentRequests, setAppointmentRequests] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    // Fetch appointment requests data when the component mounts
    const fetchAppointmentRequests = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No auth token found in local storage.");
        return;
      }

      try {
        const url = `${process.env.REACT_APP_API_URL}/appointmentRequests/vet/myRequests`;
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

  // Determine the number of items to show based on the state
  const itemsToShow = showAll ? appointmentRequests : appointmentRequests.slice(0, 6);

  return (
    <div className="bg bg-base-200 m-0 p-0 mb-4 rounded-xl">
      <h1 className="text-3xl font-bold ml-3">{text}</h1>
      <div className="grid grid-cols-1 gap-1 align-middle overflow-y-auto h-[60vh]">
        {loading ? ( // Show loading indicator if loading
          <div className="flex justify-center items-center h-full">
            <div className="loader"></div> {/* Add a loading spinner or text */}
          </div>
        ) : (
          itemsToShow.map((item, index) => (
            <AppointmentRequest
              key={index}
              appointmentRequest={item}
            />
          ))
        )}
      </div>
      <div className="flex justify-center mt-4">
        {appointmentRequests.length > 6 && (
          <button
            className="btn btn-primary"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "See Less" : "See More"}
          </button>
        )}
      </div>
    </div>
  );
}

export default AppointmentRequestContainer;

import { useState, useEffect } from "react";
import React from "react";
import WriteReview from "../modals/write-review-appointment.js";

const PendingReview = ({ _review }) => {
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState(_review);
  const [appointment, setAppointment] = useState(null);

  const token = localStorage.getItem("authToken");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login"; // Redirect to the login page
  };

  const fetchData = async (url) => {
    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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
  };

  const fetchAppointmentAPI = async (token, itemId) => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/appointments/${review.appointmentId}`;
      return await fetchData(url);
    } catch (error) {
      console.error("Failed to fetch item", error);
      return null; // Return null in case of an error
    }
  };

  useEffect(() => {
    const fetchAppointment = async () => {
      setLoading(true);
      const fetchedItem = await fetchAppointmentAPI(
        token,
        review.appointmentId
      );
      if (fetchedItem) {
        setAppointment(fetchedItem);
      }
      setLoading(false);
    };

    fetchAppointment();
  }, [token, _review.appointmentId]);

  if (loading) {
    return (
      <div>
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  } else
    return (
      <div className="relative card w-72 h-60 m-1 shadow-lg">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-100"
          style={{
            backgroundImage: `url(https://img.freepik.com/premium-vector/beagle-dog-veterinary-visit-medical-clinic-office-puppy-anxiety-therapy-bandage-paw-vet-appointment-veterinarian-young-woman-vector-illustration-isolated-white-background_345238-768.jpg)`,
          }}
        ></div>

        {/* Semi-transparent Overlay */}
        <div className="absolute inset-0 bg-accent opacity-80"></div>

        {/* Main Content */}
        <div className="relative z-10 p-4">
          {appointment && (
            <WriteReview
              element_id={"review" + appointment.id}
              _appointment={appointment}
              _pendingReview={review}
            />
          )}

          <div className="card-body bg-transparent">
            <h2 className="card-title text-base-content text-sm">
              {appointment?.description}
            </h2>

            <div className="card-actions justify-center flex">
              <button
                className="btn btn-primary rounded-md w-32"
                onClick={() => {
                  document
                    .getElementById("review" + appointment.id)
                    .showModal();
                }}
              >
                Review Now
              </button>
              <button
                className="btn btn-secondary rounded-md w-32"
                onClick={() => {
                  window.location.href = `/appointment/${appointment.id}`;
                }}
              >
                Go to Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
};
export default PendingReview;

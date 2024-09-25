import React, { useState } from "react";
import RatingInputCustom from "../rating-input-custom";

const handleLogout = () => {
  localStorage.removeItem("authToken");
  window.location.href = "/login"; // Redirect to the login page
};

const WriteReview = ({ element_id, _appointment, _pendingReview, vetId }) => { // Added vetId as prop
  const [appointment, setAppointment] = useState(_appointment);
  const [vetRating, setVetRating] = useState(3);
  const [vetReview, setVetReview] = useState("");
  const [anonymous, setAnonymous] = useState(false); // New state for anonymous
  const [loading, setLoading] = useState(false);

  const handleReviewSubmit = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const url = `${process.env.REACT_APP_API_URL}/appointment/review/create`; // Corrected API URL
      const headers = new Headers({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      });

      // Creating the request body as per the NewReview record format
      const requestBody = {
        vetId: appointment.vetId, // Pass the vetId
        vetRating: vetRating,
        vetReview: vetReview,
        anonymous: anonymous, // Include anonymous field
        pendingAppointmentReviewId: _pendingReview.id,
      };

      console.log("Request body", requestBody);

      const requestOptions = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(requestBody),
      };

      setLoading(true);
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
      console.log("Review submitted successfully", data);
      alert("Review submitted successfully");

      // Reset form and close modal
      setVetRating(3);
      setVetReview("");
      setAnonymous(false); // Reset anonymous state
      document.getElementById(element_id).close();
      window.location.reload(); // Reload the page
    } catch (error) {
      console.error("Failed to submit review", error);
      alert("Failed to submit review");
    } finally {
      setLoading(false);
      // Reload only if the review submission was successful
      // window.location.reload(); // Uncomment if needed
    }
  };

  return (
    <div>
      <dialog id={element_id} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Write a Review for this appointment
          </h3>
          <div className="flex">
            <div className="w-4/5 place-items-center justify-center text-center">
              <h3 className=" text-lg text-left">
                <strong>Description:</strong> {appointment.description}
              </h3>

              <h3 className=" text-lg text-left mb-4">
                <strong>Prescription:</strong> {appointment.prescription}
              </h3>

              <p className="label-text text-left ml-5 mb-1 font-semibold">
                Vet Rating:
              </p>
              <RatingInputCustom rating={vetRating} setRating={setVetRating} />
              {vetRating}

              <p className="label-text text-left ml-5 mb-1 font-semibold">
                Vet Review:
              </p>
              <textarea
                className="textarea textarea-bordered"
                placeholder="Write your vet review here"
                value={vetReview} // Corrected to bind to vetReview
                onChange={(e) => setVetReview(e.target.value)} // Corrected to update vetReview
              ></textarea>

              {/* Checkbox for anonymous reviews */}
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={anonymous}
                  onChange={() => setAnonymous(!anonymous)}
                />
                <label className="ml-2">Submit anonymously</label>
              </div>
            </div>
          </div>
          <form method="dialog">
            <button className="btn btn-error float-end">Close</button>
            <button
              type="button"
              className="btn btn-primary float-end mx-1"
              onClick={handleReviewSubmit}
            >
              Submit Review
            </button>
            {loading && (
              <span className="loading loading-spinner loading-lg text-primary"></span>
            )}
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default WriteReview;

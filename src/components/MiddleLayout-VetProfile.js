import { useEffect, useState } from "react";
import React from "react";
import SectionDivider from "./Section-Divider";
import Timeline from "./Timeline";
import Rating from "./Rating";

import EditPasswordModal from "./modals/edit-password";
import EditProfileModal from "./modals/edit-profile-vet";
import BookAppointment from "./modals/book-appointment";

import VetReviews from "./containers/Vet-Review-Container";

// Function to fetch the vet profile by vetId
const fetchData = async (token, vetId) => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/vet/getVetById/${vetId}`;
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
    return data;
  } catch (error) {
    console.error("Failed to fetch the vet:", error);
    return null; // Return null in case of an error
  }
};

const MiddleLayoutVetProfile = ({ vetId }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(true); // State to handle loading
  const [vet, setVet] = useState(null);
  const [visitor, setVisitor] = useState(null);
  const userType = localStorage.getItem("userType");

  const fetchVet = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No auth token found in local storage.");
      setLoading(false);
      return;
    }

    try {
      const data = await fetchData(token, vetId);
      setVet(data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false); // Ensure loading is set to false after fetching
    }
  };

  useEffect(() => {
    const fetchWhoAmI = async () => {
      try {
        setLoading(true);
        const url = `${process.env.REACT_APP_API_URL}/` + userType + `/whoami`;
        const token = localStorage.getItem("authToken");
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setVisitor(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchWhoAmI();
    fetchVet();
  }, [vetId]);

  const toggleAbout = () => {
    setIsExpanded(!isExpanded);
  };

  if (loading) {
    return (
      <div className="flex-1 bg-base-200 rounded-lg p-4 min-h-screen place-items-center">
        <span className="loading loading-lg loading-ring text-primary"></span>
      </div>
    );
  }

  const isOwner = visitor?.id === vetId; // Check if the logged-in user is the vet (owner)

  return (
    <div className="flex-1 bg-base-200 rounded-lg p-4 min-h-screen">
      <EditProfileModal element_id="edit_profile_vet" />
      <EditPasswordModal element_id="edit_password" userId={vetId} />
      {vet && (
        <BookAppointment element_id={"book_appointment" + vet?.id} _vet={vet} />
      )}

      <SectionDivider title="Profile Details" icon="" />

      <div className="avatar float-right mb-5 mr-10 mt-2">
        <div className="ring-primary ring-offset-base-100 w-40 h-40 rounded-full aspect-square ring ring-offset-2">
          <img src={vet?.image} />
        </div>
      </div>

      {vet ? (
        <>
          <h1 className="text-xl font-bold m-3">
            Name:{" "}
            <b className="text-4xl">{vet?.firstname + " " + vet?.lastname} </b>
          </h1>
          <div className="text-lg m-3 grid-cols-2 grid mb-5">
            <p>
              <span className="font-bold">DOB:</span> {vet?.DOB}
            </p>
            <p>
              <span className="font-bold">Gender:</span> {vet?.gender}
            </p>
          </div>

          <h1 className="pl-3 font-bold text-xl">Contact Info:</h1>

          <div className="text-lg m-1 ml-3 grid-cols-2 grid mb-5">
            <p>
              <span className="font-bold">Phone:</span> {vet?.phone}
            </p>
            <p>
              <span className="font-bold">Email:</span> {vet?.email}
            </p>
            <p>
              <span className="font-bold">Clinic Name:</span> {vet?.clinic_name}
            </p>
            <p>
              <span className="font-bold">Clinic Address:</span>{" "}
              {vet?.clinic_address}
            </p>
          </div>

          <h1 className="pl-3 font-bold text-xl">Address:</h1>

          <div className="text-lg ml-3 m-1 grid-cols-2 grid mb-5">
            <p>
              <span className="font-bold">Address:</span> {vet?.address}
            </p>
            <p>
              <span className="font-bold">Post-Office:</span> {vet?.postOffice}
            </p>
            <p>
              <span className="font-bold">District:</span> {vet?.district}
            </p>
            <p>
              <span className="font-bold">Country:</span> {vet?.country}
            </p>
          </div>

          <div className="font-serif italic m-4">
            <b className="font-bold not-italic font-sans">About: {"   "}</b>
            {isExpanded || vet?.about.split(" ").length <= 30
              ? vet?.about
              : `${vet?.about.split(" ").slice(0, 30).join(" ")}...`}
            {vet?.about.split(" ").length > 30 && (
              <button
                onClick={toggleAbout}
                className="text-blue-600 text-xs ml-0"
              >
                {isExpanded ? " See Less" : " See More"}
              </button>
            )}
          </div>

          {/* Show Edit Profile and Change Password buttons only if the visitor is the vet (owner) */}
          {isOwner && (
            <>
              <div className="flex">
                <button
                  className="btn btn-primary mt-3 m-1 h-8 rounded-md items-center gap-2 p-2"
                  onClick={() =>
                    document.getElementById("edit_profile_vet").showModal()
                  }
                >
                  <svg
                    className="feather feather-edit"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  <span>Edit Profile</span>
                </button>

                <button
                  className="btn btn-accent mt-3 m-1 h-8 rounded-md items-center gap-2 p-2"
                  onClick={() =>
                    document.getElementById("edit_password").showModal()
                  }
                >
                  <svg
                    className="feather feather-edit"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  <span>Change Password</span>
                </button>
              </div>
            </>
          )}

          {/* Show Book Appointment button only if the visitor is NOT the vet */}
          {userType === "user" && (
            <button
              className="btn btn-secondary mt-3 m-1 h-8 rounded-md items-center gap-2 p-2"
              onClick={() => {
                document
                  .getElementById("book_appointment" + vet?.id)
                  .showModal();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8.25v7.5m3.75-3.75h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Book Appointment
            </button>
          )}
          <button className="btn btn-secondary mt-3 m-1 h-8 rounded-md items-center gap-2 p-2">
            <svg
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path d="M256 352c-16.53 0-33.06-5.422-47.16-16.41L0 173.2V400C0 426.5 21.49 448 48 448h416c26.51 0 48-21.49 48-48V173.2l-208.8 162.5C289.1 346.6 272.5 352 256 352zM16.29 145.3l212.2 165.1c16.19 12.6 38.87 12.6 55.06 0l212.2-165.1C505.1 137.3 512 125 512 112C512 85.49 490.5 64 464 64h-416C21.49 64 0 85.49 0 112C0 125 6.01 137.3 16.29 145.3z" />
            </svg>
            <span>Send Message</span>
          </button>
        </>
      ) : (
        <p>Veterinarian details could not be fetched.</p>
      )}

      {/* <SectionDivider title="Timeline" icon="" />
      <Timeline /> */}
      <SectionDivider title="Ratings" icon="" />
      <div className="place-items-center justify-center grid mb-4">
        <Rating rating={vet?.rating_vetvisit} />
      </div>
      <VetReviews vetId = {vet?.id}/>
    </div>
  );
};

export default MiddleLayoutVetProfile;

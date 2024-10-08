import { useState, useEffect } from "react";
import { useRef } from "react";
import React from "react";
import SectionDivider from "./Section-Divider";
import Timeline from "./Timeline";
import ViewImageModal from "./modals/view-image-modal";
import UploadImageModal from "./modals/upload-image-pet";

const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const currentDate = new Date();

  const diffInMilliseconds = currentDate - birthDate;

  const ageDate = new Date(diffInMilliseconds); // Convert to date object for easier calculation
  const years = ageDate.getUTCFullYear() - 1970; // Get the difference in years
  const months = ageDate.getUTCMonth(); // Get the difference in months
  const days = ageDate.getUTCDate() - 1; // Get the difference in days

  if (years === 0 && months === 0) {
    return `${days} days`;
  }
  if (years === 0) {
    return `${months} months, ${days} days`;
  }
  return `${years} years, ${months} months`;
};

const timelineData = [
  { id: 1, date: "2017-01-01", event: "Was Born" },
  { id: 2, date: "2018-02-18", event: "Had Constipation" },
  { id: 3, date: "2020-03-17", event: "Haga problem" },
  { id: 4, date: "2023-04-01", event: "Shonay Somossha" },
  { id: 5, date: "2023-07-04", event: "Matha betha" },
];

const fetchData = async (token, petId) => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/pets/${petId}`;
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
    console.error("Failed to fetch the pet:", error);
    return null; // Return null in case of an error
  }
};


const MiddleLayoutPetProfile = ({ petId }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(true); // State to handle loading
  const [pet, setPet] = useState(null);
  const [timelineData, setTimelineData] = useState([]);
  const [ownerId, setOwnerId] = useState(null);
  const [visitor, setVisitor] = useState(null);

  const userType = localStorage.getItem("userType");

  const fetchPet = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No auth token found in local storage.");
      setLoading(false);
      return;
    }

    try {
      const data = await fetchData(token, petId);
      setPet(data);
      setOwnerId(data.ownerId);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false); // Ensure loading is set to false after fetching
    }
  };

  useEffect(() => {
    const fetchTimelineData = async () => {
      const token = localStorage.getItem("authToken");
      const url = `${process.env.REACT_APP_API_URL}/appointments/petTimeline/${petId}`;
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
      setTimelineData(data);
    };

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

    fetchTimelineData();      
    fetchPet();
    fetchWhoAmI();
  }, [petId]);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const isOwner = visitor?.id === ownerId; // Check if the logged-in user is the vet (owner)

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-base-200 rounded-lg p-4 min-h-screen">
      {/* {petId} */}
      {/* Your content for MiddleLayout */}
      <SectionDivider
        title="Profile Details"
        icon="https://redpawpacks.com/wp-content/uploads/2018/03/RED-PAW-LOGO_PAW_PRINT_ONLY_SMALL.png"
      />

      <div className="avatar float-right mb-5 mr-10 mt-2">
        <div className="ring-primary ring-offset-base-100 w-40 h-40 rounded-full aspect-square ring ring-offset-2">
          <img src={pet.images[0]} alt="Pet" />
        </div>
      </div>

      {pet ? (
        <>
          <h1 className="text-4xl font-bold m-3">{pet.name}</h1>
          <div className="text-lg m-3 grid-cols-3 grid mb-5">
            <p>
              <span className="font-bold">Age:</span>
              {" " + calculateAge(pet.dob)}
            </p>
            <p>
              <span className="font-bold">Type:</span> {pet.type}
            </p>
            <p>
              <span className="font-bold">Breed:</span> {pet.breed}
            </p>
            <p>
              <span className="font-bold">DOB:</span>{" "}
              {new Date(pet.dob).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p>
              <span className="font-bold">Gender:</span> {pet.gender}
            </p>
          </div>

          <div className="font-serif italic">
            {pet.description ? (
              isExpanded || pet.description.split(" ").length <= 30 ? (
                pet.description
              ) : (
                `${pet.description.split(" ").slice(0, 30).join(" ")}...`
              )
            ) : (
              <p>No description available</p>
            )}
            {pet.description && pet.description.split(" ").length > 30 && (
              <button onClick={toggleDescription} className="text-blue-600">
                {isExpanded ? "See Less" : "See More"}
              </button>
            )}
          </div>

          <SectionDivider
            title="Photo Gallery"
            icon="https://cdn-icons-png.flaticon.com/512/1375/1375106.png"
          />

          {/* images */}
          <div className="carousel rounded-box h-96">
            {pet.images.map((image, index) => (
              <div key={index} className="carousel-item">
                <ViewImageModal
                  image={image}
                  element_id={"view_image" + index}
                />
                <img
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="object-cover object-center h-40 max-w-full rounded-lg md:h-96"
                  onClick={() => {
                    document.getElementById("view_image" + index).showModal();
                  }}
                />
              </div>
            ))}
          </div>
          <UploadImageModal element_id="upload_image_pet" petId={petId} />

          { /* add condition */}
          {isOwner && (
            <>

              <button className="btn btn-primary mt-5"
                onClick={() => {
                  document.getElementById("upload_image_pet").showModal();
                }}
              >Upload Image</button>

            </>
          )}
        </>
      ) : (
        <p>No pet data found.</p>
      )}

      <SectionDivider
        title="Medical History"
        icon="https://cdn-icons-png.flaticon.com/512/2937/2937409.png"
      />
      <Timeline timelineData={timelineData} />

      {/* <SectionDivider title="Vaccination History" /> */}
    </div>
  );
};

export default MiddleLayoutPetProfile;

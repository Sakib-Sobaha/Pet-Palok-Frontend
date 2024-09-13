import { useState, useEffect } from "react";
import { useRef } from "react";
import React from "react";
import SectionDivider from "./Section-Divider";
import Timeline from "./Timeline";
import ViewImageModal from "./modals/view-image-modal";

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
    const url = `http://localhost:8080/api/v1/pets/${petId}`;
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

const images = [
  "https://cdn.pixabay.com/photo/2023/08/18/15/02/dog-8198719_640.jpg",
  "https://www.bhmpics.com/downloads/beautiful-pictures-of-dogs/56.golden_puppy_dog_pictures.jpg",
  "https://static.toiimg.com/photo/109692764/109692764.jpg",
  "https://www.petbarn.com.au/petspot/app/uploads/2016/03/HYG9.2-Blog-Genral-In-Post-800x533px.png",
  "https://hips.hearstapps.com/del.h-cdn.co/assets/cm/15/10/54f94e3f42698_-_dog-stick-del-blog.jpg?crop=1xw:0.7309644670050761xh;center,top&resize=1200:*",
];

const MiddleLayoutPetProfile = ({ petId }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(true); // State to handle loading
  const [pet, setPet] = useState(null);

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
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false); // Ensure loading is set to false after fetching
    }
  };

  useEffect(() => {
    fetchPet();
  }, [petId]);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

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
        </>
      ) : (
        <p>No pet data found.</p>
      )}

      <SectionDivider
        title="Medical History"
        icon="https://cdn-icons-png.flaticon.com/512/2937/2937409.png"
      />
      <Timeline timelineData={timelineData} />

      <SectionDivider title="Vaccination History" />
    </div>
  );
};

export default MiddleLayoutPetProfile;

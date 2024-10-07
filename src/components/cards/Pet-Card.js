import React, { useEffect } from "react";
import { useState } from "react";
import { fetchUserData } from "../api-fetch-functions/fetch-whoami";

function calculateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();

  // Adjust years and months if the current month is before the birth month
  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months };
}

function PetCard({ pet }) {
  const lenMax = 6;
  const [isExpanded, setIsExpanded] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  const image = pet && pet.images && pet.images.length > 0 ? pet.images[0] : "";

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const visitProfile = () => {
    window.location.href = `/user/pets/${pet.id}`;
  };

  const { years, months } = calculateAge(pet?.dob);

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    const fetchUser = async () => {
      setLoading(true);
      const data = await fetchUserData(`/${userType}/whoami`); // Use the reusable fetch function
      if (data) {
        setUser(data);
        setUserId(data.id); // Pass the user ID to the parent component if needed
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (loading)
    return (
      <div>
        <div className="flex w-52 flex-col gap-4">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
    );
  else
    return (
      <div className="card card-compact bg-base-100 shadow-xl m-1 hover:scale-105 transition-transform duration-300 hover:shadow-lg">
        <figure>
          <img
            src={image}
            alt={pet.name}
            className="rounded-t-lg h-48 object-cover w-full"
          />
        </figure>
        <div className="card-body">
          {/* {JSON.stringify(pet)} */}
          <div className="flex flex-row">
            <h2 className="card-title font-bold mr-2">{pet.name}</h2>
            <div>
              {pet?.gender === "male" && (
                <img
                  src="https://cdn-icons-png.flaticon.com/512/6146/6146433.png"
                  className="h-5 w-5 mt-1"
                  alt="male"
                />
              )}
              {pet?.gender === "female" && (
                <img
                  src="https://static.vecteezy.com/system/resources/previews/017/178/227/original/female-symbol-isolated-icon-on-transparent-background-free-png.png"
                  className="h-5 w-5 mt-1"
                  alt="female"
                />
              )}
            </div>
          </div>

          <div className=" w-full text-center p-0">
            <p className="text-sm badge badge-warning m-0.5">{pet.type}</p>
            <p className="text-sm badge badge-info m-0.5">{pet.breed}</p>
            <p className="text-sm m-0.5">
              <a className="badge badge-neutral">
                {years} year{years > 1 ? "s" : ""} & {months} month
                {months > 1 ? "s old" : " old"}
              </a>
            </p>
            <p></p>
          </div>

          <p className="text-justify">
            {isExpanded || pet.description.split(" ").length <= lenMax
              ? pet.description
              : `${pet.description.split(" ").slice(0, lenMax).join(" ")}...`}
            {pet.description.split(" ").length > lenMax && (
              <button onClick={toggleDescription} className="text-primary ">
                {isExpanded ? "See Less" : "See More"}
              </button>
            )}
          </p>
          <div className="card-actions grid-cols-1 grid">
            <button
              className="btn btn-primary rounded-lg"
              onClick={visitProfile}
            >
              Visit Profile
            </button>
            {user && user.id === pet.ownerId && (
              <button
                className="btn btn-error rounded-lg"
                onClick={() => {
                  console.log("Delete pet");
                  // Implement the delete functionality here
                  const deleteUrl = `${process.env.REACT_APP_API_URL}/pets/delete/${pet.id}`;
                  fetch(deleteUrl, {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  })
                    .then((response) => {
                      if (response.ok) {
                        console.log("Pet deleted successfully");
                        alert("Pet deleted successfully");
                        // Implement the redirect functionality here
                        window.location.href = "/user/pets";
                      } else {
                        console.error("Failed to delete pet");
                      }
                    })
                    .catch((error) => {
                      console.error("Failed to delete pet", error);
                    });
                }}
              >
                Delete Pet
              </button>
            )}
          </div>
        </div>
      </div>
    );
}

export default PetCard;

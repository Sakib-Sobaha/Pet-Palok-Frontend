import React from "react";
import { useState } from "react";

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
  const lenMax = 12;
  const [isExpanded, setIsExpanded] = useState(false);

  const image = pet && pet.images && pet.images.length > 0 ? pet.images[0] : "";

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const visitProfile = () => {
    window.location.href = `/user/pets/${pet.id}`;
  };

  const { years, months } = calculateAge(pet?.dob);

  return (
    <div className="card card-compact bg-base-100 w-64 shadow-xl m-1 hover:scale-105 transition-transform duration-300 hover:shadow-lg">
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
                src="https://gqvsgivkqyrtzrxieose.supabase.co/storage/v1/object/public/pet-palok/male.png"
                className="h-5 w-5 mt-1"
                alt="male"
              />
            )}
            {pet?.gender === "female" && (
              <img
                src="https://gqvsgivkqyrtzrxieose.supabase.co/storage/v1/object/public/pet-palok/female.png"
                className="h-5 w-5 mt-1"
                alt="male"
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
        <div className="card-actions grid-cols-2 grid">
          <button className="btn btn-primary rounded-lg" onClick={visitProfile}>
            Visit Profile
          </button>
          <button className="btn btn-error rounded-lg">Delete Pet</button>
        </div>
      </div>
    </div>
  );
}

export default PetCard;

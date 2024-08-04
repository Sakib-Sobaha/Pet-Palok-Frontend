import React from "react";
import { useState } from "react";

function PetCard({ pet }) {
  const lenMax = 12;
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const visitProfile = () => {
    window.location.href = `/user/pets/${pet.id}`;
  };

  return (
    <div className="card card-compact bg-base-100 w-64 shadow-xl m-1 hover:scale-105 transition-transform duration-300 hover:shadow-lg">
      <figure>
        <img
          src={pet.image}
          alt={pet.name}
          className="rounded-t-lg h-48 object-cover w-full"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title font-bold">{pet.name}</h2>

        <div className="flex w-full justify-between p-0">
          <p className="text-sm">
            <b>Type:</b> {pet.type}
          </p>
          <p className="text-sm">
            <b>Age:</b> {pet.age}
          </p>
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

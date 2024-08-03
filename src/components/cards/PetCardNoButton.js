import React from "react";
import { Route, useHref } from "react-router-dom";

function PetCardNoButton({ pet }) {
  const visitProfile = () => {
    window.location.href = `/user/pets/${pet.id}`;
  }

  return (
    <div className="card bg-base-100 w-64 shadow-xl m-1 hover:scale-105 transition-transform duration-300 hover:shadow-lg cursor-pointer"
        onClick={visitProfile}
    >
      <figure>
        <img
          src={pet.image}
          alt={pet.name}
          className="rounded-t-lg h-48 object-cover w-full"
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title font-bold text-primary text-pretty">{pet.name}</h2>

        <div className="flex w-full justify-between p-0 text-accent">
          <p className="text-sm">
            <b>Type:</b> {pet.type}
          </p>
          <p className="text-sm">
            <b>Age:</b> {pet.age}
          </p>
        </div>

        <p className="text-justify">{pet.description}</p>
        {/* <div className="card-actions grid-cols-2 grid">
          <button className="btn btn-primary rounded-lg" 
            onClick={visitProfile}
          >
            Visit Profile
          </button>
          <button className="btn btn-error rounded-lg">Delete Pet</button>
        </div> */}
      </div>
    </div>
  );
}

export default PetCardNoButton;

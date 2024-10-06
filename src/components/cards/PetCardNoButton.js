import React from "react";
import { useState } from "react";

function PetCardNoButton({ pet }) {
  const [showAlert, setShowAlert] = useState(false);
  const visitProfile = () => {
    // window.location.href = `/user/pets/${pet.id}`;
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  return (
    <div
      className="card bg-base-100 w-64 shadow-xl m-1 hover:scale-105 transition-transform duration-300 hover:shadow-lg cursor-pointer"
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
        <h2 className="card-title font-bold text-primary text-pretty">
          {pet.name}
        </h2>

        <div className="flex w-full justify-between p-0 text-accent">
          <p className="text-sm">
            <b>Type:</b> {pet.type}
          </p>
          <p className="text-sm">
            <b>Age:</b> {pet.age} years
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
      {showAlert && (
        <div
          role="alert"
          className="alert alert-success flex items-center mt-4 p-4 bg-orange-100 border border-orange-400 text-orange-700 rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>Please LOGIN to View Pet Profile</span>
        </div>
      )}
    </div>
  );
}

export default PetCardNoButton;

import React from "react";

function PetCard({ pet }) {
  return (
    <div className="card bg-base-100 w-64 shadow-xl m-1">
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
          <p className="text-sm"><b>Type:</b> {pet.type}</p>
          <p className="text-sm"><b>Age:</b> {pet.age}</p>
        </div>
        
        <p className="text-justify">{pet.description}</p>
        <div className="card-actions grid-cols-2 grid">
          <button className="btn btn-primary">Visit Profile</button>
          <button className="btn btn-error">Delete Pet</button>
        </div>
      </div>
    </div>
  );
}

export default PetCard;

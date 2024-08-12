// src/cards/Pet-BSX-Card.js
import React, { useState } from "react";

function PetBSXCard({ pet, post }) {
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
        <div className="grid grid-cols-2 place-items-center">
          <h2 className="card-title font-bold">{pet.name}</h2>
          <h2 className="font-bold pt-0 font-mono text-success">
            {post ? `${post.price} taka` : "Price not available"}
          </h2>
        </div>
        <div className="w-full overflow-x-auto">
          <span className="badge badge-warning badge-outline text-xs m-0.5"> {pet.type} </span>
          <span className="badge badge-info badge-outline text-xs m-0.5"> {pet.breed} </span>
          <span className="badge badge-info badge-outline text-xs m-0.5"> {pet.age} years old </span>
        </div>
        <p className="text-justify px-2">
          
          {isExpanded || !post || post?.description.split(" ").length <= lenMax
            ? post?.description || "No description available"
            : `${post?.description.split(" ").slice(0, lenMax).join(" ")}...`}
          {post?.description?.split(" ").length > lenMax && (
            <button onClick={toggleDescription} className="text-primary ">
              {isExpanded ? "See Less" : "See More"}
            </button>
          )}
        </p>
        <div className="card-actions grid-cols-2 grid">
          <button className="btn btn-primary rounded-lg" onClick={visitProfile}>View Post</button>
          <button className="btn btn-error p-0 rounded-lg">Delete Post</button>
        </div>
      </div>
    </div>
  );
}

export default PetBSXCard;

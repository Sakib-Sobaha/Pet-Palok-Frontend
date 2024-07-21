import React from "react";
// import { Route, useHref } from "react-router-dom";

function ItemCard({ item }) {
  return (
    <div className="card bg-base-100 w-64 shadow-xl m-1">
      <figure>
        <img
          src={item.image}
          alt={item.name}
          className="rounded-t-lg h-48 object-cover w-full"
        />
      </figure>
      <div className="card-body p-2">
        <h2 className="card-title font-bold">{item.name}</h2>

        <div className=" w-full grid grid-cols-2 justify-between p-0">
          <p className="text-sm">
            <b>Price:</b> {item.price_per_unit}
          </p>
          <p className="text-sm">
            <b>Type:</b> {item.type}
          </p>
          <p className="text-sm">
            <b>Pet-Type:</b> {item.pet_type}
          </p>
        </div>

        <p className="text-justify">{item.description}</p>
        <div className="card-actions grid-cols-2 grid">
          <button className="btn btn-primary rounded-lg" >
            Visit Profile
          </button>
          <button className="btn btn-error rounded-lg">Delete Pet</button>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;

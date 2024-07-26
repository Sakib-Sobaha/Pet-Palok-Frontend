import React from "react";
// import { Route, useHref } from "react-router-dom";

function ItemCard({ item }) {
  return (
    <div className="card rounded-none bg-base-100 w-64 h-80 shadow-xl m-1">
      <figure>
        <img
          src={item.image}
          alt={item.name}
          className=" h-72 w-52 object-cover rounded-lg"
        />
      </figure>
      <div className="card-body p-1">
        <h2 className="text-xl m-0 font-bold grid place-items-center">
          {item.name}
        </h2>
        <div className="grid grid-cols-3 m-1 gap-0">
          <h2 className="text-sm m-0 text-green-600 grid place-items-center font-mono">
            {/* {"BDT-"} */}
            <b className="font-bold">
              {item && item.price_per_unit + " taka"}
              {""}{" "}
            </b>
          </h2>

          <p className="text-sm grid place-items-center w-full">
            <b className="text-sm text-primary"> {item.quantity}</b>
          </p>
          <p className="text-sm grid place-items-center ">
            <b></b> {item.type}
          </p>
          <p className="text-sm grid place-items-center ">
            {/* <b>Pet-Type:</b> {item.pet_type} */}
          </p>
        </div>
        {/* <div className=" w-full grid grid-cols-2 justify-between p-0 mb-0 mt-0">
          
        </div> */}

        {/* <p className="text-justify">{item.description}</p> */}
        <div className="card-actions grid">
          <button className="btn btn-primary rounded-none">Add to Cart</button>
          {/* <button className="btn btn-error rounded-lg"></button> */}
        </div>
      </div>
    </div>
  );
}

export default ItemCard;

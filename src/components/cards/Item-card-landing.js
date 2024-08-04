import React, { useState } from "react";
import Rating from "../Rating-Small";
function ItemCardNoButton({ item }) {
  const [showAlert, setShowAlert] = useState(false);

  const searchByType = () => {
    console.log("search by type");
  };

  const addToCart = () => {
    setShowAlert(true);
    // Automatically hide the alert after 3 seconds
    setTimeout(() => setShowAlert(false), 2000);
  };

  const getTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case "food":
        return "badge-success"; // Green background for food
      case "accessories":
        return "badge-info"; // Blue background for accessories
      case "medicine":
        return "badge-error"; // Red background for medicine
      default:
        return "badge-ghost"; // Default gray for unknown types
    }
  };

  return (
    <div className="card rounded-none bg-base-100 w-64 h-80 shadow-xl m-1">
      <figure>
        <img
          src={item.image}
          alt={item.name}
          className="h-72 w-52 object-cover rounded-lg"
        />
      </figure>
      <div className="card-body p-1">
        <h2 className="text-xl m-0 font-bold grid place-items-center pl-4 mt-2">
            <div className="">
          <span className=" p-2">{item.name}</span>
            <Rating rating={item.rating} className=""/>
            </div>
        </h2>
        <div className="grid grid-cols-3 m-1 gap-0 place-items-center">
          <h2 className="text-sm m-0 text-green-600 grid place-items-center font-mono">
            <b className="font-bold">{item && item.price_per_unit + " taka"}</b>
          </h2>

          <p className="text-sm grid place-items-center w-full">
            <b className="text-sm text-primary"> {item.quantity}</b>
          </p>
          <p
            className={`badge cursor-pointer badge-outline text-xs ${getTypeColor(
              item.type
            )}`}
            onClick={searchByType}
          >
            {item.type}
          </p>
        </div>
        <div className="card-actions grid">
          <button className="btn btn-primary rounded-none" onClick={addToCart}>
            Add to Cart
          </button>
        </div>
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
          <span>Please LOGIN to add the item to your cart!</span>
        </div>
      )}
    </div>
  );
}

export default ItemCardNoButton;

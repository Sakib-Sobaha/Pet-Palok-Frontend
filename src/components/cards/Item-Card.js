import React, { useState } from "react";
import Rating from "../Rating-Small";

function ItemCardNoButton({ item, viewer, owner }) {
  const [showAlert, setShowAlert] = useState(false);

  const userType = localStorage.getItem("userType");

  const handleVisitItem = () => {
    window.location.href = "/marketplace/item";
  };

  const searchByType = () => {
    console.log("search by type");
  };

  const addToCart = () => {
    setShowAlert(true);
    // Automatically hide the alert after 2 seconds
    setTimeout(() => setShowAlert(false), 2000);
  };

  const deleteItem = () => {
    console.log("Item deleted");
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
    <div
      className="tooltip tooltip-info tooltip-right"
      data-tip={item.petType}
    >
      <div
        className={`ml-2 card rounded-none bg-base-100 w-64 shadow-xl m-1 cursor-pointer hover:scale-105 transition-transform duration-300 hover:shadow-lg ${
          owner ? "h-96" : "h-80"
        }`}
      >
        <figure onClick={handleVisitItem} className="">
          <img
            src={item.images[0]}
            alt={item.name}
            className="h-72 w-52 object-cover rounded-lg"
          />
        </figure>
        <div className="card-body p-1">
          <h2 className="text-xl m-0 font-bold grid place-items-center pl-4 mt-2">
            <div>
              <span className="p-2">{item.name}</span>
              <Rating rating={item.rating} />
            </div>
          </h2>
          <div className="grid grid-cols-3 m-1 gap-0 place-items-center">
            <h2 className="text-sm m-0 text-green-600 grid place-items-center font-mono">
              <b className="font-bold">{item && item.pricePerUnit + " taka"}</b>
            </h2>
            <p className="text-sm grid place-items-center w-full">
              <b className="text-sm text-primary">{item.quantity}</b>
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
          <div className="card-actions grid gap-0">
            {userType === "user" && (
              <>
                <button
                  className="btn btn-primary rounded-none"
                  onClick={addToCart}
                >
                  Add to Cart
                </button>
              </>
            )}
            {userType === "seller" && (
              <button className="btn btn-secondary rounded-none mb-1">
                View Item
              </button>
            )}
            {owner && (
              <>
                <button
                  className="btn btn-error rounded-none"
                  onClick={deleteItem}
                >
                  Delete Item
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemCardNoButton;

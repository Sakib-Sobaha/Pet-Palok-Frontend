import React, { useState } from "react";

function ItemCard({ item }) {
  const [showAlert, setShowAlert] = useState(false);

  const addToCart = () => {
    setShowAlert(true);
    // Automatically hide the alert after 3 seconds
    setTimeout(() => setShowAlert(false), 3000);
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
        <h2 className="text-xl m-0 font-bold grid place-items-center">
          {item.name}
        </h2>
        <div className="grid grid-cols-3 m-1 gap-0">
          <h2 className="text-sm m-0 text-green-600 grid place-items-center font-mono">
            <b className="font-bold">
              {item && item.price_per_unit + " taka"}
            </b>
          </h2>

          <p className="text-sm grid place-items-center w-full">
            <b className="text-sm text-primary"> {item.quantity}</b>
          </p>
          <p className="text-sm grid place-items-center">
            <b></b> {item.type}
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
          className="alert alert-success flex items-center mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current mr-2"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Item added to cart successfully!</span>
        </div>
      )}
    </div>
  );
}

export default ItemCard;

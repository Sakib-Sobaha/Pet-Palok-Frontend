import React from "react";
import { useState } from "react";

import Rating from "../Rating-Small";
import BookAppointment from "../modals/book-appointment";

function StoreCard({ store }) {
  const lenMax = 12;
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedstore, setSelectedstore] = useState(null);

  const togglestoreAddress = () => {
    setIsExpanded(!isExpanded);
  };

  const visitProfile = () => {
    window.location.href = `/seller/profile/${store?.id}`;
  };

  const visitStore = () => {
    window.location.href = `/store/${store?.id}`;
  };

  const handleBookAppointment = (store) => {
    setSelectedstore(store);
    // You can now open your prompt/modal and pass `selectedstore` data to it.
    // alert(`You are booking an appointment with ${store?.firstname} ${store?.lastname}`);
  };

  return (
    <div className="card card-compact bg-base-100 w-64 shadow-xl m-1 hover:scale-105 transition-transform duration-300 hover:shadow-lg">
      {/* <BookAppointment element_id="book_appointment" store={store} /> */}
      {store?.image === null || store?.image === "" ? (
        <>
            <figure>
            <img
              src="https://png.pngtree.com/png-clipart/20230811/original/pngtree-pet-shop-rgb-color-icon-service-supermarket-friend-vector-picture-image_10410931.png"
              alt={store?.lastname}
              className="rounded-t-lg h-48 w-full object-contain"
            />
          </figure>
        </>
      ) : (
        <>
          <figure>
            <img
              src={store?.image}
              alt={store?.lastname}
              className="rounded-t-lg h-48 object-cover w-full"
            />
          </figure>
        </>
      )}

      <div className="card-body">
        <h2 className=" m-0 font-bold grid place-items-center text-center pl-4 mt-2">
          <div>
            <span className="p-2 text-xl">{store?.storeName}</span>
            <Rating rating={store?.rating} className="" />
          </div>
        </h2>

        <div className=" w-full text-center p-0">
          {/* <p className="text-sm">
            <b>{store?.clinic_name}</b> 
          </p> */}
        </div>

        <p className="text-center">
          {store.storeAddress && (
            <>
              <b>Store Address:</b>
              {isExpanded || store?.storeAddress.split(" ").length <= lenMax
                ? store?.storeAddress
                : `${store?.storeAddress
                    .split(" ")
                    .slice(0, lenMax)
                    .join(" ")}...`}
              {store?.storeAddress.split(" ").length > lenMax && (
                <button onClick={togglestoreAddress} className="text-primary ">
                  {isExpanded ? "See Less" : "See More"}
                </button>
              )}
            </>
          )}
        </p>
        <div className="card-actions grid-cols-2 grid">
          <button className="btn btn-warning rounded-lg" onClick={visitStore}>
            {/* <img src="https://e7.pngegg.com/pngimages/1006/918/png-clipart-computer-icons-symbol-appointment-white-text-thumbnail.png" alt="View Profile" className="w-6 h-6" /> */}
            Visit Store
          </button>
          <button className="btn btn-accent rounded-lg"
            onClick={visitProfile}
          >View Profile</button>
        </div>
      </div>
    </div>
  );
}

export default StoreCard;

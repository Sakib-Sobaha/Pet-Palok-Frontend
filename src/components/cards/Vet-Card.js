import React from "react";
import { useState } from "react";

import Rating from "../Rating-Small";
import BookAppointment from "../modals/book-appointment";

function VetCard({ vet }) {
  const lenMax = 12;
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedVet, setSelectedVet] = useState(null);

  const toggleclinic_address = () => {
    setIsExpanded(!isExpanded);
  };

  const visitProfile = () => {
    window.location.href = `/vet/profile/${vet?.id}`;
  };

  const handleBookAppointment = (vet) => {
    setSelectedVet(vet);
    // You can now open your prompt/modal and pass `selectedVet` data to it.
    // alert(`You are booking an appointment with ${vet?.firstname} ${vet?.lastname}`);
  };

  return (
    <div className="card card-compact bg-base-100 w-64 shadow-xl m-1 hover:scale-105 transition-transform duration-300 hover:shadow-lg">
      {vet && <BookAppointment element_id={"book_appointment"+ vet.id } _vet={vet} />}
      {/* <BookAppointment element_id="book_appointment" vet={vet} /> */}
      <figure>
        <img
          src={vet?.image}
          alt={vet?.lastname}
          className="rounded-t-lg h-48 object-cover w-full"
        />
      </figure>
      <div className="card-body">
        <h2 className=" m-0 font-bold grid place-items-center text-center pl-4 mt-2">
          <div>
            <span className="p-2 text-xl">{vet?.firstname + " " + vet?.lastname}</span>
            <Rating rating={vet?.rating_vetvisit} className=""/>
          </div>
        </h2>

        <div className=" w-full text-center p-0">
          <p className="text-sm">
            <b>{vet?.clinic_name}</b> 
          </p>
          
        </div>

        <p className="text-center">
        <b>Visiting Address:</b>
          {isExpanded || vet?.clinic_address?.split(" ").length <= lenMax
            ? vet?.clinic_address
            : `${vet?.clinic_address?.split(" ").slice(0, lenMax).join(" ")}...`}
          {vet?.clinic_address?.split(" ").length > lenMax && (
            <button onClick={toggleclinic_address} className="text-primary ">
              {isExpanded ? "See Less" : "See More"}
            </button>
          )}
        </p>
        <div className="card-actions grid-cols-2 grid">
          <button className="btn btn-primary rounded-lg" onClick={visitProfile}>
            {/* <img src="https://e7.pngegg.com/pngimages/1006/918/png-clipart-computer-icons-symbol-appointment-white-text-thumbnail.png" alt="View Profile" className="w-6 h-6" /> */}
            View Profile
          </button>
          <button className="btn btn-accent rounded-lg"
            onClick={() => {
              document.getElementById("book_appointment"+vet?.id).showModal();
              handleBookAppointment(vet);
            }}
          >Book Appoinment</button>
        </div>
      </div>
    </div>
  );
}

export default VetCard;

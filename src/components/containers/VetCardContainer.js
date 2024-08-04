import React, { useState } from "react";
import VetCard from "../cards/Vet-Card";

const vetData = [
  {
    firstname: "Sakib",
    lastname: "Sobaha",

    email: "niloy870@gmail.com",
    phone: "01234123456",

    password: "pasword",

    clinic_name: "Bird Lovers Hostpital",
    clinic_address: "Block-A, Road-1, Mirpur-10, Dhaka-1216, Bangladesh",

    address: "10/1, Monipur, Mirpur-2, Dhaka-1216",
    postOffice: "Mirpur-2",
    district: "Dhaka",
    country: "Bangladesh",

    DOB: "2020-01-01",
    gender: "male",

    about:
      "I am a worker for pets. Love working with them. Pets are our biggest friends. So we must take care for them! If we dont, who will?",

    rating_vetvisit: "4",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-R_iD-Msj-mEkHzhS48sHUxB8sYwl9ZLe4Q&s",
  },
  {
    firstname: "Sakib",
    lastname: "Sobaha",
  
    email: "niloy870@gmail.com",
    phone: "01234123456",
  
    password: "pasword",
  
    clinic_name: "Bird Lovers Hostpital",
    clinic_address: "Block-A, Road-1, Mirpur-10, Dhaka-1216, Bangladesh",
  
    address: "10/1, Monipur, Mirpur-2, Dhaka-1216",
    postOffice: "Mirpur-2",
    district: "Dhaka",
    country: "Bangladesh",
  
    DOB: "2020-01-01",
    gender: "male",
  
    image: "https://img.freepik.com/free-photo/veterinarian-checking-dog-medium-shot_23-2149143871.jpg",
    about:
      "I am a worker for pets. Love working with them. Pets are our biggest friends. So we must take care for them! If we dont, who will?",
  
    rating_vetvisit: "4",
  },
];

function VetCardContainer() {
  const [visibleCount, setVisibleCount] = useState(6);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleVisibility = () => {
    setIsExpanded(!isExpanded);
    setVisibleCount(isExpanded ? 6 : vetData.length);
  };

  return (
    <div className="">
      <h1 className="text-3xl font-bold ml-3 mb-2">Vets</h1>
      <div className="grid grid-cols-3 gap-2 align-middle mr-1">
        {vetData.slice(0, visibleCount).map((vet, index) => (
          <VetCard key={index} vet={vet} />
        ))}
      </div>
      {vetData.length > 6 && (
        <div className="flex justify-center mt-4">
          <button className="btn btn-primary w-28" onClick={toggleVisibility}>
            {isExpanded ? "See Less" : "See More"}
          </button>
        </div>
      )}
    </div>
  );
}

export default VetCardContainer;

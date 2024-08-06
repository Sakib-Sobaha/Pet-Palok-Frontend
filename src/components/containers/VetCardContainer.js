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
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-R_iD-Msj-mEkHzhS48sHUxB8sYwl9ZLe4Q&s",
  },
  {
    firstname: "best sakib",
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
    image:
      "https://img.freepik.com/free-photo/veterinarian-checking-dog-medium-shot_23-2149143871.jpg",
    about:
      "I am a worker for pets. Love working with them. Pets are our biggest friends. So we must take care for them! If we dont, who will?",
    rating_vetvisit: "4.3",
  },
  {
    firstname: "pocha",
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
    image:
      "https://img.freepik.com/free-photo/veterinarian-checking-dog-medium-shot_23-2149143871.jpg",
    about:
      "I am a worker for pets. Love working with them. Pets are our biggest friends. So we must take care for them! If we dont, who will?",
    rating_vetvisit: "1",
  },
  {
    firstname: "medium baje",
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
    image:
      "https://img.freepik.com/free-photo/veterinarian-checking-dog-medium-shot_23-2149143871.jpg",
    about:
      "I am a worker for pets. Love working with them. Pets are our biggest friends. So we must take care for them! If we dont, who will?",
    rating_vetvisit: "2.3",
  },
];

function VetCardContainer({ sortCriteria, searchTerm, ratingRange }) {
  const [visibleCount, setVisibleCount] = useState(6);
  const [isExpanded, setIsExpanded] = useState(false);

  const getFilteredAndSortedVetData = () => {
    // Filtering by search term
    const filteredData = vetData.filter(
      (vet) =>
        (vet.firstname.concat(" "+vet.lastname)).toLowerCase().includes(searchTerm.toLowerCase()) ||
        vet.lastname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filtering by rating range
    const filteredByRatingData = filteredData.filter((vet) => {
      const rating = parseFloat(vet.rating_vetvisit);
      return rating >= ratingRange.min && rating <= ratingRange.max;
    });

    // Sorting
    const sortedData = [...filteredByRatingData];
    if (sortCriteria === "Rating Low to High") {
      sortedData.sort(
        (a, b) => parseFloat(a.rating_vetvisit) - parseFloat(b.rating_vetvisit)
      );
    } else if (sortCriteria === "Rating High to Low") {
      sortedData.sort(
        (a, b) => parseFloat(b.rating_vetvisit) - parseFloat(a.rating_vetvisit)
      );
    }

    return sortedData;
  };

  const toggleVisibility = () => {
    setIsExpanded(!isExpanded);
    setVisibleCount(isExpanded ? 6 : vetData.length);
  };

  const filteredAndSortedVetData = getFilteredAndSortedVetData();

  return (
    <div className="">
      <div className="grid grid-cols-3 gap-2 align-middle mr-1">
        {filteredAndSortedVetData.slice(0, visibleCount).map((vet, index) => (
          <VetCard key={index} vet={vet} />
        ))}
      </div>
      {filteredAndSortedVetData.length > 6 && (
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

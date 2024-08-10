import React, { useState, useEffect } from "react";
import PetCard from "../cards/Pet-Card";

const PetCardContainer = ({ searchTerm, filter, sortOrder }) => {
  const [visibleCount, setVisibleCount] = useState(6);
  const [isExpanded, setIsExpanded] = useState(false);

  const petData = [
    {
      name: "Chokkor",
      age: 2,
      type: "Animal",
      breed: "Labrador",
      description:
        "If a dog chews shoes whose shoes does he choose?If a dog chews shoes whose shoes does he choose?If a dog chews shoes whose shoes does he choose?",
      image:
        "https://cdn.pixabay.com/photo/2023/08/18/15/02/dog-8198719_640.jpg",
    },
    {
      name: "Minu",
      age: 3,
      type: "Animal",
      breed: "Pitbull",
      description: "If a dog chews shoes whose shoes does he choose?",
      image:
        "https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Mikkiy",
      age: 1,
      type: "Bird",
      breed: "Parrot",
      description: "If a dog chews shoes whose shoes does he choose?",
      image:
        "https://t3.ftcdn.net/jpg/00/95/29/28/360_F_95292880_GfqmxNb4u8ZxG18i2jkLt6gkAvl8xdz3.jpg",
    },
    {
      name: "Nimo",
      age: 1,
      type: "Fish",
      breed: "Goldfish",
      description: "If a dog chews shoes whose shoes does he choose?",
      image:
        "https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcRHc-hn-wtBtKuCnyl_aQo3bp6Sqx8G2oIadx2-T3svIVieizMMDT-me2CBv8oksfsn",
    },
    {
      name: "Nantu",
      age: 1,
      type: "Animal",
      breed: "Rabbit",
      description: "If a dog chews shoes whose shoes does he choose?",
      image:
        "https://www.treehugger.com/thmb/Ocxi8FYaubDwjOwria6FNpGjJjo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-953005498-4ca60c6c2c5f4b0e881b2746ad5f17ef.jpg",
    },
    {
      name: "Chokkor",
      age: 2,
      type: "Animal",
      breed: "Labrador",
      description: "If a dog chews shoes whose shoes does he choose?",
      image:
        "https://cdn.pixabay.com/photo/2023/08/18/15/02/dog-8198719_640.jpg",
    },
    {
      name: "Minu",
      age: 3,
      type: "Animal",
      breed: "Persian Cat",
      description: "If a dog chews shoes whose shoes does he choose?",
      image:
        "https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Mikkiy",
      age: 1,
      type: "Bird",
      breed: "Green Cockatiel",
      description: "If a dog chews shoes whose shoes does he choose?",
      image:
        "https://t3.ftcdn.net/jpg/00/95/29/28/360_F_95292880_GfqmxNb4u8ZxG18i2jkLt6gkAvl8xdz3.jpg",
    },
    {
      name: "Nimo",
      age: 1,
      type: "Fish",
      breed: "Goldfish (Comet)",
      description: "If a dog chews shoes whose shoes does he choose?",
      image:
        "https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcRHc-hn-wtBtKuCnyl_aQo3bp6Sqx8G2oIadx2-T3svIVieizMMDT-me2CBv8oksfsn",
    },
    {
      name: "Nantu Vai",
      age: 1,
      type: "Animal",
      breed: "Dotted Rabbit",
      description: "If a dog chews shoes whose shoes does he choose?",
      image:
        "https://www.treehugger.com/thmb/Ocxi8FYaubDwjOwria6FNpGjJjo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-953005498-4ca60c6c2c5f4b0e881b2746ad5f17ef.jpg",
    },
  ];

  const filterPets = () => {
    let filteredPets = petData;

    // Apply search filter
    if (searchTerm) {
      filteredPets = filteredPets.filter((pet) =>
        pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply age filter
    if (filter) {
      filteredPets = filteredPets.filter(
        (pet) => pet.age >= filter.min && pet.age <= filter.max
      );
    }

    // Apply type filter
    if (filter && filter.types.length > 0) {
      filteredPets = filteredPets.filter((pet) =>
        filter.types.includes(pet.type)
      );
    }

    // Apply sorting
    if (sortOrder === "ageLowToHigh") {
      filteredPets.sort((a, b) => a.age - b.age);
    } else if (sortOrder === "ageHighToLow") {
      filteredPets.sort((a, b) => b.age - a.age);
    }

    return filteredPets;
  };

  const filteredPets = filterPets();

  const toggleVisibility = () => {
    setIsExpanded(!isExpanded);
    setVisibleCount(isExpanded ? 6 : filteredPets.length);
  };

  return (
    <div className="">
      <h1 className="text-3xl font-bold ml-3 mb-2">
        <img
          src="https://cdn2.iconfinder.com/data/icons/hearts-16/100/029-512.png"
          alt="paw"
          className="w-10 h-10 inline-block mr-3"
        />
        Pet Profiles
      </h1>
      <div className="grid grid-cols-3 gap-2 align-middle mr-1">
        {filteredPets.slice(0, visibleCount).map((pet, index) => (
          <PetCard key={index} pet={pet} />
        ))}
      </div>
      {filteredPets.length > 6 && (
        <div className="flex justify-center mt-4">
          <button className="btn btn-primary w-28" onClick={toggleVisibility}>
            {isExpanded ? "See Less" : "See More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default PetCardContainer;

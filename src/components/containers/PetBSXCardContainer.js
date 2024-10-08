// src/components/PetCardContainer.js
import React, { useState } from "react";
import PetBSXCard from "../cards/Pet-BSX-Card";

const PetCardContainer = ({ searchTerm, filter, sortOrder }) => {
  const [visibleCount, setVisibleCount] = useState(6);
  const [isExpanded, setIsExpanded] = useState(false);

  const bsxPostData = [
    {
      postId: 1,
      petId: 1,
      description: "If a dog chews shoes whose shoes does he choose?",
      price: 1000,
    },
    {
      postId: 2,
      petId: 3,
      description: "I am sad but I cannot keep my cat anymore; I have some issues.",
      price: 2000,
    },
    {
      postId: 3,
      petId: 2,
      description: "If a dog chews shoes whose shoes does he choose?",
      price: 3000,
    },
  ];

  const petData = [
    {
      id: 1,
      name: "Chokkor",
      age: 2,
      type: "Animal",
      breed: "Labrador",
      description: "If a dog chews shoes whose shoes does he choose?If a dog chews shoes whose shoes does he choose?If a dog chews shoes whose shoes does he choose?",
      image: "https://cdn.pixabay.com/photo/2023/08/18/15/02/dog-8198719_640.jpg",
    },
    {
      id: 2,
      name: "Minu",
      age: 3,
      type: "Animal",
      breed: "Pitbull",
      description: "Minu is a mixed sensed cat who is very friendly.",
      image: "https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      name: "Miaow",
      age: 1,
      type: "Animal",
      breed: "Persian",
      description: "If a cat likes to chat, does it chat like a cat?",
      image: "https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D",
    },
    // More pets with ids...
  ];

  const filterPets = () => {
    let filteredPets = petData;

    // Apply search filter
    if (searchTerm) {
      filteredPets = filteredPets.filter(
        (pet) =>
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
        {filteredPets.slice(0, visibleCount).map((pet) => {
          // Find post for the pet
          const post = bsxPostData.find((p) => p.petId === pet.id);
          return (
            <PetBSXCard
              key={pet.id}
              pet={pet}
              post={post}
            />
          );
        })}
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

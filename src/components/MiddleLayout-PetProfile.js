import { useState } from "react";
import React from "react";
import SectionDivider from "./Section-Divider";
import Timeline from "./Timeline";

const timelineData = [
    {
      id: 1,
      date: "2017-01-01",
      event: "Was Born",
    },
    {
      id: 2,
      date: "2018-02-18",
      event: "Had Constipation",
    },
    {
      id: 3,
      date: "2020-03-17",
      event: "Haga problem",
    },
    {
      id: 4,
      date: "2023-04-01",
      event: "Shonay Somossha",
    },
    {
      id: 5,
      date: "2023-07-04",
      event: "Matha betha",
    },
  ];
    

const pet = {
  name: "Chokkor",
  age: new Date().getFullYear() - new Date("2020-01-01").getFullYear(),
  type: "Animal",
  breed: "Dog",
  DOB: "2020-01-01",
  gender: "male",
  description:
    "Chokkor is a cute dog! He is a very good friend! I pass most of my time with him. Soo friendly. My beloved! Doggy doggy doggy dogyy. Cutie pie amar. I love him too too too too much",
};

const images = [
  "https://cdn.pixabay.com/photo/2023/08/18/15/02/dog-8198719_640.jpg",
  "https://www.bhmpics.com/downloads/beautiful-pictures-of-dogs/56.golden_puppy_dog_pictures.jpg",
  "https://static.toiimg.com/photo/109692764/109692764.jpg",
  "https://www.petbarn.com.au/petspot/app/uploads/2016/03/HYG9.2-Blog-Genral-In-Post-800x533px.png",
  "https://hips.hearstapps.com/del.h-cdn.co/assets/cm/15/10/54f94e3f42698_-_dog-stick-del-blog.jpg?crop=1xw:0.7309644670050761xh;center,top&resize=1200:*",
];

const MiddleLayoutPetProfile = ({ Pet }) => {
    const [isExpanded, setIsExpanded] = useState(false);
  
    const toggleDescription = () => {
      setIsExpanded(!isExpanded);
    };
  return (
    <div className="flex-1 bg-base-200 rounded-lg p-4 min-h-screen">
      {/* Your content for MiddleLayout */}
      <SectionDivider title="Profile Details" />

      <div className="avatar float-right mb-5 mr-10 mt-2">
        <div className="ring-primary ring-offset-base-100 w-40 h-40 rounded-full aspect-square ring ring-offset-2">
          <img src={images[0]} />
        </div>
        
      </div>

      <h1 className="text-4xl font-bold m-3">{pet.name}</h1>
      <div className="text-lg m-3 grid-cols-3 grid mb-5">
        <p>
          <span className="font-bold">Age:</span> {pet.age}
        </p>
        <p>
          <span className="font-bold">Type:</span> {pet.type}
        </p>
        <p>
          <span className="font-bold">Breed:</span> {pet.breed}
        </p>
        <p>
          <span className="font-bold">DOB:</span> {pet.DOB}
        </p>

        <p>
          <span className="font-bold">Age:</span>{" "}
          {new Date().getFullYear() - new Date(pet.DOB).getFullYear()}Í
        </p>
        <p>
          <span className="font-bold">Gender:</span> {pet.gender}
        </p>
      </div>

      <div className=" font-serif italic">
      {isExpanded || pet.description.split(" ").length <= 30
        ? pet.description
        : `${pet.description.split(" ").slice(0, 30).join(" ")}...`}
      {pet.description.split(" ").length > 30 && (
        <button onClick={toggleDescription} className="text-blue-600">
          {isExpanded ? "See Less" : "See More"}
        </button>
      )}
    </div>


      <SectionDivider title="Photo Gallery" />

      {/* images */}
      <div className="carousel rounded-box h-96">
        {images.map((image, index) => (
          <div key={index} className=" carousel-item">
            <img
              src={image}
              alt={`Image ${index + 1}`}
              className="object-cover object-center h-40 max-w-full rounded-lg md:h-96"
            />
          </div>
        ))}
      </div>

        <SectionDivider title="Medical History" />
        <Timeline timelineData={timelineData}/>
    </div>
  );
};

export default MiddleLayoutPetProfile;

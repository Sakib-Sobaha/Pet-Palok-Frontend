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
      <SectionDivider title="Profile Details" icon="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpExR1OOTeRPHKERhKamUGQ-6A_ozTtxz0ig&s"/>

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


      <SectionDivider title="Photo Gallery" icon="data:image/png;base64,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"/>

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

        <SectionDivider title="Medical History" icon="https://cdn-icons-png.flaticon.com/512/2937/2937409.png"/>
        <Timeline timelineData={timelineData}/>


        <SectionDivider title="Vaccination History" />

    </div>
  );
};

export default MiddleLayoutPetProfile;

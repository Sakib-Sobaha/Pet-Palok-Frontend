import { useState } from "react";
import React from "react";
import SectionDivider from "./Section-Divider";
import Rating from "./Rating";

import ReviewContainer from "./ReviewContainer";
import QuestionContainer from "./QuestionContainer.js";

// const comments = [
//     {
//         id:122,
//         reviewer: "Niloy",
//         rating: 4,
//         date: "22-03-2024",
//         review_text: "Nice product, my doggy loves it",
//         anonymouse: false,
//     },
//     {
//         id:123,
//         reviewer: "Suvro",
//         rating: 5,
//         time: "22-03-2024",
//         review_text: "bai product ta onek helpful silo",
//         anonymouse: true,
//     },
//     {
//         id:122,
//         reviewer: "Niloy",
//         rating: 1,
//         time: "22-01-2024",
//         review_text: "Baje product, keu kinben na",
//         anonymouse: true,
//     },
// ]

const item = {
  name: "Odomos Doggy",
  price_per_unit: 90,
  quantity: "250g",
  count: 0,
  sell_count: 7,
  total_available_count: 4,
  pet_type: "Animal",
  type: "medicine",
  description:
    "If a dog chews shoes whose shoes does he choose? If a dog chews shoes whose shoes does he choose?If a dog chews shoes whose shoes does he choose?If a dog chews shoes whose shoes does he choose?If a dog chews shoes whose shoes does he choose?",
  image: "https://cdn.pixabay.com/photo/2023/08/18/15/02/dog-8198719_640.jpg",
};

const images = [
  "https://cdn.pixabay.com/photo/2023/08/18/15/02/dog-8198719_640.jpg",
  "https://www.bhmpics.com/downloads/beautiful-pictures-of-dogs/56.golden_puppy_dog_pictures.jpg",
  "https://static.toiimg.com/photo/109692764/109692764.jpg",
  "https://www.petbarn.com.au/petspot/app/uploads/2016/03/HYG9.2-Blog-Genral-In-Post-800x533px.png",
  "https://hips.hearstapps.com/del.h-cdn.co/assets/cm/15/10/54f94e3f42698_-_dog-stick-del-blog.jpg?crop=1xw:0.7309644670050761xh;center,top&resize=1200:*",
];

const MiddleLayoutPetProfile = ({ item_ }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const handleBack = () => {
    window.location.href = "/marketplace";
  };
  return (
    <div className="flex-1 bg-base-200 rounded-lg p-4 min-h-screen">
      {/* Your content for MiddleLayout */}
      <SectionDivider
        title="Item Details"
        icon="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpExR1OOTeRPHKERhKamUGQ-6A_ozTtxz0ig&s"
      />

      {/* <div className="avatar float-right mb-5 mr-10 mt-2">
        <div className="ring-primary ring-offset-base-100 w-40 h-40 rounded-full aspect-square ring ring-offset-2">
          <img src={ images && images[0]} alt="img"/>
        </div>
        
      </div> */}
      <div className="grid grid-cols-2 m-1 p-1">
        {/* images */}
        <div className="grid place-items-center w-full mb-3">
          <div className="carousel carousel-center object-cover rounded-box h-72 w-72">
            {images.map((image, index) => (
              <div key={index} className=" carousel-item">
                <img
                  src={image}
                  alt={`bal ${index + 1}`}
                  className="object-cover object-center h-40 max-w-full rounded-lg md:h-72"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full place-items-center">
          <h1 className="text-4xl font-bold m-3 pl-3">{item.name}</h1>
          <div className="text-lg m-3 grid-cols-2 grid mb-5 rounded-lg p-2 pl-3">
            <p>
              <span className="font-bold">Quantity:</span> {item.quantity}
            </p>
            <p>
              <span className="font-bold"></span>{" "}
              <b className="font-mono text-green-700 text-xl">
                {" "}
                {item.price_per_unit + " taka"}
              </b>
            </p>
            <p>
              <span className="font-bold">Type:</span> {item.type}
            </p>

            <p>
              <span className="font-bold">
                {item && item.total_available_count > 5 ? (
                  <h1 className="text-accent">Available</h1>
                ) : (
                  <h1 className="text-warning">Few Items Left</h1>
                )}
              </span>
            </p>

            <p>
              <span className="">for </span> <b>{item.pet_type}s</b>
            </p>
            <p>
              <span className="font-semibold text-info">
                {item.sell_count} sold
              </span>
            </p>
          </div>
          <div className="flex">
            <button className="btn btn-primary w-40 rounded-lg p-2 justify-center m-1 ml-4">
              Add to Cart
            </button>
            <button className="btn btn-warning w-32 rounded-lg p-2 justify-center m-1"
              onClick={handleBack}
            >
              Back
            </button>
          </div>
        </div>
      </div>
      <div className="font-serif italic">
        {isExpanded || item.description.split(" ").length <= 30
          ? item.description
          : `${item.description.split(" ").slice(0, 30).join(" ")}...`}
        {item.description.split(" ").length > 30 && (
          <button onClick={toggleDescription} className="text-blue-600">
            {isExpanded ? "See Less" : "See More"}
          </button>
        )}
      </div>

      {/* <SectionDivider title="Photo Gallery" icon="data:image/png;base64,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"/> */}

      <div className="grid w-full place-items-center m-1 pt-2">
        <p>
          <span className=" font-bold">Rating:</span>
        </p>
        <Rating className="" rating={2.4} />
      </div>
      <SectionDivider title="Ratings and Reviews" icon="**" />

      <ReviewContainer />

      <SectionDivider title="Ask a Question?" icon="**" />
      <QuestionContainer />
    </div>
  );
};

export default MiddleLayoutPetProfile;

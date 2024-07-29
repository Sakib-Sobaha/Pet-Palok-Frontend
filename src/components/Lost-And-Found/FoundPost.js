import React from "react";
import CommentBox from "../Comment-box";
// import CollapseBox from "../comment/";

const foundPost = {
  type: "dog",
  date_found: "2021-07-01",
  location_found: "City Park, Mirpur-2, Dhaka-1219",
  description:
    "Found a dog in City Park, Mirpur-2, Dhaka. He probably is a stray dog. He is very friendly and playful",
  image: "https://images.unsplash.com/photo-1517849845537-4d257902454a",
  condition: "bad", // Adjust condition here for testing
  contact: "018XXXXXXXX",
  location_return: "Jonota Housing, Mirpur-1, Dhaka-1216",
  appearance_breed: "brown, probably persian",
  confirmation_status: "pending",
};

const images = [
  "https://cdn.pixabay.com/photo/2023/08/18/15/02/dog-8198719_640.jpg",
  "https://www.bhmpics.com/downloads/beautiful-pictures-of-dogs/56.golden_puppy_dog_pictures.jpg",
  "https://static.toiimg.com/photo/109692764/109692764.jpg",
  "https://www.petbarn.com.au/petspot/app/uploads/2016/03/HYG9.2-Blog-Genral-In-Post-800x533px.png",
  "https://hips.hearstapps.com/del.h-cdn.co/assets/cm/15/10/54f94e3f42698_-_dog-stick-del-blog.jpg?crop=1xw:0.7309644670050761xh;center,top&resize=1200:*",
];

const FoundPost = () => {
  // Determine condition color based on foundPost.condition
  const getConditionColor = (condition) => {
    switch (condition.toLowerCase()) {
      case "good":
        return "text-green-500";
      case "bad":
        return "text-red-500";
      case "average":
        return "text-orange-500";
      default:
        return "text-black";
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "text-yellow-500";
      case "confirmed":
        return "text-green-500";
      case "denied":
        return "text-red-500";
      default:
        return "text-black";
    }
  };

  return (
    <div className="w-full p-1 m-1">
      <div
        className="card card-side bg-base-100 h-auto max-h-screen shadow-xl rounded-b-none"
        style={{
          maxHeight: "70vh",
          maxWidth: "100%",
          overflowX: 'hidden',
          overflowY: 'auto',
        }}
      >
        <div className="m-2 carousel rounded-box w-full">
          {images.map((image, index) => (
            <div key={index} className="carousel-item">
              <img
                src={image}
                alt={`Image ${index + 1}`}
                className="object-cover object-center h-40 max-w-full rounded-lg md:h-96"
              />
            </div>
          ))}
        </div>

        <div className="card-body">
          <h2 className="card-title">{foundPost.type.toUpperCase()} Found!</h2>
          <div className="grid grid-cols-3 gap-4">
            <p>
              <b>Appearance & Breed:</b> <br />
              <span>{foundPost.appearance_breed}</span>
            </p>
            <p>
              <b>Date Found:</b> <br />
              <span>{foundPost.date_found}</span>
            </p>
            <p>
              <b>Location Found:</b> <br />
              <span>{foundPost.location_found}</span>
            </p>
            <p>
              <b>Condition:</b> <br />
              <span className={getConditionColor(foundPost.condition)}>
                {foundPost.condition}
              </span>
            </p>
            <p>
              <b>Contact:</b> <br />
              <span>{foundPost.contact}</span>
            </p>
            <p>
              <b>Confirmation Status:</b> <br />
              <span className={getStatusColor(foundPost.confirmation_status)}>
                {foundPost.confirmation_status}
              </span>
            </p>
          </div>
          <p className="mt-4">
            <b>Location to Return:</b> <br />
            <span>{foundPost.location_return}</span>
          </p>
          <p className="mt-4">{foundPost.description}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Message Author</button>
          </div>
        </div>
      </div>
      <CommentBox />
    </div>
  );
};

export default FoundPost;

import React from "react";

const pet = {
  name: "Chokkor",
  age: 2,
  type: "Animal",
  breed: "Dog",
  DOB: "2020-01-01",
};

const images = [
  "https://cdn.pixabay.com/photo/2023/08/18/15/02/dog-8198719_640.jpg",
  "https://www.bhmpics.com/downloads/beautiful-pictures-of-dogs/56.golden_puppy_dog_pictures.jpg",
  "https://static.toiimg.com/photo/109692764/109692764.jpg",
  "https://www.petbarn.com.au/petspot/app/uploads/2016/03/HYG9.2-Blog-Genral-In-Post-800x533px.png",
  "https://hips.hearstapps.com/del.h-cdn.co/assets/cm/15/10/54f94e3f42698_-_dog-stick-del-blog.jpg?crop=1xw:0.7309644670050761xh;center,top&resize=1200:*",
];

const MiddleLayoutPetProfile = ({ Pet }) => {
  return (
    <div className="flex-1 bg-base-200 rounded-lg p-4 min-h-screen">
      {/* Your content for MiddleLayout */}

      <div className="avatar float-right m-3 mb-5">
        <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>

      <h1 className="text-4xl font-bold m-3">{pet.name}</h1>
        <div className="text-lg m-3 grid-cols-3 grid">
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
                <span className="font-bold">Age:</span> {Date.now - pet.DOB.split("-")[0]}
            </p>
        </div>

      

      {/* images */}
      <div className="carousel rounded-box h-96">
        {images.map((image, index) => (
          <div key={index} className=" carousel-item">
            <img src={image} alt={`Image ${index + 1}`} />
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default MiddleLayoutPetProfile;

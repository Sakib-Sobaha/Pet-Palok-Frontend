import React from "react";
import CommentBox from "../Comment-box";

const images = [
  "https://cdn.pixabay.com/photo/2023/08/18/15/02/dog-8198719_640.jpg",
  "https://www.bhmpics.com/downloads/beautiful-pictures-of-dogs/56.golden_puppy_dog_pictures.jpg",
  "https://static.toiimg.com/photo/109692764/109692764.jpg",
  "https://www.petbarn.com.au/petspot/app/uploads/2016/03/HYG9.2-Blog-Genral-In-Post-800x533px.png",
  "https://hips.hearstapps.com/del.h-cdn.co/assets/cm/15/10/54f94e3f42698_-_dog-stick-del-blog.jpg?crop=1xw:0.7309644670050761xh;center,top&resize=1200:*",
];

const lostPost = {
  id: 1,
  lastSeenDate: "2023-08-18",
  lastSeenLocation: "Dhanmondi 27, near Abahani Field",
  description:
    "Chokkor is a cute dog! He is a very good friend! I pass most of my time with him. Soo friendly. My beloved! Doggy doggy doggy dogyy. Cutie pie amar. I love him too too too too much",
  userId: 1,
  reward: "1000",
};

const user = {
  id: 1,
  name: "Niloy Faiaz",
  email: "test@email.com",
  phone: "017xxxxxxxx",
  address: "100,Mirpur, Dhaka",
};

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

const LostPost = () => {
  // Your code here

  return (
    <div className="w-full p-1 m-1">
      <div
        className="card card-side bg-base-100 h-auto max-h-screen shadow-xl rounded-b-none"
        style={{
          maxHeight: "70vh",
          maxWidth: "100%",
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        <figure>
          <img
            src={images[0]}
            alt="Shoes"
            className="object-cover object-center max-h-64 max-w-full rounded-lg md:h-96 m-2 ml-4 "
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title font-serif text-2xl text-red-600">
            {" "}
            {pet.name} is missing !!!
          </h2>
          <p className="text-sm font-bold text-gray-500">
            Last Seen: {lostPost.lastSeenDate}
          </p>
          <p className="text-sm font-bold text-gray-500">
            Last Seen Location: {lostPost.lastSeenLocation}
          </p>
          <p className="text-sm font-bold text-gray-500">
            Reward: {lostPost.reward}
          </p>
          <p className="text-sm font-bold text-gray-500">
            Description: {lostPost.description}
          </p>

          <p className="text-sm font-bold text-gray-500">
            If any lead please inbox or contact:{" "}
            <a
              href="/user/profile/:id"
              className="underline link link-accent cursor-pointer"
            >
              {user.name}
            </a>
          </p>

          <div className="card-actions justify-center">
            <button className="btn btn-primary">Send Message</button>

            <button className="btn btn-secondary">Visit Pet Profile</button>

            <button className="btn btn-accent">Owner Profile</button>
          </div>
        </div>
      </div>
      <CommentBox />
    </div>
  );
};

export default LostPost;

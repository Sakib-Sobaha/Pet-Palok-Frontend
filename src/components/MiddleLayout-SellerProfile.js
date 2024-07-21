import { useState } from "react";
import React from "react";
import SectionDivider from "./Section-Divider";
import Rating from "./Rating";

// const timelineData = [
//   {
//     id: 1,
//     date: "2017-01-01",
//     event: "Was Born",
//   },
//   {
//     id: 2,
//     date: "2018-02-18",
//     event: "Had Constipation",
//   },
//   {
//     id: 3,
//     date: "2020-03-17",
//     event: "Haga problem",
//   },
//   {
//     id: 4,
//     date: "2023-04-01",
//     event: "Shonay Somossha",
//   },
//   {
//     id: 5,
//     date: "2023-07-04",
//     event: "Matha betha",
//   },
// ];

const seller = {
  firstname: "Sakib",
  lastname: "Sobaha",

  email: "niloy870@gmail.com",
  phone: "01234123456",

  password: "pasword",

  store_name: "Sakibs Pet Shop",
  store_address: "Block-A, Road-1, Mirpur-10, Dhaka-1216, Bangladesh",

  address: "10/1, Monipur, Mirpur-2, Dhaka-1216",
  postOffice: "Mirpur-2",
  district: "Dhaka",
  country: "Bangladesh",

  DOB: "2020-01-01",
  gender: "male",

  about:
    "I am a worker for pets. Love working with them. Pets are our biggest friends. So we must take care for them! If we dont, who will?",

  rating_vetvisit: "4",
};

const images = [
  "https://cdn.pixabay.com/photo/2023/08/18/15/02/dog-8198719_640.jpg",
  "https://www.bhmpics.com/downloads/beautiful-pictures-of-dogs/56.golden_puppy_dog_pictures.jpg",
  "https://static.toiimg.com/photo/109692764/109692764.jpg",
  "https://www.userbarn.com.au/userspot/app/uploads/2016/03/HYG9.2-Blog-Genral-In-Post-800x533px.png",
  "https://hips.hearstapps.com/del.h-cdn.co/assets/cm/15/10/54f94e3f42698_-_dog-stick-del-blog.jpg?crop=1xw:0.7309644670050761xh;center,top&resize=1200:*",
];

const MiddleLayoutSellerProfile = ({ vet_ }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleabout = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className="flex-1 bg-base-200 rounded-lg p-4 min-h-screen">
      {/* Your content for MiddleLayout */}
      <SectionDivider title="Profile Details" icon="" />

      <div className="avatar float-right mb-5 mr-10 mt-2">
        <div className="ring-primary ring-offset-base-100 w-40 h-40 rounded-full aspect-square ring ring-offset-2">
          <img src={images[0]} alt="img" />
        </div>
      </div>

      <h1 className="text-xl font-bold m-3">
        Name: <b className="text-4xl">{seller.firstname + " " + seller.lastname} </b>
      </h1>
      <div className="text-lg m-3 grid-cols-2 grid mb-5">
        <p>
          <span className="font-bold">DOB:</span> {seller.DOB}
        </p>
        <p>
          <span className="font-bold">Gender:</span> {seller.gender}
        </p>

        {/* <p>
          <br />
        </p>
        <p> 
          <br />
        </p> */}
      </div>

      <h1 className="pl-3 font-bold text-xl">Contact Info:</h1>

      <div className="text-lg m-1 ml-3 grid-cols-2 grid mb-5">
        <p>
          <span className="font-bold">Phone:</span> {seller.phone}
        </p>
        <p>
          <span className="font-bold">Email:</span> {seller.email}
        </p>
        <p>
          <span className="font-bold">Store Name:</span> {seller.store_name}
        </p>
        <p>
          <span className="font-bold">Store Address:</span>{" "}
          {seller.store_address}
        </p>
      </div>

      <h1 className="pl-3 font-bold text-xl">Address:</h1>

      <div className="text-lg ml-3 m-1 grid-cols-2 grid mb-5">
        <p>
          <span className="font-bold">Address:</span> {seller.address}
        </p>
        <p>
          <span className="font-bold">Post-Office:</span> {seller.postOffice}
        </p>
        <p>
          <span className="font-bold">District:</span> {seller.district}
        </p>
        <p>
          <span className="font-bold">Country:</span> {seller.country}
        </p>
      </div>

      <div className=" font-serif italic m-4">
        <b className="font-bold not-italic font-sans">About: {"   "}</b>
        {isExpanded || seller.about.split(" ").length <= 30
          ? seller.about
          : `${seller.about.split(" ").slice(0, 30).join(" ")}...`}
        {seller.about.split(" ").length > 30 && (
          <button onClick={toggleabout} className="text-blue-600 text-xs ml-0">
            {isExpanded ? " See Less" : " See More"}
          </button>
        )}
      </div>
      <div className="justify-center">
        <button className="btn btn-primary w-28 rounded-lg p-2 justify-center m-3">
          Edit Profile
        </button>
        <br />
      </div>

      <div className="grid  w-full place-items-center">
        <p>
          <span className=" font-bold">Vet's Rating:</span>
        </p>
        <Rating className="" />
      </div>

      <SectionDivider title="Change Password" />
      <div className="justify-center w-full grid place-items-center">
        <div className="w-80 mb-4 ml-3">
          <p className="mr-4 ml-4 font-mono">Current Password:</p>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>

            <input type="password" className="grow" value="password" />
          </label>
        </div>

        <div className="w-80 mb-4 ml-3">
          <p className="mr-4 ml-4 font-mono">New Password:</p>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>

            <input type="password" className="grow" value="password" />
          </label>
        </div>

        <div className="w-80 mb-4 ml-3">
          <p className="mr-4 ml-4 font-mono">Confirm New Password:</p>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>

            <input type="password" className="grow" value="password" />
          </label>
        </div>

        <div className="w-full">
          <button className="btn btn-accent w-56 rounded-lg p-4 justify-center m-3">
            {" "}
            Confirm New Password{" "}
          </button>
          <button className="btn btn-error w-56 rounded-lg p-4 justify-center m-3">
            {" "}
            Reset{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MiddleLayoutSellerProfile;

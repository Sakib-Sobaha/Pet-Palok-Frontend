import { useState } from "react";
import React from "react";
import SectionDivider from "./Section-Divider";
import Timeline from "./Timeline";
import Rating from "./Rating";
import SendMessage from "./buttons/SendMessage";
import EditPasswordModal from "./modals/edit-password";
import EditProfileModal from "./modals/edit-profile-user";

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

const user = {
  firstname: "Niloy",
  lastname: "Faiaz",
  email: "niloy870@gmail.com",
  phone: "01234123456",
  password: "pasword",
  address: "10/1, Monipur, Mirpur-2, Dhaka-1216",
  postOffice: "Mirpur-2",
  district: "Dhaka",
  country: "Bangladesh",
  DOB: "2020-01-01",
  gender: "male",
  about:
    "Chokkor is a cute dog! He is a very good friend! I pass most of my time with him. Soo friendly. My beloved! Doggy doggy doggy dogyy. Cutie pie amar. I love him too too too too much",
  rating_buysellexch: "4",
  rating_petkeeping: "5",
  rating_vet: "3",
};

const images = [
  "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://www.bhmpics.com/downloads/beautiful-pictures-of-dogs/56.golden_puppy_dog_pictures.jpg",
  "https://static.toiimg.com/photo/109692764/109692764.jpg",
  "https://www.userbarn.com.au/userspot/app/uploads/2016/03/HYG9.2-Blog-Genral-In-Post-800x533px.png",
  "https://hips.hearstapps.com/del.h-cdn.co/assets/cm/15/10/54f94e3f42698_-_dog-stick-del-blog.jpg?crop=1xw:0.7309644670050761xh;center,top&resize=1200:*",
];

const MiddleLayoutUserProfile = ({ user_ }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleabout = () => {
    setIsExpanded(!isExpanded);
  };

  

  return (
    <div className="flex-1 bg-base-200 rounded-lg p-4 min-h-screen">
      <EditProfileModal element_id="edit_profile" />
      <EditPasswordModal element_id="edit_password" />
      {/* Your content for MiddleLayout */}
      <SectionDivider title="Profile Details" icon="" />

      <div className="avatar float-right mb-5 mr-10 mt-2">
        <div className="ring-primary ring-offset-base-100 w-40 h-40 rounded-full aspect-square ring ring-offset-2">
          <img src={images[0]} />
        </div>
      </div>

      <h1 className="text-xl font-bold m-3">
        Name:{" "}
        <b className="text-4xl">{user.firstname + " " + user.lastname} </b>
      </h1>
      <div className="text-lg m-3 grid-cols-2 grid mb-5">
        <p>
          <span className="font-bold">DOB:</span> {user.DOB}
        </p>
        <p>
          <span className="font-bold">Gender:</span> {user.gender}
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
          <span className="font-bold">Phone:</span> {user.phone}
        </p>
        <p>
          <span className="font-bold">Email:</span> {user.email}
        </p>
      </div>

      <h1 className="pl-3 font-bold text-xl">Address:</h1>

      <div className="text-lg ml-3 m-1 grid-cols-2 grid mb-5">
        <p>
          <span className="font-bold">Present Address:</span> {user.address}
        </p>
        <p>
          <span className="font-bold">Post-Office:</span> {user.postOffice}
        </p>
        <p>
          <span className="font-bold">District:</span> {user.district}
        </p>
        <p>
          <span className="font-bold">Country:</span> {user.country}
        </p>
      </div>

      <div className=" font-serif italic m-4">
        <b className="font-bold not-italic font-sans">About: {"   "}</b>
        {isExpanded || user.about.split(" ").length <= 30
          ? user.about
          : `${user.about.split(" ").slice(0, 30).join(" ")}...`}
        {user.about.split(" ").length > 30 && (
          <button onClick={toggleabout} className="text-blue-600 text-xs ml-0">
            {isExpanded ? " See Less" : " See More"}
          </button>
        )}
      </div>
      <div className="flex">
        <button
          className="btn btn-primary mt-3 m-1 h-8 rounded-md items-center gap-2 p-2"
          onClick={() =>
            document.getElementById("edit_profile").showModal()
          }
        >
          <svg
            class="feather feather-edit"
            fill="none"
            height="24"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          <span>Edit Profile</span>
        </button>

        <button
          className="btn btn-accent mt-3 m-1 h-8 rounded-md items-center gap-2 p-2"
          onClick={() =>
            document.getElementById("edit_password").showModal()
          }
        >
          <svg
            class="feather feather-edit"
            fill="none"
            height="24"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          <span>Change Password</span>
        </button>

        <button className="btn btn-secondary mt-3 m-1 h-8 rounded-md items-center gap-2 p-2">
          <svg
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="h-6 w-6"
          >
            <path d="M256 352c-16.53 0-33.06-5.422-47.16-16.41L0 173.2V400C0 426.5 21.49 448 48 448h416c26.51 0 48-21.49 48-48V173.2l-208.8 162.5C289.1 346.6 272.5 352 256 352zM16.29 145.3l212.2 165.1c16.19 12.6 38.87 12.6 55.06 0l212.2-165.1C505.1 137.3 512 125 512 112C512 85.49 490.5 64 464 64h-416C21.49 64 0 85.49 0 112C0 125 6.01 137.3 16.29 145.3z" />
          </svg>
          <span>Send Message</span>
        </button>
      </div>

      <div className="flex w-full m-4 mt-5">
        <div className="grid w-1/3 place-items-center">
          <p>
            <span className=" font-bold">Buy/Sell/Exchange Rating:</span>
          </p>
          <Rating className="" rating={4.5} />
        </div>

        <div className="divider divider-horizontal"></div>

        <div className="grid  w-1/4 place-items-center">
          <p>
            <span className=" font-bold">Vet's Rating:</span>
          </p>
          <Rating className="" rating={1.4} />
        </div>

        <div className="divider divider-horizontal"></div>

        <div className="grid w-1/3 place-items-center">
          <p>
            <span className="font-bold">PetKeeper's Rating:</span>
          </p>
          <Rating className="" rating={3.5} />
        </div>
      </div>
    </div>
  );
};

export default MiddleLayoutUserProfile;

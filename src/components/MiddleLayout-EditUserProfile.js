import { useState } from "react";
import React from "react";
import SectionDivider from "./Section-Divider";
import Timeline from "./Timeline";
import Rating from "./Rating";
import ChangePassword from "./ChangePassword";

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

const initialUser = {
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
  gender: "Male",
  about:
    "Chokkor is a cute dog! He is a very good friend! I pass most of my time with him. Soo friendly. My beloved! Doggy doggy doggy dogyy. Cutie pie amar. I love him too too too too much",
  rating_buysellexch: "4",
  rating_petkeeping: "5",
  rating_vet: "3",
};

const images = [
  "https://cdn.pixabay.com/photo/2023/08/18/15/02/dog-8198719_640.jpg",
  "https://www.bhmpics.com/downloads/beautiful-pictures-of-dogs/56.golden_puppy_dog_pictures.jpg",
  "https://static.toiimg.com/photo/109692764/109692764.jpg",
  "https://www.userbarn.com.au/userspot/app/uploads/2016/03/HYG9.2-Blog-Genral-In-Post-800x533px.png",
  "https://hips.hearstapps.com/del.h-cdn.co/assets/cm/15/10/54f94e3f42698_-_dog-stick-del-blog.jpg?crop=1xw:0.7309644670050761xh;center,top&resize=1200:*",
];

const MiddleLayoutUserProfile = ({ user_ }) => {
  const [user, setUser] = useState(initialUser);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const toggleAbout = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSave = () => {
    console.log("User information saved:", user);
    // Here you can add logic to save the user information, such as making an API call
  };

  
  const [imageSrc, setImageSrc] = useState(images[0]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result); // Update the state with the data URL
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  return (
    <div className="flex-1 bg-base-200 rounded-lg p-4 min-h-screen">
      {/* Your content for MiddleLayout */}
      <SectionDivider title="Profile Details" icon="" />

      <h1 className="text-xl font-bold m-3">
        Name:
        <b className="text-4xl">{user.firstname + " " + user.lastname} </b>
      </h1>

      <div className="">
        <div className="avatar mb-5 ml-10 pl-3 mr-10 mt-2">
          <div className="ring-primary ring-offset-base-100 w-40 h-40 rounded-full aspect-square ring ring-offset-2">
            <img src={imageSrc} alt="Profile" />
          </div>
        </div>
        <div className="">
          <input
            type="file"
            className="file-input file-input-bordered file-input-primary h-10 w-80"
            onChange={handleFileChange} // Connect the file change handler
          />
        </div>
      </div>

      <div className="text-lg m-3 grid-cols-2 gap-3 grid mb-5">
        <p>
          <span className="font-bold">DOB:</span>
          <input
            type="date"
            name="DOB"
            value={user.DOB}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </p>
        <p>
          <span className="font-bold">Gender:</span>
          <select className="select w-full max-w-xs">
            <option selected disabled>
                {user.gender}
            </option>
            <option>Male</option>
            <option>Female</option>
            <option>Others</option>
          </select>
        </p>
      </div>
      <h1 className="pl-3 font-bold text-xl">Contact Info:</h1>
      <div className="text-lg m-1 ml-3 grid-cols-2 gap-3 grid mb-5">
        <p>
          <span className="font-bold">Phone:</span>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </p>
        <p>
          <span className="font-bold">Email:</span>
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </p>
      </div>

      <h1 className="pl-3 font-bold text-xl">Address:</h1>

      <div className="text-lg ml-3 m-1 grid-cols-2 gap-3 grid mb-5">
        <p>
          <span className="font-bold">Present Address:</span>

          <textarea
            className="textarea textarea-bordered w-full"
            value={user.address}
            onChange={handleChange}
          ></textarea>
        </p>
        <p>
          <span className="font-bold">Post-Office:</span>
          <input
            type="text"
            name="postOffice"
            value={user.postOffice}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </p>
        <p>
          <span className="font-bold">District:</span>
          <input
            type="text"
            name="district"
            value={user.district}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </p>
        <p>
          <span className="font-bold">Country:</span>
          <input
            type="text"
            name="country"
            value={user.country}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </p>
      </div>

      <div className="font-serif italic m-4">
        <b className="font-bold not-italic font-sans">About: {"   "}</b>
        {isExpanded || user.about.split(" ").length <= 30
          ? user.about
          : `${user.about.split(" ").slice(0, 30).join(" ")}...`}
        {user.about.split(" ").length > 30 && (
          <button onClick={toggleAbout} className="text-blue-600 text-xs ml-0">
            {isExpanded ? " See Less" : " See More"}
          </button>
        )}
      </div>

      <div className="w-full grid place-items-center mt-4">
        <button
          onClick={handleSave}
          className="btn btn-accent w-56 rounded-lg p-4 justify-center m-3"
        >
          Save
        </button>
      </div>

      <SectionDivider title="Change Password" />
        <ChangePassword />
    </div>
  );
};

export default MiddleLayoutUserProfile;

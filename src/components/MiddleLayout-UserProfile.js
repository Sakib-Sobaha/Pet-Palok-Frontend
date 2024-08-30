import React, { useState, useEffect } from "react";
import SectionDivider from "./Section-Divider";
import Rating from "./Rating";
import EditPasswordModal from "./modals/edit-password";
import EditProfileModal from "./modals/edit-profile-user";

function calculateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();

  // Adjust years and months if the current month is before the birth month
  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months };
}

const defaultImages = [
  "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://www.bhmpics.com/downloads/beautiful-pictures-of-dogs/56.golden_puppy_dog_pictures.jpg",
  "https://static.toiimg.com/photo/109692764/109692764.jpg",
  "https://www.userbarn.com.au/userspot/app/uploads/2016/03/HYG9.2-Blog-Genral-In-Post-800x533px.png",
  "https://hips.hearstapps.com/del.h-cdn.co/assets/cm/15/10/54f94e3f42698_-_dog-stick-del-blog.jpg?crop=1xw:0.7309644670050761xh;center,top&resize=1200:*",
];

const MiddleLayoutUserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user_id, setUserId] = useState(userId);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Construct the URL for the API request
        const url = `${process.env.REACT_APP_API_URL}/user/getUserById/${userId}`;
        console.log(url);
        console.log(userId);

        // Get the Bearer token from local storage (or wherever you store it)
        const token = localStorage.getItem("authToken");

        // Make the API request with the Authorization header
        const response = await fetch(url, {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        // Parse the response data
        const data = await response.json();

        // Update the state with the fetched data
        setUser(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    // Fetch user data when the component mounts or userId changes
    fetchUserData();
  }, [userId]);

  const toggleAbout = () => {
    setIsExpanded(!isExpanded);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const { years, months } = calculateAge(user?.dob);

  return (
    <div className="flex-1 bg-base-200 rounded-lg p-4 min-h-screen">
      <EditProfileModal element_id="edit_profile_user" _user={user} />
      <EditPasswordModal element_id="edit_password" userId={user_id}/>

      <SectionDivider title="Profile Details" icon="" />

      <div className="avatar float-right mb-5 mr-10 mt-2">
        <div className="ring-primary ring-offset-base-100 w-40 h-40 rounded-full aspect-square ring ring-offset-2">
          <img src={user?.image || defaultImages[0]} alt="User Avatar" />
        </div>
      </div>

      <h1 className="text-xl font-bold m-3">
        Name:{" "}
        <b className="text-4xl">{user?.firstname + " " + user?.lastname}</b>
      </h1>
      <div className="text-lg m-3 grid-cols-2 grid mb-5">
        <p>
          <span className="font-bold">Age:</span>{" "}
          <a className="">
            {years} year{years > 1 ? "s" : ""} & {months} month
            {months > 1 ? "s old" : " old"}
          </a>
        </p>
        <p>
          <span className="font-bold">Gender:</span> {user?.gender}
        </p>
      </div>

      <h1 className="pl-3 font-bold text-xl">Contact Info:</h1>
      <div className="text-lg m-1 ml-3 grid-cols-2 grid mb-5">
        <p>
          <span className="font-bold">Phone:</span> {user?.phoneNumber}
        </p>
        <p>
          <span className="font-bold">Email:</span> {user?.email}
        </p>
      </div>

      <h1 className="pl-3 font-bold text-xl">Address:</h1>
      <div className="text-lg ml-3 m-1 grid-cols-2 grid mb-5">
        <p>
          <span className="font-bold">Present Address:</span> {user?.address}
        </p>
        <p>
          <span className="font-bold">Post-Office:</span> {user?.postOffice}
        </p>
        <p>
          <span className="font-bold">District:</span> {user?.district}
        </p>
        <p>
          <span className="font-bold">Country:</span> {user?.country}
        </p>
      </div>

      <div className="font-serif italic m-4">
        <b className="font-bold not-italic font-sans">About: </b>
        {isExpanded || user?.about?.split(" ").length <= 30
          ? user?.about
          : `${user?.about?.split(" ").slice(0, 30).join(" ")}...`}
        {user?.about?.split(" ").length > 30 && (
          <button onClick={toggleAbout} className="text-blue-600 text-xs ml-0">
            {isExpanded ? " See Less" : " See More"}
          </button>
        )}
      </div>

      <div className="flex">
        <button
          className="btn btn-primary mt-3 m-1 h-8 rounded-md items-center gap-2 p-2"
          onClick={() =>
            document.getElementById("edit_profile_user").showModal()
          }
        >
          <svg
            className="feather feather-edit"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
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
          onClick={() => document.getElementById("edit_password").showModal()}
        >
          <svg
            className="feather feather-edit"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
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
          <Rating rating={user?.rating_buysellexch || 0} />
        </div>

        <div className="divider divider-horizontal"></div>

        <div className="grid w-1/4 place-items-center">
          <p>
            <span className=" font-bold">Vet's Rating:</span>
          </p>
          <Rating rating={user?.rating_vet || 0} />
        </div>

        <div className="divider divider-horizontal"></div>

        <div className="grid w-1/3 place-items-center">
          <p>
            <span className="font-bold">PetKeeper's Rating:</span>
          </p>
          <Rating rating={user?.rating_petkeeping || 0} />
        </div>
      </div>
    </div>
  );
};

export default MiddleLayoutUserProfile;

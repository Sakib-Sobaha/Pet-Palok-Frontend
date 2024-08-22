import { useState, useEffect } from "react";
import React from "react";
import SectionDivider from "./Section-Divider";
import Rating from "./Rating";
import EditPasswordModal from "./modals/edit-password";
import EditProfileModal from "./modals/edit-profile-seller";

const fetchData = async (token, sellerId) => {
  // console.log("Fetching seller profile with id:1 ... ", sellerId);
  try {
    // console.log("Fetching seller profile with id:", sellerId);
    const url = `${process.env.REACT_APP_API_URL}/seller/getSellerById/${sellerId}`;
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });

    const requestOptions = {
      method: "GET",
      headers: headers,
    };

    const response = await fetch(url, requestOptions);
    // const responseText = await response.text(); // Get response as text
    // console.log("Raw response:", responseText);


    if (!response.ok) {
      const errorText = await response.json();
      throw new Error(
        `Network response was not ok. Status: ${response.status}, ${errorText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch the seller profile:", error);
    return null;
  }
};

const images = [
  "https://cdn.pixabay.com/photo/2023/08/18/15/02/dog-8198719_640.jpg",
  "https://www.bhmpics.com/downloads/beautiful-pictures-of-dogs/56.golden_puppy_dog_pictures.jpg",
  "https://static.toiimg.com/photo/109692764/109692764.jpg",
  "https://www.userbarn.com.au/userspot/app/uploads/2016/03/HYG9.2-Blog-Genral-In-Post-800x533px.png",
  "https://hips.hearstapps.com/del.h-cdn.co/assets/cm/15/10/54f94e3f42698_-_dog-stick-del-blog.jpg?crop=1xw:0.7309644670050761xh;center,top&resize=1200:*",
];

const MiddleLayoutSellerProfile = ({ sellerId }) => {

  const [isExpanded, setIsExpanded] = useState(false);
  const[loading, setLoading] = useState(true); // State to handle loading
  
  const [seller, setSeller] = useState({});

  // Fetch the vet profile on component mount
  useEffect(() => {
    const fetchSellerProfile = async () => {
      const token = localStorage.getItem("authToken");
      if(!token){
        console.error("No auth token found in local storage.");
        setLoading(false);
        return;
      }

      try {
        const data = await fetchData(token, sellerId);
        setSeller(data);
      } catch (error) {
        console.error("Failed to fetch the seller profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSellerProfile();
    // console.log("Seller ID:", sellerId);
  }, [sellerId]);

  const toggleAbout = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex-1 bg-base-200 rounded-lg p-4 min-h-screen">
      {/* {JSON.stringify(seller)} */}
      <EditProfileModal element_id="edit_profile_seller" _seller={seller}/>
      <EditPasswordModal element_id="edit_password" />

      <SectionDivider title="Profile Details" icon="" />

      <div className="avatar float-right mb-5 mr-10 mt-2">
        <div className="ring-primary ring-offset-base-100 w-40 h-40 rounded-full aspect-square ring ring-offset-2">
          <img src={images[0]} alt="Seller Profile" />
        </div>
      </div>

      {seller ? (
        <>
          <h1 className="text-xl font-bold m-3">
            Name: <b className="text-4xl">{seller?.name}</b>
          </h1>
          <div className="text-lg m-3 grid-cols-2 grid mb-5">
            <p>
              <span className="font-bold">DOB:</span> {seller?.dob}
            </p>
            <p>
              <span className="font-bold">Gender:</span> {seller?.gender}
            </p>
          </div>

          <h1 className="pl-3 font-bold text-xl">Contact Info:</h1>

          <div className="text-lg m-1 ml-3 grid-cols-2 grid mb-5">
            <p>
              <span className="font-bold">Phone:</span> {seller?.phone}
            </p>
            <p>
              <span className="font-bold">Email:</span> {seller?.email}
            </p>
            <p>
              <span className="font-bold">Store Name:</span> {seller?.storeName}
            </p>
            <p>
              <span className="font-bold">Store Address:</span> {seller?.storeAddress}
            </p>
            <p>
              <span className="font-bold">Slogan: </span> {seller?.slogan}
            </p>
          </div>

          <h1 className="pl-3 font-bold text-xl">Address:</h1>

          <div className="text-lg ml-3 m-1 grid-cols-2 grid mb-5">
            <p>
              <span className="font-bold">Address:</span> {seller?.address}
            </p>
            <p>
              <span className="font-bold">Post-Office:</span> {seller?.postOffice}
            </p>
            <p>
              <span className="font-bold">District:</span> {seller?.district}
            </p>
            <p>
              <span className="font-bold">Country:</span> {seller?.country}
            </p>
          </div>

          <div className="font-serif italic m-4">
            <b className="font-bold not-italic font-sans">About: {" "}</b>
            {seller?.about ? (
              isExpanded || seller?.about?.split(" ").length <= 10 ? (
                seller.about
              ) : (
                `${seller.about.split(" ").slice(0, 10).join(" ")}...`
              )
            ) : (
              "Information not available"
            )}
            {seller?.about?.split(" ").length > 30 && (
              <button onClick={toggleAbout} className="text-blue-600 text-xs ml-0">
                {isExpanded ? " See Less" : " See More"}
              </button>
            )}
          </div>


          <div className="flex">
            <button
              className="btn btn-primary mt-3 m-1 h-8 rounded-md items-center gap-2 p-2"
              onClick={() =>
                document.getElementById("edit_profile_seller").showModal()
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
              onClick={() =>
                document.getElementById("edit_password").showModal()
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
        

          <div className="grid mt-4  w-full place-items-center">
            <p>
              <span className=" font-bold mb-2">Store Rating:</span>
            </p>
            <Rating className="" rating={seller?.rating || 0} />
          </div>
          </>
        ) : (
          <p> No Seller Found </p>
        )}
        </div>
        

  );
};

export default MiddleLayoutSellerProfile;

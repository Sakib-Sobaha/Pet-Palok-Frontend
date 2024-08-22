import React, { useState } from "react";
import { useFileUpload } from "../Supabase/image-uploader";

const EditProfileUser = ({ element_id, _user }) => {
  const [user, setUser] = useState(_user);
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageSrc, setImageSrc] = useState(user?.image || "");

  const { uploadFiles } = useFileUpload();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result); // Update the image preview
      };
      reader.readAsDataURL(file);

      // Upload the file to Supabase and get the URL
      const imageUrls = await uploadFiles([file]);
      console.log("Image URLs:", imageUrls);

      // Update the user object with the new profile image URL
      setUser((prevState) => ({
        ...prevState,
        image: imageUrls[0], // Assume uploadFiles returns an array of URLs
      }));
    }
  };

  const handleSave = async () => {
    console.log("User information saved:", user);

    try {
      const token = localStorage.getItem("token");

      // Create an object that only contains the necessary attributes for the UpdateUserRequest
      const updateUserRequest = {
        firstName: user.firstname,
        lastName: user.lastname,
        phoneNumber: user.phoneNumber,
        address: user.address,
        postOffice: user.postOffice,
        district: user.district,
        country: user.country,
        dob: user.dob,
        ratingBuySellExchange: user.rating_buysellexch,
        ratingPetKeeping: user.rating_petkeeping,
        ratingVet: user.rating_vet,
        about: user.about,
        gender: user.gender,
        image: user.image
      };

      console.log(JSON.stringify(updateUserRequest));
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/user/update/${user.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateUserRequest),
        }
      );

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile. Please try again.");

      }
    } catch (error) {
      // console.error("Error updating user profile:", error);
      console.log(error)
      // alert("An error occurred while updating the profile.");
    }
    finally {
      window.location.reload();
    }
  };

  return (
    <div>
      <dialog id={element_id} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit User Profile</h3>

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
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div className="text-lg m-3 grid-cols-2 gap-3 grid mb-5">
            <p>
              <span className="font-bold">First Name:</span>
              <input
                type="text"
                name="firstname"
                value={user?.firstname}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </p>
            <p>
              <span className="font-bold">Last Name:</span>
              <input
                type="text"
                name="lastname"
                value={user?.lastname}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </p>
            <p>
              <span className="font-bold">DOB:</span>
              <input
                type="date"
                name="dob"
                value={user?.dob}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </p>
            <p>
              <span className="font-bold">Gender:</span>
              <select
                name="gender"
                value={user?.gender}
                onChange={handleChange}
                className="select input-bordered w-full max-w-xs"
              >
                <option disabled>{user?.gender}</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                {/* <option value="Others">Others</option> */}
              </select>
            </p>
          </div>
          <h1 className="pl-3 font-bold text-xl">Contact Info:</h1>
          <div className="text-lg m-1 ml-3 grid-cols-2 gap-3 grid mb-5">
            <p>
              <span className="font-bold">Phone:</span>
              <input
                type="text"
                name="phoneNumber"
                value={user?.phoneNumber}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </p>
            <p>
              <span className="font-bold">Email:</span>
              <input
                type="text"
                name="email"
                value={user?.email}
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
                name="address"
                className="textarea textarea-bordered w-full"
                value={user?.address}
                onChange={handleChange}
              ></textarea>
            </p>
            <p>
              <span className="font-bold">Post-Office:</span>
              <input
                type="text"
                name="postOffice"
                value={user?.postOffice}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </p>
            <p>
              <span className="font-bold">District:</span>
              <input
                type="text"
                name="district"
                value={user?.district}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </p>
            <p>
              <span className="font-bold">Country:</span>
              <input
                type="text"
                name="country"
                value={user?.country}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </p>
          </div>

          <div className="font-serif italic m-4 w-full">
            <b className="font-bold not-italic font-sans">About: {"   "}</b>
            <br />
            <textarea
              name="about"
              className="textarea textarea-bordered"
              value={user?.about}
              onChange={handleChange}
            />
          </div>

          <div className="modal-action">
            <button className="btn btn-accent" onClick={handleSave}>
              Save
            </button>

            <form method="dialog">
              <button className="btn btn-error">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default EditProfileUser;

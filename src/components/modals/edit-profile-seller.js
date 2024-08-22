import React, { useState } from "react";
import { useFileUpload } from "../Supabase/image-uploader"; // Import the custom hook

// const initialSeller = {
//   name: "",
//   phone: "",
//   storeName: "xx",
//   storeAddress: "Block-A, Road-1, Mirpur-10, Dhaka-1216, Bangladesh",
//   address: "10/1, Monipur, Mirpur-2, Dhaka-1216",
//   postOffice: "Mirpur-2",
//   district: "Dhaka",
//   country: "Bangladesh",
//   dob: "2020-01-01",
//   gender: "",
//   about:
//     "I am a worker for pets. Love working with them. Pets are our biggest friends. So we must take care of them! If we dont, who will?",
//   rating: "4",
//   image: "",
// };

// const images = [
//   "https://cdn.pixabay.com/photo/2023/08/18/15/02/dog-8198719_640.jpg",
//   "https://www.bhmpics.com/downloads/beautiful-pictures-of-dogs/56.golden_puppy_dog_pictures.jpg",
//   "https://static.toiimg.com/photo/109692764/109692764.jpg",
//   "https://www.userbarn.com.au/userspot/app/uploads/2016/03/HYG9.2-Blog-Genral-In-Post-800x533px.png",
//   "https://hips.hearstapps.com/del.h-cdn.co/assets/cm/15/10/54f94e3f42698_-_dog-stick-del-blog.jpg?crop=1xw:0.7309644670050761xh;center,top&resize=1200:*",
// ];

const EditProfileSeller = ({ element_id, _seller }) => {
  const [seller, setSeller] = useState(_seller);
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageSrc, setImageSrc] = useState(seller?.image || "");
  const [selectedImage, setSelectedImage] = useState(null);
  const { uploadFiles, uploading } = useFileUpload(); // Use the custom hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSeller((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const handleFileChange = async (event) => {
  //   const file = event.target.files[0];
  //   setSelectedImage(file);

  //   if(file){
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImageSrc(reader.result); // Update the image preview
  //     };
  //     reader.readAsDataURL(file);

  //     // Upload the file to Supabase and get the URL
  //     const imageUrls = await uploadFiles([file]);
  //     console.log("Image URLs:", imageUrls);

  //     // Update the user object with the new profile image URL
  //     setSeller((prevState) => ({
  //       ...prevState,
  //       image: imageUrls[0], // Assume uploadFiles returns an array of URLs
  //     }));
  //   }
  // };

  const toggleAbout = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSave = async () => {
    console.log("Seller information saved:", seller);
    // Logic to save seller information, such as an API call, goes here

    try{
      const token = localStorage.getItem("token");

      // Create an object that only contains the necessary attributes for the UpdateSellerRequest
      const updateSellerRequest = {
        name: seller.name,
        storeName: seller.storeName,
        storeAddress: seller.storeAddress,
        slogan: seller.slogan,
        phone: seller.phone,
        address: seller.address,
        about: seller.about,
        dob: seller.dob,
        image: seller.image,
        postOffice: seller.postOffice,
        district: seller.district,
        country: seller.country,
        gender: seller.gender,
        role: seller.role
        
      };

      console.log(JSON.stringify(updateSellerRequest));
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/seller/update/${seller?.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateSellerRequest),
        }
      );

      if(response.ok){
        const updatedSeller = await response.json();
        setSeller(updatedSeller);
        alert("Seller information saved successfully!");
      } else {
        alert("Failed to update seller information. Please try again.");

      }
    } catch (error) {
      console.error("Error updating seller information:", error);
      alert("An error occurred while updating the seller information.");
    } finally {
      window.location.reload();
    }
  };

  // Handle file input change for a single image
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file); // Replace the existing image with the new one

    if(file){
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result); // Update the state with the data URL
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };




  // Handle removing the image
  const handleRemoveImage = () => {
    setSelectedImage(null); // Remove the selected image
  };

  


  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImageSrc(reader.result); // Update the state with the data URL
  //     };
  //     reader.readAsDataURL(file); // Read the file as a data URL
  //   }
  // };

  return (
    <div>
      <dialog id={element_id} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Seller Profile</h3>
        
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
                onChange={handleImageChange} // Connect the file change handler
              />
            </div>
          </div>
          {seller.id}
          <div className="text-lg m-3 grid-cols-2 gap-3 grid mb-5">
            <p>
              <span className="font-bold">First Name:</span>
              <input
                type="text"
                name="name"
                value={seller?.name}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </p>
            <p>
              <span className="font-bold">dob:</span>
              <input
                type="date"
                name="dob"
                value={seller?.dob}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </p>
            <p>
              <span className="font-bold">Gender:</span>
              <select
                className="select input-bordered w-full max-w-xs"
                name="gender"
                value={seller?.gender}
                onChange={handleChange}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
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
                value={seller?.phone}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </p>
            <p>
              <span className="font-bold">Email:</span>
              <input
                type="text"
                name="email"
                value={seller?.email}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </p>
            <p>
              <span className="font-bold">Store Name:</span>
              <input
                type="text"
                name="store_name"
                value={seller?.storeName}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </p>
            <p>
              <span className="font-bold">Store Address:</span>
              <textarea
                type="text"
                name="store_address"
                value={seller?.storeAddress}
                onChange={handleChange}
                className="textarea textarea-bordered w-full"
              ></textarea>
            </p>
          </div>

          <h1 className="pl-3 font-bold text-xl">Address:</h1>
          <div className="text-lg ml-3 m-1 grid-cols-2 gap-3 grid mb-5">
            <p>
              <span className="font-bold">Present Address:</span>
              <textarea
                className="input input-bordered w-full"
                name="address"
                value={seller?.address}
                onChange={handleChange}
              ></textarea>
            </p>
            <p>
              <span className="font-bold">Post-Office:</span>
              <input
                type="text"
                name="postOffice"
                value={seller?.postOffice}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </p>
            <p>
              <span className="font-bold">District:</span>
              <input
                type="text"
                name="district"
                value={seller?.district}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </p>
            <p>
              <span className="font-bold">Country:</span>
              <input
                type="text"
                name="country"
                value={seller?.country}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </p>
          </div>

          <div className="font-serif italic m-4">
            <b className="font-bold not-italic font-sans">About: {"   "}</b>
            <textarea
              className="textarea textarea-bordered w-full"
              name="about"
              value={seller?.about}
              onChange={handleChange}
            />
            {/* {seller?.about.split(" ").length > 30 && (
              <button
                onClick={toggleAbout}
                className="text-blue-600 text-xs ml-0"
              >
                {isExpanded ? " See Less" : " See More"}
              </button>
            )} */}
          </div>

          <div className="modal-action">
            <button className="btn btn-accent" onClick={handleSave}>
              Save
            </button>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-error">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default EditProfileSeller;

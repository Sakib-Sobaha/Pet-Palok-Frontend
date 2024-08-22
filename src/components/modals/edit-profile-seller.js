import React, { useState } from "react";

const initialSeller = {
  name: "Sakib Sobaha",
  email: "abir@gmail.com",
  phone: "01234123456",
  password: "pasword",
  storeName: "Sakibs Pet Shop",
  storeAddress: "Block-A, Road-1, Mirpur-10, Dhaka-1216, Bangladesh",
  address: "10/1, Monipur, Mirpur-2, Dhaka-1216",
  postOffice: "Mirpur-2",
  district: "Dhaka",
  country: "Bangladesh",
  dob: "2020-01-01",
  gender: "male",
  about:
    "I am a worker for pets. Love working with them. Pets are our biggest friends. So we must take care of them! If we dont, who will?",
  rating_vetvisit: "4",
};

const images = [
  "https://cdn.pixabay.com/photo/2023/08/18/15/02/dog-8198719_640.jpg",
  "https://www.bhmpics.com/downloads/beautiful-pictures-of-dogs/56.golden_puppy_dog_pictures.jpg",
  "https://static.toiimg.com/photo/109692764/109692764.jpg",
  "https://www.userbarn.com.au/userspot/app/uploads/2016/03/HYG9.2-Blog-Genral-In-Post-800x533px.png",
  "https://hips.hearstapps.com/del.h-cdn.co/assets/cm/15/10/54f94e3f42698_-_dog-stick-del-blog.jpg?crop=1xw:0.7309644670050761xh;center,top&resize=1200:*",
];

const EditProfileSeller = ({ element_id }) => {
  const [seller, setSeller] = useState(initialSeller);
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageSrc, setImageSrc] = useState(images[0]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSeller((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const toggleAbout = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSave = () => {
    console.log("Seller information saved:", seller);
    // Logic to save seller information, such as an API call, goes here
  };

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
                onChange={handleFileChange} // Connect the file change handler
              />
            </div>
          </div>

          <div className="text-lg m-3 grid-cols-2 gap-3 grid mb-5">
            <p>
              <span className="font-bold">First Name:</span>
              <input
                type="text"
                name="name"
                value={seller.firstname}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </p>
            <p>
              <span className="font-bold">Last Name:</span>
              <input
                type="text"
                name="name"
                value={seller.lastname}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </p>
            <p>
              <span className="font-bold">dob:</span>
              <input
                type="date"
                name="dob"
                value={seller.dob}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </p>
            <p>
              <span className="font-bold">Gender:</span>
              <select
                className="select input-bordered w-full max-w-xs"
                name="gender"
                value={seller.gender}
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
                value={seller.phone}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </p>
            <p>
              <span className="font-bold">Email:</span>
              <input
                type="text"
                name="email"
                value={seller.email}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </p>
            <p>
              <span className="font-bold">Store Name:</span>
              <input
                type="text"
                name="store_name"
                value={seller.store_name}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </p>
            <p>
              <span className="font-bold">Store Address:</span>
              <input
                type="text"
                name="store_address"
                value={seller.store_address}
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
                name="address"
                value={seller.address}
                onChange={handleChange}
              ></textarea>
            </p>
            <p>
              <span className="font-bold">Post-Office:</span>
              <input
                type="text"
                name="postOffice"
                value={seller.postOffice}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </p>
            <p>
              <span className="font-bold">District:</span>
              <input
                type="text"
                name="district"
                value={seller.district}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </p>
            <p>
              <span className="font-bold">Country:</span>
              <input
                type="text"
                name="country"
                value={seller.country}
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
              value={seller.about}
              onChange={handleChange}
            ></textarea>
            {seller.about.split(" ").length > 30 && (
              <button
                onClick={toggleAbout}
                className="text-blue-600 text-xs ml-0"
              >
                {isExpanded ? " See Less" : " See More"}
              </button>
            )}
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

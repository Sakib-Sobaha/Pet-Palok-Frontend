import React, { useEffect, useState } from "react";
import { useFileUpload } from "../Supabase/image-uploader"; // Import the custom hook

const initialVet = {
  firstname: "Sakib",
  lastname: "Sobaha",
  email: "niloy870@gmail.com",
  phone: "01234123456",
  password: "pasword",
  clinic_name: "Bird Lovers Hospital",
  clinic_address: "Block-A, Road-1, Mirpur-10, Dhaka-1216, Bangladesh",
  address: "10/1, Monipur, Mirpur-2, Dhaka-1216",
  postOffice: "Mirpur-2",
  district: "Dhaka",
  country: "Bangladesh",
  DOB: "2020-01-01",
  gender: "male",
  about:
    "I am a worker for pets. Love working with them. Pets are our biggest friends. So we must take care of them! If we don't, who will?",
  rating_vetvisit: "4",
};

const images = [
  "https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg",
  "https://www.bhmpics.com/downloads/beautiful-pictures-of-dogs/56.golden_puppy_dog_pictures.jpg",
  "https://static.toiimg.com/photo/109692764/109692764.jpg",
  "https://www.userbarn.com.au/userspot/app/uploads/2016/03/HYG9.2-Blog-Genral-In-Post-800x533px.png",
  "https://hips.hearstapps.com/del.h-cdn.co/assets/cm/15/10/54f94e3f42698_-_dog-stick-del-blog.jpg?crop=1xw:0.7309644670050761xh;center,top&resize=1200:*",
];

const EditProfileVet = ({ element_id, _vet }) => {
  const [vet, setVet] = useState(_vet);
  

  // Sync the vet state with the _vet prop whenever _vet changes
  useEffect(() => {
    if (_vet) {
      setVet(_vet);
    }
  }, [_vet]);

  console.log("_vet :) " + JSON.stringify(_vet));
  console.log("vet: " + JSON.stringify(vet));

  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { uploadFiles, uploading } = useFileUpload(); // Use the custom hook
  const [imageSrc, setImageSrc] = useState(vet?.image);

  useEffect(() => {
    setImageSrc(vet?.image);
  }, [vet]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVet((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const toggleAbout = () => {
    setIsExpanded(!isExpanded);
  };


  useEffect(() => {
    setImageSrc(vet?.image);
  }, [vet]);
  

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedImage(file); // Store the selected file

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result); // Update the state with the data URL
      };
      reader.readAsDataURL(file); // Read the file as a data URL

      // Upload the file to a cloud storage service here
      const imageUrls = await uploadFiles([file]);
      console.log("Image URLs:", imageUrls);

      // Update the vet object with the new profile image URL
      setVet((prevState) => ({
        ...prevState,
        image: imageUrls[0], // Assume uploadFiles returns an array of URLs
      }));

    }
  };

  const formatDateToInput = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  

  const handleSave = async () => {
    console.log("Vet information saved:", vet);
    // Logic to save vet information, such as an API call, goes here

    try {
      const token = localStorage.getItem("authToken");

      const updateVetRequest = {
        firstname: vet.firstname,
        lastname: vet.lastname,
        phone: vet.phone,
        clinic_name: vet.clinic_name,
        clinic_address: vet.clinic_address,
        address: vet.address,
        postOffice: vet.postOffice,
        district: vet.district,
        country: vet.country,
        dob: vet.dob,
        about: vet.about,
        image: vet.image,
        gender: vet.gender
      };

      console.log("vet: " + JSON.stringify(updateVetRequest));
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/vet/update/${vet.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateVetRequest),
        }
      );

      if(response.ok) {
        const updatedVet = await response.json();
        setVet(updatedVet);
        alert("Vet profile updated successfully!");
      } else {
        alert("Failed to update vet profile. Please try again.");
      }
    } catch (error) {
      console.log(error);
      console.error("Failed to update vet profile:", error);
      alert("An error occurred while updating. Please try again.");
    } finally {
      window.location.reload();
    };

  };


  return (
    <div>
      <dialog id={element_id} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Vet Profile</h3>

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
                name="firstname"
                value={vet?.firstname || ""}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </p>
            <p>
              <span className="font-bold">Last Name:</span>
              <input
                type="text"
                name="lastname"
                value={vet?.lastname || ""}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </p>
            <p>
              <span className="font-bold">DOB:</span>
              <input
                type="date"
                name="dob"
                value={formatDateToInput(vet?.dob) || ""}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </p>
            <p>
              <span className="font-bold">Gender:</span>
              <select
                className="select input-bordered w-full max-w-xs"
                name="gender"
                value={vet?.gender || "female"}
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
                value={vet?.phone || ""}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </p>
            <p>
              <span className="font-bold">Email:</span>
              <input
                type="text"
                name="email"
                value={vet?.email}
                onChange={handleChange}
                className="input input-bordered w-full"
                readOnly
              />
            </p>
            <p>
              <span className="font-bold">Clinic Name:</span>
              <input
                type="text"
                name="clinic_name"
                value={vet?.clinic_name || ""}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </p>
            <p>
              <span className="font-bold">Clinic Address:</span>
              <input
                type="text"
                name="clinic_address"
                value={vet?.clinic_address || ""}
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
                value={vet?.address || ""}
                onChange={handleChange}
              ></textarea>
            </p>
            <p>
              <span className="font-bold">Post-Office:</span>
              <input
                type="text"
                name="postOffice"
                value={vet?.postOffice || ""}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </p>
            <p>
              <span className="font-bold">District:</span>
              <input
                type="text"
                name="district"
                value={vet?.district || ""}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </p>
            <p>
              <span className="font-bold">Country:</span>
              <input
                type="text"
                name="country"
                value={vet?.country || ""}
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
              value={vet?.about}
              onChange={handleChange}
            ></textarea>
            {vet?.about.split(" ").length > 30 && (
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

export default EditProfileVet;

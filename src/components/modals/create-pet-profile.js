import React, { useState } from "react";
import { useFileUpload } from "../Supabase/image-uploader"; // Import the custom hook

const handleLogout = () => {
  localStorage.removeItem("authToken");
  window.location.href = "/login"; // Redirect to the login page
};

// Initial pet data
const initialPet = {
  name: "",
  type: "",
  breed: "",
  appearance: "",
  dob: "",
  gender: "",
  description: "",
  images: [], // To store uploaded images' URLs
};

const CreatePetProfile = ({ element_id, user_id }) => {
  const [pet, setPet] = useState(initialPet); // State for pet details
  const [selectedImages, setSelectedImages] = useState([]); // State for image files
  const { uploadFiles, uploading } = useFileUpload(); // Use the custom hook

  // Handler to update pet properties
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPet((prevPet) => ({
      ...prevPet,
      [name]: value,
    }));
  };

  // Handle file input change
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedImages((prevImages) => [...prevImages, ...files]);
  };

  // Handle removing an image
  const handleRemoveImage = (index) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // Function to handle pet profile creation
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedImages.length === 0) {
      alert("Please select at least one image.");
      return;
    }

    try {
      // Upload images and get their URLs
      const imageUrls = await uploadFiles(selectedImages);
      console.log("Image URLs:", imageUrls);

      // Update pet object with uploaded image URLs
      const newPetData = {
        ...pet,
        images: imageUrls,
        ownerId: user_id, // Include the owner ID
      };

      console.log(newPetData);

      // Send the new pet data to the server
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        "http://localhost:8080/api/v1/pets/create-pet",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newPetData),
        }
      );

      if (!response.ok) {
        throw new Error("Pet profile creation failed.");
      }

      const result = await response.json();
      console.log("Pet profile created:", result);
      alert("Pet profile created successfully!");
      

      // Clear the form after successful submission
      setPet(initialPet);
      setSelectedImages([]);
    } catch (error) {
      console.error("Failed to create pet profile:", error);
    }

    document.getElementById("create_pet_profile").close();
    window.location.reload(); // Reload the page to see the new pet profile

  };

  return (
    <div>
      <dialog id={element_id} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Create Pet Profile</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
              {/* Pet Name */}
              <div>
                <label className="label">
                  <span className="label-text">Pet Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={pet.name}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Pet Name"
                  required
                />
              </div>

              {/* Pet Type */}
              <div>
                <label className="label">
                  <span className="label-text">Pet Type</span>
                </label>
                <select
                  name="type"
                  value={pet.type}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                  required
                >
                  <option disabled value="">
                    Select Pet Type
                  </option>
                  <option value="Animal">Animal</option>
                  <option value="Bird">Bird</option>
                  <option value="Fish">Fish</option>
                </select>
              </div>

              {/* Breed */}
              <div>
                <label className="label">
                  <span className="label-text">Breed</span>
                </label>
                <input
                  type="text"
                  name="breed"
                  value={pet.breed}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Breed"
                  required
                />
              </div>

              {/* Appearance */}
              <div>
                <label className="label">
                  <span className="label-text">Appearance</span>
                </label>
                <input
                  type="text"
                  name="appearance"
                  value={pet.appearance}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Appearance"
                  maxLength="10"
                  required
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label className="label">
                  <span className="label-text">Date of Birth</span>
                </label>
                <input
                  type="date"
                  name="dob"
                  value={pet.dob}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Gender */}
              <div>
                <label className="label">
                  <span className="label-text">Gender</span>
                </label>
                <select
                  name="gender"
                  value={pet.gender}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                  required
                >
                  <option disabled value="">
                    Select Gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  name="description"
                  value={pet.description}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full"
                  placeholder="Description"
                  required
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="label">
                  <span className="label-text">Image Upload</span>
                </label>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full max-w-xs"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                />

                <div className="label mt-2">
                  <span className="label-text">Pick one or more images</span>
                </div>

                {/* Image Previews */}
                <div className="flex gap-2 mt-4 flex-wrap">
                  {selectedImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index}`}
                        className="w-20 h-20 object-cover rounded shadow"
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 text-xs"
                        onClick={() => handleRemoveImage(index)}
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-action">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={uploading}
              >
                {uploading ? "Creating..." : "Create Profile"}
              </button>

              <form method="dialog">
                <button className="btn btn-error">Close</button>
              </form>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default CreatePetProfile;

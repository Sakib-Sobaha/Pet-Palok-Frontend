import React, { useState } from "react";

const initialPet = {
  name: "Chokkor",
  type: "Animal",
  breed: "Dog",
  appearance: "Black and White stripes",
  DOB: "2020-01-01",
  gender: "male",
  description:
    "Chokkor is a cute dog! He is a very good friend! I pass most of my time with him. Soo friendly. My beloved! Doggy doggy doggy dogyy. Cutie pie amar. I love him too too too too much",
  images: [], // To store uploaded images
};

const CreatePetProfile = ({ element_id }) => {
  // Initialize state with the default pet values
  const [pet, setPet] = useState(initialPet);
  const [selectedImages, setSelectedImages] = useState([]);

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
    const newImages = files.map((file) => URL.createObjectURL(file));
    setSelectedImages((prevImages) => [...prevImages, ...newImages]);
  };

  // Handle removing an image
  const handleRemoveImage = (index) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div>
      <dialog id={element_id} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Create Pet Profile</h3>
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
              />
            </div>

            {/* Pet Type */}
            <div>
              <label className="label">
                <span className="label-text">Pet Type</span>
              </label>
              <select
                name="type"
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option disabled selected>Select Pet Type</option>
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
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Breed"
              />
            </div>

            {/* Breed */}
            <div>
              <label className="label">
                <span className="label-text">Appearance</span>
              </label>
              <input
                type="text"
                name="appearance"
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Appearance"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="label">
                <span className="label-text">Date of Birth</span>
              </label>
              <input
                type="date"
                name="DOB"
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="label">
                <span className="label-text">Gender</span>
              </label>
              <select
                name="gender"
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option disabled selected>Select Gender</option>
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
                onChange={handleChange}
                className="textarea textarea-bordered w-full"
                placeholder="Description"
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
                      src={image}
                      alt={`Preview ${index}`}
                      className="w-20 h-20 object-cover rounded shadow"
                    />
                    <button
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
            <button className="btn btn-primary">Create Profile</button>

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

export default CreatePetProfile;

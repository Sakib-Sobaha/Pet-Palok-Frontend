import React, { useState } from "react";
import { useFileUpload } from "../Supabase/image-uploader"; // Import the custom hook

const handleLogout = () => {
  localStorage.removeItem("authToken");
  window.location.href = "/login"; // Redirect to the login page
};

// Initial community data
const initialCommunity = {
  name: "",
  description: "",
  topics: "",
  image: "", // To store uploaded images' URLs
};

const CreateCommunity = ({ element_id }) => {
  const [community, setCommunity] = useState(initialCommunity); // State for community details
  const [selectedImage, setSelectedImage] = useState(null); // State for image file
  const { uploadFiles, uploading } = useFileUpload(); // Use the custom hook

  // Handler to update community properties
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommunity((prevCommunity) => ({
      ...prevCommunity,
      [name]: value,
    }));
  };

  // Handle file input change
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  // Function to handle community creation
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedImage) {
      alert("Please select an image.");
      return;
    }

    try {
      // Upload the image and get the URL
      const imageUrl = await uploadFiles([selectedImage]);
      console.log("Image URL:", imageUrl[0]);

      // Update community object with uploaded image URL
      const newCommunityData = {
        ...community,
        image: imageUrl[0], // Use the uploaded image URL
        topics: community.topics.split(","), // Convert topics string into an array
        userType: "user", // Assuming userType is always "user" for this form
      };

      console.log(newCommunityData);

      // Send the new community data to the server
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/communities/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newCommunityData),
        }
      );

      if (!response.ok) {
        throw new Error("Community creation failed.");
      }

      const result = await response.json();
      console.log("Community created:", result);
      alert("Community created successfully!");

      // Clear the form after successful submission
      setCommunity(initialCommunity);
      setSelectedImage(null);
    } catch (error) {
      console.error("Failed to create community:", error);
    }

    // document.getElementById("create_community_modal").close();
    window.location.reload(); // Reload the page to see the new community
  };

  return (
    <div>
      <dialog id={element_id} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Create Community</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
              {/* Community Name */}
              <div>
                <label className="label">
                  <span className="label-text">Community Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={community.name}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Community Name"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  name="description"
                  value={community.description}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full"
                  placeholder="Description"
                  required
                />
              </div>

              {/* Topics */}
              <div>
                <label className="label">
                  <span className="label-text">Topics</span>
                </label>
                <input
                  type="text"
                  name="topics"
                  value={community.topics}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Comma-separated topics (e.g. turtle, tortoise, pet)"
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
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <div className="label mt-2">
                  <span className="label-text">Pick an image for the community</span>
                </div>

                {/* Image Preview */}
                {selectedImage && (
                  <div className="mt-4">
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Preview"
                      className="w-40 h-40 object-cover rounded shadow"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="modal-action">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={uploading}
              >
                {uploading ? "Creating..." : "Create Community"}
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

export default CreateCommunity;
    
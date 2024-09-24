import React, { useState } from "react";
import { useFileUpload } from "../Supabase/image-uploader"; // Import the custom hook

const handleLogout = () => {
  localStorage.removeItem("authToken");
  window.location.href = "/login"; // Redirect to the login page
};

const UploadImage = ({ element_id, petId }) => {
  const [selectedImages, setSelectedImages] = useState([]); // State for image files
  const { uploadFiles, uploading } = useFileUpload(); // Use the custom hook

  // Handle file input change
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedImages((prevImages) => [...prevImages, ...files]);
  };

  // Handle removing an image
  const handleRemoveImage = (index) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // Function to handle image uploading and pet profile updating
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

      // Create a new object to send to the server
      const newImageData = {
        newImageUrls: imageUrls, // Prepare the object to match your backend expectations
      };

      // Send the new image data to the server
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/pets/imageUpload/${petId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newImageData), // Send the image URLs
        }
      );

      if (!response.ok) {
        throw new Error("Image upload failed.");
      }

      const result = await response.json();
      console.log("Image upload result:", result);
      alert("Images uploaded successfully!");

      // Clear the form after successful submission
      setSelectedImages([]);
    } catch (error) {
      console.error("Failed to upload images:", error);
      alert("Failed to upload images.");

    }

    // Close the dialog and reload the page to reflect changes
    document.getElementById(element_id).close();
    window.location.reload(); // Reload the page to see the new images
  };

  return (
    <div>
      <dialog id={element_id} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Upload Pet Images</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">

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
                {uploading ? "Uploading..." : "Upload Images"}
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

export default UploadImage;

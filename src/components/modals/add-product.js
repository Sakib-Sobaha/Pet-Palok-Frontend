import React, { useState } from "react";
import { useFileUpload } from "../Supabase/image-uploader"; // Import the custom hook

const initialItem = {
  sellerId: "",
  name: "",
  pricePerUnit: 0,
  quantity: "",
  count: 0,
  totalAvailableCount: 0,
  petType: "",
  type: "",
  description:
    "",
  images: [], // To store uploaded images' URLs
};

const AddProduct = ({ element_id, seller_id }) => {
  const [item, setItem] = useState(initialItem); // State for item details
  const [sellerId, setSellerId] = useState(seller_id);
  const [selectedImages, setSelectedImages] = useState([]); // State for image files
  const { uploadFiles, uploading } = useFileUpload(); // Use the custom hook

  // Handler to update item properties
  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
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

  // Function to handle product submission
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

      // Update item object with uploaded image URLs
      const newItemData = {
        ...item,
        images: imageUrls,
        sellerId: seller_id, // Include the seller ID
      };

      console.log(JSON.stringify(newItemData));

      // Send the new item data to the server
      const token = localStorage.getItem("authToken");

      
      const response = await fetch(`${process.env.REACT_APP_API_URL}/marketplace/addNewItem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newItemData),
      });

      if (!response.ok) {
        throw new Error("Product creation failed.");
      }

      const result = await response.json();
      console.log("Product created:", result);
      alert("Product created successfully!");

      // Clear the form after successful submission
      setItem(initialItem);
      setSelectedImages([]);
    } catch (error) {
      console.error("Failed to create product:", error);
    }

    document.getElementById(element_id).close();
    // window.location.reload(); // Reload the page to see the new product
  };

  return (
    <div>
      <dialog id={element_id} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Product</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
              {/* Product Name */}
              <div>
                <label className="label">
                  <span className="label-text">Product Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={item.name}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Product Name"
                  required
                />
              </div>

              {/* Price Per Unit */}
              <div>
                <label className="label">
                  <span className="label-text">Price Per Unit</span>
                </label>
                <input
                  type="number"
                  name="pricePerUnit"
                  value={item.pricePerUnit}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Price"
                  required
                />
              </div>

              {/* Quantity */}
              <div>
                <label className="label">
                  <span className="label-text">Quantity</span>
                </label>
                <input
                  type="text"
                  name="quantity"
                  value={item.quantity}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Quantity"
                  required
                />
              </div>

              {/* Total Available Count */}
              <div>
                <label className="label">
                  <span className="label-text">Total Available Count</span>
                </label>
                <input
                  type="number"
                  name="totalAvailableCount"
                  value={item.totalAvailableCount}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Total Available Count"
                  required
                />
              </div>

              {/* Pet Type */}
              <div>
                <label className="label">
                  <span className="label-text">Pet Type</span>
                </label>
                <select
                  name="petType"
                  value={item.petType}
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

              {/* Type */}
              <div>
                <label className="label">
                  <span className="label-text">Type</span>
                </label>
                <select
                  name="type"
                  value={item.type}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                  required
                >
                  <option disabled value="">
                    Select Type of Product
                  </option>
                  <option value="food">Food</option>
                  <option value="accessories">Accessories</option>
                  <option value="medicine">Medicine</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  name="description"
                  value={item.description}
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
                {uploading ? "Adding..." : "Add Product"}
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

export default AddProduct;

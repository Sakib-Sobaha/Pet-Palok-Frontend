import React, { useState } from "react";

const initialItem = {
  name: "Odomos Doggy",
  price_per_unit: 90,
  quantity: "250g",
  count: 0,
  sell_count: 7,
  total_available_count: 4,
  pet_type: "Animal",
  type: "medicine",
  description:
    "If a dog chews shoes whose shoes does he choose? If a dog chews shoes whose shoes does he choose? If a dog chews shoes whose shoes does he choose? If a dog chews shoes whose shoes does he choose? If a dog chews shoes whose shoes does he choose?",
  image: "https://cdn.pixabay.com/photo/2023/08/18/15/02/dog-8198719_640.jpg",
};

const AddProduct = ({ element_id }) => {
  // Initialize state with the default item values
  const [item, setItem] = useState(initialItem);

  // Handler to update item properties
  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const [selectedImages, setSelectedImages] = useState([]);

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
          <h3 className="font-bold text-lg">Add New Product</h3>
          <div className="grid grid-cols-1 gap-4">
            {/* Product Name */}
            <div>
              <label className="label">
                <span className="label-text">Product Name</span>
              </label>
              <input
                type="text"
                name="name"
                // // value={item.name}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Product Name"
              />
            </div>

            {/* Price Per Unit */}
            <div>
              <label className="label">
                <span className="label-text">Price Per Unit</span>
              </label>
              <input
                type="number"
                name="price_per_unit"
                // value={item.price_per_unit}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Price"
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
                // value={item.quantity}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Quantity"
              />
            </div>

            {/* Count */}
            <div>
              <label className="label">
                <span className="label-text">Count</span>
              </label>
              <input
                type="number"
                name="count"
                // value={1}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Count"
              />
            </div>

            {/* Total Available Count */}
            <div>
              <label className="label">
                <span className="label-text">Total Available Count</span>
              </label>
              <input
                type="number"
                name="total_available_count"
                // value={item.total_available_count}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Total Available Count"
              />
            </div>

            {/* Pet Type */}
            <div>
              <label className="label">
                <span className="label-text">Pet Type</span>
              </label>

              <select className="select select-bordered w-full">
                <option disabled selected>
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
              <select className="select select-bordered w-full">
                <option disabled selected>
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
                // value={item.description}
                onChange={handleChange}
                className="textarea textarea-bordered w-full"
                placeholder="Description"
              />
            </div>

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
            <button className="btn btn-primary">Add</button>

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

export default AddProduct;

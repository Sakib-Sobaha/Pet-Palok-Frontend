import React, { useState } from "react";

const AddProduct = ({ element_id, _item }) => {
  const [count, setCount] = useState(0); // State for the count
  const [item, setItem] = useState(_item); // State for item details
  // Handler to update count
  const handleCountChange = (e) => {
    setCount(e.target.value);
  };

  // Function to handle product submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!count || isNaN(count) || parseInt(count, 10) < 0) {
      alert("Please enter a valid non-negative number for count.");
      return;
    }

    try {
      // Send the new count to the server
      const token = localStorage.getItem("authToken");

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/marketplace/editItem/${item?.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ count: parseInt(count, 10) }), // Sending the count as an integer
        }
      );

      if (response.status === 404) {
        alert("Item not found.");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to update the product count.");
      }

      const result = await response.json();
      console.log("Product count updated:", result);
      alert("Product count updated successfully!");

      // Clear the input field after successful submission
      setCount("");
    } catch (error) {
      console.error("Failed to update product:", error);
      alert("An error occurred while updating the count.");
    }

    // Reset the modal boxes
    document.getElementById(element_id).close();
  };

  return (
    <div>
      <dialog id={element_id} className="modal">
        <div className="modal-box">
          <h3 className="font-semibold text-lg">
            Add More <strong>{item?.name}</strong>s
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
              {/* Count Input */}
              <div>
                <label className="label">
                  <span className="label-text">Number of Products to Add</span>
                </label>
                <input
                  type="number"
                  name="count"
                  value={count}
                  onChange={handleCountChange}
                  className="input input-bordered w-full"
                  placeholder="Enter new count"
                  required
                />
              </div>
            </div>

            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                Update Count
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

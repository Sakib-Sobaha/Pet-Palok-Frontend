import React, { useState } from "react";

const handleLogout = () => {
  localStorage.removeItem("authToken");
  window.location.href = "/login"; // Redirect to the login page
};

const getTypeColor = (type) => {
  switch (type?.toLowerCase()) {
    case "food":
      return "badge-success"; // Green background for food
    case "accessories":
      return "badge-info"; // Blue background for accessories
    case "medicine":
      return "badge-error"; // Red background for medicine
    default:
      return "badge-ghost"; // Default gray for unknown types
  }
};

const addToCartReq = async (token, itemId, count) => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/cart/addToCart`;
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ itemId: itemId, count: count }),
    };

    const response = await fetch(url, requestOptions);

    if (response.status === 401) {
      handleLogout(); // Token is likely expired, logout the user
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Network response was not ok. Status: ${response.status}, ${errorText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to Add to Cart", error);
    return null; // Return null in case of an error
  }
};

const AddToCart = ({ element_id, _item }) => {
  console.log("modal of ", _item.id);
  const [item, setItem] = useState(_item);
  const [count, setCount] = useState(1);

  // Function to handle changes in the count input
  const handleCountChange = (event) => {
    const newCount = parseInt(event.target.value, 10);
    setCount(newCount > 0 ? newCount : 1); // Ensuring count is always positive
  };

  return (
    <div>
      <dialog id={element_id} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add this product to your Cart</h3>
          <div className="flex">
            <div className="w-1/2 ">
              <img
                src={item.images[0]}
                alt={item.name}
                className="h-72 w-52 object-cover rounded-lg"
              />
            </div>
            <div className="w-1/2 place-items-center justify-center text-center">
              <div className="h-16"></div>
              <h3 className="font-bold text-lg">{item.name}</h3>
              <p className="font-bold text-lg font-mono text-green-600">
                {item.pricePerUnit}
              </p>

              <p>
                <span
                  className={`badge badge-outline badge-lg font-bold mx-0.5 py-1.5 ${getTypeColor(
                    item.type
                  )}`}
                >
                  {item?.type.charAt(0).toUpperCase() +
                    item?.type.slice(1).toLowerCase()}
                </span>
                <span className="badge badge-secondary text-base-200 badge-lg mx-0.5 py-1.5 font-bold">
                  {item?.petType.charAt(0).toUpperCase() +
                    item?.petType.slice(1).toLowerCase()}
                </span>
              </p>

              {/* Count Input Field */}
              <input
                type="number"
                className="input input-bordered rounded-lg w-16 mt-2 h-8"
                placeholder="Quantity"
                value={count}
                min="1"
                onChange={handleCountChange} // Handle count changes
              />
            </div>
          </div>
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-error float-end">Close</button>
            <button
              type="button"
              className="btn btn-primary float-end mx-1"
              onClick={async () => {
                const token = localStorage.getItem("authToken");
                const response = await addToCartReq(token, item.id, count);
                if (response) {
                  console.log("Added to Cart", response);
                  alert("Item added to cart: " + item.name + " x" + count);
                  //   window.location.reload();
                  // close this modal with element id  give already
                  setCount(1);
                  document.getElementById(element_id).close();
                  window.location.reload();
                } else {
                  console.error("Failed to Add to Cart");
                  alert("Failed to add item to cart");
                }
              }}
            >
              Add to Cart
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default AddToCart;

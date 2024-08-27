import React, { useEffect, useState } from "react";
import Rating from "../Rating-Small";
import AddToCart from "../modals/add-to-cart";

const handleLogout = () => {
  localStorage.removeItem("authToken");
  window.location.href = "/login"; // Redirect to the login page
};

const addToCartReq = async (token, itemId) => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/cart/addToCart`;
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ itemId: itemId, count:1 }),
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

const deleteReq = async (token, itemId) => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/marketplace/deleteItem/${itemId}`;
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });

    const requestOptions = {
      method: "DELETE",
      headers: headers,
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
    console.error("Failed to Delete Data", error);
    return null; // Return null in case of an error
  }
};

function ItemCardNoButton({ _item, owner, onDelete }) {
  const [item, setItem] = useState(_item);
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const userType = localStorage.getItem("userType");

  useEffect(() => {
    setItem(_item);
  }, [_item]);


  const deleteItemCall = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No auth token found in local storage.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      await deleteReq(token, item.id);
      if (onDelete) {
        onDelete(item.id); // Call the onDelete callback if provided
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVisitItem = () => {
    window.location.href = "/marketplace/item/" + item.id;
  };

  const searchByType = () => {
    console.log("search by type");
  };

  const addToCart = () => {
    console.log("Add to cart for item: "+ item.name + " with id: "+ item.id);
    // setShowAlert(true);
    document.getElementById("add_to_cart"+item.id).showModal()

    // Automatically hide the alert after 2 seconds
    // setTimeout(() => setShowAlert(false), 2000);
    
  };

  const handleDeleteItem = () => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteItemCall();
    }
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

  return (
    <div
      className="tooltip tooltip-info tooltip-right"
      data-tip={item.petType}
    >
      {item && <AddToCart element_id={"add_to_cart"+item.id} _item={item} />}
      <div
        className={`ml-2 card rounded-none bg-base-100 w-64 shadow-xl m-1 cursor-pointer hover:scale-105 transition-transform duration-300 hover:shadow-lg ${
          owner ? "h-96" : "h-80"
        }`}
      >
        <figure onClick={handleVisitItem} className="">
          <img
            src={item.images[0]}
            alt={item.name}
            className="h-72 w-52 object-cover rounded-lg"
          />
        </figure>
        <div className="card-body p-1">
          <h2 className="text-xl m-0 font-bold grid place-items-center pl-4 mt-2">
            <div>
              <span className="p-2">{item.name.slice(0,18)}{item.name.length > 18 ? (<span>...</span>):""}</span>
              <Rating rating={item.rating} />
            </div>
          </h2>
          <div className="grid grid-cols-3 m-1 gap-0 place-items-center">
            <h2 className="text-sm m-0 text-green-600 grid place-items-center font-mono">
              <b className="font-bold">{item && item.pricePerUnit + " taka"}</b>
            </h2>
            <p className="text-sm grid place-items-center w-full">
              <b className="text-sm text-primary">{item.quantity}</b>
            </p>
            <p
              className={`badge cursor-pointer badge-outline text-xs ${getTypeColor(
                item.type
              )}`}
              onClick={searchByType}
            >
              {item.type}
            </p>
          </div>
          <div className="card-actions grid gap-0">
            {userType === "user" && (
              <>
                <button
                  className="btn btn-primary rounded-none"
                  onClick={addToCart}
                >
                  Add to Cart
                </button>
              </>
            )}
            {userType === "seller" && (
              <button className="btn btn-secondary rounded-none mb-1">
                View Item
              </button>
            )}
            {owner && (
              <>
                <button
                  className="btn btn-error rounded-none"
                  onClick={handleDeleteItem}
                >
                  {loading ? "Deleting..." : "Delete Item"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemCardNoButton;

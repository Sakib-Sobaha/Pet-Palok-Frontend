import React, { useState, useEffect } from "react";

const getTypeColor = (type) => {
  switch (type.toLowerCase()) {
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

const handleLogout = () => {
  localStorage.removeItem("authToken");
  window.location.href = "/login"; // Redirect to the login page
};

const fetchItemByIdAPI = async (token, itemId) => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/marketplace/item/${itemId}`;
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });

    const requestOptions = {
      method: "GET",
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
    console.error("Failed to fetch item by id:", error);
    return null;
  }
};

const fetchCartAPI = async (token) => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/cart/getCartItems`;
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });

    const requestOptions = {
      method: "GET",
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
    console.error("Failed to fetch cart items:", error);
    return []; // Return an empty array in case of an error
  }
};

function TempCartTableRL() {
  const [cartItems, setCartItems] = useState([]); // Updated to an empty array
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleIncrement = (itemIndex) => {
    setCartItems((prevItems) =>
      prevItems.map((item, index) =>
        index === itemIndex && item.count < item.total_available_count
          ? { ...item, count: item.count + 1 }
          : item
      )
    );
  };

  // Handle decrement
  const handleDecrement = (itemIndex) => {
    setCartItems((prevItems) =>
      prevItems.map((item, index) =>
        index === itemIndex && item.count > 0
          ? { ...item, count: item.count - 1 }
          : item
      )
    );
  };

  const fetchCart = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("No auth token found in local storage");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const cartData = await fetchCartAPI(token);
      setCart(cartData);

      // Fetch each item details using its ID
      const cartItemDetailsPromises = cartData.map((cartItem) =>
        fetchItemByIdAPI(token, cartItem.itemId)
      );

      const itemDetails = await Promise.all(cartItemDetailsPromises);

      // Combine item details with cart item count
      const updatedCartItems = itemDetails.map((itemDetail, index) => {
        const cartItem = cartData[index];
        return {
          ...itemDetail,
          count: cartItem.count, // Get the count from the cart
        };
      });

      setCartItems(updatedCartItems);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.pricePerUnit * item.count,
    0
  );

  return (
    <div className="grid place-content-center">
      {loading ? (
        <p className="mt-5">
          <span className="loading loading-ring loading-lg text-primary"></span>{" "}
          {/* <div className="flex w-52 flex-col gap-4">
            <div className="skeleton h-8 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div> */}
        </p>
      ) : (
        <>
          {cartItems.length > 0 ? (
            <table className="table table-header-group">
              {/* head */}
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Unit Count</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-bold">{item.name}</div>
                          <div className=" grid gap-1">
                            <div className="text-xs badge badge-info badge-xs opacity-90">
                              {item.petType}
                            </div>
                            <div
                              className={`badge cursor-pointer badge-outline badge-xs text-xs ${getTypeColor(
                                item.type
                              )}`}
                            >
                              {item.type}
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="justify-center">
                      <div className="flex items-center">
                        <span className="mx-6">{item.count}</span>
                      </div>
                    </td>
                    <td>{item.pricePerUnit * item.count} Taka</td>
                  </tr>
                ))}
                <tr>
                  <td className="font-bold">Total</td>
                  <td></td>
                  <td className="font-bold">{totalPrice} Taka</td>
                </tr>
              </tbody>
              <button className="btn btn-primary rounded-md ml-2"
                onClick={
                  () => {
                    window.location.href = "/cart";
                  }
                }
              >
                <svg
                  version="1.1"
                  viewBox="0 0 25 25"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 "
                  fill="none"
                  stroke="currentColor"
                >
                  <g fill="none">
                    <g fill="none">
                      <path
                        strokeWidth="1.6"
                        d="M6,16 C4.9,16 4,16.9 4,18 C4,19.1 4.9,20 6,20 C7.1,20 8,19.1 8,18 C8,16.9 7.1,16 6,16 Z M0,0 L0,2 L2,2 L5.6,9.6 L4.2,12 C4.1,12.3 4,12.7 4,13 C4,14.1 4.9,15 6,15 L18,15 L18,13 L6.4,13 C6.3,13 6.2,12.9 6.2,12.8 L6.2,12.7 L7.1,11 L14.5,11 C15.3,11 15.9,10.6 16.2,10 L19.8,3.5 C20,3.3 20,3.2 20,3 C20,2.4 19.6,2 19,2 L4.2,2 L3.3,0 L0,0 Z M16,16 C14.9,16 14,16.9 14,18 C14,19.1 14.9,20 16,20 C17.1,20 18,19.1 18,18 C18,16.9 17.1,16 16,16 Z"
                      />
                    </g>
                  </g>
                </svg>
                Go to Cart
              </button>
            </table>
          ) : (
            <p>No items in cart.</p>
          )}
        </>
      )}
    </div>
  );
}

export default TempCartTableRL;

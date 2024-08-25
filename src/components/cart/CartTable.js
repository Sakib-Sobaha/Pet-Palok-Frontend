import React, { useState, useEffect } from "react";

const handleLogout = () => {
  localStorage.removeItem("authToken");
  window.location.href = "/login"; // Redirect to the login page
};

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

const handleIncrementAPI = async (token, cartItemId) => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/cart/incrementCount/${cartItemId}`;
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });

    const requestOptions = {
      method: "POST",
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
    console.error("Failed to increment item count:", error);
    return null;
  }
};

const deleteCartItemAPI = async (token, cartItemId) => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/cart/removeItem/${cartItemId}`;
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
    console.error("Failed to delete item from cart:", error);
    return null;
  }
};

const clearCartAPI = async (token) => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/cart/clearCart`;
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
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
  }
  catch (error) {
    console.error("Failed to Clear Cart", error);
    return null; // Return null in case of an error
  }
};

const handleDecrementAPI = async (token, cartItemId) => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/cart/decrementCount/${cartItemId}`;
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });

    const requestOptions = {
      method: "POST",
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
    console.error("Failed to decrement item count:", error);
    return null;
  }
};

const fetchSellerById = async (token, sellerId) => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/seller/getSellerById/${sellerId}`;
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
      handleLogout();
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
    console.error("Failed to fetch seller by id:", error);
    return null;
  }
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

function CartTable({
  selectedItemsCentral,
  setSelectedItemsCentral,
  groupedItemsByStoreCentral,
  checkoutCentral,
  sellersCentral,
}) {
  const [alertText, setAlertText] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [sellers, setSellers] = useState([]);
  const [itemsData, setItemsData] = useState({});
  const [groupedItems, setGroupedItems] = useState({});

  const [loading, setLoading] = useState(false);

  const [tempSelected, setTempSelected] = useState([]);

  const token = localStorage.getItem("authToken"); // Use localStorage to get the token

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading

      try {
        // Fetch cart items
        const cart = await fetchCartAPI(token);
        setCartItems(cart);

        // Fetch details for each cart item
        const itemDetails = await Promise.all(
          cart.map(async (cartItem) => {
            const item = await fetchItemByIdAPI(token, cartItem.itemId);
            return {
              ...item,
              ...cartItem,
              cartItemId: cartItem.id,
            };
          })
        );

        setItemsData(itemDetails);

        // Fetch seller details
        const uniqueSellerIds = [
          ...new Set(itemDetails.map((item) => item.sellerId)),
        ];
        const sellerDetails = await Promise.all(
          uniqueSellerIds.map((sellerId) => fetchSellerById(token, sellerId))
        );

        setSellers(sellerDetails);
        sellersCentral(sellerDetails);

        // Group items by seller
        const groupedBySeller = groupItemsBySellerId(
          itemDetails,
          sellerDetails
        );
        setGroupedItems(groupedBySeller);
        groupedItemsByStoreCentral(groupedBySeller);
      } catch (err) {
        console.error("Failed to fetch data: ", err);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchData();
  }, [token]);

  const groupItemsBySellerId = (items) => {
    return items.reduce((acc, item) => {
      // Use sellerId to group items
      const sellerId = item.sellerId;

      // Ensure the sellerId array exists
      if (!acc[sellerId]) {
        acc[sellerId] = [];
      }

      // Push the item into the seller's array
      acc[sellerId].push({
        ...item,
        cartItemId: item.id, // or item.cartItemId if CartItem ID is a different field
        itemId: item.itemId, // Ensuring the Item ID is retained correctly
      });

      return acc;
    }, {});
  };

  const handleCheckboxChange = (storeName, index) => {
    const key = `${storeName}-${index}`;
    console.log("key: " + key);

    const item = groupedItems[storeName]?.[index];
    const itemId = item?.id; // Extract the item ID from the grouped items
    console.log("item : " + JSON.stringify(item));
    if (!itemId) return; // Exit if itemId is not available

    // Update local selectedItems state
    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      [key]: !prevSelectedItems[key],
    }));

    // Update central selectedItems state
    setSelectedItemsCentral((prevSelectedItemsCentral) => {
      if (prevSelectedItemsCentral.includes(itemId)) {
        // If the item ID is already selected, remove it from the array
        return prevSelectedItemsCentral.filter((id) => id !== itemId);
      } else {
        // If the item ID is not selected, add it to the array
        return [...prevSelectedItemsCentral, itemId];
      }
    });
  };

  const handleDecrement = (storeName, index) => {
    const updatedItems = { ...groupedItems };
    const item = updatedItems[storeName][index];

    if (item.count > 1) {
      item.count -= 1;
      setGroupedItems(updatedItems);
    }

    const cartItemId = item.cartItemId;


    try{
      setLoading(true); // Start loading
      // call increment api for backend update
      handleDecrementAPI(token, cartItemId);

    }
    catch (error) {
      console.error("Failed to increment item count:", error);
    }
    finally {
      setLoading(false); // End loading
    }
  };

  const handleIncrement = (storeName, index) => {
    const updatedItems = { ...groupedItems };
    const item = updatedItems[storeName][index];

    if (item.count < item.totalAvailableCount) {
      item.count += 1;
      setGroupedItems(updatedItems);
    }

    const cartItemId = item.cartItemId;


    try{
      setLoading(true); // Start loading
      // call increment api for backend update
      handleIncrementAPI(token, cartItemId);

    }
    catch (error) {
      console.error("Failed to increment item count:", error);
    }
    finally {
      setLoading(false); // End loading
    }
    
  };

  // Checkout action
  const handleCheckout = () => {
    const selectedItemNames = Object.keys(selectedItems)
      .filter((key) => selectedItems[key])
      .map((key) => {
        const [sellerId, index] = key.split("-");
        return groupedItems[sellerId][parseInt(index, 10)].name;
      });

    if (selectedItemNames.length > 0) {
      setAlertText(`Checkout these items: ${selectedItemNames.join(", ")}`);
      setShowAlert(true);
      alert(`Checkout these items: ${selectedItemNames.join(", ")}`);
      setTimeout(() => setShowAlert(false), 5000);

      // Change the URL to the checkout page
      // window.location.href = "/checkout";
      checkoutCentral(true);
      console.log("checkout items: " + JSON.stringify(selectedItems));
    } else {
      setAlertText("No items selected for checkout");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  // Clear Cart action
  const handleClearCart = () => {
    setCartItems([]); // Clear all items from the cart
    setSelectedItems({}); // Clear selected items

    // Call the API to clear the cart
    clearCartAPI(token);
    
  };

  // Remove Selected action
  const handleRemoveSelected = async () => {
    const updatedItems = { ...groupedItems };
    const token = localStorage.getItem("authToken");
  
    const deletePromises = Object.keys(selectedItems).map(async (key) => {
      const [storeName, index] = key.split("-");
      const itemIndex = parseInt(index, 10); // Convert index to a number
  
      if (updatedItems[storeName] && updatedItems[storeName][itemIndex]) {
        const item = updatedItems[storeName][itemIndex];
        const cartItemId = item.cartItemId; // Assuming each item has a cartItemId
  
        // Call the API to delete the cart item
        const response = await deleteCartItemAPI(token, cartItemId);
  
        if (response) {
          console.log(`Item ${item.name} removed from the cart.`);
          
          updatedItems[storeName].splice(itemIndex, 1); // Remove the item from the state
        } else {
          console.error(`Failed to remove item ${item.name} from the cart.`);
        }
  
        // If the store has no more items, remove the store from the groupedItems object
        if (updatedItems[storeName].length === 0) {
          delete updatedItems[storeName];
        }
      }
      window.location.reload();
    });
  
    // Wait for all delete requests to complete
    await Promise.all(deletePromises);
  
    setGroupedItems(updatedItems);
    setSelectedItems({});
  };
  

  // Function to decrement item quantity
  // const handleDecrement = async (cartItemId, itemId) => {
  //   // Find the cart item and ensure it's not already at the minimum quantity
  //   const item = cartItems.find((item) => item.cartItemId === cartItemId);

  //   if (item && item.quantity > 1) {
  //     // Decrement the quantity
  //     const updatedQuantity = item.quantity - 1;

  //     // Update the state
  //     const updatedCartItems = cartItems.map((cartItem) =>
  //       cartItem.cartItemId === cartItemId
  //         ? { ...cartItem, quantity: updatedQuantity }
  //         : cartItem
  //     );

  //     setCartItems(updatedCartItems);

  //     // Update backend if necessary
  //     await handleIncrementAPI(token, cartItemId);

  //     console.log(`Decremented item ${itemId} to quantity: ${updatedQuantity}`);
  //   }
  // };

  // Function to increment item quantity
  // const handleIncrement = async (cartItemId, itemId) => {
  //   // Find the cart item
  //   const item = cartItems.find((item) => item.cartItemId === cartItemId);

  //   if (item) {
  //     // Increment the quantity
  //     const updatedQuantity = item.quantity + 1;

  //     // Update the state
  //     const updatedCartItems = cartItems.map((cartItem) =>
  //       cartItem.cartItemId === cartItemId
  //         ? { ...cartItem, quantity: updatedQuantity }
  //         : cartItem
  //     );

  //     setCartItems(updatedCartItems);

  //     // Update backend if necessary
  //     await handleDecrementAPI(token, cartItemId);

  //     console.log(`Incremented item ${itemId} to quantity: ${updatedQuantity}`);
  //   }
  // };
  const sellerIdToStoreName = sellers.reduce((acc, seller) => {
    acc[seller.id] = seller.storeName;
    return acc;
  }, {});

  return (
    <div>
      {loading ? (
        <span className="loading loading-ring loading-lg"></span> // Show loading spinner
      ) : cartItems.length === 0 ? (
        <div>No items in cart yet</div> // No items message
      ) : (
        <div className="overflow-x-auto">
          {Object.keys(groupedItems).map((storeName) => (
            <div key={storeName} className="mb-6">
              <h2 className="text-2xl font-bold mb-4">
                {sellerIdToStoreName[storeName]}
              </h2>
              <table className="table w-full mb-6 border-collapse border border-base-200">
                {/* Table head */}
                <thead>
                  <tr>
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox" disabled />
                      </label>
                    </th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price Per Unit</th>
                    <th>Unit Count</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedItems[storeName].map((item, index) => (
                    <tr key={item.name + index} className="hover">
                      <td>
                        <label>
                          <input
                            type="checkbox"
                            className="checkbox"
                            checked={
                              selectedItemsCentral[`${storeName}-${index}`]
                            }
                            onChange={() =>
                              handleCheckboxChange(storeName, index)
                            }
                          />
                        </label>
                      </td>
                      <td>
                        <div className="flex items-center gap-4">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                              <img src={item.images[0]} alt={item.name} />
                            </div>
                          </div>
                          <div>
                            <div className="font-semibold">{item.name}</div>
                            <div>
                              <span className="badge badge-secondary badge-xs mx-0.5 py-1.5">
                                {item.petType.charAt(0).toUpperCase() +
                                  item.petType.slice(1).toLowerCase()}
                              </span>
                              <span
                                className={`badge badge-outline badge-xs text-xs mx-0.5 py-1.5 ${getTypeColor(
                                  item.type
                                )}`}
                              >
                                {item.type.charAt(0).toUpperCase() +
                                  item.type.slice(1).toLowerCase()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{item.quantity}</td>
                      <td>{item.pricePerUnit} Taka</td>
                      <td className="text-center">
                        <button
                          className="btn btn-xs btn-outline m-1"
                          onClick={() => handleDecrement(storeName, index)}
                          disabled={item.count <= 1}
                        >
                          -
                        </button>
                        {item.count}
                        <button
                          className="btn btn-xs btn-outline m-1"
                          onClick={() => handleIncrement(storeName, index)}
                          disabled={item.count >= item.totalAvailableCount || item.count >= 5}
                        >
                          +
                        </button>
                      </td>

                      <td>{item.pricePerUnit * item.count} Taka</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}

          {/* Action buttons */}
          <div className="flex justify-end gap-2 mb-4">
            <button className="btn btn-primary" onClick={handleCheckout}>
              Checkout
            </button>
            <button className="btn btn-error" onClick={handleClearCart}>
              Clear Cart
            </button>
            <button className="btn btn-warning" onClick={handleRemoveSelected}>
              Remove Selected
            </button>
          </div>
          {/* {JSON.stringify(groupedItems == {})} */}

          {/* Alert message */}
          {showAlert && (
            <div
              role="alert"
              className="alert alert-success flex items-center mt-4 p-4 bg-orange-300 border border-orange-400 text-orange-700 rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current mr-2"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{alertText}</span>
            </div>
          )}
        </div>
      )}
      {/* <div className="overflow-x-auto">{JSON.stringify(sellers)}</div> */}
    </div>
  );
}
export default CartTable;

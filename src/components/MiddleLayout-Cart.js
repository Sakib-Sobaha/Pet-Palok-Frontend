import React, { useState, useEffect } from "react";
import CartTable from "./cart/CartTable";
import CheckoutTable from "./cart/CheckoutTable";

const fetchWhoAMI = async (token) => {
  const url = `${process.env.REACT_APP_API_URL}/user/whoami`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Failed to fetch user details");
  }
};

const placeOrderAPI = async (token, order) => {
  const url = `${process.env.REACT_APP_API_URL}/order/createOrder`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(order),
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Failed to place order");
  }
};

const MiddleLayoutCart = () => {
  const [user, setUser] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [groupedByStore, setGroupedByStore] = useState({});
  const [checkout, setCheckout] = useState(false);
  const [sellers, setSellers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [alternatePhone, setAlternatePhone] = useState("");
  const [address, setAddress] = useState("");
  const [postOffice, setPostOffice] = useState("");
  const [district, setDistrict] = useState("");
  const [country, setCountry] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successAlert, setSuccessAlert] = useState(false);

  // Updated handleOrdersCreated function to include cartItemIds
  const handleOrdersCreated = (storeOrders) => {
    const updatedOrders = storeOrders.map((storeOrder) => {
      const cartItemIds = storeOrder.items.map((item) => item.cartItemId); // Extract cartItemIds from items

      return {
        sellerId: storeOrder.sellerId,
        items: storeOrder.items.map((item) => ({
          itemId: item.itemId,
          count: item.count,
          cartItemId: item.cartItemId, // Include cartItemId in each item
        })),
        totalPrice: storeOrder.storeTotalPrice,
        deliveryFee: storeOrder.deliveryFee,
        storeTotalPayment: storeOrder.grandTotal,
        orderedOn: new Date().toLocaleString(),
        checkoutDetails: {
          name,
          email,
          phone,
          alternatePhone,
          address,
          postOffice,
          district,
          country,
        },
        cartItemIds, // Include cartItemIds for each order
      };
    });

    setOrders(updatedOrders);
  };

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    setError(null);
    const token = localStorage.getItem("authToken");

    try {
      // Prepare order data based on the updated orders state
      const orderPromises = orders.map(async (order) => {
        const orderData = {
          cartItemIds: order.cartItemIds, // Use cartItemIds directly from the orders state
          name,
          email,
          phone,
          alternatePhone,
          address,
          postOffice,
          district,
          country,
          deliveryFee: order.deliveryFee,
        };

        return await placeOrderAPI(token, orderData);
      });

      const results = await Promise.all(orderPromises);
      console.log("Orders placed successfully:", results);

      setSuccessAlert(true);
      setTimeout(() => {
        setSuccessAlert(false);
        window.location.href = "/marketplace";
      }, 1000);

      // Reset orders or any other necessary state after successful placement
      setOrders([]);
    } catch (error) {
      console.error("Failed to place order:", error);
      setError("Failed to place order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken");
      try {
        const data = await fetchWhoAMI(token);
        console.log("User data:", data);
        setUser(data);

        // Initialize input fields with user data
        if (data) {
          setName(data.firstname + data.lastname || "");
          setEmail(data.email || "");
          setPhone(data.phoneNumber || "");
          setAddress(data.address || "");
          setPostOffice(data.postOffice || "");
          setDistrict(data.district || "");
          setCountry(data.country || "");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  if (!checkout) {
    return (
      <div className="flex-1 bg-base-100 rounded-lg p-4 min-h-screen">
        <h1 className="text-3xl font-bold p-1 m-1">Your Cart</h1>
        <CartTable
          groupedItemsByStoreCentral={setGroupedByStore}
          selectedItemsCentral={selectedItems}
          setSelectedItemsCentral={setSelectedItems}
          checkoutCentral={setCheckout}
          sellersCentral={setSellers}
        />
        {/* <h1 className="overflow-x-auto">{JSON.stringify(selectedItems)}</h1> */}
      </div>
    );
  } else {
    return (
      <div className="flex-1 bg-base-200 rounded-lg p-4 min-h-screen">
        <h1 className="text-3xl font-bold p-1 m-1">Checkout Items:</h1>
        <CheckoutTable
          groupedItemsByStore={groupedByStore}
          selectedItems={selectedItems}
          onOrdersCreated={handleOrdersCreated}
          sellers={sellers}
        />

        <h1 className="text-3xl font-bold p-1 m-1">Checkout Details:</h1>

        <div className="grid grid-cols-2 gap-4 m-3 rounded-md">
          <div>
            <label className="font-bold">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full mt-1"
            />
          </div>

          <div>
            <label className="font-bold">Email:</label>
            <input
              type="email"
              value={email}
              className="input input-bordered w-full mt-1"
              readOnly
            />
          </div>

          <div>
            <label className="font-bold">Phone:</label>
            <input
              type="text"
              value={phone}
              className="input input-bordered w-full mt-1"
              readOnly
            />
          </div>

          <div>
            <label className="font-bold">Alternate Phone No:</label>
            <input
              type="text"
              placeholder="optional"
              value={alternatePhone}
              onChange={(e) => setAlternatePhone(e.target.value)}
              className="input input-bordered w-full mt-1"
            />
          </div>

          <div>
            <label className="font-bold">Address:</label> <br />
            <textarea
              className="textarea textarea-bordered w-full"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>
          </div>

          <div>
            <label className="font-bold">Post Office:</label>
            <input
              type="text"
              value={postOffice}
              onChange={(e) => setPostOffice(e.target.value)}
              className="input input-bordered w-full mt-1"
            />
          </div>

          <div>
            <label className="font-bold">District:</label>
            <input
              type="text"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="input input-bordered w-full mt-1"
            />
          </div>

          <div>
            <label className="font-bold">Country:</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="input input-bordered w-full mt-1"
            />
          </div>
        </div>

        <div className="grid w-full place-content-center">
          <button
            className="btn btn-primary justify-center w-40 m-4"
            onClick={handlePlaceOrder}
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? "Placing Order..." : "Place Order"}
          </button>
        </div>

        {error && (
          <div className="">
            <div role="alert" className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}

        {successAlert && (
          <div role="alert" className="alert alert-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
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
            <span>Order placed successfully!</span>
          </div>
        )}

        <div className="w-full overflow-x-auto text-blue-700">
          user: {JSON.stringify(user)}
        </div>
      </div>
    );
  }
};

export default MiddleLayoutCart;

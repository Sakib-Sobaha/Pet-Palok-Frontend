import React, { useEffect, useState } from "react";

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

const fetchSellerByIdAPI = async (token, sellerId) => {
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

function OrderCard({ order_ }) {
  const [seller, setSeller] = useState(null);
  const [order, setOrder] = useState(order_);
  const [items, setItems] = useState([]);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    const fetchItems = async () => {
      const itemIds = Object.keys(order.itemCountMap);
      try {
        const fetchedItems = await Promise.all(
          itemIds.map(async (itemId) => {
            return await fetchItemByIdAPI(token, itemId);
          })
        );

        const validItems = fetchedItems.filter((item) => item !== null); // Remove any null items if fetch failed
        setItems(validItems);

        // Fetch seller info once items are available
        if (validItems.length > 0) {
          const sellerId = validItems[0].sellerId; // Assuming all items have the same seller
          const fetchedSeller = await fetchSellerByIdAPI(token, sellerId);
          setSeller(fetchedSeller);
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, [order]);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const orderedOn = new Date(order.orderedOn);
      const difference = now - orderedOn;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const seconds = Math.floor((difference / 1000) % 60);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft();
    const intervalId = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(intervalId);
  }, [order.orderedOn]);

  const calculateGrandTotal = () => {
    return items.reduce((total, item) => {
      return total + item.pricePerUnit * order.itemCountMap[item.id];
    }, 0);
  };

  const handleStatusChange = (newStatus) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      status: newStatus,
    }));
  };

  const onClick = async () => {
    console.log("Cancel order clicked");
  };

  const getBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "badge-warning";
      case "cancelled":
        return "badge-error";
      case "accepted":
        return "badge-accent";
      case "out for delivery":
        return "badge-secondary";
      case "delivered":
        return "badge-success";
      default:
        return "badge-info";
    }
  };

  return (
    <div className="border border-content rounded-lg p-4 mb-4 bg-base-100">
      {order.status.toLowerCase() === "pending" && (
        <button
          className="btn btn-primary rounded-md float-right"
          onClick={onClick}
        >
          Cancel
        </button>
      )}

      <h2 className="text-xl font-bold mb-2">
        Order Details
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            Time Passed:
            <div className="grid grid-flow-col gap-5 text-center auto-cols-max mt-2">
              <div className="flex flex-col">
                <span className="countdown font-mono text-5xl">
                  <span style={{ "--value": timeLeft.days }}></span>
                </span>
                days
              </div>
              <div className="flex flex-col">
                <span className="countdown font-mono text-5xl">
                  <span style={{ "--value": timeLeft.hours }}></span>
                </span>
                hours
              </div>
              <div className="flex flex-col">
                <span className="countdown font-mono text-5xl">
                  <span style={{ "--value": timeLeft.minutes }}></span>
                </span>
                min
              </div>
              <div className="flex flex-col">
                <span className="countdown font-mono text-5xl">
                  <span style={{ "--value": timeLeft.seconds }}></span>
                </span>
                sec
              </div>
            </div>
          </div>
          <div className="pt-10 pl-10 text-xl">
            Status:{" "}
            <span className={`badge badge-lg ${getBadgeClass(order.status)}`}>
              {order.status.replaceAll("_", " ")}
            </span>
          </div>
        </div>
      </h2>

      {/* Display Seller's Store Name */}
      {seller && (
        <div className="mb-4">
          {/* <h3 className="text-lg font-semibold">Seller Details:</h3> */}
          <p>
            <strong>Ordered from:</strong> {seller.storeName}
          </p>
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Delivery Details:</h3>
        <p>
          <strong>Name:</strong> {order.name}
        </p>
        <div className="grid grid-cols-3 gap-4">
          <p>
            <strong>Email:</strong> {order.email}
          </p>
          <p>
            <strong>Phone:</strong> {order.phone}
          </p>
          <p>
            <strong>Alternate Phone:</strong> {order.alternatePhone || "N/A"}
          </p>
        </div>
        <p>
          <strong>Address:</strong> {order.address}
        </p>
        <div className="grid grid-cols-3 gap-4">
          <p>
            <strong>Post Office:</strong> {order.postOffice}
          </p>
          <p>
            <strong>District:</strong> {order.district}
          </p>
          <p>
            <strong>Country:</strong> {order.country}
          </p>
        </div>
        <p>
          <strong>Ordered On:</strong> {order.orderedOn}
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Order Items:</h3>
        {/* {JSON.stringify(order)} */}
        <div className="overflow-x-auto text-center">
          <table className="table w-full">
            {/* Table Head */}
            <thead>
              <tr>
                <th className="">Image</th>
                <th className="text-center">Item Name</th>
                <th className="text-center">Available Quantity</th>
                <th className="text-center">Quantity</th>
                <th className="text-center">Price per Unit</th>
                <th className="text-center">Total Price</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {items.map((item, index) => (
                <tr key={item.id}>
                  {/* Item Image */}
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={item.images[0]}
                          alt={`Image of ${item.name}`}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <div className=" items-center gap-3">
                      <div>
                        <div className="font-bold text-center">{item.name}</div>
                      </div>
                      <span
                        className={`badge badge-outline badge-xs text-xs mx-0.5
                          ${getTypeColor(item.type)}
                        `}
                      >
                        {item.type.charAt(0).toUpperCase() +
                          item.type.slice(1).toLowerCase()}
                      </span>
                      <span className="badge badge-secondary badge-xs text-xs">
                        {item.petType.charAt(0).toUpperCase() +
                          item.petType.slice(1).toLowerCase()}
                      </span>
                    </div>
                  </td>
                  {/* Available Quantity */}
                  <td className="text-center">{item.totalAvailableCount}</td>
                  {/* Quantity */}
                  <td className="text-center">{order.itemCountMap[item.id]}</td>
                  {/* Price per Unit */}
                  <td className="text-center">{item.pricePerUnit} taka</td>
                  {/* Total Price */}
                  <td className="text-center">
                    {item.pricePerUnit * order.itemCountMap[item.id]} taka
                  </td>
                </tr>
              ))}
            </tbody>
            {/* Table Foot */}
            <tfoot>
              <tr>
                <th>Image</th>

                <th className="text-center">Item Name</th>
                <th className="text-center">Available Quantity</th>
                <th className="text-center">Quantity</th>
                <th className="text-center">Price per Unit</th>
                <th className="text-center">Total Price</th>
              </tr>
            </tfoot>
          </table>
          <h1 className="text-sm mr-4 text-right font-semibold">
            Total: {calculateGrandTotal()} taka
          </h1>
          <h1 className="text-sm  mr-4 text-right font-semibold">
            Delivery Fee: {order.deliveryFee} taka
          </h1>
          <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-400" />
          <h1 className="text-sm mr-4 text-right  font-semibold">
            Grand Total: {calculateGrandTotal() + order.deliveryFee} taka
          </h1>

          <h1 className="text-sm mr-4 text-right font-semibold">
            Payment Method: COD
            </h1>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;

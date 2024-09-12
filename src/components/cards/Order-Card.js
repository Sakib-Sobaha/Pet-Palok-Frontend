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

const acceptOrderAPI = async (token, orderId) => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/order/accept/${orderId}`;
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
    console.error("Failed to increment accept order:", error);
    return null;
  }
};

const changeOrderStatusAPI = async (token, orderId, statusLink) => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/order/${statusLink}/${orderId}`;
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
    console.error("Failed to increment change order status:", error);
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

        setItems(fetchedItems.filter((item) => item !== null)); // Remove any null items if fetch failed
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

  const handleStatusChange = (newStatus) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      status: newStatus,
    }));
  };

  const handleRejectOrder = () => {
   console.log("Rejecting order");
   handleStatusChange("Rejected");
    const token = localStorage.getItem("authToken");

    try {
      // call increment api for backend update
      changeOrderStatusAPI(token, order.id, "reject");
    }
    catch (error) {
      console.error("Failed to reject order:", error);
    }
  };

  const getButtonDetails = () => {
    console.log(order.status);
    switch (order.status?.toLowerCase()) {
      
      case "pending":
        return {
          text: "Accept Order",
          onClick: () => {
            handleStatusChange("Accepted");
            const token = localStorage.getItem("authToken");
            try {
              // call increment api for backend update
              acceptOrderAPI(token, order.id);
            } catch (error) {
              console.error("Failed to accept order:", error);
            }
          },
        };
      case "accepted":
        return {
          text: "Out for Delivery",
          onClick: () => {handleStatusChange("Out for Delivery")
            const token = localStorage.getItem("authToken");
            try{
              changeOrderStatusAPI(token, order.id, "outForDelivery");
            }
            catch(error){
              console.error("Failed to change order status:", error);
            }
          },
        };
      case "out_for_delivery":
        return {
          text: "Mark as Delivered",
          onClick: () => {handleStatusChange("Delivered")
            const token = localStorage.getItem("authToken");
            try{
              changeOrderStatusAPI(token, order.id, "delivered");
            }
            catch(error){
              console.error("Failed to change order status:", error);
            }
          },
        };
        case "out for delivery":
        return {
          text: "Mark as Delivered",
          onClick: () => {handleStatusChange("Delivered")
            const token = localStorage.getItem("authToken");
            try{
              changeOrderStatusAPI(token, order.id, "delivered");
            }
            catch(error){
              console.error("Failed to change order status:", error);
            }
          },
        };
      case "rejected":
        return {
          text: "Rejected",
          onClick: () => {},
        };
      default:
        return null;
    }
  };

  const { text, onClick } = getButtonDetails() || {};

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
      case "rejected":
        return "badge-error";
      default:
        return "badge-info";
    }
  };

  return (
    <div className="border border-content rounded-lg p-4 mb-4 bg-base-100">
      {text && (
        <button
          className={`btn btn-primary rounded-md float-right ${order.status.toLowerCase() === "rejected" ? "btn-disabled" : ""}`}
          onClick={onClick}
        >
          {text}
        </button>
      )}
      {
        order.status.toLowerCase() === "pending" && (
          <button
           className="btn btn-error rounded-md float-right mr-2"
            onClick={() => {
              handleRejectOrder();
            }}
          >
            Reject Order
          </button>
        )
      }

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
                  {/* Item Name */}
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
                  {/* Item ID */}
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
        </div>
      </div>
    </div>
  );
}

export default OrderCard;

import React, { useEffect, useState } from "react";

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
    const fetchItems = async () => {
      const itemIds = Object.keys(order.itemCountMap);
      try {
        const fetchedItems = await Promise.all(
          itemIds.map(async (itemId) => {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/marketplace/item/${itemId}`);
            if (response.ok) {
              return await response.json();
            } else {
              console.error(`Failed to fetch item details for itemId: ${itemId}`);
              return null;
            }
          })
        );

        setItems(fetchedItems.filter(item => item !== null)); // Remove any null items if fetch failed
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

  const getButtonDetails = () => {
    switch (order.status?.toLowerCase()) {
      case "pending":
        return {
          text: "Accept Order",
          onClick: () => handleStatusChange("Accepted"),
        };
      case "accepted":
        return {
          text: "Out for Delivery",
          onClick: () => handleStatusChange("Out for Delivery"),
        };
      case "out for delivery":
        return {
          text: "Mark as Delivered",
          onClick: () => handleStatusChange("Delivered"),
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
      default:
        return "badge-info";
    }
  };

  return (
    <div className="border border-content rounded-lg p-4 mb-4 bg-base-100">
      {text && (
        <button
          className="btn btn-primary rounded-md float-right"
          onClick={onClick}
        >
          {text}
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
              {order.status}
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
            <strong>Alternate Phone:</strong>{" "}
            {order.alternatePhone || "N/A"}
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
        {items.map((item, index) => (
          <div key={item.id} className="border p-2 rounded mb-2 bg-base-200">
            <p>
              <strong>Item Name:</strong> {item.name}
            </p>
            <p>
              <strong>Item ID:</strong> {item.id}
            </p>
            <p>
              <strong>Quantity:</strong> {order.itemCountMap[item.id]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderCard;

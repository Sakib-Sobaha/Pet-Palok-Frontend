import React, { useEffect, useState } from "react";

const itemData = [
  {
    id: 1,
    name: "Odomos Doggy",
    price_per_unit: 90,
    quantity: "250g",
    rating: 4,
    description: "If a dog chews shoes whose shoes does he choose?",
    image: "https://m.media-amazon.com/images/I/41-eQbUPu9L._AC_.jpg",
  },
  {
    id: 2,
    name: "Cat Food",
    price_per_unit: 59,
    quantity: "100g",
    rating: 4,
    description: "If a dog chews shoes whose shoes does he choose?",
    image:
      "https://ithinkpets.com/wp-content/uploads/2023/05/Catfest-Pillows-with-Chicken-Cream-Cat-Treat-at-ithinkpets.com-1-1200x973.webp",
  },
  {
    id: 3,
    name: "Seed Mix",
    price_per_unit: 290,
    quantity: "500g",
    rating: 4.6,
    description: "If a dog chews shoes whose shoes does he choose?",
    image: "https://images.meesho.com/images/products/227181817/j4vdh_512.webp",
  },
  {
    id: 4,
    name: "Cattlefish Bone",
    price_per_unit: 125,
    quantity: "200g",
    rating: 2.4,
    description: "If a dog chews shoes whose shoes does he choose?",
    image:
      "https://5.imimg.com/data5/ZA/KT/GO/SELLER-136396/cuttlefish-bone-500x500.JPG",
  },
];

function OrderCard({ order_ }) {
  const [order, setOrder] = useState(order_);

  const getItemDetails = (itemId) => {
    return itemData.find((item) => item.id === itemId);
  };

  const getBadgeClass = (status) => {
    switch (status.toLowerCase()) {
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
        return "badge-info"; // Default case
    }
  };

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Function to calculate the time difference
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

    // Calculate the time left initially and then every second
    calculateTimeLeft();
    const intervalId = setInterval(calculateTimeLeft, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, [order.orderedOn]);

  const handleStatusChange = (newStatus) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      status: newStatus,
    }));
  };

  const getButtonDetails = () => {
    switch (order.status.toLowerCase()) {
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
          <strong>Name:</strong> {order.checkoutDetails.name}
        </p>
        <div className="grid grid-cols-3 gap-4">
          <p>
            <strong>Email:</strong> {order.checkoutDetails.email}
          </p>
          <p>
            <strong>Phone:</strong> {order.checkoutDetails.phone}
          </p>
          <p>
            <strong>Alternate Phone:</strong>{" "}
            {order.checkoutDetails.alternatePhone || "N/A"}
          </p>
        </div>
        <p>
          <strong>Address:</strong> {order.checkoutDetails.address}
        </p>
        <div className="grid grid-cols-3 gap-4">
          <p>
            <strong>Post Office:</strong> {order.checkoutDetails.postOffice}
          </p>
          <p>
            <strong>District:</strong> {order.checkoutDetails.district}
          </p>
          <p>
            <strong>Country:</strong> {order.checkoutDetails.country}
          </p>
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-2">Items:</h3>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Count</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map(({ itemId, count }) => {
              const item = getItemDetails(itemId);
              if (!item) return null;
              return (
                <tr key={itemId}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={item.image} alt={item.name} />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.price_per_unit} taka</td>
                  <td>{item.quantity}</td>
                  <td>{count}</td>
                  <td>{item.price_per_unit * count} taka</td>
                </tr>
              );
            })}
            <tr>
              <td>
                <img
                  src="https://cdn-icons-png.freepik.com/512/8992/8992615.png"
                  alt="delivery"
                  className="h-12 w-12"
                />
              </td>
              <td>Delivery Fee</td>
              <td></td>
              <td></td>
              <td></td>
              <td>{order.deliveryFee} taka</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th colSpan="5" className="text-right">
                Total Payment:
              </th>
              <th className="font-bold">
                {order.items.reduce((acc, { itemId, count }) => {
                  const item = getItemDetails(itemId);
                  return acc + item.price_per_unit * count;
                }, 0) + order.deliveryFee}{" "}
                taka
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default OrderCard;

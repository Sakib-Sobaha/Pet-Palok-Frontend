import React, { useState } from "react";
import OrderCard from "../cards/Order-Card";

const orders_ = [
  {
    sellerId: 1,
    items: [
      { itemId: 1, count: 1 },
      { itemId: 2, count: 3 },
      { itemId: 3, count: 4 },
    ],
    deliveryFee: 65,
    orderedOn: "8/1/2024, 10:30:00 AM",
    status: "Accepted",
    checkoutDetails: {
      name: "Niloy Faiaz",
      email: "niloy870@gmail.com",
      phone: "01234123456",
      alternatePhone: "",
      address: "10/1, Monipur, Mirpur-2, Dhaka-1216",
      postOffice: "Mirpur-2",
      district: "Dhaka",
      country: "Bangladesh",
    },
  },
  {
    sellerId: 1,
    items: [{ itemId: 2, count: 5 }],
    deliveryFee: 65,
    orderedOn: "8/8/2024, 8:00:00 PM",
    status: "Accepted",
    checkoutDetails: {
      name: "Sobaha Sakib",
      email: "sobaha@gmail.com",
      phone: "01234123456",
      alternatePhone: "",
      address: "10/1, Monipur, Mirpur-2, Dhaka-1216",
      postOffice: "Kamlapur-2",
      district: "Shahjahanpur",
      country: "Bangladesh",
    },
  },
  {
    sellerId: 1,
    items: [
      { itemId: 2, count: 4 },
      { itemId: 3, count: 3 },
    ],
    deliveryFee: 65,
    orderedOn: "8/7/2024, 7:00:00 PM",
    status: "Delivered",
    checkoutDetails: {
      name: "Koki Uddin",
      email: "koki@gmail.com",
      phone: "019090909090",
      alternatePhone: "01909099911",
      address: "10/1, Monipur, Mirpur-2, Dhaka-1216",
      postOffice: "Mirpur-2",
      district: "Gopalgonj",
      country: "Bangladesh",
    },
  },
];

function OrderContainer({ searchTerm, sortOption, filters }) {
  const [orders, setOrders] = useState(orders_);

  // Filter orders based on search term and filter criteria
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.checkoutDetails.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.checkoutDetails.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.checkoutDetails.phone.includes(searchTerm) ||
      order.checkoutDetails.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.checkoutDetails.postOffice.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.checkoutDetails.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.checkoutDetails.country.toLowerCase().includes(searchTerm.toLowerCase());

    const statusKey = order.status.toLowerCase().replace(/ /g, "_"); // Adjust for underscore
    const matchesStatus = filters.orderStates[statusKey] !== undefined ? filters.orderStates[statusKey] : false;

    return matchesSearch && matchesStatus;
  });

  // Sort orders based on sort option
  const sortedOrders = filteredOrders.sort((a, b) => {
    if (sortOption === "orderDateOldToNew") {
      return new Date(a.orderedOn) - new Date(b.orderedOn);
    } else if (sortOption === "orderDateNewToOld") {
      return new Date(b.orderedOn) - new Date(a.orderedOn);
    }
    return 0;
  });

  return (
    <div className="bg bg-base-200 m-0 p-2 pt-4 rounded-xl">
      <p>searchTerm: {searchTerm}</p>
      <p>filters: {JSON.stringify(filters)}</p>
      <p>sortOption: {sortOption}</p>
      <h1 className="text-2xl font-bold mb-3 ml-2">Order Container</h1>
      <div className="flex flex-col">
        {sortedOrders.map((order) => (
          <OrderCard key={order.sellerId} order_={order} />
        ))}
      </div>
    </div>
  );
}

export default OrderContainer;

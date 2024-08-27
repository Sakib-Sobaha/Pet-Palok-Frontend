import React, { useState, useEffect } from "react";
import OrderCard from "../cards/Order-Card";

const fetchOrdersFromApi = async (token) => {
  console.log(token);
  const url = `${process.env.REACT_APP_API_URL}/order/getOrdersBySellerId`;
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(url, requestOptions);
    if (response.ok) {
      return await response.json();
    } else {
      console.error("Failed to fetch orders");
      return null;
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    return null;
  }
};

function OrderContainer({ searchTerm, sortOption, filters }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch orders from the API when the component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      const fetchedOrders = await fetchOrdersFromApi(token);
      if (fetchedOrders) {
        setOrders(fetchedOrders);
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  // Filter orders based on search term and filter criteria
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone.includes(searchTerm) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.postOffice.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.country.toLowerCase().includes(searchTerm.toLowerCase());

    // Convert order status to lowercase and match it with filters
    const statusKey = order.status ? order.status.toLowerCase().replace(/ /g, "_") : "";
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
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
          <p>searchTerm: {searchTerm}</p>
          <p>filters: {JSON.stringify(filters)}</p>
          <p>sortOption: {sortOption}</p>
          <h1 className="text-2xl font-bold mb-3 ml-2">Order Container</h1>
          <div className="flex flex-col">
            {sortedOrders.map((order) => (
              <OrderCard key={order.id} order_={order} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default OrderContainer;

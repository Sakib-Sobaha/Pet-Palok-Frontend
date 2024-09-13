import React, { useState, useEffect } from "react";
import OrderCard from "../cards/Order-Card-2";

const fetchOrdersFromApi = async (token) => {
  const url = `${process.env.REACT_APP_API_URL}/order/getOrdersByUserId`;
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

  const filteredOrders = orders.filter((order) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase(); // To avoid repeating conversion

    // Matches search across multiple fields
    const matchesSearch =
      order.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      order.address.toLowerCase().includes(lowerCaseSearchTerm) ||
      order.phone.includes(searchTerm) || // Phone may not require toLowerCase
      order.email.toLowerCase().includes(lowerCaseSearchTerm) ||
      order.postOffice.toLowerCase().includes(lowerCaseSearchTerm) ||
      order.district.toLowerCase().includes(lowerCaseSearchTerm) ||
      order.status.toLowerCase().includes(lowerCaseSearchTerm) ||
      order.country.toLowerCase().includes(lowerCaseSearchTerm);

    // Normalize filter keys: convert them to uppercase and replace spaces with underscores
    const normalizedFilters = Object.keys(filters.orderStates).reduce(
      (acc, key) => {
        const normalizedKey = key.toUpperCase().replace(/ /g, "_");
        acc[normalizedKey] = filters.orderStates[key];
        return acc;
      },
      {}
    );

    // Use order.status directly in its original format
    const statusKey = order.status || ""; // Keep status as it is

    console.log("Normalized Filters:", normalizedFilters);
    console.log("Order Status:", statusKey);

    // Check if the order status matches the normalized filter criteria
    const matchesStatus =
      normalizedFilters[statusKey] !== undefined
        ? normalizedFilters[statusKey]
        : false;

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
        <div className="text-center min-h-screen">
          
          <span className="loading loading-dots loading-lg "></span>
        </div>
      ) : (
        <>
          {/* <p>searchTerm: {searchTerm}</p>
          <p>filters: {JSON.stringify(filters.orderStates)}</p>
          <p>sortOption: {sortOption}</p> */}
          <h1 className="text-2xl font-bold mb-3 ml-2">
            <img src="https://cdn-icons-png.flaticon.com/512/6632/6632848.png" alt="order" className="h-10 w-10 inline-block mr-2"/>
            Your Orders</h1>
          <div className="flex flex-col">
            {sortedOrders.map((order) => (
              <OrderCard key={order.id} order_={order} />
            ))}
          </div>
        </>
      )}

      {/* <div className="overflow-x-auto">{JSON.stringify(sortedOrders)}</div> */}
    </div>
  );
}

export default OrderContainer;

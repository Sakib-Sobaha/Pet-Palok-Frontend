import React from 'react';
import { useState, useEffect } from 'react';
import MarketItemContainer from './containers/MyProductsContainer';
import AddProduct from './modals/add-product';

const handleLogout = () => {
  localStorage.removeItem("authToken");
  window.location.href = "/login"; // Redirect to the login page
};

const fetchSellerWhoAMI = async (token) => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/seller/whoami`;
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
    console.error("Failed to fetch seller: WHOAMI", error);
    return null; // Return null in case of an error
  }
};



const MiddleLayoutSellerMyProducts = ({ searchTerm, sortOption, filters }) => {
  const [sellerId, setSellerId] = useState(null);
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(false);



  const fetchSeller = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No auth token found in local storage.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await fetchSellerWhoAMI(token);
      setSeller(data);
      setSellerId(data.id); // Pass the user ID to the parent component
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeller();
  }, []);

  if (loading) {
    return <div>
      <span className="loading loading-dots loading-lg"></span>

    </div>; // You can replace this with a loading spinner or any other loading indicator
  }

  return (
    <div className="flex-1 bg-base-100 rounded-lg min-h-screen">
      <AddProduct element_id="add_product" seller_id={sellerId}/>

      {/* {sellerId} */}
      {/* Your content for MiddleLayout */}
      {seller && (
        <MarketItemContainer
          text="Store Items"
          searchTerm={searchTerm}
          sortOption={sortOption}
          filters={filters}
          _seller={seller}
        />
      )}
        {/* <MarketItemContainer text="Most Visited" /> */}
    </div>
  );
};

export default MiddleLayoutSellerMyProducts;

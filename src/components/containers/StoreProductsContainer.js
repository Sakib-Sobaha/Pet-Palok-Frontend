import React, { useState, useEffect } from "react";
import ItemCard from "../cards/Item-Card";

const handleLogout = () => {
  localStorage.removeItem("authToken");
  window.location.href = "/login"; // Redirect to the login page
};

const fetchData = async (token, sellerId) => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/marketplace/getItemsBySellerId/${sellerId}`;
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
    console.error("Failed to fetch market items:", error);
    return []; // Return an empty array in case of an error
  }
};

function MarketItemContainer({ sellerId }) {
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [marketItems, setMarketItems] = useState([]);
//   const [seller, setSeller] = useState(_seller);
  
//   useEffect(() => {
//     setSeller(sellerId);
//     }, [sellerId]);


  const fetchMarketItems = async () => {
    const token = localStorage.getItem("authToken");
  
    if (!token) {
      console.error(
        "No auth token found in local storage"
      );
      setLoading(false);
      return;
    }
  
    try {
      setLoading(true);
      console.log("seller id : "+sellerId);
      const data = await fetchData(token, sellerId);
      setMarketItems(data);
      console.log("data:"+ JSON.stringify(data));
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketItems();
  }
  , [sellerId]);


  console.log("market items len:"+marketItems.length);
  
  

  // Determine the number of items to show based on the state
  const itemsToShow = showAll ? marketItems : marketItems.slice(0, 6);

  return (
    <div className="bg bg-base-200 m-0 p-1 mb-4 rounded-xl">
      {/* <h1 className="text-3xl font-bold ml-3">{text}</h1> */}
      {/* {seller.id} */}
      {/* {itemsToShow.length} */}
      <div className="grid grid-cols-3 gap-1 align-middle">
        {itemsToShow.map((item, index) => (
          <ItemCard key={index} _item={item} owner={false}/>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="btn btn-primary"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "See Less" : "See More"}
        </button>
      </div>
    </div>
  );
}

export default MarketItemContainer;

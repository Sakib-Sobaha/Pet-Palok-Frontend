// MiddleLayoutSellerHome.js
import React, { useEffect, useState } from "react";
// import { drawHistogram } from "../components/chart/draw-histogram"; // Ensure correct path
import SectionDivider from "./Section-Divider";
import Rating from "./Rating";
import ReviewContainer from "./containers/Seller-Review-Container";
import BarChart from "../components/chart/bar-chart";
// import RatingChart from "./chart/RatingChart";
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

const MiddleLayoutSellerHome = () => {
  const [seller, setSeller] = useState(null);
  const [marketItems, setMarketItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [salesData, setSalesData] = useState([]);

  const fetchMarketItems = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("No auth token found in local storage");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      console.log("seller id : " + seller?.id);
      const data = await fetchData(token, seller?.id);
      setMarketItems(data);
      console.log("data:" + JSON.stringify(data));
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

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
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeller();
  }, []);

  useEffect(() => {
    fetchMarketItems();
  }, [seller?.id]);

  useEffect(() => {
    if (marketItems.length > 0) {
      // Map marketItems to the format needed for the histogram
      const histogramData = marketItems.map((item) => ({
        name: item?.name,
        sales: item?.sold,
      }));

      setSalesData(histogramData);

      // Draw the histogram with the mapped data
      // drawHistogram(histogramData);
    }
  }, [marketItems]); // Depend on marketItems

  return (
    <div className="flex-1 bg-base-200 rounded-lg p-4 min-h-screen">
      hello
      {seller && (
        <div>
          <h1 className="text-2xl font-bold">Welcome, {seller.name}</h1>
          <p className="text-lg">Welcome to your Dashboard</p>
        </div>
      )}
      <SectionDivider
        title="Store Stats"
        icon="https://cdn-icons-png.flaticon.com/512/167/167486.png"
      />{" "}
      
      {salesData.length > 0 ? (
        <>
          <BarChart data={salesData} />
        </>
      ) : (
        <h1>no data</h1>
      )}
      {/* <canvas id="histogramCanvas" width="800" height="400"></canvas> */}
      <SectionDivider
        title="Available Stock"
        icon="https://cdn-icons-png.flaticon.com/512/5164/5164023.png"
      />{" "}
      <div className="grid grid-cols-3 gap-2">
        {marketItems
          .filter((item) => item?.totalAvailableCount <= 3) // Only keep items where totalAvailableCount <= 3
          .map((item) => (
            <div key={item?.id} className="card card-compact bg-base-300">
              <figure>
                <img
                  src={item?.images[0]}
                  alt={item?.name}
                  className="rounded-lg h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-md">{item?.name}</h2>

                <div className="grid grid-cols-2 gap-y-1">
                  <p className="">
                    <strong>Quantity:</strong> {item?.quantity}
                  </p>
                  <p className="badge-error badge">
                    <strong>Available:</strong> {item?.totalAvailableCount}
                  </p>
                  <p className="text-info">
                    <strong>Sold:</strong> {item?.sold}
                  </p>
                  <p className=" font-bold badge badge-error"> Low On Stock</p>
                </div>
              </div>
              <button
                className="btn btn-primary rounded-lg"
                onClick={() => {
                  window.location.href = `/marketplace/item/${item?.id}`;
                }}
              >
                View Item
              </button>
            </div>
          ))}
      </div>
      <SectionDivider
        title="Ratings and Reviews"
        icon="https://cdn-icons-png.freepik.com/256/12377/12377209.png?semt=ais_hybrid"
      />{" "}
      <div className="flex flex-col w-full mb-4 mt-2 text-center items-center">
        Overall Rating:
        <Rating rating={seller?.rating} />
        <br />
        <ReviewContainer sellerId={seller?.id} />
      </div>
    </div>
  );
};

export default MiddleLayoutSellerHome;

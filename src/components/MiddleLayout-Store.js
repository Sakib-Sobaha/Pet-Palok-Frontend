// MiddleLayoutSellerHome.js
import React, { useEffect, useState } from "react";
import { drawHistogram } from "../components/chart/draw-histogram"; // Ensure correct path
import SectionDivider from "./Section-Divider";
import Rating from "./Rating";
import StoreProductsContainer from "./containers/StoreProductsContainer";
import ReviewContainer from "./containers/Seller-Review-Container";
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

const fetchSellerAPI = async (token, sellerId) => {
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
    console.error("Failed to fetch seller: WHOAMI", error);
    return null; // Return null in case of an error
  }
};

const MiddleLayoutSellerHome = ({ sellerId }) => {
  const [seller, setSeller] = useState(null);
  const [marketItems, setMarketItems] = useState([]);
  const [loading, setLoading] = useState(false);

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
      const data = await fetchSellerAPI(token, sellerId);
      setSeller(data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeller();
  }, [sellerId]);

  // useEffect(() => {
  //   fetchMarketItems();
  // }, [seller?.id]);

  useEffect(() => {
    if (marketItems.length > 0) {
      // Map marketItems to the format needed for the histogram
      const histogramData = marketItems.map((item) => ({
        name: item.name,
        sales: item.sold,
      }));

      // Draw the histogram with the mapped data
      drawHistogram(histogramData);
    }
  }, [marketItems]); // Depend on marketItems

  if (loading)
    return (
      <div>
        <span className="loading loading-dots"></span>
      </div>
    );
  else
    return (
      <div className="flex-1 bg-base-200 rounded-lg p-4 min-h-screen">
        {/* {JSON.stringify(seller)} */}
        <img
          src="https://thumbs.dreamstime.com/z/pet-shop-background-your-design-pet-shop-background-your-design-vector-illustration-125018422.jpg"
          alt="store"
          className="w-full h-52 object-cover rounded-lg mb-2"
        />
        <img
          src={seller?.image}
          alt="store"
          className="w-32 h-32 object-cover ring ring-warning rounded-full float-right"
        />
        <h1 className="text-3xl font-bold">Welcome to {seller?.storeName}</h1>
        {seller && (
          <div>
            <h1 className="text-xl font-semibold mb-2">I am {seller?.name}</h1>

            <h1 className="italic">
              <strong>Slogan: </strong>
              {seller?.slogan}
            </h1>
            <button
              className="btn btn-warning btn-sm mt-2"
              onClick={() => {
                window.location.href = `/seller/profile/${sellerId}`;
              }}
            >
              View Profile
            </button>
            <button className="btn btn-secondary btn-sm mt-2 mx-1">
              Send Message
            </button>
          </div>
        )}
        <SectionDivider
          title="Store Products"
          icon="https://cdn-icons-png.flaticon.com/512/962/962669.png"
        />{" "}
        <StoreProductsContainer sellerId={sellerId} />
        <SectionDivider
          title="Ratings and Reviews"
          icon="https://cdn-icons-png.freepik.com/256/12377/12377209.png?semt=ais_hybrid"
        />{" "}
        <div className="flex flex-col w-full mb-4 mt-2 text-center items-center">
          Seller Rating:
          <Rating rating={seller?.rating} />
          <br />
          <ReviewContainer sellerId={sellerId} />
        </div>

        {/* <RatingChart sellerId={sellerId} /> */}

      </div>
    );
};

export default MiddleLayoutSellerHome;

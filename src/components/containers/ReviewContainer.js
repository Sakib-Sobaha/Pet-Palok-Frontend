import React, { useEffect, useState } from "react";
import SingleReivew from "../reviews/single-review";

const handleLogout = () => {
  localStorage.removeItem("authToken");
  window.location.href = "/login"; // Redirect to the login page
};

const ReviewContainer = ({id}) => {
  const [reviews, setReviews] = useState([]); // Renamed state to 'reviews'
  // const marketItemId = "66c85294cf5b6e5ee3204a79"; // Provided market item ID
  const token = localStorage.getItem("authToken"); // Replace with actual token
  const url = `${process.env.REACT_APP_API_URL}/review/getByItem/${id}`;

  // Fetch reviews from API
  const fetchData = async (url) => {
    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    });

    const requestOptions = {
      method: "GET",
      headers: headers,
    };

    try {
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
      setReviews(data); // Set the fetched reviews to state
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData(url);
  }, [url]);

  return (
    <div>
      <div className="collapse bg-accent">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium flex">
          <svg
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 mr-4 fill-current stroke-current"
            strokeWidth="1.5"
          >
            <title />
            <g id="Review">
              <path d="M49.0781,11.6758a.122.122,0,0,1,.0362.1113l-.4756,2.7207A2.12,2.12,0,0,0,51.7246,16.75l2.4414-1.2939a.1283.1283,0,0,1,.1162.0009l2.4395,1.292a2.1228,2.1228,0,0,0,3.0869-2.2412l-.4766-2.7217a.1236.1236,0,0,1,.0362-.1093l1.9834-1.9209A2.1241,2.1241,0,0,0,60.1738,6.127L57.44,5.7393a.1233.1233,0,0,1-.0947-.0684L56.1309,3.19A2.1089,2.1089,0,0,0,54.2246,2h-.001a2.1107,2.1107,0,0,0-1.9082,1.19l-1.2138,2.48a.1242.1242,0,0,1-.0938.0684l-2.7344.3877a2.124,2.124,0,0,0-1.1787,3.6289Zm-.5234-3.5684L51.29,7.72a2.1252,2.1252,0,0,0,1.6084-1.17l1.2139-2.48A.1119.1119,0,0,1,54.2236,4a.11.11,0,0,1,.11.0684v.0009l1.2139,2.4786a2.1225,2.1225,0,0,0,1.61,1.1718l2.7334.3877a.1236.1236,0,0,1,.0693.211L57.9766,10.24a2.1222,2.1222,0,0,0-.6143,1.8907l.4756,2.7207a.1116.1116,0,0,1-.0488.122.11.11,0,0,1-.1309.0088L55.2188,13.69A2.1165,2.1165,0,0,0,53.23,13.69l-2.4414,1.2929a.1093.1093,0,0,1-.13-.0088.1116.1116,0,0,1-.0488-.122l.4756-2.7188a2.1249,2.1249,0,0,0-.6153-1.8935L48.4854,8.3184a.1238.1238,0,0,1,.0693-.211Z" />
              <path d="M43,2H3A1,1,0,0,0,2,3V19a1,1,0,0,0,1.4961.8682L10.2656,16H43a1,1,0,0,0,1-1V3A1,1,0,0,0,43,2ZM42,14H10a1.006,1.006,0,0,0-.4961.1318L4,17.2764V4H42Z" />
              <path d="M13,10H33a1,1,0,0,0,0-2H13a1,1,0,0,0,0,2Z" />
              <path d="M60.1738,27.127,57.44,26.7393a.1233.1233,0,0,1-.0947-.0684l-1.2148-2.48A2.1089,2.1089,0,0,0,54.2246,23h-.001a2.1107,2.1107,0,0,0-1.9082,1.19l-1.2138,2.48a.1242.1242,0,0,1-.0938.0684l-2.7344.3877a2.124,2.124,0,0,0-1.1787,3.6289l1.9834,1.92a.122.122,0,0,1,.0362.1113l-.4756,2.7207A2.12,2.12,0,0,0,51.7246,37.75l2.4414-1.2939a.1283.1283,0,0,1,.1162.0009l2.4395,1.292a2.1228,2.1228,0,0,0,3.0869-2.2412l-.4766-2.7217a.1236.1236,0,0,1,.0362-.1093l1.9834-1.9209a2.1241,2.1241,0,0,0-1.1778-3.6289Zm-.2129,2.1914L57.9766,31.24a2.1222,2.1222,0,0,0-.6143,1.8907l.4756,2.7207a.1116.1116,0,0,1-.0488.122.11.11,0,0,1-.1309.0088L55.2188,34.69A2.1165,2.1165,0,0,0,53.23,34.69l-2.4414,1.2929a.1093.1093,0,0,1-.13-.0088.1116.1116,0,0,1-.0488-.122l.4756-2.7188a2.1249,2.1249,0,0,0-.6153-1.8935l-1.9843-1.9209a.1238.1238,0,0,1,.0693-.211L51.29,28.72a2.1252,2.1252,0,0,0,1.6084-1.17l1.2139-2.4805A.1119.1119,0,0,1,54.2236,25a.11.11,0,0,1,.11.0684v.0009l1.2139,2.4786a2.1225,2.1225,0,0,0,1.61,1.1718l2.7334.3877a.1236.1236,0,0,1,.0693.211Z" />
              <path d="M43,23H3a1,1,0,0,0-1,1V40a1,1,0,0,0,1.4961.8682L10.2656,37H43a1,1,0,0,0,1-1V24A1,1,0,0,0,43,23ZM42,35H10a1.006,1.006,0,0,0-.4961.1318L4,38.2764V25H42Z" />
              <path d="M13,31H33a1,1,0,0,0,0-2H13a1,1,0,0,0,0,2Z" />
              <path d="M60.1738,48.127,57.44,47.7393a.1233.1233,0,0,1-.0947-.0684L56.1309,45.19A2.1089,2.1089,0,0,0,54.2246,44h-.001a2.1107,2.1107,0,0,0-1.9082,1.19l-1.2138,2.4805a.1242.1242,0,0,1-.0938.0684l-2.7344.3877a2.124,2.124,0,0,0-1.1787,3.6289l1.9834,1.92a.122.122,0,0,1,.0362.1113l-.4756,2.7207A2.12,2.12,0,0,0,51.7246,58.75l2.4414-1.2939a.1283.1283,0,0,1,.1162.0009l2.4395,1.292a2.1228,2.1228,0,0,0,3.0869-2.2412l-.4766-2.7217a.1236.1236,0,0,1,.0362-.1093l1.9834-1.9209a2.1241,2.1241,0,0,0-1.1778-3.6289Zm-.2129,2.1914L57.9766,52.24a2.1222,2.1222,0,0,0-.6143,1.8907l.4756,2.7207a.1116.1116,0,0,1-.0488.122.11.11,0,0,1-.1309.0088L55.2188,55.69A2.1165,2.1165,0,0,0,53.23,55.69l-2.4414,1.2929a.1093.1093,0,0,1-.13-.0088.1116.1116,0,0,1-.0488-.122l.4756-2.7188a2.1249,2.1249,0,0,0-.6153-1.8935l-1.9843-1.9209a.1238.1238,0,0,1,.0693-.211L51.29,49.72a2.1252,2.1252,0,0,0,1.6084-1.17l1.2139-2.48A.1119.1119,0,0,1,54.2236,46a.11.11,0,0,1,.11.0684v.0009l1.2139,2.4786a2.1225,2.1225,0,0,0,1.61,1.1718l2.7334.3877a.1236.1236,0,0,1,.0693.211Z" />
              <path d="M43,44H3a1,1,0,0,0-1,1V61a1,1,0,0,0,1.4961.8682L10.2656,58H43a1,1,0,0,0,1-1V45A1,1,0,0,0,43,44ZM42,56H10a1.006,1.006,0,0,0-.4961.1318L4,59.2764V46H42Z" />
              <path d="M13,52H33a1,1,0,0,0,0-2H13a1,1,0,0,0,0,2Z" />
            </g>
          </svg>
          View Reviews
        </div>
        <div className="collapse-content">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <SingleReivew key={review.id} _review={review} />
            ))
          ) : (
            <p>No reviews available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewContainer;

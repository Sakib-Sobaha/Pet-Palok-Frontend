// import React, { useEffect, useState } from "react";
// import { Pie } from "react-chartjs-2";
// import "chart.js/auto"; // Required for react-chartjs-2

// const RatingChart = ({ sellerId }) => {
//   const [itemRatingData, setItemRatingData] = useState([0, 0, 0, 0, 0]);
//   const [sellerRatingData, setSellerRatingData] = useState([0, 0, 0, 0, 0]);

//   // Fetch reviews from the backend API
//   useEffect(() => {
//     fetch(`http://localhost:8080/api/v1/review/seller/${sellerId}`)
//       .then((response) => response.json())
//       .then((data) => {
//         const itemRatings = [0, 0, 0, 0, 0]; // Ratings 1-5
//         const sellerRatings = [0, 0, 0, 0, 0]; // Ratings 1-5

//         // Process the reviews to extract item ratings and seller ratings
//         data.forEach((review) => {
//           itemRatings[review.itemRating - 1]++;
//           sellerRatings[review.sellerRating - 1]++;
//         });

//         setItemRatingData(itemRatings);
//         setSellerRatingData(sellerRatings);
//       })
//       .catch((error) => console.error("Error fetching reviews:", error));
//   }, [sellerId]);

//   // Chart data for Item Ratings
//   const itemRatingChartData = {
//     labels: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"],
//     datasets: [
//       {
//         label: "Item Ratings",
//         data: itemRatingData,
//         backgroundColor: [
//           "rgba(255, 99, 132, 0.2)",
//           "rgba(255, 159, 64, 0.2)",
//           "rgba(255, 205, 86, 0.2)",
//           "rgba(75, 192, 192, 0.2)",
//           "rgba(54, 162, 235, 0.2)",
//         ],
//         borderColor: [
//           "rgba(255, 99, 132, 1)",
//           "rgba(255, 159, 64, 1)",
//           "rgba(255, 205, 86, 1)",
//           "rgba(75, 192, 192, 1)",
//           "rgba(54, 162, 235, 1)",
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Chart data for Seller Ratings
//   const sellerRatingChartData = {
//     labels: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"],
//     datasets: [
//       {
//         label: "Seller Ratings",
//         data: sellerRatingData,
//         backgroundColor: [
//           "rgba(255, 99, 132, 0.2)",
//           "rgba(255, 159, 64, 0.2)",
//           "rgba(255, 205, 86, 0.2)",
//           "rgba(75, 192, 192, 0.2)",
//           "rgba(54, 162, 235, 0.2)",
//         ],
//         borderColor: [
//           "rgba(255, 99, 132, 1)",
//           "rgba(255, 159, 64, 1)",
//           "rgba(255, 205, 86, 1)",
//           "rgba(75, 192, 192, 1)",
//           "rgba(54, 162, 235, 1)",
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div className="rating-charts">
//       <h3>Item Ratings</h3>
//       <Pie data={itemRatingChartData} />
//       <h3>Seller Ratings</h3>
//       <Pie data={sellerRatingChartData} />
//     </div>
//   );
// };

// export default RatingChart;

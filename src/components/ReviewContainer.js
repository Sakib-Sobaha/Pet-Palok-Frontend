import React from "react";
import SingleReivew from "./reviews/single-review"

// const reivews = [
//   {
//     id: 122,
//     reviewer: "Niloy",
//     rating: 4,
//     date: "22-03-2024",
//     review_text: "Nice product, my doggy loves it",
//     anonymouse: false,
//   },
//   {
//     id: 123,
//     reviewer: "Suvro",
//     rating: 5,
//     time: "22-03-2024",
//     review_text: "bai product ta onek helpful silo",
//     anonymouse: true,
//   },
//   {
//     id: 122,
//     reviewer: "Niloy",
//     rating: 1,
//     time: "22-01-2024",
//     review_text: "Baje product, keu kinben na",
//     anonymouse: true,
//   },
// ];

const ReviewContainer = () => {
  return (
    <div>
      <div className="collapse bg-accent">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">View Reviews</div>
        <div className="collapse-content">
          {/* <p>hello</p> */}
          <SingleReivew anonymous = {false}/>
          <SingleReivew />
        </div>
      </div>
    </div>
  );
};

export default ReviewContainer;

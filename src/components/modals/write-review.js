import React, { useState } from "react";
import RatingInputCustom from "../rating-input-custom";

const handleLogout = () => {
  localStorage.removeItem("authToken");
  window.location.href = "/login"; // Redirect to the login page
};

const getTypeColor = (type) => {
  switch (type?.toLowerCase()) {
    case "food":
      return "badge-success"; // Green background for food
    case "accessories":
      return "badge-info"; // Blue background for accessories
    case "medicine":
      return "badge-error"; // Red background for medicine
    default:
      return "badge-ghost"; // Default gray for unknown types
  }
};

const WriteReview = ({ element_id, _item, _pendingReview }) => {
  const [item, setItem] = useState(_item);
  const [itemRating, setItemRating] = useState(3);
  const [sellerRating, setSellerRating] = useState(3);
  const [itemReview, setItemReview] = useState("");
  const [sellerReview, setSellerReview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleItemRatingChange = (rating) => {
    console.log("Item rating changed to", rating);
    setItemRating(rating);
  };

  const handleSellerRatingChange = (rating) => {
    console.log("Seller rating changed to", rating);
    setSellerRating(rating);
  };

  const handleReviewSubmit = async () => {
    try {
      
      const token = localStorage.getItem("authToken");
      const url = `${process.env.REACT_APP_API_URL}/review/create`;
      const headers = new Headers({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      });

      const requestBody = {
        marketItemId: item.id,
        itemRating: itemRating,
        sellerRating: sellerRating,
        itemReview: itemReview,
        sellerReview: sellerReview,
        pendingReviewId: _pendingReview.id,
      };

      const requestOptions = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(requestBody),
      };
      setLoading(true);
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
      console.log("Review submitted successfully", data);
      alert("Review submitted successfully");
      // Reset form and close modal
      setItemRating(3);
      setSellerRating(3);
      setItemReview("");
      setSellerReview("");
      document.getElementById(element_id).close();
    } catch (error) {
      console.error("Failed to submit review", error);
      alert("Failed to submit review");
    }
    finally{
      setLoading(false);
      window.location.reload();
    }
  };

  return (
    <div>
      <dialog id={element_id} className="modal">
        <div className="modal-box">
        {/* {_pendingReview.id} */}

          <h3 className="font-bold text-lg">Write a Review for this Product</h3>
          <div className="flex">
            <div className="w-1/2">
              <div className="h-16"></div>
              <img
                src={item.images[0]}
                alt={item.name}
                className="h-72 w-52 object-cover rounded-lg"
              />
            </div>
            <div className="w-1/2 place-items-center justify-center text-center">
              <h3 className="font-bold text-lg">{item.name}</h3>
              <p>
                <span
                  className={`badge badge-outline badge-lg font-bold mx-0.5 py-1.5 ${getTypeColor(
                    item.type
                  )}`}
                >
                  {item?.type.charAt(0).toUpperCase() +
                    item?.type.slice(1).toLowerCase()}
                </span>
                <span className="badge badge-secondary text-base-200 badge-lg mx-0.5 py-1.5 font-bold">
                  {item?.petType.charAt(0).toUpperCase() +
                    item?.petType.slice(1).toLowerCase()}
                </span>
              </p>

              <p className="label-text text-left ml-5 mb-1 font-semibold">
                Product Rating:
              </p>
              {/* <div className="rating">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <input
                    key={rating}
                    type="radio"
                    name="item-rating"
                    className="mask mask-star-2 bg-orange-400"
                    checked={itemRating === rating}
                    onChange={() => handleItemRatingChange(rating)}
                  />
                ))}
              </div> */}
              <RatingInputCustom rating={itemRating} setRating={setItemRating} />
              {itemRating}

              <p className="label-text text-left ml-5 mb-1 font-semibold">
                Product Review:
              </p>
              <textarea
                className="textarea textarea-bordered"
                placeholder="Write your product review here"
                value={itemReview}
                onChange={(e) => setItemReview(e.target.value)}
              ></textarea>

              <p className="label-text text-left ml-5 mb-1 font-semibold">
                Seller Rating:
              </p>
              <RatingInputCustom rating={sellerRating} setRating={setSellerRating} />
              {sellerRating}

              <p className="label-text text-left ml-5 mb-1 font-semibold">
                Seller Review:
              </p>
              <textarea
                className="textarea textarea-bordered"
                placeholder="Write your seller review here"
                value={sellerReview}
                onChange={(e) => setSellerReview(e.target.value)}
              ></textarea>
            </div>
          </div>
          <form method="dialog">
            <button className="btn btn-error float-end">Close</button>
            <button
              type="button"
              className="btn btn-primary float-end mx-1"
              onClick={handleReviewSubmit}
            >
              Submit Review
            </button>
            {
              loading && (
                <span className="loading loading-spinner loading-lg text-primary"></span>
              )
            }
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default WriteReview;

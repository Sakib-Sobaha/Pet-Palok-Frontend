import { useState, useEffect } from "react";
import React from "react";
import SectionDivider from "./Section-Divider";
import Rating from "./Rating";
import ReviewContainer from "./containers/ReviewContainer.js";
import QuestionContainer from "./QuestionContainer.js";
import AddToCart from "./modals/add-to-cart";
// import LoadingAnimation from "./LoadingAnimation"; // Assume this is the loading animation component

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
const handleLogout = () => {
  localStorage.removeItem("authToken");
  window.location.href = "/login"; // Redirect to the login page
};

const fetchItemAPI = async (token, itemId) => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/marketplace/item/${itemId}`;
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
    console.error("Failed to fetch item", error);
    return null; // Return null in case of an error
  }
};

const MiddleLayoutPetProfile = ({ _itemId }) => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [images, setImages] = useState([]);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fetchedItem = await fetchItemAPI(token, _itemId);
      if (fetchedItem) {
        setItem(fetchedItem);
        setImages(fetchedItem.images); // Assuming the fetched item has an 'images' field
      }
      setLoading(false);
    };

    fetchData();
  }, [_itemId, token]);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const handleBack = () => {
    window.location.href = "/marketplace";
  };

  return (
    <div className="flex-1 bg-base-200 rounded-lg p-4 min-h-screen">
      {/* Loading animation */}
      {loading ? (
        <div className="grid place-items-center">
          <br />
          <div className="h-32"></div>
          <div className="flex">
            <span className="loading loading-ring loading-xs text-primary"></span>
            <span className="loading loading-ring loading-sm text-primary"></span>
            <span className="loading loading-ring loading-md text-primary"></span>
            <span className="loading loading-ring loading-lg text-primary"></span>
          </div>
        </div>
      ) : (
        <>
          <SectionDivider
            title="Item Details"
            icon="https://cdn-icons-png.flaticon.com/512/3731/3731110.png"
          />

          <div className="grid grid-cols-2 m-1 p-1">
            {/* images */}
            <div className="grid place-items-center w-full mb-3">
              <div className="carousel carousel-center object-cover rounded-box h-72 w-72">
                {images?.map((image, index) => (
                  <div key={index} className="carousel-item">
                    <img
                      src={image}
                      alt={`Item Image ${index + 1}`}
                      className="object-cover object-center h-40 max-w-full rounded-lg md:h-72"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full place-items-center">
              {item && (
                <AddToCart element_id={"add_to_cart" + item.id} _item={item} />
              )}

              <h1 className="text-4xl font-bold m-3 pl-3">{item?.name}</h1>
              <div className="text-lg m-3 grid-cols-2 grid mb-5 rounded-lg p-2 pl-3">
                <p>
                  <span className="font-bold">Quantity:</span> {item?.quantity}
                </p>
                <p>
                  <span className="font-bold"></span>{" "}
                  <b className="font-mono text-green-700 text-xl">
                    {item?.pricePerUnit + " taka"}
                  </b>
                </p>
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

                <p>
                  <span className="font-bold">
                    {item && item?.total_available_count > 5 ? (
                      <h1 className="text-accent">Available</h1>
                    ) : (
                      <h1 className="text-warning">Few Items Left</h1>
                    )}
                  </span>
                </p>

                <p></p>
                <p>
                  <span className="font-semibold text-info">
                    {item?.sell_count} sold
                  </span>
                </p>
              </div>
              <div className="flex">
                <button
                  className="btn btn-primary w-40 rounded-lg p-2 justify-center m-1 ml-4"
                  onClick={() => {
                    document
                      .getElementById("add_to_cart" + item.id)
                      .showModal();
                  }}
                >
                  <img
                    src="https://cdn1.iconfinder.com/data/icons/shopping-carts-baskets/100/Shopping_cart_add-512.png"
                    alt=""
                    className="h-7 w-7"
                  />
                  Add to Cart
                </button>
                <button
                  className="btn btn-warning w-40 rounded-lg p-2 justify-center m-1"
                  onClick={handleBack}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/0/340.png"
                    alt=""
                    className="h-5 w-5"
                  />
                  Marketplace
                </button>
              </div>
            </div>
          </div>
          <div className="font-serif italic px-6">
            {isExpanded || item?.description.split(" ").length <= 30
              ? item?.description
              : `${item?.description.split(" ").slice(0, 30).join(" ")}...`}
            {item?.description.split(" ").length > 30 && (
              <button onClick={toggleDescription} className="text-blue-600">
                {isExpanded ? "See Less" : "See More"}
              </button>
            )}
          </div>

          <div className="grid w-full place-items-center m-1 pt-2">
            <p>
              <span className="font-bold">Rating:</span>
            </p>
            <Rating className="" rating={item?.rating || 0} />
          </div>
          <SectionDivider
            title="Ratings and Reviews"
            icon="https://cdn-icons-png.freepik.com/256/12377/12377209.png?semt=ais_hybrid"
          />
          <ReviewContainer />
          <SectionDivider
            title="Ask a Question?"
            icon="https://cdn-icons-png.flaticon.com/512/5471/5471074.png"
          />
          <QuestionContainer _itemId={item.id} />
        </>
      )}
    </div>
  );
};

export default MiddleLayoutPetProfile;

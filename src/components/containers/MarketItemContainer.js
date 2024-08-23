import React, { useState, useEffect } from "react";
import ItemCard from "../cards/Item-Card";

const handleLogout = () => {
  localStorage.removeItem("authToken");
  window.location.href = "/login"; // Redirect to the login page
};

const userType = localStorage.getItem("userType");
console.log("User Type: ", userType);
// Function to fetch pet data from the API
const fetchViewerWhoAMI = async (token) => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/`+userType+`/whoami`;
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
    console.error("Failed to fetch visitor: WHOAMI", error);
    return null; // Return null in case of an error
  }
};

const fetchData = async (token) => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/marketplace/getAllItems`;
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

// const itemData = [
//   {
//     name: "Odomos Doggy",
//     pricePerUnit: 90,
//     quantity: "250g",
//     count: 0,
//     totalAvailableCount: 4,
//     petType: "Animal",
//     type: "medicine",
//     rating: 4,
//     description: "If a dog chews shoes whose shoes does he choose?",
//     image: "https://m.media-amazon.com/images/I/41-eQbUPu9L._AC_.jpg",
//   },
//   {
//     name: "Cat Food",
//     pricePerUnit: 59,
//     quantity: "100g",
//     rating: 4,
//     count: 0,
//     totalAvailableCount: 4,
//     petType: "Animal",
//     type: "food",
//     description: "If a dog chews shoes whose shoes does he choose?",
//     image:
//       "https://ithinkpets.com/wp-content/uploads/2023/05/Catfest-Pillows-with-Chicken-Cream-Cat-Treat-at-ithinkpets.com-1-1200x973.webp",
//   },
//   {
//     name: "Seed Mix",
//     pricePerUnit: 290,
//     quantity: "500g",
//     rating: 4.6,
//     count: 0,
//     totalAvailableCount: 4,
//     petType: "Bird",
//     type: "food",
//     description: "If a dog chews shoes whose shoes does he choose?",
//     image: "https://images.meesho.com/images/products/227181817/j4vdh_512.webp",
//   },
//   {
//     name: "Cattlefish Bone",
//     pricePerUnit: 125,
//     quantity: "200g",
//     rating: 2.4,
//     count: 0,
//     totalAvailableCount: 4,
//     petType: "Bird",
//     type: "food",
//     description: "If a dog chews shoes whose shoes does he choose?",
//     image:
//       "https://5.imimg.com/data5/ZA/KT/GO/SELLER-136396/cuttlefish-bone-500x500.JPG",
//   },
//   {
//     name: "Dog Water Pot",
//     pricePerUnit: 90,
//     quantity: "3 pieces",
//     rating: 5,
//     count: 0,
//     totalAvailableCount: 4,
//     petType: "Animal",
//     type: "accessories",
//     description: "If a dog chews shoes whose shoes does he choose?",
//     image:
//       "https://m.media-amazon.com/images/I/414gIdoFwNL._AC_UF1000,1000_QL80_.jpg",
//   },
//   {
//     name: "Odomos Fish",
//     pricePerUnit: 90,
//     quantity: "250g",
//     rating: 1.2,
//     count: 0,
//     totalAvailableCount: 4,
//     petType: "Fish",
//     type: "medicine",
//     description: "If a dog chews shoes whose shoes does he choose?",
//     image: "https://m.media-amazon.com/images/I/41-eQbUPu9L._AC_.jpg",
//   },
//   {
//     name: "Fish Food",
//     pricePerUnit: 59,
//     rating: 3.4,
//     quantity: "100g",
//     count: 0,
//     totalAvailableCount: 4,
//     petType: "Fish",
//     type: "food",
//     description: "If a dog chews shoes whose shoes does he choose?",
//     image:
//       "https://ithinkpets.com/wp-content/uploads/2023/05/Catfest-Pillows-with-Chicken-Cream-Cat-Treat-at-ithinkpets.com-1-1200x973.webp",
//   },
//   {
//     name: "Seed Mix",
//     pricePerUnit: 290,
//     quantity: "500g",
//     rating: 4.7,
//     count: 0,
//     totalAvailableCount: 4,
//     petType: "Fish",
//     type: "medicine",
//     description: "If a dog chews shoes whose shoes does he choose?",
//     image: "https://images.meesho.com/images/products/227181817/j4vdh_512.webp",
//   },
//   {
//     name: "Cattlefish Bone",
//     pricePerUnit: 125,
//     quantity: "200g",
//     rating: 3.8,
//     count: 0,
//     totalAvailableCount: 4,
//     petType: "Animal",
//     type: "medicine",
//     description: "If a dog chews shoes whose shoes does he choose?",
//     image:
//       "https://5.imimg.com/data5/ZA/KT/GO/SELLER-136396/cuttlefish-bone-500x500.JPG",
//   },
//   {
//     name: "Dog Water Pot",
//     pricePerUnit: 90,
//     quantity: "3 pieces",
//     rating: 1.3,
//     count: 0,
//     totalAvailableCount: 4,
//     petType: "Animal",
//     type: "accessories",
//     description: "If a dog chews shoes whose shoes does he choose?",
//     image:
//       "https://m.media-amazon.com/images/I/414gIdoFwNL._AC_UF1000,1000_QL80_.jpg",
//   },
// ];

function MarketItemContainer({ text, searchTerm, sortOption, filters }) {
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [marketItems, setMarketItems] = useState([]);

  const [viewer, setViewer] = useState(null);
  const fetchViewer = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No auth token found in local storage.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await fetchViewerWhoAMI(token);
      setViewer(data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchViewer();
  }, []);

  const fetchMarketItems = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("No auth token found in local storage");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await fetchData(token);
      setMarketItems(data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketItems();
  }, []);

  // Filtering items based on searchTerm and filters
  const filteredItems = marketItems
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.petType.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (item) =>
        item.pricePerUnit >= filters.priceRange.min &&
        item.pricePerUnit <= filters.priceRange.max
    )
    .filter((item) => filters.itemTypes[item.type.toLowerCase()])
    .filter((item) => filters.petTypes[item.petType.toLowerCase()]);

  // Sorting items based on sortOption
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortOption === "priceLowToHigh") {
      return a.pricePerUnit - b.pricePerUnit;
    }
    if (sortOption === "priceHighToLow") {
      return b.pricePerUnit - a.pricePerUnit;
    }
    if (sortOption === "ratingLowToHigh") {
      return a.rating - b.rating;
    }
    if (sortOption === "ratingHighToLow") {
      return b.rating - a.rating;
    }
    return 0;
  });

  // Determine the number of items to show based on the state
  const itemsToShow = showAll ? sortedItems : sortedItems.slice(0, 6);

  return (
    <div className="bg bg-base-200 m-0 p-1 mb-4 rounded-xl">
      <h1 className="text-3xl font-bold ml-3">{text}</h1>
      {viewer && (
        <>
          <div className="grid grid-cols-3 gap-1 align-middle">
            {itemsToShow.map((item, index) => (
              <ItemCard key={index} item={item} viewer={viewer.id} />
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
        </>
      )}
    </div>
  );
}

export default MarketItemContainer;

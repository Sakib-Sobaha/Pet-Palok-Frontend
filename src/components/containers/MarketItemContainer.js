import React, { useState } from "react";
import ItemCard from "../cards/Item-Card";

const itemData = [
  {
    name: "Odomos Doggy",
    price_per_unit: 90,
    quantity: "250g",
    count: 0,
    total_available_count: 4,
    pet_type: "Animal",
    type: "medicine",
    rating: 4,
    description: "If a dog chews shoes whose shoes does he choose?",
    image: "https://m.media-amazon.com/images/I/41-eQbUPu9L._AC_.jpg",
  },
  {
    name: "Cat Food",
    price_per_unit: 59,
    quantity: "100g",
    rating: 4,
    count: 0,
    total_available_count: 4,
    pet_type: "Animal",
    type: "food",
    description: "If a dog chews shoes whose shoes does he choose?",
    image:
      "https://ithinkpets.com/wp-content/uploads/2023/05/Catfest-Pillows-with-Chicken-Cream-Cat-Treat-at-ithinkpets.com-1-1200x973.webp",
  },
  {
    name: "Seed Mix",
    price_per_unit: 290,
    quantity: "500g",
    rating: 4.6,
    count: 0,
    total_available_count: 4,
    pet_type: "Bird",
    type: "food",
    description: "If a dog chews shoes whose shoes does he choose?",
    image: "https://images.meesho.com/images/products/227181817/j4vdh_512.webp",
  },
  {
    name: "Cattlefish Bone",
    price_per_unit: 125,
    quantity: "200g",
    rating: 2.4,
    count: 0,
    total_available_count: 4,
    pet_type: "Bird",
    type: "food",
    description: "If a dog chews shoes whose shoes does he choose?",
    image:
      "https://5.imimg.com/data5/ZA/KT/GO/SELLER-136396/cuttlefish-bone-500x500.JPG",
  },
  {
    name: "Dog Water Pot",
    price_per_unit: 90,
    quantity: "3 pieces",
    rating: 5,
    count: 0,
    total_available_count: 4,
    pet_type: "Animal",
    type: "accessories",
    description: "If a dog chews shoes whose shoes does he choose?",
    image:
      "https://m.media-amazon.com/images/I/414gIdoFwNL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    name: "Odomos Fish",
    price_per_unit: 90,
    quantity: "250g",
    rating: 1.2,
    count: 0,
    total_available_count: 4,
    pet_type: "Fish",
    type: "medicine",
    description: "If a dog chews shoes whose shoes does he choose?",
    image: "https://m.media-amazon.com/images/I/41-eQbUPu9L._AC_.jpg",
  },
  {
    name: "Fish Food",
    price_per_unit: 59,
    rating: 3.4,
    quantity: "100g",
    count: 0,
    total_available_count: 4,
    pet_type: "Fish",
    type: "food",
    description: "If a dog chews shoes whose shoes does he choose?",
    image:
      "https://ithinkpets.com/wp-content/uploads/2023/05/Catfest-Pillows-with-Chicken-Cream-Cat-Treat-at-ithinkpets.com-1-1200x973.webp",
  },
  {
    name: "Seed Mix",
    price_per_unit: 290,
    quantity: "500g",
    rating: 4.7,
    count: 0,
    total_available_count: 4,
    pet_type: "Fish",
    type: "medicine",
    description: "If a dog chews shoes whose shoes does he choose?",
    image: "https://images.meesho.com/images/products/227181817/j4vdh_512.webp",
  },
  {
    name: "Cattlefish Bone",
    price_per_unit: 125,
    quantity: "200g",
    rating: 3.8,
    count: 0,
    total_available_count: 4,
    pet_type: "Animal",
    type: "medicine",
    description: "If a dog chews shoes whose shoes does he choose?",
    image:
      "https://5.imimg.com/data5/ZA/KT/GO/SELLER-136396/cuttlefish-bone-500x500.JPG",
  },
  {
    name: "Dog Water Pot",
    price_per_unit: 90,
    quantity: "3 pieces",
    rating: 1.3,
    count: 0,
    total_available_count: 4,
    pet_type: "Animal",
    type: "accessories",
    description: "If a dog chews shoes whose shoes does he choose?",
    image:
      "https://m.media-amazon.com/images/I/414gIdoFwNL._AC_UF1000,1000_QL80_.jpg",
  },
];

function MarketItemContainer({ text, searchTerm, sortOption, filters }) {
  const [showAll, setShowAll] = useState(false);

  // Filtering items based on searchTerm and filters
  const filteredItems = itemData
    .filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.pet_type.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(item => item.price_per_unit >= filters.priceRange.min && item.price_per_unit <= filters.priceRange.max)
    .filter(item => filters.itemTypes[item.type.toLowerCase()])
    .filter(item => filters.petTypes[item.pet_type.toLowerCase()]);


  // Sorting items based on sortOption
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortOption === "priceLowToHigh") {
      return a.price_per_unit - b.price_per_unit;
    }
    if (sortOption === "priceHighToLow") {
      return b.price_per_unit - a.price_per_unit;
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
      <div className="grid grid-cols-3 gap-1 align-middle">
        {itemsToShow.map((item, index) => (
          <ItemCard key={index} item={item}  />
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

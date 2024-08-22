import React, { useState, useEffect } from "react";

const LeftLayoutSellerMyProducts = ({ onSearch, onSort, onFilter }) => {
  const [priceRange, setPriceRange] = useState({ min: 1, max: 5000 });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [itemTypes, setItemTypes] = useState({
    food: true,
    accessories: true,
    medicine: true,
  });
  const [petTypes, setPetTypes] = useState({
    animal: true,
    bird: true,
    fish: true,
  });
  const [suggestions, setSuggestions] = useState([]);

  const handleSearchChange = async (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm);

    // Fetch suggestions from the server
    // if (newSearchTerm.length > 1) {
    //   const response = await fetch(`http://localhost:5000/suggest?query=${newSearchTerm}`);
    //   const data = await response.json();
    //   setSuggestions(data);
    // } else {
    //   setSuggestions([]);
    // }
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    onSort(e.target.value);
  };

  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemTypeChange = (e) => {
    setItemTypes((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
  };

  const handlePetTypeChange = (e) => {
    setPetTypes((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
  };

  const applyFilters = () => {
    onFilter({
      priceRange,
      itemTypes,
      petTypes,
    });
  };

  const resetFilters = () => {
    setPriceRange({ min: 1, max: 5000 });
    setItemTypes({ food: true, accessories: true, medicine: true });
    setPetTypes({ animal: true, bird: true, fish: true });
    onFilter({
      priceRange: { min: 1, max: 5000 },
      itemTypes: { food: true, accessories: true, medicine: true },
      petTypes: { animal: true, bird: true, fish: true },
    });
  };

  return (
    <div className="flex-1 bg-base-200 p-3 pt-0 min-h-screen h-auto rounded-lg">
      <button className="btn btn-secondary w-28 mt-4 align-middle"
        onClick={() => 
          document.getElementById("add_product").showModal()
        }>
      Add Product</button>
      {/* Search */}
      <div className="relative flex flex-auto p-1">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-primary rounded-md w-full mb-2 mt-4"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {suggestions.length > 0 && (
          <ul className="absolute bg-white border border-gray-300 rounded-lg mt-1 w-full max-h-60 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="p-2 cursor-pointer hover:bg-gray-200">
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Sort By */}
      <div className="p-1 pt-0 mt-0 mb-3 flex flex-auto">
        <select
          className="select select-primary w-full h-10 rounded-md"
          onChange={handleSortChange}
          value={sortOption}
        >
          <option value="" disabled>
            Sort by...
          </option>
          <option value="priceLowToHigh">Price Low to High</option>
          <option value="priceHighToLow">Price High to Low</option>
          <option value="ratingLowToHigh">Rating Low to High</option>
          <option value="ratingHighToLow">Rating High to Low</option>
        </select>
      </div>

      <p className="font-extrabold text-xl">
        <img
          src="https://img.icons8.com/ios/452/filter.png"
          alt="filter"
          className="w-6 h-6 float-left mr-3"
        />
        Filters:
      </p>

      <p className="font-bold pb-2 pl-1 pt-3">Price</p>
      <div className="grid grid-cols-2 gap-2">
        {/* From Price */}
        <div>
          <p className="font-semibold">From:</p>
          <input
            type="range"
            name="min"
            min={1}
            max={5000}
            value={priceRange.min}
            className="range"
            onChange={handlePriceRangeChange}
          />
          <div className="pl-0 mt-2">
            <kbd className="text-lg kbd font-medium">{priceRange.min}</kbd>
          </div>
        </div>

        {/* To Price */}
        <div>
          <p className="font-semibold">To:</p>
          <input
            type="range"
            name="max"
            min={1}
            max={5000}
            value={priceRange.max}
            className="range"
            onChange={handlePriceRangeChange}
          />
          <div className="pl-0 mt-2">
            <kbd className="text-lg kbd font-medium">{priceRange.max}</kbd>
          </div>
        </div>
      </div>

      <p className="font-bold pb-2 pl-1 pt-3">@ Item-type</p>
      <div className="flex flex-col">
        <label className="label cursor-pointer">
          <span className="label-text">Food</span>
          <input
            type="checkbox"
            name="food"
            checked={itemTypes.food}
            onChange={handleItemTypeChange}
            className="checkbox"
          />
        </label>
        <label className="label cursor-pointer">
          <span className="label-text">Accessories</span>
          <input
            type="checkbox"
            name="accessories"
            checked={itemTypes.accessories}
            onChange={handleItemTypeChange}
            className="checkbox"
          />
        </label>
        <label className="label cursor-pointer">
          <span className="label-text">Medicine</span>
          <input
            type="checkbox"
            name="medicine"
            checked={itemTypes.medicine}
            onChange={handleItemTypeChange}
            className="checkbox"
          />
        </label>
      </div>

      <p className="font-bold pb-2 pl-1 pt-3">@ Pet-type</p>
      <div className="flex flex-col">
        <label className="label cursor-pointer">
          <span className="label-text">Animal</span>
          <input
            type="checkbox"
            name="animal"
            checked={petTypes.animal}
            onChange={handlePetTypeChange}
            className="checkbox"
          />
        </label>
        <label className="label cursor-pointer">
          <span className="label-text">Bird</span>
          <input
            type="checkbox"
            name="bird"
            checked={petTypes.bird}
            onChange={handlePetTypeChange}
            className="checkbox"
          />
        </label>
        <label className="label cursor-pointer">
          <span className="label-text">Fish</span>
          <input
            type="checkbox"
            name="fish"
            checked={petTypes.fish}
            onChange={handlePetTypeChange}
            className="checkbox"
          />
        </label>
      </div>

      <div className="flex">
        <button
          className="btn btn-primary w-28 mt-4 mr-1 align-middle"
          onClick={applyFilters}
        >
          Apply
        </button>
        <button
          className="btn btn-secondary w-28 mt-4 align-middle"
          onClick={resetFilters}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default LeftLayoutSellerMyProducts;

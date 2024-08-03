import React from "react";
import { useState } from "react";
import AddProductDialog from "./modals/add-product.js";
// import RangeSelector from "./RangeSelector.js" ;

const LeftLayoutSellerMyProducts = ({ type }) => {

  // Handler function to update state when range input changes
  const [priceFrom, setPriceFrom] = useState(1);
  const [priceTo, setPriceTo] = useState(20);

  // Handle changes for the "from" price range
  const handlePriceFromChange = (event) => {
    const newPrice = Number(event.target.value);
    // Ensure "from" is not greater than "to"
    if (newPrice <= priceTo) {
      setPriceFrom(newPrice);
    }
  };

  // Handle changes for the "to" price range
  const handlePriceToChange = (event) => {
    const newPrice = Number(event.target.value);
    // Ensure "to" is not less than "from"
    if (newPrice >= priceFrom) {
      setPriceTo(newPrice);
    }
  };

  const [quantityFrom, setQuantityFrom] = useState(1);
  const [quantityTo, setQuantityTo] = useState(20);

  // Handle changes for the "from" price range
  const handleQuantityFromChange = (event) => {
    const newQ = Number(event.target.value);
    // Ensure "from" is not greater than "to"
    if (newQ <= quantityTo) {
      setQuantityFrom(newQ);
    }
  };

  // Handle changes for the "to" price range
  const handleQuantityToChange = (event) => {
    const newQ = Number(event.target.value);
    // Ensure "to" is not less than "from"
    if (newQ >= quantityFrom) {
      setQuantityTo(newQ);
    }
  };

  

  return (
    <div className="flex-1 bg-base-200 p-2 pt-0 min-h-screen h-auto rounded-lg">
      {/* Your content for LeftLayout */}
      <br />
      <button
        className="btn btn-primary rounded-md flex flex-auto items-center justify-center w-56 ml-2 mb-4"
        onClick={() => document.getElementById("add_product").showModal()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-5 w-5 flex"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            d="M12 4v16m8-8H4"
          />
        </svg>
        <span className="font-bold">Add New Product</span>
      </button>
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <AddProductDialog element_id="add_product" />

      <div className="p-1 pt-0 mt-0 mb-3 flex flex-auto">
        <select className="select select-primary w-full h-10 rounded-md">
          <option disabled selected>
            Sort by...
          </option>
          <option>Price Low to High</option>
          <option>Price High to Low</option>
          <option>Rating Low to High</option>
          <option>Rating High to Low</option>
        </select>
        {/* <button className="btn btn-primary flex-auto w-4 mb-4 rounded-md">Sort</button> */}
      </div>
      <div className="flex flex-auto p-1">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-primary rounded-md w-3/4 mb-4 mr-1"
        />
        <button className="btn btn-primary w-16 rounded-md mb-4">Search</button>
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
      {/* From Range Slider */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-bold">From</p>
          <input
            type="range"
            min={1}
            max={20}
            value={priceFrom}
            className="range"
            onChange={handlePriceFromChange}
          />
          <div className="pl-0 mt-2">
            <kbd className="text-lg kbd font-medium">{priceFrom}</kbd>
          </div>
        </div>

        {/* To Range Slider */}
        <div>
          <p className="font-bold">To</p>
          <input
            type="range"
            min={1}
            max={20}
            value={priceTo}
            className="range"
            onChange={handlePriceToChange}
          />
          <div className="pl-0 mt-2">
            <kbd className="text-lg kbd font-medium">{priceTo}</kbd>
          </div>
        </div>
      </div>

      <p className="font-bold pb-2 pl-1 pt-3">Quantity</p>
      {/* From Range Slider */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-bold">From</p>
          <input
            type="range"
            min={1}
            max={20}
            value={quantityFrom}
            className="range"
            onChange={handleQuantityFromChange}
          />
          <div className="pl-0 mt-2">
            <kbd className="text-lg kbd font-medium">{quantityFrom}</kbd>
          </div>
        </div>

        {/* To Range Slider */}
        <div>
          <p className="font-bold">To</p>
          <input
            type="range"
            min={1}
            max={20}
            value={quantityTo}
            className="range"
            onChange={handleQuantityToChange}
          />
          <div className="pl-0 mt-2">
            <kbd className="text-lg kbd font-medium">{quantityTo}</kbd>
          </div>
        </div>
      </div>

      <p className="font-bold pb-2 pl-1 pt-3 flex">
         Item-type
         </p>
      <div className="flex flex-col">
        <label className="label cursor-pointer">
          <span className="label-text">Food</span>
          <input type="checkbox" defaultChecked className="checkbox" />
        </label>
        <label className="label cursor-pointer">
          <span className="label-text">Accessories</span>
          <input type="checkbox" defaultChecked className="checkbox" />
        </label>
        <label className="label cursor-pointer">
          <span className="label-text">Medicine</span>
          <input type="checkbox" defaultChecked className="checkbox" />
        </label>
      </div>

      <p className="font-bold pb-2 pl-1 pt-3">@ Pet-type</p>
      <div className="flex flex-col">
        <label className="label cursor-pointer">
          <span className="label-text">Animal</span>
          <input type="checkbox" defaultChecked className="checkbox" />
        </label>
        <label className="label cursor-pointer">
          <span className="label-text">Bird</span>
          <input type="checkbox" defaultChecked className="checkbox" />
        </label>
        <label className="label cursor-pointer">
          <span className="label-text">Fish</span>
          <input type="checkbox" defaultChecked className="checkbox" />
        </label>
      </div>

      <div className="flex">
        <button className="btn btn-primary w-28 mt-4 mr-1 align-middle">
          {/* <img src="https://cdn4.iconfinder.com/data/icons/essentials-73/24/040_-_Tick-512.png" alt="filter" className="w-6 h-6 float-left mr-3" /> */}
          Apply
        </button>
        <button className="btn btn-secondary w-28 mt-4 align-middle">
          Reset
        </button>
      </div>
    </div>
  );
};

export default LeftLayoutSellerMyProducts;

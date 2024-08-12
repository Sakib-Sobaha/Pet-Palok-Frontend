import React, { useState } from "react";

const LeftLayoutPetBSX = ({ onSearch, onFilter, onSort }) => {
  const [ageRange, setAgeRange] = useState({ min: 1, max: 20 });
  const [priceRange, setPriceRange] = useState({min: 1, max: 10000});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState({
    Bird: false,
    Fish: false,
    Animal: false,
  });
  const [sortOrder, setSortOrder] = useState("");

  // Handler function to update age range
  const handleMinAgeChange = (event) => {
    setAgeRange((prevRange) => ({
      ...prevRange,
      min: Math.min(event.target.value, ageRange.max - 1),
    }));
  };

  const handleMaxAgeChange = (event) => {
    setAgeRange((prevRange) => ({
      ...prevRange,
      max: Math.max(event.target.value, ageRange.min + 1),
    }));
  };

  const handleMinPriceChange = (event) => {
    setPriceRange((prevRange) => ({
      ...prevRange,
      min: Math.min(event.target.value, priceRange.max - 1),
    }));
  };

  const handleMaxPriceChange = (event) => {
    setPriceRange((prevRange) => ({
      ...prevRange,
      max: Math.max(event.target.value, priceRange.min + 1),
    }));
  };


  const handleTypeChange = (event) => {
    setSelectedTypes({
      ...selectedTypes,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  const handleApplyFilters = () => {
    onFilter({ ...ageRange, types: Object.keys(selectedTypes).filter(type => selectedTypes[type]) });
    onFilter({ ...priceRange, types: Object.keys(selectedTypes).filter(type => selectedTypes[type]) });

    onSort(sortOrder);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
    onSort(event.target.value);
  };

  return (
    <div className="flex-1 bg-base-200 p-2 min-h-screen rounded-lg">

      <div className="flex flex-auto m-1">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered input-primary rounded-md w-full mb-4"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        
      </div>

      <div className="p-1 pt-0 mt-0 mb-3 flex flex-auto">
        <select className="select select-primary w-full h-10 rounded-md" onChange={handleSortChange} value={sortOrder}>
          <option value="">Sort by...</option>
          <option value="ageLowToHigh">Age Low to High</option>
          <option value="ageHighToLow">Age High to Low</option>
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

      <p className="font-bold pb-2 pl-1 pt-3">Age</p>
      <div className="grid grid-cols-2 gap-2">
        {/* From Age */}
        <div>
          <p className="font-semibold">From:</p>
          <input
            type="range"
            min={1}
            max={20}
            value={ageRange.min}
            className="range"
            onChange={handleMinAgeChange}
          />
          <div className="pl-0 mt-2">
            <kbd className="text-lg kbd font-medium">{ageRange.min}</kbd>
          </div>
        </div>

        {/* To Age */}
        <div>
          <p className="font-semibold">To:</p>
          <input
            type="range"
            min={1}
            max={20}
            value={ageRange.max}
            className="range"
            onChange={handleMaxAgeChange}
          />
          <div className="pl-0 mt-2">
            <kbd className="text-lg kbd font-medium">{ageRange.max}</kbd>
          </div>
        </div>
      </div>

      <p className="font-bold pb-2 pl-1 pt-3">Price</p>
      <div className="grid grid-cols-2 gap-2">
        {/* From price */}
        <div>
          <p className="font-semibold">From:</p>
          <input
            type="range"
            min={1}
            max={10000}
            value={priceRange.min}
            className="range"
            onChange={handleMinPriceChange}
          />
          <div className="pl-0 mt-2">
            <kbd className="text-lg kbd font-medium">{priceRange.min}</kbd>
          </div>
        </div>

        {/* To Age */}
        <div>
          <p className="font-semibold">To:</p>
          <input
            type="range"
            min={1}
            max={10000}
            value={priceRange.max}
            className="range"
            onChange={handleMaxPriceChange}
          />
          <div className="pl-0 mt-2">
            <kbd className="text-lg kbd font-medium">{priceRange.max}</kbd>
          </div>
        </div>
      </div>

      <p className="font-bold pb-2 pl-1 pt-3">Type</p>
      <div className="flex flex-col">
        {Object.keys(selectedTypes).map(type => (
          <label key={type} className="label cursor-pointer">
            <span className="label-text">{type}</span>
            <input
              type="checkbox"
              name={type}
              checked={selectedTypes[type]}
              onChange={handleTypeChange}
              className="checkbox"
            />
          </label>
        ))}
        <div className="flex">
          <button className="btn btn-primary w-28 mt-4 mr-1 align-middle" onClick={handleApplyFilters}>
            Apply
          </button>
          <button className="btn btn-secondary w-28 mt-4 align-middle" onClick={() => {
            setAgeRange({ min: 1, max: 20 });
            setPriceRange({ min: 1, max: 10000 });

            setSelectedTypes({
              Bird: false,
              Fish: false,
              Animal: false,
              
            });
            setSearchTerm("");
            setSortOrder("");
            onFilter({ min: 1, max: 20, types: [] },{ min: 1, max: 10000, types: [] });
            onSort("");
          }}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeftLayoutPetBSX;

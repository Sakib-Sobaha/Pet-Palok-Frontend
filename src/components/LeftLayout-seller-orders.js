import React, { useState } from "react";

const LeftLayoutStoreOrders = ({ onSearch, onSort, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [orderStates, setOrderStates] = useState({
    pending: true,
    accepted: true,
    "out for delivery": true,
    delivered: true,
  });

  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm);
  };

  const handleSortChange = (e) => {
    const selectedSortOption = e.target.value;
    setSortOption(selectedSortOption);
    onSort(selectedSortOption);
  };

  const handleOrderStateChange = (e) => {
    const { name, checked } = e.target;
    setOrderStates((prev) => ({ ...prev, [name]: checked }));
  };

  const applyFilters = () => {
    onFilter({
      orderStates,
    });
  };

  const resetFilters = () => {
    const defaultStates = {
      pending: true,
      accepted: true,
      "out for delivery": true,
      delivered: true,
    };
    setOrderStates(defaultStates);
    onFilter({ orderStates: defaultStates });
  };

  return (
    <div className="flex-1 bg-base-200 p-3 pt-0 min-h-screen h-auto rounded-lg">
      {/* Search */}
      <div className="relative flex flex-auto p-1">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-primary rounded-md w-full mb-2 mt-4"
          value={searchTerm}
          onChange={handleSearchChange}
        />
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
          <option value="orderDateOldToNew">Order Date (Oldest First)</option>
          <option value="orderDateNewToOld">Order Date (Newest First)</option>
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

      <p className="font-bold pb-2 pl-1 pt-3">Status</p>
      <div className="flex flex-col">
        {Object.keys(orderStates).map((state) => (
          <label key={state} className="label cursor-pointer">
            <span className="label-text capitalize">{state}</span>
            <input
              type="checkbox"
              name={state}
              checked={orderStates[state]}
              onChange={handleOrderStateChange}
              className="checkbox"
            />
          </label>
        ))}
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

export default LeftLayoutStoreOrders;

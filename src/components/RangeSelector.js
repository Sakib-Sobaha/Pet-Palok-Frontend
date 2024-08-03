import React, { useState } from "react";

const PriceRangeSelector = () => {
  const [priceRange, setPriceRange] = useState([1, 20]);

  // Handle changes for the dual range slider
  const handleRangeChange = (event) => {
    const newPrice = Number(event.target.value);
    const index = Number(event.target.dataset.index);

    setPriceRange((prevRange) => {
      const newRange = [...prevRange];
      newRange[index] = newPrice;
      // Ensure the first value is not greater than the second
      if (newRange[0] > newRange[1]) {
        newRange[1 - index] = newPrice;
      }
      return newRange;
    });
  };

  return (
    <div>
      <p className="font-bold pb-2 pl-1 pt-3">Price Range</p>
      <div className="relative">
        {/* Dual Range Slider */}
        <div className="flex items-center">
          <input
            type="range"
            min={1}
            max={20}
            value={priceRange[0]}
            data-index="0"
            className="range absolute w-full appearance-none pointer-events-none"
            style={{ zIndex: priceRange[0] === priceRange[1] ? 2 : 1 }}
            onChange={handleRangeChange}
          />
          <input
            type="range"
            min={1}
            max={20}
            value={priceRange[1]}
            data-index="1"
            className="range absolute w-full appearance-none pointer-events-none"
            style={{ zIndex: 2 }}
            onChange={handleRangeChange}
          />
        </div>

        {/* Highlight range between thumbs */}
        <div
          className="absolute bg-blue-500 h-1 top-1/2 transform -translate-y-1/2"
          style={{
            left: `${(priceRange[0] / 20) * 100}%`,
            width: `${((priceRange[1] - priceRange[0]) / 20) * 100}%`,
          }}
        ></div>
      </div>

      <div className="flex justify-between mt-4">
        <div>
          <p className="font-bold">From</p>
          <kbd className="text-lg kbd font-medium">{priceRange[0]}</kbd>
        </div>
        <div>
          <p className="font-bold">To</p>
          <kbd className="text-lg kbd font-medium">{priceRange[1]}</kbd>
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSelector;

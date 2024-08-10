import React from 'react';
import MarketItemContainer from './containers/MarketItemContainer';

const MiddleLayoutSellerMyProducts = ({ searchTerm, sortOption, filters }) => {
  return (
    <div className="flex-1 bg-base-100 rounded-lg min-h-screen">
      {/* Your content for MiddleLayout */}
      <MarketItemContainer text="Store Items" searchTerm={searchTerm} sortOption={sortOption} filters={filters} />
        {/* <MarketItemContainer text="Most Visited" /> */}
    </div>
  );
};

export default MiddleLayoutSellerMyProducts;

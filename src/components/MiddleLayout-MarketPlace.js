import React from 'react';
import MarketItemContainer from './containers/MarketItemContainer';
import Categories from './marketplace/categories.js'

const MiddleLayoutMarketplace = ({ searchTerm, sortOption, filters }) => {
  return (
    <div className="flex-1 bg-base-100 rounded-lg min-h-screen">
      <MarketItemContainer text="Popular Items" searchTerm={searchTerm} sortOption={sortOption} filters={filters} />
      {/* <MarketItemContainer text="Most Visited" /> */}
      <Categories />
    </div>
  );
};

export default MiddleLayoutMarketplace;

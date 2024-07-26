import React from 'react';
import MarketItemContainer from './containers/MarketItemContainer';
import Categories from './marketplace/categories.js'

const MiddleLayoutSellerHome = () => {
  return (
    <div className="flex-1 bg-base-100 rounded-lg p-4 min-h-screen">
      {/* Your content for MiddleLayout */}
        <MarketItemContainer text="Popular Items"/>
        <MarketItemContainer text="Most Visited" />
        <Categories />
    </div>
  );
};

export default MiddleLayoutSellerHome;

import React from 'react';
import MarketItemContainer from './containers/MarketItemContainer';

const MiddleLayoutSellerMyProducts = () => {
  return (
    <div className="flex-1 bg-base-100 rounded-lg min-h-screen">
      {/* Your content for MiddleLayout */}
        <MarketItemContainer text="Store Items"/>
        {/* <MarketItemContainer text="Most Visited" /> */}
    </div>
  );
};

export default MiddleLayoutSellerMyProducts;

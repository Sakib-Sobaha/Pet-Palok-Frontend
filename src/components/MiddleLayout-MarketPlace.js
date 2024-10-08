import React, { useEffect, useState } from "react";
import MarketItemContainer from "./containers/MarketItemContainer";
import Categories from "./marketplace/categories.js";
import StoreContainer from "./containers/StoreContainer.js";

const MiddleLayoutMarketplace = ({ searchTerm, sortOption, filters }) => {
  return (
    <div className="flex-1 bg-base-100 rounded-lg min-h-screen">
      <Categories />

      <MarketItemContainer
        text="Popular Items"
        searchTerm={searchTerm}
        sortOption={sortOption}
        filters={filters}
      />
      {/* <MarketItemContainer text="Most Visited" /> */}
      <StoreContainer />
    </div>
  );
};

export default MiddleLayoutMarketplace;

import React from "react";
import TempCartTableRL from "./cart/TempCartTableRL";


const RightLayoutMarketPlace = () => {
  return (
    <div className="flex-1 bg-base-100 p-1 pt-4 min-h-screen h-full rounded-lg 00">
      {/* Your content for RightLayout */}
      <h1 className="text-3xl font-bold p-0 m-0">Cart Items:</h1>
      <TempCartTableRL />
    </div>
  );
};

export default RightLayoutMarketPlace;

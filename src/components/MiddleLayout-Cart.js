import React from "react";
import CartTable from "./cart/CartTable";

const MiddleLayoutCart = () => {
  return (
    <div className="flex-1 bg-base-100 rounded-lg p-4 min-h-screen">
        <h1 className="text-3xl font-bold p-1 m-1">Your Cart</h1>
        <CartTable />
    </div>
  );
};

export default MiddleLayoutCart;

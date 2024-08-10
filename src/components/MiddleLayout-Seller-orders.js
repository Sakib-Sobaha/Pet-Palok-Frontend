import React from 'react';
import OrderContainer from "./containers/OrderContainer";

const MiddleLayoutSellerMyProducts = ({ searchTerm, sortOption, filters }) => {
    return (
      <div className="flex-1 bg-base-100 rounded-lg min-h-screen">
        <OrderContainer searchTerm={searchTerm} sortOption={sortOption} filters={filters} />
      </div>
    );
  };
  
  export default MiddleLayoutSellerMyProducts;
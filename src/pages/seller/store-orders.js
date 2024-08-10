import React, { useState } from "react";
import LeftLayoutStoreOrders from "../../components/LeftLayout-seller-orders.js";
import MiddleLayoutSellerMyProducts from "../../components/MiddleLayout-Seller-orders.js";
import RightLayout from "../../components/RightLayout";
import LayoutLRM from "../../components/LayoutLRM.js";

function StoreOrders() {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [filters, setFilters] = useState({
      paymentRange: { min: 1, max: 5000 },
      orderStates: { pending: true, accepted: true, "out for delivery": true, delivered: true },
    });
  
    const handleSearch = (term) => {
      setSearchTerm(term);
    };
  
    const handleSort = (option) => {
      setSortOption(option);
    };
  
    const handleFilter = (filterCriteria) => {
      setFilters(filterCriteria);
    };
  
    return (
      <div>
        <LayoutLRM
          left={<LeftLayoutStoreOrders onSearch={handleSearch} onSort={handleSort} onFilter={handleFilter} />}
          middle={<MiddleLayoutSellerMyProducts searchTerm={searchTerm} sortOption={sortOption} filters={filters} />}
          right={<RightLayout />}
        />
      </div>
    );
  }
  
  export default StoreOrders;
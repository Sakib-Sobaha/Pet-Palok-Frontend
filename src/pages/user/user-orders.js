import React from "react";
import { useState } from "react";

import LeftLayout from "../../components/LeftLayout-seller-orders.js";
import MiddleLayout from "../../components/MiddleLayout-UserOrders.js";
import RightLayout from "../../components/RightLayout";
import LayoutLRM from "../../components/LayoutLRM";

function UserOrders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [filters, setFilters] = useState({
    paymentRange: { min: 1, max: 5000 },
    orderStates: {
      pending: true,
      accepted: true,
      "out for delivery": true,
      delivered: true,
    },
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
        left={
          <LeftLayout
            onSearch={handleSearch}
            onSort={handleSort}
            onFilter={handleFilter}
          />
        }
        middle={
          <MiddleLayout
            searchTerm={searchTerm}
            sortOption={sortOption}
            filters={filters}
          />
        }
        right={<RightLayout />}
      />
    </div>
  );
}
export default UserOrders;

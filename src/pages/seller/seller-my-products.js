import React from "react";
import { useState } from "react";
import LeftLayout from "../../components/LeftLayout-seller-my-products.js";
import MiddleLayout from "../../components/MiddleLayout-Seller-My-Products.js";
import RightLayout from "../../components/RightLayout";
import LayoutLRM from "../../components/LayoutLRM.js";


function SellerMyProducts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [filters, setFilters] = useState({
    priceRange: { min: 1, max: 5000 },
    itemTypes: { food: true, accessories: true, medicine: true },
    petTypes: { animal: true, bird: true, fish: true },
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
        left={<LeftLayout onSearch={handleSearch} onSort={handleSort} onFilter={handleFilter} />}
        middle={<MiddleLayout searchTerm={searchTerm} sortOption={sortOption} filters={filters} />}
        right={<RightLayout />}
      />
    </div>
  );
}


export default SellerMyProducts;

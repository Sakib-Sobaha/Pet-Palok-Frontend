import React, { useState } from "react";
import LeftLayout from "../../components/LeftLayout-Marketplace";
import MiddleLayout from "../../components/MiddleLayout-MarketPlace";
import RightLayout from "../../components/RightLayout-Marketplace";
import LayoutLRM from "../../components/LayoutLRM";

function MarketPlace() {
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

export default MarketPlace;

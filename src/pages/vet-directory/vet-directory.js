import React, { useState } from "react";
import LeftLayoutVetDirectory from "../../components/LeftLayoutVetDirectory";
import MiddleLayoutVetDirectory from "../../components/MiddleLayoutVetDirectory";
import RightLayout from "../../components/RightLayout";
import LayoutLRM from "../../components/LayoutLRM";

function VetDirectory() {
  const [sortCriteria, setSortCriteria] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingRange, setRatingRange] = useState({ min: 1, max: 5 });

  const handleSortChange = (newSortCriteria) => {
    setSortCriteria(newSortCriteria);
  };

  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  const handleRatingRangeChange = (newRange) => {
    setRatingRange(newRange);
  };

  return (
    <div>
      <LayoutLRM
        left={
          <LeftLayoutVetDirectory
            onSortChange={handleSortChange}
            onSearchChange={handleSearchChange}
            onRatingRangeChange={handleRatingRangeChange}
            ratingRange={ratingRange}
          />
        }
        middle={
          <MiddleLayoutVetDirectory
            sortCriteria={sortCriteria}
            searchTerm={searchTerm}
            ratingRange={ratingRange}
          />
        }
        right={<RightLayout />}
      />
    </div>
  );
}

export default VetDirectory;

import React from "react";
import VetCardContainer from "./containers/VetCardContainer";

const MiddleLayoutVetDirectory = ({ sortCriteria, searchTerm, ratingRange }) => {
  return (
    <div className="flex-1 bg-base-200 rounded-lg p-4 min-h-screen">
      <VetCardContainer
        sortCriteria={sortCriteria}
        searchTerm={searchTerm}
        ratingRange={ratingRange}
      />
    </div>
  );
};

export default MiddleLayoutVetDirectory;

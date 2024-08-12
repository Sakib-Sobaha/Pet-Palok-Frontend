
import React from 'react';
// import PetCardContainer from './containers/PetCardContainer';
import PetBSXCardContainer from './containers/PetBSXCardContainer.js'

const MiddleLayoutPetBSX = ({ searchTerm, filter, sortOrder }) => {
  return (
    <div className="flex-1 bg-base-200 rounded-lg p-4 min-h-screen">
      <PetBSXCardContainer
        searchTerm={searchTerm}
        filter={filter}
        sortOrder={sortOrder}
      />
    </div>
  );
};

export default MiddleLayoutPetBSX;

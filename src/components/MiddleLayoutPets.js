import React from 'react';
import PetCardContainer from './containers/PetCardContainer';

const MiddleLayoutPets = () => {
  return (
    <div className="flex-1 bg-base-200 rounded-lg p-4 min-h-screen">
      {/* Your content for MiddleLayout */}
        <PetCardContainer />

    </div>
  );
};

export default MiddleLayoutPets;

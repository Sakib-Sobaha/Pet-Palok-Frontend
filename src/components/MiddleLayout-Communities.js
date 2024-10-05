import React from 'react';
import CommunityCardContainer from './containers/CommunityCardContainer.js';
import CreatePetProfile from './modals/create-pet-profile';

const MiddleLayoutPets = ({ searchTerm, filter, sortOrder }) => {
  return (
    <div className="flex-1 bg-base-200 rounded-lg p-4 min-h-screen">
      {/* <CreatePetProfile element_id={"create_pet_profile"} /> */}
      {/* <PetCardContainer
        searchTerm={searchTerm}
        filter={filter}
        sortOrder={sortOrder}
      /> */}
      <CommunityCardContainer />
    </div>
  );
};

export default MiddleLayoutPets;

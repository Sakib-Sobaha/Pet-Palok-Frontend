import React from 'react';
import PetCardContainer from './containers/PetCardContainer';
import CreatePetProfile from './modals/create-pet-profile';

const MiddleLayoutPets = () => {
  return (
    <div className="flex-1 bg-base-200 rounded-lg p-4 min-h-screen">
      {/* Your content for MiddleLayout */}
        <CreatePetProfile element_id={"create_pet_profile"}/>
        <PetCardContainer />

    </div>
  );
};

export default MiddleLayoutPets;

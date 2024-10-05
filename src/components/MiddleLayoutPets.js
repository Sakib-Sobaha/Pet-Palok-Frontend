import React, { useState } from 'react';
import PetCardContainer from './containers/PetCardContainer-User';
import CreatePetProfile from './modals/create-pet-profile';

const MiddleLayoutPets = ({ searchTerm, filter, sortOrder }) => {
  const [userId, setUserId] = useState(null);

  return (
    <div className="flex-1 bg-base-200 rounded-lg p-4 min-h-screen">
      <CreatePetProfile element_id={"create_pet_profile"} user_id={userId} />
      
      <PetCardContainer
        searchTerm={searchTerm}
        filter={filter}
        sortOrder={sortOrder}
        setUserId={setUserId} // Pass down the setter function
      />
    </div>
  );
};

export default MiddleLayoutPets;

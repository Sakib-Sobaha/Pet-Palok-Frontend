import React from "react";

import LeftLayout from "../../components/LeftLayoutPetProfile";
import MiddleLayout from "../../components/MiddleLayout-PetProfile";
import RightLayout from "../../components/RightLayout";
import LayoutLRM from "../../components/LayoutLRM";
import Menu from "../../components/Menu-LeftSidebar";
import { useParams } from "react-router-dom";

function PetProfile() {
  const petId = useParams().petId;
  return (
    <div>

      <LayoutLRM
        left={<LeftLayout type="user" />}
        middle={<MiddleLayout petId={petId}/>}
        right={<RightLayout />}
      />
    </div>
  );
}

export default PetProfile;

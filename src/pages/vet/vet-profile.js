import React from "react";

import LeftLayout from "../../components/LeftLayoutVetProfile";
import MiddleLayout from "../../components/MiddleLayout-VetProfile";
import RightLayout from "../../components/RightLayout";
import LayoutLRM from "../../components/LayoutLRM";
import Menu from "../../components/Menu-LeftSidebar";

function VetProfile() {
  return (
    <div>
      <LayoutLRM
        left={<LeftLayout type="vet" />}
        middle={<MiddleLayout />}
        right={<RightLayout />}
      />
    </div>
  );
}

export default VetProfile;

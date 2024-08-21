import React from "react";

import LeftLayout from "../../components/LeftLayoutVetProfile";
import MiddleLayout from "../../components/MiddleLayout-VetProfile";
import RightLayout from "../../components/RightLayout";
import LayoutLRM from "../../components/LayoutLRM";
import { useParams } from "react-router-dom";

function VetProfile() {
  const vetId = useParams().vetId;
  return (
    <div>
      <LayoutLRM
        left={<LeftLayout type="vet" />}
        middle={<MiddleLayout vetId={vetId}/>}
        right={<RightLayout />}
      />
    </div>
  );
}

export default VetProfile;

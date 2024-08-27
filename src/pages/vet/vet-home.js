import React from "react";

import LeftLayout from "../../components/LeftLayoutVetProfile";
import MiddleLayout from "../../components/MiddleLayout-VetHome";
import RightLayout from "../../components/RightLayout";
import LayoutLRM from "../../components/LayoutLRM";
import { useParams } from "react-router-dom";

function VetHome() {
  
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

export default VetHome;

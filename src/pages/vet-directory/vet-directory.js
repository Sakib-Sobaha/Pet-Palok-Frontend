import React from "react";

import LeftLayout from "../../components/LeftLayoutVetDirectory";
import MiddleLayout from "../../components/MiddleLayoutVetDirectory";
import RightLayout from "../../components/RightLayout";
import LayoutLRM from "../../components/LayoutLRM";


function VetDirectory() {
  return (
    <div>
      <LayoutLRM
        left={<LeftLayout />}
        middle={<MiddleLayout />}
        right={<RightLayout />}
      />
    </div>
  );
}

export default VetDirectory;

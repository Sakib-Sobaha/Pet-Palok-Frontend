import React from "react";

import LeftLayout from "../../components/LeftLayoutPets";
import MiddleLayout from "../../components/MiddleLayout-UserOrders.js";
import RightLayout from "../../components/RightLayout";
import LayoutLRM from "../../components/LayoutLRM";

function LostAndFound() {
  return (
    <div>
      <LayoutLRM
        left={<LeftLayout/>}
        middle={<MiddleLayout />}
        right={<RightLayout />}
      />
    </div>
  );
}

export default LostAndFound;

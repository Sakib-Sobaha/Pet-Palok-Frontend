import React from "react";

import LeftLayout from "../../components/LeftLayout-Marketplace";
import MiddleLayout from "../../components/MiddleLayout-MarketPlace";
import RightLayout from "../../components/RightLayout";
import LayoutLRM from "../../components/LayoutLRM";


function Pets() {
  return (
    <div>
      <LayoutLRM
        left={<LeftLayout type="user"/>}
        middle={<MiddleLayout />}
        right={<RightLayout />}
      />
    </div>
  );
}

export default Pets;

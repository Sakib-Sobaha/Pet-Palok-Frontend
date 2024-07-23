import React from "react";

import LeftLayout from "../../components/LeftLayoutSellerProfile";
import MiddleLayout from "../../components/MiddleLayout-SingleItem";
import RightLayout from "../../components/RightLayout";
import LayoutLRM from "../../components/LayoutLRM";


function SingleItem() {
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

export default SingleItem;

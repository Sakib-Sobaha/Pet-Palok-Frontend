import React from "react";

import LeftLayout from "../../components/LeftLayoutSellerProfile";
import MiddleLayout from "../../components/MiddleLayout-SellerHome";
import RightLayout from "../../components/RightLayout";
import LayoutLRM from "../../components/LayoutLRM";

function SellerHome() {
  return (
    <div>
      <LayoutLRM
        left={<LeftLayout type="seller" />}
        middle={<MiddleLayout />}
        right={<RightLayout />}
      />
    </div>
  );
}

export default SellerHome;

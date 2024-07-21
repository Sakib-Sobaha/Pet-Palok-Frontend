import React from "react";

import LeftLayout from "../../components/LeftLayoutSellerProfile";
import MiddleLayout from "../../components/MiddleLayout-SellerProfile";
import RightLayout from "../../components/RightLayout";
import LayoutLRM from "../../components/LayoutLRM";

function SellerProfile() {
  return (
    <div>
      <LayoutLRM
        left={<LeftLayout type="user" />}
        middle={<MiddleLayout />}
        right={<RightLayout />}
      />
    </div>
  );
}

export default SellerProfile;

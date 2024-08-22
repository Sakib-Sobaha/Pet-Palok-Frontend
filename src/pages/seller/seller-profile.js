import React from "react";

import LeftLayout from "../../components/LeftLayoutSellerProfile";
import MiddleLayout from "../../components/MiddleLayout-SellerProfile";
import RightLayout from "../../components/RightLayout";
import LayoutLRM from "../../components/LayoutLRM";
import { useParams } from "react-router-dom";

function SellerProfile() {

  const sellerId = useParams().sellerId;
  // console.log("Seller ID: (sellerprofile.js)", sellerId);
  return (
    <div>
      <LayoutLRM
        left={<LeftLayout type="" />}
        middle={<MiddleLayout sellerId={sellerId} />}
        right={<RightLayout />}
      />
    </div>
  );
}

export default SellerProfile;

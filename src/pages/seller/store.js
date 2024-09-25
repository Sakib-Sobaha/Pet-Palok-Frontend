import React from "react";

import LeftLayout from "../../components/LeftLayoutSellerProfile";
import MiddleLayout from "../../components/MiddleLayout-Store";
import RightLayout from "../../components/RightLayout";
import LayoutLRM from "../../components/LayoutLRM";
import { useParams } from "react-router-dom";

function SellerHome() {
  const sellerId = useParams().storeId;
  return (
    <div>
      <LayoutLRM
        left={<LeftLayout type="seller" />}
        middle={<MiddleLayout  sellerId={sellerId}/>}
        right={<RightLayout />}
      />
    </div>
  );
}

export default SellerHome;

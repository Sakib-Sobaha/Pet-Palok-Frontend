import React from "react";

import LeftLayout from "../../components/LeftLayout-seller-my-products.js";
import MiddleLayout from "../../components/MiddleLayout-Seller-My-Products.js";
import RightLayout from "../../components/RightLayout";
import LayoutLRM from "../../components/LayoutLRM.js";


function SellerMyProducts() {
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

export default SellerMyProducts;

import React from "react";
import LeftLayout from "../../components/LeftLayoutEmpty.js"
import MiddleLayout from "../../components/MiddleLayout-Checkout.js"
import RightLayout from "../../components/RightLayout"
import LayoutLRM from "../../components/LayoutLRM";


function Checkout() {
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

export default Checkout;
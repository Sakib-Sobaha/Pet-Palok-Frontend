import React from "react";
import LeftLayout from "../../components/LeftLayoutEmpty.js"
import MiddleLayout from "../../components/MiddleLayout-Cart.js"
import RightLayout from "../../components/RightLayout"
import LayoutLRM from "../../components/LayoutLRM";


function Cart() {
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

export default Cart;
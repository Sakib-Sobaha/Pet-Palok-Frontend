import React from "react";

import LeftLayout from "../../components/LeftLayoutSellerProfile";
import MiddleLayout from "../../components/MiddleLayout-SingleItem";
import RightLayout from "../../components/RightLayout";
import LayoutLRM from "../../components/LayoutLRM";
import { useParams } from "react-router-dom";


function SingleItem() {
  const itemId = useParams().itemId;
  return (
    <div>
      <LayoutLRM
        left={<LeftLayout type="user"/>}
        middle={<MiddleLayout _itemId={itemId}/>}
        right={<RightLayout />}
      />
    </div>
  );
}

export default SingleItem;

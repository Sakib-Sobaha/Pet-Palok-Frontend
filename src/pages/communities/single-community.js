import React from "react";

import LeftLayout from "../../components/LeftLayout";
import MiddleLayout from "../../components/MiddleLayout-SingleCommunity.js";
import RightLayout from "../../components/RightLayout";
import LayoutLRM from "../../components/LayoutLRM";
import { useParams } from "react-router-dom";


function SingleCommunity() {
  const communityId = useParams().communityId;
  return (
    <div>
      <LayoutLRM
        left={<LeftLayout type="user"/>}
        middle={<MiddleLayout _communityId={communityId}/>}
        right={<RightLayout />}
      />
    </div>
  );
}

export default SingleCommunity;

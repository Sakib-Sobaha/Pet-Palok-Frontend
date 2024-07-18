import React from "react";

import LeftLayout from "../../components/LeftLayout";
import MiddleLayout from "../../components/MiddleLayout";
import RightLayout from "../../components/RightLayout";
import LayoutLRM from "../../components/LayoutLRM";
import Menu from "../../components/Menu-LeftSidebar";
function UserHome() {
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

export default UserHome;

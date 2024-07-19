import React from "react";

import LeftLayout from "../../components/LeftLayoutPetProfile";
import MiddleLayout from "../../components/MiddleLayout-UserProfile";
import RightLayout from "../../components/RightLayout";
import LayoutLRM from "../../components/LayoutLRM";
import Menu from "../../components/Menu-LeftSidebar";

function UserProfile() {
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

export default UserProfile;

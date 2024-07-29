import React from "react";

import LeftLayout from "../../components/LeftLayoutEmpty";
import MiddleLayout from "../../components/MiddleLayout-EditUserProfile";
import RightLayout from "../../components/RightLayout";
import LayoutLRM from "../../components/LayoutLRM";

function EditUserProfile() {
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

export default EditUserProfile;

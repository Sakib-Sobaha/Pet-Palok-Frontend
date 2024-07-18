import React from "react";

import LeftLayout from "../../components/LeftLayoutPets";
import MiddleLayout from "../../components/MiddleLayoutPets";
import RightLayout from "../../components/RightLayout";
import LayoutLRM from "../../components/LayoutLRM";
import Menu from "../../components/Menu-LeftSidebar";


function Pets() {
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

export default Pets;

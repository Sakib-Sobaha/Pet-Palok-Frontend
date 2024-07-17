import React from "react";

import LeftLayout from "../components/LeftLayout";
import MiddleLayout from "../components/MiddleLayout";
import RightLayout from "../components/RightLayout";
import LayoutLRM from "../components/LayoutLRM";
function Home() {
  return (
    <div>
      <LayoutLRM
        left={<LeftLayout />}
        middle={<MiddleLayout />}
        right={<RightLayout />}
      />
    </div>
  );
}

export default Home;

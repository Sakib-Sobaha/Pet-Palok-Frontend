import React from "react";

import LeftLayout from "../../components/LeftLayoutAppointments";
import MiddleLayout from "../../components/MiddleLayout-Appointments";
import RightLayout from "../../components/RightLayout";
import LayoutLRM from "../../components/LayoutLRM";

function Appointments() {
  return (
    <div>
      <LayoutLRM
        left={<LeftLayout type="vet" />}
        middle={<MiddleLayout />}
        right={<RightLayout />}
      />
    </div>
  );
}

export default Appointments;

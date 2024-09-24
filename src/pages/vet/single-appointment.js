import React from "react";

import LeftLayout from "../../components/LeftLayoutAppointments";
import MiddleLayout from "../../components/MiddleLayout-SingleAppointment.js";
import RightLayout from "../../components/RightLayout";
import LayoutLRM from "../../components/LayoutLRM";
import { useParams } from "react-router-dom";

function Appointments() {
  const id = useParams().appointmentId;

  return (
    <div>
      <LayoutLRM
        left={<LeftLayout type="" />}
        middle={<MiddleLayout _id={id} />}
        right={<RightLayout />}
      />
    </div>
  );
}

export default Appointments;

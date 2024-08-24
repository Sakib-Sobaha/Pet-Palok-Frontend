import React from "react";

import AccordionAppointments from "./Accordion/Accordion-Appointments";
function MiddleLayoutAppointments()
{
    return(
        <div className="flex-1 bg-base-200 rounded-lg p-0 min-h-screen">
            <AccordionAppointments />
        </div>

    )
    ;
}

export default MiddleLayoutAppointments;
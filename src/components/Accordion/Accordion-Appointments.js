import React, { useState } from "react";
import AppointmentRequestContainer from "../containers/AppointmentRequestContainer";
import UpcomingAppointmentContainer from "../containers/Calendar";
import AppointmentCompletedContainer from "../containers/AppointmentCompletedContainer";

function AccordionAppointments() {
  const [openSection, setOpenSection] = useState("found");

  const toggleSection = (sectionName) => {
    // If the section clicked is already open, close it
    if (openSection === sectionName) {
      setOpenSection(null);
    } else {
      setOpenSection(sectionName);
    }
  };

  return (
    <div>
      <div className="collapse collapse-arrow bg-base-300 mt-1">
        <input
          type="checkbox"
          checked={openSection === "found"}
          onChange={() => toggleSection("found")}
        />
        <div
          className="collapse-title text-xl font-medium"
          onClick={() => toggleSection("found")}
        >
          Appointment Requests
        </div>
        {openSection === "found" && (
          <div className="collapse-content">
            {/* <FoundContainer /> */}
            <AppointmentRequestContainer />
          </div>
        )}
      </div>

      <div className="collapse collapse-arrow bg-base-300 mt-1">
        <input
          type="checkbox"
          checked={openSection === "lost"}
          onChange={() => toggleSection("lost")}
        />
        <div
          className="collapse-title text-xl font-medium"
          onClick={() => toggleSection("lost")}
        >
          Upcoming
        </div>
        {openSection === "lost" && (
          <div className="collapse-content">
            <UpcomingAppointmentContainer />
          </div>
        )}
      </div>
      <div className="collapse collapse-arrow bg-base-300 mt-1">
        <input
          type="checkbox"
          checked={openSection === "previous"}
          onChange={() => toggleSection("previous")}
        />
        <div
          className="collapse-title text-xl font-medium"
          onClick={() => toggleSection("previous")}
        >
          Previous
        </div>
        {openSection === "previous" && (
          <div className="collapse-content">
            <AppointmentCompletedContainer />
          </div>
        )}
      </div>
    </div>
  );
}

export default AccordionAppointments;

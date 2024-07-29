import React, { useState } from "react";
import LostContainer from "./LostContainer";
import FoundContainer from "./FoundContainer";

function AccordionLnF() {
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
      <div className="collapse collapse-arrow bg-base-300 m-1">
        <input
          type="checkbox"
          checked={openSection === "found"}
          onChange={() => toggleSection("found")}
        />
        <div
          className="collapse-title text-xl font-medium"
          onClick={() => toggleSection("found")}
        >
          Found Posts
        </div>
        {openSection === "found" && (
          <div className="collapse-content">
            <FoundContainer />
          </div>
        )}
      </div>

      <div className="collapse collapse-arrow bg-base-300 m-1">
        <input
          type="checkbox"
          checked={openSection === "lost"}
          onChange={() => toggleSection("lost")}
        />
        <div
          className="collapse-title text-xl font-medium"
          onClick={() => toggleSection("lost")}
        >
          Lost Posts
        </div>
        {openSection === "lost" && (
          <div className="collapse-content">
            <LostContainer />
          </div>
        )}
      </div>
    </div>
  );
}

export default AccordionLnF;

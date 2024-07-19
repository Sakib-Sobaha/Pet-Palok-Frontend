import React from "react";

function SectionDivider({ title,icon }) {
  return (
    <div className="flex flex-col w-full mb-4 mt-2">
      <div className="divider text-3xl font-semibold">{icon != "" && <img src={icon} className="w-10 h-10"/>} {title}</div>
    </div>
  );
}

export default SectionDivider;

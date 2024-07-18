import React from "react";

function SectionDivider({ title }) {
  return (
    <div className="flex flex-col w-full mb-4 mt-2">
      <div className="divider text-3xl font-semibold"> {title}</div>
    </div>
  );
}

export default SectionDivider;

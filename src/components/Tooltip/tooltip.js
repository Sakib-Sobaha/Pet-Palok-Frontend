import React from "react";

function ToolTip() {
  return (
    <div className="tooltip" data-tip="hello">
      <button className="btn">Hover me</button>

      {/* <div className="tooltip tooltip-open" data-tip="hello">
        <button className="btn">Force open</button>
      </div> */}
    </div>
  );
}

export default ToolTip;

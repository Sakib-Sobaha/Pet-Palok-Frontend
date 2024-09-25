import React from "react";


function LayoutLRM({ left, right, middle }) {
    return (
        <div className="flex">
        <div className="w-1/5 p-4">{left}</div>
        <div className="w-3/5 p-4">{middle}</div>
        <div className="w-1/5 p-4">{right}</div>
        </div>
    );
    }

export default LayoutLRM;
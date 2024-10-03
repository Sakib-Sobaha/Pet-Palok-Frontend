import React from "react";


function LayoutLRM({ right, middle }) {
    return (
        <div className="flex">
        
        <div className="w-4/5 p-4">{middle}</div>
        <div className="w-1/5 p-4">{right}</div>
        </div>
    );
    }

export default LayoutLRM;
import React from "react";
import LostPost from "./LostPost";

function LostContainer({posts}) {
    return(
        <div className="grid grid-cols-1 w-full">
            <LostPost />
        </div>
    )
    ;
}
export default LostContainer;
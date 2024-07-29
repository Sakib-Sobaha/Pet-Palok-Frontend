import React from "react";
import FoundPost from "./FoundPost";

function FoundContainer({posts}) {
    return(
        <div className="grid grid-cols-1 m-0 gap-1 w-full overflow-y-auto scroll-smooth max-h-screen ">
            <FoundPost />
            <FoundPost />
            <FoundPost />
        </div>
    )
    ;
}
export default FoundContainer;
import React from "react";
import LostPost from "./LostPost";

function LostContainer({posts}) {
    return(
        <div className="grid grid-cols-1 m-0 gap-1 w-full overflow-y-auto scroll-smooth max-h-screen ">
            <LostPost />
            <LostPost />
            <LostPost />
        </div>
    )
    ;
}
export default LostContainer;
import React from "react";
import InboxContainer from "./chatbox/inbox-container"

function LeftLayoutChatbox()
{
    return(
        <div className="flex-1 bg-base-300 p-0.5 min-h-screen h-full rounded-lg border border-gray-300">
            <p className="text-3xl pl-1 m-1 font-bold">Inbox</p> 
            <InboxContainer />
        </div>
    );
}

export default LeftLayoutChatbox;
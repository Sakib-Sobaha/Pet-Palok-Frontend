import React from "react";
import LayoutLRM from "../../components/LayoutLRM.js";
import LeftLayout from "../../components/LeftLayoutChatbox"
import RightLayout from "../../components/RightLayout";
import MiddleLayout from "../../components/ChatRoom.js"

function ChatBox ()
{
    return(
        <LayoutLRM
        middle={<MiddleLayout />}
      />
    );
}

export default ChatBox;
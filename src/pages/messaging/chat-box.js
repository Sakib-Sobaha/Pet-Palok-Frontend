import React from "react";
import LayoutLRM from "../../components/LayoutLRM.js";
import LeftLayout from "../../components/LeftLayoutChatbox"
import RightLayout from "../../components/RightLayout";
import MiddleLayout from "../../components/MiddleLayout-Chatbox.js"

function ChatBox ()
{
    return(
        <LayoutLRM
        left={<LeftLayout/>}
        middle={<MiddleLayout />}
        right={<RightLayout />}
      />
    );
}

export default ChatBox;
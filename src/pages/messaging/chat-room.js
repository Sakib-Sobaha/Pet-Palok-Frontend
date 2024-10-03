import React from "react";
import { useState } from "react";
import LayoutLRM from "../../components/LayoutLRM-Chat.js";
import LeftLayout from "../../components/LeftLayoutChatbox"
import RightLayout from "../../components/RightLayout";
import MiddleLayout from "../../components/ChatRoom.js"

const ChatBox = () => 
{
  
      return(
        <LayoutLRM
        // left={<LeftLayout/>}
        middle={<MiddleLayout />}
        right={<RightLayout />}
      />
    );
}

export default ChatBox;
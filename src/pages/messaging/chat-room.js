import React from "react";
import { useState } from "react";
import LayoutLRM from "../../components/LayoutLRM.js";
import LeftLayout from "../../components/LeftLayoutChatbox"
import RightLayout from "../../components/RightLayout";
import MiddleLayout from "../../components/ChatRoom.js"

const ChatBox = () => 
{
  const [selectedUserDetails, setSelectedUserDetails] = useState(null);

  const handleUserSelection = (userDetails) => {
    setSelectedUserDetails(userDetails);
  }
      return(
        <LayoutLRM
        left={<LeftLayout onSelect={handleUserSelection}/>}
        middle={<MiddleLayout userDetails={selectedUserDetails}/>}
        right={<RightLayout />}
      />
    );
}

export default ChatBox;
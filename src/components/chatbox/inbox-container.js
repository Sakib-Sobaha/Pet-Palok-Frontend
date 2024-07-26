import React from "react";
import SingleChatLeft from "./single-chat-left";

function InboxContainer() {
  return (
    <div>
      <ul className="menu menu-lg bg-base-200 w-full m-0 p-0">
        <li>
          <SingleChatLeft person="Niloy" lastMessage="kire ki koros?" />
        </li>
        <li>
          <SingleChatLeft
            person="Sobaha"
            lastMessage="kire halar vai beche asos?"
          />{" "}
        </li>
        <li>
          <SingleChatLeft person="Rakib" lastMessage="asm korsos?" />
        </li>
      </ul>
    </div>
  );
}

export default InboxContainer;

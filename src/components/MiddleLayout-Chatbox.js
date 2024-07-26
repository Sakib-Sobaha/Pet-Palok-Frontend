import React from "react";
import ChatLeft from "./chatbox/chat-left";
import ChatRight from "./chatbox/chat-right";



const link =
  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";

function MiddleLayoutChatbox() {
  return (
    <div className="flex-1 bg-base-200 rounded-lg p-1 min-h-screen align-bottom ">
      <div className="bg-base-300 rounded-lg w-full p-1 text-3xl font-bold">
        Name
      </div>

      <div className="object-bottom">
        
        
      <ChatLeft sender="Sobaha" text="hello" time="12.45pm" image={link}/>
      <ChatLeft sender="Sobaha" text="kire" time="12.46pm" image=""/>

      <ChatRight text="hello" time="12.45pm"/>
      <ChatRight text="ki khobor" time="12.45pm"/>
      <ChatRight text="ki koros sharadin" time="12.45pm"/>
      
      


      </div>
      <div className="w-full flex bottom-0">
        <input
          type="text"
          placeholder="Type your message here"
          className="input input-bordered input-secondary w-full rounded-md"
        />
        <button className="btn btn-primary rounded-md w-20">
            Send
        </button>
      </div>
    </div>
  );
}

export default MiddleLayoutChatbox;

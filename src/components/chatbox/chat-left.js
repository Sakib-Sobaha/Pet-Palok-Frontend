import React from "react";


function ChatLeft({ sender, text, time, image }) {
    
  return (
    
    <div className="chat chat-start">
      <div className="avatar online placeholder chat-image pl-2">
        <div className="bg-neutral ring ring-blue-600 text-neutral-content w-10 rounded-full">
          {/* {!image || image==""? (
            // <span className="text-xl">{sender.slice(0, 2)}</span>
          ) : ( */}
            <img src={image} alt="img"/>
          {/* )} */}
        </div>
      </div>
      <div className="chat-header">
        {sender}
        <time className="text-xs opacity-50 pl-2">{time}</time>
      </div>
      <div className="chat-bubble">{text}</div>
    </div>
  );
}
export default ChatLeft;

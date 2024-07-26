import React from "react";

function ChatRight({ text, time})
{
    return(
        <div className="chat chat-end">
          {/* <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div> */}
          <div className="chat-header">
            You
            <time className="text-xs opacity-50 pl-2">{time}</time>
          </div>
          <div className="chat-bubble">
            {text}
          </div>
        </div>
    );
}
export default ChatRight;
import React from "react";

function SingleChatLeft({ person, lastMessage }) {
  return (
    <div className=" rounded-none flex-none gap-0 float-left h-24">
      <div className="avatar pl-0 m-0 pr-2 ml-0">
        <div className=" h-20 w-20 float-start m-0 rounded-full ">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <div className="w-full">
        <p className="font-bold">{person}</p>

        <p className="h-12 text-sm">
          {lastMessage.length > 20
            ? lastMessage.slice(0, 20) + ". . ."
            : lastMessage}
        </p>
      </div>
    </div>
  );
}

export default SingleChatLeft;

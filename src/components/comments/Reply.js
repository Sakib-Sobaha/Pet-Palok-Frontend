import React, { useState } from "react";

const reply_ = {
    id: 122,
    author: "Bird Pet Care",
    time: "22-01-2024",
    reply_text: "Yes Sir",
    };


const Reply = ({_reply}) => {
    const [reply, setReply] = useState(reply_);

  return (
    <div className="mb-1">
      <div className="flex">
        <div className="w-1/12">
          <div className="avatar ">
            <div className="w-full max-h-16 mt-1 mr-1 rounded-full"></div>
          </div>
        </div>
        <div className="flex border border-black bg-base-300 rounded-lg ml-1 p-1 w-11/12">
          <img
            src="https://cdn0.iconfinder.com/data/icons/evericons-24px-vol-1/24/arrow-reply-all-512.png"
            alt="reply"
            className="w-8 h-8 border border-base-content m-2"
          />

          <div>
            <h1 className="font-bold text-content">{reply.author}</h1>
            <h1 className="font-semibold text-sm">{reply.reply_text}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reply;

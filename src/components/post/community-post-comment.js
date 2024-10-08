import React, { useState, useEffect } from "react";
import Reply from "./community-post-reply";

const timeAgo = (timestamp) => {
  const now = new Date();
  const then = new Date(timestamp);
  const diffInMs = now - then;

  const diffInMinutes = Math.floor(diffInMs / 1000 / 60);
  const hours = Math.floor(diffInMinutes / 60);
  const minutes = diffInMinutes % 60;
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;

  if (days > 0) {
    return `${days} d ${remainingHours} h ago`;
  } else if (hours > 0) {
    return `${hours} h ${minutes} m ago`;
  } else {
    return `${minutes} m ago`;
  }
};

const postReply = async (url, token, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  return response.json();
};

const fetchData = async (url, token) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

function CommunityComment({ _comment }) {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState(_comment);
  const [commenter, setCommenter] = useState(null);
  const [showReply, setShowReply] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setLoading(true);
    let url = "";

    if (comment?.userType === "user") {
      url = `${process.env.REACT_APP_API_URL}/user/getUserById/${comment?.authorId}`;
    } else if (comment?.userType === "vet") {
      url = `${process.env.REACT_APP_API_URL}/vet/getVetById/${comment?.authorId}`;
    } else if (comment?.userType === "seller") {
      url = `${process.env.REACT_APP_API_URL}/seller/getSellerById/${comment?.authorId}`;
    }

    fetchData(url, token)
      .then((data) => {
        setCommenter(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, [comment]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setLoading(true);
    const url = `${process.env.REACT_APP_API_URL}/communityPostComment/getReplies/${comment?.id}`;
    fetchData(url, token)
      .then((data) => {
        setReplies(data);

        // sort by date
        setReplies((prevReplies) =>
          prevReplies.sort((a, b) => {
            const dateA = new Date(a.timestamp);
            const dateB = new Date(b.timestamp);
            return  dateB- dateA;
          })
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, [comment]);

  const handleReplySubmit = async () => {
    const token = localStorage.getItem("authToken");
    const replyBody = {
      text: replyText,
      postId: comment?.postId,
      userType: localStorage.getItem("userType"),
      anonymous: isAnonymous,
      parent: comment?.id,
    };

    try {
      const url = `${process.env.REACT_APP_API_URL}/communityPostComment/reply`;
      const newReply = await postReply(url, token, replyBody);

      setReplies((prevReplies) => [...prevReplies, newReply]);
      setReplies((prevReplies) =>
        prevReplies.sort((a, b) => {
          const dateA = new Date(a.timestamp);
          const dateB = new Date(b.timestamp);
          return  dateB- dateA;
        })
      );
      setReplyText("");
      setShowReply(false);
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };

  if (loading) {
    return (
      <div>
        <div className="flex w-52 flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="skeleton h-10 w-10 shrink-0 rounded-full"></div>
            <div className="flex flex-col gap-2">
              <div className="skeleton h-4 w-32"></div>
            </div>
          </div>

          <div className="skeleton h-20 w-full"></div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="bg-base-200 m-1 rounded-xl p-3">
        <span className="text-xs float-right">
          <h1 className="text-xs text-info flex">
            <svg
              viewBox="0 0 32 32"
              className="mr-2 fill-current text-content h-4 w-4 mt-1 stroke-current"
              strokeWidth="1.5"
            >
              <g data-name="Layer 15" id="Layer_15">
                <path d="M16,31A15,15,0,1,1,31,16,15,15,0,0,1,16,31ZM16,3A13,13,0,1,0,29,16,13,13,0,0,0,16,3Z" />
                <path d="M20.24,21.66l-4.95-4.95A1,1,0,0,1,15,16V8h2v7.59l4.66,4.65Z" />
              </g>
            </svg>
            <span className="mt-1">{timeAgo(comment?.timestamp)}</span>
          </h1>
        </span>
        <div className="flex gap-3">
          <div className="avatar mt-0.5">
            {comment?.anonymous ? (
              <div className="ring-primary ring-offset-base-100 w-5 h-5 rounded-full ring ring-offset-2 hover:cursor-pointer hover:scale-105">
                <img
                  src={
                    "https://www.pngitem.com/pimgs/m/302-3023907_business-man-png-logo-transparent-png.png"
                  }
                />
              </div>
            ) : (
              <div
                className="ring-primary ring-offset-base-100 w-5 h-5 rounded-full ring ring-offset-2 hover:cursor-pointer hover:scale-105"
                onClick={() => {
                  window.location.href = `/${comment?.userType}/profile/${commenter?.id}`;
                }}
              >
                <img src={commenter?.image} />
              </div>
            )}
          </div>

          {comment?.anonymous ? (
            <div className="">
              <h2 className="font-semibold">Anonymous Member</h2>
            </div>
          ) : (
            <div className="">
              <h2
                className="font-semibold hover:text-primary cursor-pointer hover:scale-105"
                onClick={() => {
                  window.location.href = `/${comment?.userType}/profile/${commenter?.id}`;
                }}
              >
                {comment?.userType === "seller"
                  ? commenter?.name
                  : `${commenter?.firstname} ${commenter?.lastname}`}
              </h2>
            </div>
          )}
        </div>

        <div className="flex gap-1">
          <p className="mt-1 ml-4">{comment?.text}</p>
          <button
            className="btn btn-ghost italic mt-2 btn-xs"
            onClick={() => setShowReply(!showReply)}
          >
            reply
          </button>

          {/* Toggle showReplies state instead of showReply */}
          <button
            className="btn btn-ghost italic mt-2 btn-xs"
            onClick={() => setShowReplies(!showReplies)}
          >
            {showReplies ? "hide replies" : "show replies"} ({replies.length})
          </button>
        </div>

        {showReply && (
          <div className="flex">
            <div className="w-1/12">
              <div className="avatar">
                <div className="w-full max-h-16 mt-1 mr-1 rounded-full"></div>
              </div>
            </div>
            <div className="flex bg-base-200 rounded-lg ml-1 p-1 w-11/12">
              <div className="flex gap-1 w-full">
                <label className="cursor-pointer flex items-center">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="checkbox checkbox-primary mr-2"
                  />
                  <span className="label-text">Post as anonymous</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Write a reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleReplySubmit}>
                  Reply
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Only show replies when showReplies is true */}
        {showReplies &&
          replies.map((reply) => (
            <Reply key={reply.id} _comment={reply} setReplies={setReplies} />
          ))}
      </div>
    );
  }
}

export default CommunityComment;

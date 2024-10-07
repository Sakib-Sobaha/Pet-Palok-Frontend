import React from "react";
import { useState, useEffect } from "react";

const timeAgo = (timestamp) => {
  const now = new Date();
  const then = new Date(timestamp);
  const diffInMs = now - then;

  // Convert milliseconds to minutes, hours, and days
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

function CommunityReply({ _comment, setReplies }) {
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState(_comment);
  const [commenter, setCommenter] = useState(null);
  const [showReply, setShowReply] = useState(false); // State for toggling reply form
  const [replyText, setReplyText] = useState(""); // State to store reply input text
  const [isAnonymous, setIsAnonymous] = useState(false); // State to store the anonymous status of the reply

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

  // Handle reply submission
  const handleReplySubmit = async () => {
    const token = localStorage.getItem("authToken");
    const replyBody = {
      text: replyText,
      postId: comment?.postId, // Assuming comment has a postId prop
      userType: localStorage.getItem("userType"),
      anonymous: isAnonymous,
      parent: comment?.parent, // Set the current comment's id as the parent
    };

    try {
      const url = `${process.env.REACT_APP_API_URL}/communityPostComment/reply`;
      const newReply = await postReply(url, token, replyBody);

      // Update replies state with the new reply
      setReplies((prevReplies) => [...prevReplies, newReply]);
      setReplyText(""); // Clear the reply input
      setShowReply(false); // Hide the reply form after submission
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex">
        <div className="w-1/12">
          <div className="avatar">
            <div className="w-full max-h-16 mt-1 mr-1 rounded-full"></div>
          </div>
        </div>{" "}
        <div className="flex flex-col gap-2 w-11/12">
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
      <div className="flex">
        <div className="w-1/12">
          <div className="avatar">
            <div className="w-full max-h-16 mt-1 mr-1 rounded-full"></div>
          </div>
        </div>
        <div className="bg-base-300 m-1 rounded-xl p-3 w-11/12">
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
                <div
                  className="ring-primary ring-offset-base-100 w-5 h-5 rounded-full ring ring-offset-2 hover:cursor-pointer hover:scale-105"
                  onClick={() => {
                    // window.location.href = `/${comment?.userType}/profile/${commenter?.id}`;
                  }}
                >
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
                <h2
                  className="font-semibold hover:text-secondary cursor-pointer"
                  onClick={() => {
                    // window.location.href = `/${comment?.userType}/profile/${commenter?.id}`;
                  }}
                >
                  Anonymous Member
                </h2>
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
                    ? `${commenter?.name}`
                    : `${commenter?.firstname} ${commenter?.lastname}`}
                    {/* {comment?.authorId} */}
                </h2>
              </div>
            )}
          </div>

          <div className="flex gap-1">
            <p className="mt-1 ml-4">{comment?.text}</p>
            <button
              className="btn btn-ghost italic mt-2 btn-xs"
              onClick={() => setShowReply(!showReply)} // Toggle reply form visibility
            >
              reply
            </button>
          </div>

          {showReply && (
            <div className="flex">
              <div className="w-1/12">
                <div className="avatar">
                  <div className="w-full max-h-16 mt-1 mr-1 rounded-full"></div>
                </div>
              </div>
              <div className="flex bg-base-300 rounded-lg ml-1 p-1 w-11/12">
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
                    value={replyText} // Bind to state
                    onChange={(e) => setReplyText(e.target.value)} // Update state on change
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handleReplySubmit} // Submit reply
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default CommunityReply;

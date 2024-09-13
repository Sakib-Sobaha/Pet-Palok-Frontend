import React from "react";

const RightLayout = () => {
  const handleChatRoomRedirect = () => {
    window.location.href = "http://localhost:3000/chatroom"; // Redirect to chatroom
  };

  return (
    <div className="flex-1 bg-base-100 p-4 min-h-screen h-full rounded-lg">
      {/* Your content for RightLayout */}
      <button
        className="btn btn-outline btn-secondary dark:bg-transparent"
        onClick={handleChatRoomRedirect} // Call the function on button click
      >
        Enter ChatRoom
      </button>
      {/* Right Layout */}
    </div>
  );
};

export default RightLayout;

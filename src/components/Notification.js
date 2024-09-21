import React, { useEffect, useState } from "react";

const timeAgo = (timestamp) => {
  const now = new Date();
  const then = new Date(timestamp);
  const diffInMs = now - then;

  // Convert milliseconds to minutes and hours
  const diffInMinutes = Math.floor(diffInMs / 1000 / 60);
  const hours = Math.floor(diffInMinutes / 60);
  const minutes = diffInMinutes % 60;

  if (hours > 0) {
    return `${hours} h ${minutes} m ago`;
  } else {
    return `${minutes} m ago`;
  }
};

const Notification = ({ _notification }) => {
  const [notification, setNotification] = useState(_notification);

  // Update local notification state when the prop changes
  useEffect(() => {
    setNotification(_notification);
  }, [_notification]);

  const handleClick = () => {
    // Logic for redirecting to the appropriate notification page
    // Example: window.location.href = notification.link;
    console.log("Redirecting to notification page:", notification.link);
  };

  return (
    <div>
      <a className="justify-between cursor-pointer" onClick={handleClick}>
        {notification.unread ? (
          <span className="font-semibold">{notification.text}</span>
        ) : (
          <span>{notification.text}</span>
        )}
        {notification.unread && <span className="badge badge-info">New</span>}
        <br />

        <span className="text-xs text-content font-semibold float-right flex">
          <svg
            viewBox="0 0 32 32"
            className="mr-1 fill-current text-content h-4 w-4 mt-1 stroke-current"
            strokeWidth="1.5"
          >
            <title />
            <g data-name="Layer 15" id="Layer_15">
              <path
                className="cls-1"
                d="M16,31A15,15,0,1,1,31,16,15,15,0,0,1,16,31ZM16,3A13,13,0,1,0,29,16,13,13,0,0,0,16,3Z"
              />
              <path
                className="cls-1"
                d="M20.24,21.66l-4.95-4.95A1,1,0,0,1,15,16V8h2v7.59l4.66,4.65Z"
              />
            </g>
          </svg>
          <p className="mt-1 ml-0"> {timeAgo(notification.timestamp)}</p>
        </span>
      </a>
    </div>
  );
};

export default Notification;

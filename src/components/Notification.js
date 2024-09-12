import React, { useEffect, useState } from "react";

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
      <a
        className="justify-between cursor-pointer"
        onClick={handleClick}
      >
        {notification.unread ? (
          <span className="font-semibold">{notification.text}</span>
        ) : (
          <span>{notification.text}</span>
        )}
        {notification.unread && (
          <span className="badge badge-info">New</span>
        )}
      </a>
    </div>
  );
};

export default Notification;

import React from 'react';

const UserStatusIcon = ({ status }) => {
  const onlineColor = "#00FF00"; // Green color
  const offlineColor = "#FF0000"; // Red color
  const color = status === "online" ? onlineColor : offlineColor;

  return (
    <i
      className="fa fa-lightbulb-o"
      style={{ color }}
      aria-hidden="true"
    ></i>
  );
};

export default UserStatusIcon;

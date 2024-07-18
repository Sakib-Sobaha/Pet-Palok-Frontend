import React from "react";

function MenuLeftSidebar({ type }) {
  return (
    <div>
      {type === "user" && (
        <ul className="menu bg-base-200 w-full p-2 rounded-box">
          <li>
            <a>Pets</a>
          </li>
          <li>
            <a>Marketplace</a>
          </li>
          <li>
            <a>Vet Directory</a>
          </li>
        </ul>
      )}
      {type === "seller" && (
        <ul className="menu bg-base-200 w-full p-2 rounded-box">
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <a>Item 2</a>
          </li>
          <li>
            <a>Item 3</a>
          </li>
        </ul>
      )}
      {type === "vet" && (
        <ul className="menu bg-base-200 w-full p-2 rounded-box">
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <a>Item 2</a>
          </li>
          <li>
            <a>Item 3</a>
          </li>
        </ul>
      )}
    </div>
  );
}

export default MenuLeftSidebar;

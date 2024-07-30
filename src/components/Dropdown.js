// Dropdown.js
import React, { useState } from "react";

function Dropdown() {
  // Manage account type state (can be 'user', 'seller', or 'vet')
  const [accountType, setAccountType] = useState("vet");

  // Define menu items for each account type
  const userMenuItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Pets", href: "/user/pets" },
    { name: "Marketplace", href: "/marketplace" },
    { name: "Vet Directory", href: "/vetdirectory" },
    { name: "Lost and Found", href: "/user/lost-and-found" },
    { name: "Community", href: "/community" },
  ];

  const sellerMenuItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Marketplace", href: "/marketplace" },
    { name: "My Store", href: "/seller/store" },
  ];

  const vetMenuItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Vet Directory", href: "/vetdirectory" },
    { name: "Schedules", href: "/vet/schedules" },
    { name: "Visit Requests", href: "/vet/visit-requests" },
  ];

  // Common menu items for all account types
  const commonMenuItems = [
    { name: "Login/Signup", href: "/login" },
    { name: "Profile", href: "/profile" },
    { name: "Settings", href: "/settings" },
  ];

  // Determine which menu items to render based on account type
  let menuItems;
  if (accountType === "user") {
    menuItems = userMenuItems;
  } else if (accountType === "seller") {
    menuItems = sellerMenuItems;
  } else if (accountType === "vet") {
    menuItems = vetMenuItems;
  }

  // Combine account-specific and common menu items
  const combinedMenuItems = [...menuItems, ...commonMenuItems];

  return (
    <div>
      <details className="dropdown">
        <summary className="btn m-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </summary>
        <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
          {combinedMenuItems.map((item, index) => (
            <li key={index}>
              <a href={item.href}>{item.name}</a>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}

export default Dropdown;

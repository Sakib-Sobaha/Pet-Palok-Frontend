import React, { useContext, useEffect, useState } from "react";
import Drawer from "./Drawer";
import { ThemeContext } from "../components/ThemeContext"; // Import ThemeContext
import Dropdown from "./Dropdown";
import logo from "../images/logo_cropped.png";
import { fetchUserData } from "./api-fetch-functions/fetch-whoami";
import ShoppingCartIcon from "./icons/shopping-carticon";
import axios from "axios";
import Notification from "./Notification";
import SearchBar from "./Search/Search-Bar";

function Navbar() {
  const userType = localStorage.getItem("userType");
  const token = localStorage.getItem("authToken");

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { theme, toggleTheme } = useContext(ThemeContext); // Use theme context
  const [userId, setUserId] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    const url = `${process.env.REACT_APP_API_URL}/notifications/${userType}/fetch`;
    const data = await fetchData(token, url);
    console.log(data);
    setNotifications(data);
  };

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    const fetchUser = async () => {
      setLoading(true);
      const data = await fetchUserData(`/${userType}/whoami`); // Use the reusable fetch function
      if (data) {
        setUser(data);
        setUserId(data.id); // Pass the user ID to the parent component if needed
      }
      setLoading(false);
    };

    fetchUser();
    fetchNotifications();
  }, []);

  // const updateUserStatus = async (status) => {
  //   const userType = localStorage.getItem("userType");
  //   const token = localStorage.getItem("authToken");
  //   try {
  //     // fetch the logged in userId

  //     await axios.patch(`${process.env.REACT_APP_API_URL}/${userType}/update-status/${userId}`, {
  //       status: status,
  //     });
  //   } catch (error) {
  //     console.error("Failed to update satsus", error);
  //   }
  // };

  // useEffect(() => {
  //   updateUserStatus("offline");
  //   return () => {
  //     updateUserStatus("offline");
  //   };
  // }, []);

  const fetchData = async (token, url) => {
    try {
      setLoading(true);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserStatus = async (status) => {
    const userType = localStorage.getItem("userType");
    try {
      // Construct the URL for the API request
      const url = `${process.env.REACT_APP_API_URL}/${userType}/update-status/${userId}`;
      console.log(url);

      // Get the Bearer token from local storage
      const token = localStorage.getItem("authToken");

      // Make the API request with the Authorization header
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }), // Send the status in the body
      });

      // Handle the response
      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      console.log("Status updated successfully");
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  // Mark all notifications as read and update state
  const markAllAsRead = async () => {
    const url = `${process.env.REACT_APP_API_URL}/notifications/${userType}/markAllAsRead`;

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to mark notifications as read");
      }

      // Directly update the notifications in the state to set unread to false
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) => ({
          ...notification,
          unread: false,
        }))
      );
    } catch (error) {
      console.error("Failed to mark notifications as read", error);
    }
  };

  const clearAll = async () => {
    const url = `${process.env.REACT_APP_API_URL}/notifications/${userType}/clearAll`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete notifications");
      }

      // Directly update the notifications in the state to set unread to false
      setNotifications([]);
    } catch (error) {
      console.error("Failed to mark notifications as read", error);
    }
  };

  const handleLogout = async () => {
    await updateUserStatus("offline");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userType");
    window.location.href = "/login";
  };

  return (
    <div className="navbar bg-base-200">
      {/* <Drawer /> */}
      <Dropdown _user={user} />
      <div className="flex-1 pr-2 justify-start">
        <img
          src={logo}
          alt="PetPalok"
          className="h-12 rounded-lg hover:shadow hover:scale-105 cursor-pointer"
          onClick={() => {
            window.location.href = "/landing";
          }}
        />
      </div>
      {user?.email}
      {notifications?.length}

      {/* notifications , cart, theme */}
      <div className="flex-1 pr-4 justify-end">
        {localStorage.getItem("authToken") !== null && notifications && (
          <div className="dropdown dropdown-bottom">
            <div tabIndex={0} role="button" className="m-0 indicator">
              {/* Badge showing the count of unread notifications */}
              {notifications.filter((notification) => notification.unread)
                .length > 0 && (
                <span className="indicator-item indicator-top indicator-end mr-4 mt-1 badge badge-xs badge-info hover:badge-primary">
                  {notifications.filter((notification) => notification.unread)
                    .length > 99
                    ? "99+"
                    : notifications.filter(
                        (notification) => notification.unread
                      ).length}
                </span>
              )}

              {/* Icon with hover effects */}
              <svg
                data-name="Layer 1"
                id="Layer_1"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-7 fill-current stroke-current mr-4 hover:cursor-pointer mt-0 hover:fill-primary hover:stroke-primary hover:scale-110"
              >
                <path d="M40.62,28.34l-.87-.7A2,2,0,0,1,39,26.08V18A15,15,0,0,0,26.91,3.29a3,3,0,0,0-5.81,0A15,15,0,0,0,9,18v8.08a2,2,0,0,1-.75,1.56l-.87.7a9,9,0,0,0-3.38,7V37a4,4,0,0,0,4,4h8.26a8,8,0,0,0,15.47,0H40a4,4,0,0,0,4-4V35.36A9,9,0,0,0,40.62,28.34ZM24,43a4,4,0,0,1-3.44-2h6.89A4,4,0,0,1,24,43Zm16-6H8V35.36a5,5,0,0,1,1.88-3.9l.87-.7A6,6,0,0,0,13,26.08V18a11,11,0,0,1,22,0v8.08a6,6,0,0,0,2.25,4.69l.87.7A5,5,0,0,1,40,35.36Z" />
              </svg>
            </div>

            {/* Dropdown menu with notifications */}
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-80  p-2 shadow"
            >
              <button
                className="btn p-0 rounded-none btn-sm btn-ghost italic"
                onClick={clearAll}
              >
                Clear All{" "}
              </button>

              {notifications
                .sort((a, b) => {
                  // Sort by unread status first, unread (true) should come first
                  if (a.unread !== b.unread) {
                    return a.unread ? -1 : 1;
                  }
                  // If both have the same unread status, sort by timestamp (newest first)
                  return new Date(b.timestamp) - new Date(a.timestamp);
                })
                .map((notification) => (
                  <li key={notification.id}>
                    <Notification _notification={notification} />
                  </li>
                ))}
              <button
                className="btn p-0 rounded-none btn-sm btn-ghost italic"
                onClick={markAllAsRead}
              >
                Mark all as read
              </button>
            </ul>
          </div>
        )}
        {userType?.toLowerCase() == "user" && (
          <label
            className="mr-4 hover:cursor-pointer"
            onClick={() => {
              window.location.href = `/cart`;
            }}
          >
            <svg
              version="1.1"
              id="shopping_x5F_carts_1_"
              xmlns="http://www.w3.org/2000/svg"
              x="0"
              y="0"
              viewBox="0 0 128 128"
              style={{ enableBackground: "new 0 0 128 128" }}
              xmlSpace="preserve"
              className="h-8 w-8 fill-current stroke-current hover:fill-primary hover:stroke-primary hover:scale-110"
              strokeWidth="2.5"
            >
              <style>{`.st0{display:none}.st1{display:inline}.st2{}`}</style>
              <g id="_x34__1_">
                <path
                  className="st2"
                  d="M45.3 81.2h78V43.7L35.9 25.4l-3.1-12.9-12.6-4.2c0-.2.1-.3.1-.5 0-4.3-3.5-7.8-7.8-7.8S4.7 3.5 4.7 7.8s3.5 7.8 7.8 7.8c1.8 0 3.4-.6 4.7-1.6l9.4 4.7L39 78l-12.5 9.4V103l5.7 7.1c-1.6 1.9-2.5 4.3-2.5 7 0 6 4.9 10.9 10.9 10.9s10.9-4.9 10.9-10.9-4.9-10.9-10.9-10.9c-.9 0-1.8.1-2.6.3l-2.1-3.4h65.6l3.6 6c-2.2 2-3.6 4.9-3.6 8.1 0 6 4.9 10.9 10.9 10.9s10.9-4.9 10.9-10.9-4.9-10.9-10.9-10.9h-.3l-1.3-3.1h12.5V97H32.8v-6.2l12.5-9.6zm0-6.3-4.6-21.4.6 3L59.8 58l3.8 17H45.3zm21.8 0-3.7-16.7 18.1 1.4 1.4 15.3H67.1zm18.8 0-1.4-15 17 1.3v13.7H85.9zm31.2-15.6v15.6h-12.5V61.5l12.5 1v-3.2l-12.5-1V44.4l12.5 2.4v12.5zM35.9 31.2l65.6 12.6V58l-17.3-1.4-1.5-16.4-3.1-.6 1.6 16.8-18.5-1.5-4.3-19.3-3.7-.7 4.4 19.7-18.5-1.5-4.7-21.9zm76.5 81.2c2.6 0 4.7 2.1 4.7 4.7s-2.1 4.7-4.7 4.7-4.7-2.1-4.7-4.7 2.1-4.7 4.7-4.7zm-71.8 0c2.6 0 4.7 2.1 4.7 4.7s-2.1 4.7-4.7 4.7-4.7-2.1-4.7-4.7 2.1-4.7 4.7-4.7z"
                  id="icon_11_"
                />
              </g>
            </svg>
          </label>
        )}

        <label className="swap swap-rotate group">
          {/* this hidden checkbox controls the state */}
          <input
            type="checkbox"
            className="theme-controller"
            value="night"
            onChange={toggleTheme}
            checked={theme === "dark"}
          />

          {/* sun icon */}
          <svg
            className="swap-off h-10 w-10 fill-current group-hover:fill-primary group-hover:stroke-primary group-hover:scale-105"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          {/* moon icon */}
          <svg
            className="swap-on h-10 w-10 fill-current group-hover:fill-primary group-hover:stroke-primary group-hover:scale-105"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
      </div>

      <div className="flex-none gap-2">
        <SearchBar />

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              {localStorage.getItem("userType") === null && (
                <img
                  src="https://static-00.iconduck.com/assets.00/user-icon-1024x1024-dtzturco.png"
                  alt="user"
                  className="h-5 w-5"
                />
              )}
              {localStorage.getItem("userType") !== null && (
                <img
                  alt={user?.firstname + " " + user?.lastname}
                  src={user?.image}
                />
              )}
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a
                className="justify-between"
                onClick={() => {
                  if (userType != "" && userType)
                    window.location.href = `/${userType}/profile/${user.id}`;
                }}
              >
                Profile
                {/* <span className="badge">New</span> */}
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

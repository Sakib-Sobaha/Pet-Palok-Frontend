import React, { useContext, useEffect, useState } from "react";
import Drawer from "./Drawer";
import { ThemeContext } from "../components/ThemeContext"; // Import ThemeContext
import Dropdown from "./Dropdown";
import logo from "../images/logo_cropped.png";
import { fetchUserData } from "./api-fetch-functions/fetch-whoami";
import ShoppingCartIcon from "./icons/shopping-carticon";

const notifications = [
  {
    id: 1,
    userType: "user",
    receiverId: 1,
    type: "ORDER_ACCEPTED",
    text: "Your order has been accepted",
    unread: true,
    mainContext: 1,
    timeStamp: "2021-10-10T10:10:10",
  },
  {
    id: 2,
    userType: "user",
    receiverId: 1,
    type: "ORDER_DELIVERED",
    text: "Your order has been delivered",
    unread: true,
    mainContext: 1,
    timeStamp: "2021-10-10T10:10:10",
  },
  {
    id: 3,
    userType: "user",
    receiverId: 1,
    type: "ORDER_CANCELLED",
    text: "Your order has been cancelled",
    unread: false,
    mainContext: 1,
    timeStamp: "2021-10-10T10:10:10",
  },
];

function Navbar() {
  const userType = localStorage.getItem("userType");
  const token = localStorage.getItem("authToken");

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { theme, toggleTheme } = useContext(ThemeContext); // Use theme context

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    const fetchUser = async () => {
      setLoading(true);
      const data = await fetchUserData(`/${userType}/whoami`); // Use the reusable fetch function
      if (data) {
        setUser(data);
        // setUserId(data.id); // Pass the user ID to the parent component if needed
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
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


      {/* notifications , cart, theme */}
      <div className="flex-1 pr-4 justify-end">
        {localStorage.getItem("authToken") !== null && (
          <div className="dropdown dropdown-bottom">
            <div tabIndex={0} role="button" className=" m-0">
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
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              {notifications.map((notification) => (
                <li key={notification.id}>
                  <a
                    className="justify-between"
                    onClick={() => {
                      // window.location.href = `/${userType}/notifications/${notification.id}`;
                      // redirect to context .. depending on type of noti
                    }}
                  >
                    {notification.unread ? (
                      <span className="font-semibold">{notification.text}</span>
                    ) : (
                      <span>{notification.text}</span>
                    )}
                    {notification.unread && <span className="badge badge-primary">New</span>}
                  </a>
                </li>
              ))}
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
        <label className="swap swap-rotate">
          {/* this hidden checkbox controls the state */}
          <input
            type="checkbox"
            className="theme-controller "
            value="night"
            onChange={toggleTheme}
            checked={theme === "dark"}
          />

          {/* sun icon */}
          <svg
            className="swap-off h-10 w-10 fill-current hover:fill-primary hover:stroke-primary hover:scale-110"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          {/* moon icon */}
          <svg
            className="swap-on h-10 w-10 fill-current hover:fill-primary hover:stroke-primary hover:scale-110"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
      </div>

      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt={user?.firstname + " " + user?.lastname}
                src={user?.image}
              />
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

import React, {useEffect, useState} from "react";
import SingleChatLeft from "./single-chat-left";


const fetchData = async () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    console.error("No auth token found in local storage.");
    return [];
  }

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    console.log(JSON.stringify(response));

    if (!response.ok) {
      console.error("Failed to fetch users");
      return;
    }

    const data = await response.json();
    return data; // Assuming the response is an array of users
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};

const fetchVetData = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No auth token found in local storage.");
      return [];
    }
  
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/vet/getVets`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      console.log(JSON.stringify(response));
  
      if (!response.ok) {
        console.error("Failed to fetch users");
        return;
      }
  
      const data = await response.json();
      return data; // Assuming the response is an array of users
    } catch (error) {
      console.error("Fetch error:", error);
      return [];
    }
  };

  const fetchSellerData = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No auth token found in local storage.");
      return [];
    }
  
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/seller/getSellers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      console.log(JSON.stringify(response));
  
      if (!response.ok) {
        console.error("Failed to fetch users");
        return;
      }
  
      const data = await response.json();
      return data; // Assuming the response is an array of users
    } catch (error) {
      console.error("Fetch error:", error);
      return [];
    }
  };


const InboxContainer = () => {
  const [users, setUsers] = React.useState([]);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [userDetails, setUserDetails] = React.useState(null);
  const [loadingDetails, setLoadingDetails] = React.useState(false);
  const [vets, setVets] = React.useState([]);
  const [sellers, setSellers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    try{
      setLoading(true);
      const loadUsers = async () => {
          const usersData = await fetchData();
          setUsers(usersData);
      }

      loadUsers();
      
    } catch (error) {
      console.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }
  , []);

    useEffect(() => {
      try{
        setLoading(true);
        const loadVets = async () => {
            const vetsData = await fetchVetData();
            setVets(vetsData);
        }

        loadVets();
        
      } catch (error) {
        console.error("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    }
    , []);

    useEffect(() => {
      try{
        setLoading(true);
        const loadSellers = async () => {
            const sellersData = await fetchSellerData();
            setSellers(sellersData);
        }

        loadSellers();
        
      } catch (error) {
        console.error("Failed to fetch sellers");
      } finally {
        setLoading(false);
      }
    }
    , []);

    const handleUserClick = async (user) => {
      setSelectedUser(user);
      // onSelectUser(user);
      setLoadingDetails(true);
      const token = localStorage.getItem("authToken");
  
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/user/getUserById/${user.id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
  
        if (!response.ok) {
          console.error("Failed to fetch user details");
          return;
        }
  
        const data = await response.json();
        setUserDetails(data);
        console.log(data);
        // onSelectUser(userDetails);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoadingDetails(false);
      }
    }


  return (
    <div>
      {/* <ul className="menu menu-lg bg-base-200 w-full m-0 p-0">
        <li>
          <SingleChatLeft person="Niloy" lastMessage="kire ki koros?" />
        </li>
        <li>
          <SingleChatLeft
            person="Sobaha"
            lastMessage="kire halar vai beche asos?"
          />{" "}
        </li>
        <li>
          <SingleChatLeft person="Rakib" lastMessage="asm korsos?" />
        </li>
      </ul> */}
      <div className="connected-users">
        {loading ? (
          <p className="mt-5">
            <span className="loading loading-ring loading-lg text-primary"></span>{" "}
            Loading users...
          </p>
        ) : (
          <>
            <h2 className="text-xl font-bold">Connected Users</h2>
            <ul id="userList">
              {users.length > 0 ? (
                users.map((user) => (
                  <li 
                    key={user.id} 
                    className={`mb-4 flex items-center cursor-pointer ${selectedUser?.id === user.id ? "bg-gray-200" : ""}`}
                    onClick={() => handleUserClick(user)}
                  >
                  
                  
                    {/* Circle with user image and online status indicator */}
                    <div className="relative">
                      <img
                        src={user.image || "default_avatar.png"} // Replace 'default_avatar.png' with your default avatar image
                        alt={user.firstname}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className={`absolute right-0 bottom-0 block h-1.5 w-1.5 rounded-full ring-1 ring-white ${user.status === "online" ? "bg-green-400" : "bg-red-400"}`}></span>
                    </div>
                    {/* User's Name and Email */}
                    <div className="ml-3">
                      <p className="font-semibold">{user.firstname}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </li>
                ))
              ) : (
                <li>No users found</li>
              )}
            </ul>
          </>
        )}
      </div>


      <div className="connected-vets">
        <h2 className="text-xl font-bold">Connected Vets</h2>
        <ul id="vetList">
          {vets.length > 0 ? (
            vets.map((vet) => (
              <li key={vet.id} className="mb-4 flex items-center">
                {/* Circle with user image and online status indicator */}
                <div className="relative">
                  <img
                    src={vet.image || "default_avatar.png"} // Replace 'default_avatar.png' with your default avatar image
                    alt={vet.firstname}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className={`absolute right-0 bottom-0 block h-1.5 w-1.5 rounded-full ring-1 ring-white ${vet.status === "online" ? "bg-green-400" : "bg-red-400"}`}></span>
                </div>
                {/* User's Name and Email */}
                <div className="ml-3">
                  <p className="font-semibold">{vet.firstname}</p>
                  <p className="text-sm text-gray-500">{vet.email}</p>
                </div>
              </li>
            ))
          ) : (
            <li>No Vet found</li>
          )}
        </ul>
      </div>

      <div className="connected-users">
        <h2 className="text-xl font-bold">Connected Sellers</h2>
        <ul id="sellerList">
          {sellers.length > 0 ? (
            sellers.map((seller) => (
              <li key={seller.id} className="mb-4 flex items-center">
                {/* Circle with seller image and online status indicator */}
                <div className="relative">
                  <img
                    src={seller.image || "default_avatar.png"} // Replace 'default_avatar.png' with your default avatar image
                    alt={seller.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className={`absolute right-0 bottom-0 block h-1.5 w-1.5 rounded-full ring-1 ring-white ${seller.status === "online" ? "bg-green-400" : "bg-red-400"}`}></span>
                </div>
                {/* seller's Name and Email */}
                <div className="ml-3">
                  <p className="font-semibold">{seller.name}</p>
                  <p className="text-sm text-gray-500">{seller.email}</p>
                </div>
              </li>
            ))
          ) : (
            <li>No sellers found</li>
          )}
        </ul>
      </div>



    </div>
  );
}

export default InboxContainer;

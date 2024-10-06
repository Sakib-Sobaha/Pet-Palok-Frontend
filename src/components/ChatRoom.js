import React, { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import { over } from "stompjs";
import { useRef } from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import ChatLeft from "./chatbox/chat-left";
import ChatRight from "./chatbox/chat-right";

var stompClient = null;

const fetchUsersData = async () => {
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
        Authorization: `Bearer ${token}`,
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
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/vet/getVets`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/seller/getSellers`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
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

const MiddleLayoutChatbox = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [user, setUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const [users, setUsers] = React.useState([]);
  const [vets, setVets] = React.useState([]);
  const [sellers, setSellers] = React.useState([]);

  const [userDetails, setUserDetails] = React.useState(null);
  const [loadingDetails, setLoadingDetails] = React.useState(false);

  const [senderId, setSenderId] = useState(null);
  const [recipientId, setRecipientId] = useState(null);
  const [content, setContent] = useState("");
  const [chatContent, setChatContent] = useState("");
  const [timestamp, setTimestamp] = useState(null);

  const [selectedUserDetails, setSelectedUserDetails] = useState(null);

  const [stompClient, setStompClient] = useState(null);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  const chatAreaRef = useRef(null);

  const isUser = selectedUser?.role === "USER"; // Check if the logged-in user is the vet (owner)
  const isVet = selectedUser?.role === "VET"; // Check if the logged-in user is the vet (owner)
  const isSeller = selectedUser?.role === "SELLER"; // Check if the logged-in user is the vet (owner)

  useEffect(() => {
    // Get the selected user from localStorage or other navigation method
    const userFromStorage = localStorage.getItem("selectedUser");
    if (userFromStorage) {
      setSelectedUser(JSON.parse(userFromStorage)); // Parse and set the selected user
      setRecipientId(selectedUser?.id);
    }
  }, []);

  useEffect(() => {
    try {
      setLoading(true);
      const loadUsers = async () => {
        const usersData = await fetchUsersData();
        setUsers(usersData);
      };

      loadUsers();
    } catch (error) {
      console.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    try {
      setLoading(true);
      const loadVets = async () => {
        const vetsData = await fetchVetData();
        setVets(vetsData);
      };

      loadVets();
    } catch (error) {
      console.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    try {
      setLoading(true);
      const loadSellers = async () => {
        const sellersData = await fetchSellerData();
        setSellers(sellersData);
      };

      loadSellers();
    } catch (error) {
      console.error("Failed to fetch sellers");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleUserClick = async (user) => {
    setSelectedUser(user);
    setRecipientId(selectedUser?.id);
    console.log("Recipient UserId:", recipientId);

    console.log("Selected User:", user);

    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("No auth token found in local storage.");
      return;
    }

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
      console.log(data);
      setRecipientId(data.id);
      console.log("Recipient UserId:", recipientId);
      // setSelectedUserDetails(data);
      // console.log(selectedUserDetails);
      // onSelectUser(userDetails);
    } catch (error) {
      console.error("Fetch error:", error);
      return;
    } finally {
    }
  };

  const handleVetClick = async (vet) => {
    setSelectedUser(vet);
    setRecipientId(selectedUser?.id);
    console.log("Recipient UserId:", recipientId);

    console.log("Selected Vet:", vet);

    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("No auth token found in local storage.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/vet/getVetById/${vet.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.error("Failed to fetch vet details");
        return;
      }

      const data = await response.json();
      console.log(data);
      setRecipientId(data.id);
      console.log("Recipient VetId:", recipientId);
      // setSelectedUserDetails(data);
      // console.log(selectedUserDetails);
      // onSelectUser(userDetails);
    } catch (error) {
      console.error("Fetch error:", error);
      return;
    } finally {
    }
  };

  const handleSellerClick = async (seller) => {
    setSelectedUser(seller);
    setRecipientId(selectedUser?.id);
    console.log("Recipient SellerId:", recipientId);

    console.log("Selected Seller:", seller);

    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("No auth token found in local storage.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/seller/getSellerById/${seller.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.error("Failed to fetch seller details");
        return;
      }

      const data = await response.json();
      console.log(data);
      setRecipientId(data.id);
      console.log("Recipient SellerId:", recipientId);
      // setSelectedUserDetails(data);
      // console.log(selectedUserDetails);
      // onSelectUser(userDetails);
    } catch (error) {
      console.error("Fetch error:", error);
      return;
    } finally {
    }
  };

  const fetchConnectedUsers = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/user/connected-users`;
      const token = localStorage.getItem("authToken");
      console.log(url);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      setConnectedUsers(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching connected users:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnectedUsers();
  }, []);

  const fetchUserData = async () => {
    const token = localStorage.getItem("authToken");
    const userType = localStorage.getItem("userType");
    try {
      // Construct the URL for the API request
      const url = `${process.env.REACT_APP_API_URL}/${userType}/whoami`;
      console.log(url);

      // Get the Bearer token from local storage (or wherever you store it)

      // Make the API request with the Authorization header
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // Parse the response data
      const data = await response.json();

      // Update the state with the fetched data
      setUser(data);
      setLoggedInUser(data);
      setFirstname(data.firstname);
      setLastname(data.lastname);
      setSenderId(data.id);
      console.log("Sender Id: ", senderId);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // useEffect(() => {
  //   if (user) {
  //     connectWebSocket();
  //   }
  // }, [user]);

  useEffect(() => {
    if (user && selectedUser) {
      fetchChatHistory();
      connectWebSocket();
    }

    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, [user, selectedUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const connectWebSocket = () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No auth token found in local storage.");
      return;
    }

    // try {
    //   // Create a new SockJS instance
    //   const socket = new SockJS(`http://localhost:8080/ws`);
    //   // Create a STOMP client
    //   const stompClient = Stomp.over(socket);

    //   // Connect to the WebSocket server
    //   stompClient.connect(
    //     {}, // Send token in the headers if required
    //     () => onConnected(stompClient),
    //     onError
    //   );

    //   // Save stompClient to state or ref if needed
    //   setStompClient(stompClient);

    // } catch (error) {
    //   console.error("Failed to establish WebSocket connection:", error);
    // }
    try {
      const socket = new SockJS(`http://localhost:8080/ws`);
      const client = new Client({
        webSocketFactory: () => socket,
        debug: (str) => console.log(str),
        onConnect: () => onConnected(client),
        onStompError: (frame) => {
          console.error("STOMP error: " + frame.headers["message"]);
        },
        onWebSocketError: (event) => {
          console.error("WebSocket error:", event);
        },
        onWebSocketClose: (event) => {
          console.log("WebSocket connection closed:", event);
        },
      });

      client.activate();
      setStompClient(client);
    } catch (error) {
      console.error("Failed to establish WebSocket connection:", error);
    }
  };

  const fetchChatHistory = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No auth token found in local storage.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/messages/${user?.id}/${selectedUser?.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const chatHistory = await response.json();
      console.log("Chat history:", chatHistory);
      // setMessages(response.data);
      setMessages(chatHistory || []);
      setTimeout(scrollToBottom, 0);
      // scrollToBottom();
    } catch (error) {
      console.error("Failed to fetch chat history:", error);
    }
  };

  const onConnected = (stompClient) => {
    setStompClient(stompClient);

    stompClient.subscribe(
      `/user/${user?.id}/queue/messages`,
      onMessageReceived
    );
    stompClient.subscribe(`user/public`, onMessageReceived);

    // fetchChatHistory();

    setIsConnected(true);
    // stompClient.subscribe("/topic/messages", onMessageReceived);
  };

  const onMessageReceived = (payload) => {
    const message = JSON.parse(payload.body);
    console.log("Timestamp:", JSON.stringify(message.timestamp));
    console.log("Message received:", message);
    if (
      (message.senderId === user?.id &&
        message.recipientId === selectedUser?.id) ||
      (message.senderId === selectedUser?.id &&
        message.recipientId === user?.id)
    ) {
      setMessages((prevMessages) => {
        if (!prevMessages.some((msg) => msg.id === message.id)) {
          return [...prevMessages, message];
        }
        return prevMessages;
      });
      // addMessage(message.senderId, message.content);
      scrollToBottom();
    }
  };

  const addMessage = (senderId, content) => {
    const newMessage = { senderId, content };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    scrollToBottom();
  };

  const scrollToBottom = () => {
    // chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    chatAreaRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // This will run whenever `messages` is updated

  const connectToWebSocket = () => {
    const socket = new SockJS(`http://localhost:8080/ws`);
    const client = new Client({
      webSocketFactory: () => socket,
      debug: (str) => {
        console.log(str);
      },
      onConnect: () => {
        console.log("WebSocket Connected");
        client.subscribe(`/user/${user?.id}/queue/messages`, (message) => {
          const newMessage = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        });
      },

      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      },
      onWebSocketError: (event) => {
        console.error("WebSocket error observed:", event);
      },
      onWebSocketClose: (event) => {
        console.log("WebSocket connection closed:", event);
      },
    });

    client.activate();
    setStompClient(client);
  };

  const fetchAndDisplayUserChat = async (senderId, recipientId) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("No auth token found in local storage.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/messages/${senderId}/${recipientId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const userChat = await response.json();
      console.log("User chat:", userChat);
      setMessages(userChat);
      scrollToBottom();
    } catch (error) {
      console.error("Failed to fetch user chat:", error);
    }
  };

  // useEffect(() => {
  //   fetchAndDisplayUserChat(user?.id, selectedUser?.id);
  // }, [user, selectedUser]);

  const onError = () => {
    console.error("WebSocket error");
  };

  const handleSendMessage = (e) => {
    // event.preventDefault();
    e.preventDefault();
    if (!inputMessage.trim() || !stompClient) return;

    const chatMessage = {
      senderId: user.id,
      recipientId: selectedUser?.id,
      content: inputMessage,
      timestamp: new Date().toISOString(),
    };

    console.log("Chat message:", chatMessage);

    // WebSocket connection and subscription
    // stompClient.connect({}, () => {
    //   console.log("Connected to WebSocket");
    //   stompClient.subscribe(`/user/${selectedUser.id}/queue/messages`, (message) => {
    //     console.log("Message received:", message.body);
    //     const newMessage = JSON.parse(message.body);
    //     setMessages((prevMessages) => [...prevMessages, newMessage]);
    //   });
    // });

    stompClient.publish({
      destination: `/app/chat`,
      body: JSON.stringify(chatMessage),
    });

    // setMessages((prevMessages) => [...(prevMessages || []), chatMessage]);
    // Add the sent message to the local message state and scroll down after update
    // setMessages((prevMessages) => {
    //   const updatedMessages = [...(prevMessages || []), chatMessage];

    //   // Use setTimeout to ensure the DOM is updated before scrolling
    //   setTimeout(() => scrollToBottom(), 0);

    //   return updatedMessages;
    // });

    setMessages((prevMessages) => [...prevMessages, chatMessage]);

    setTimeout(() => scrollToBottom(), 0);

    // fetchChatHistory();
    setInputMessage("");
  };

  // Extract unique users based on conversations and sort by the latest message timestamp
  const sortedUsers = [
    ...new Set(
      messages
        .filter(
          (msg) =>
            msg.senderId === loggedInUser?.id ||
            msg.recipientId === loggedInUser?.id
        )
        .map((msg) =>
          msg.senderId === loggedInUser?.id ? msg.recipientId : msg.senderId
        )
    ),
  ].sort((userA, userB) => {
    const latestMessageA = messages
      .filter(
        (msg) =>
          (msg.senderId === userA && msg.recipientId === loggedInUser?.id) ||
          (msg.senderId === loggedInUser?.id && msg.recipientId === userA)
      )
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];

    const latestMessageB = messages
      .filter(
        (msg) =>
          (msg.senderId === userB && msg.recipientId === loggedInUser?.id) ||
          (msg.senderId === loggedInUser?.id && msg.recipientId === userB)
      )
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];

    return (
      new Date(latestMessageB?.timestamp) - new Date(latestMessageA?.timestamp)
    );
  });

  // useEffect(() => {
  //   if (user && selectedUser && isConnected) {
  //     connectWebSocket(); // Connect to the WebSocket once user and selectedUser are defined
  //   }
  // }, [user, selectedUser, isConnected]);

  return (
    <div className="flex">
      <div className="w-1/4 p-4 border-r border-gray-300">
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
                  users.map((user) => {
                    const latestMessage = messages
                      .filter(
                        (msg) =>
                          (msg.senderId === user.id &&
                            msg.recipientId === selectedUser?.id) ||
                          (msg.senderId === selectedUser?.id &&
                            msg.recipientId === user.id)
                      )
                      .sort(
                        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
                      )[0]; // Get the latest message

                    const isMessageSeen = latestMessage?.seen; // Check if the latest message is seen
                    const messageStyle = isMessageSeen
                      ? "text-gray-500"
                      : "font-bold"; // Set style based on seen/unseen

                    return (
                      <li
                        key={user.id}
                        className={`mb-4 flex items-center cursor-pointer ${
                          selectedUser?.id === user.id ? "bg-base-200 p-1 rounded-lg" : ""
                        }`}
                        onClick={() => handleUserClick(user)}
                      >
                        {/* Circle with user image and online status indicator */}
                        <div className="relative m-1">
                          <img
                            src={user.image || "default_avatar.png"} // Replace 'default_avatar.png' with your default avatar image
                            alt={user.firstname}
                            className="w-8 h-8 rounded-full"
                          />
                          <span
                            className={`absolute right-0 bottom-0 block h-1.5 w-1.5 rounded-full ring-1 ring-white ${
                              user.status === "online"
                                ? "bg-green-400"
                                : "bg-red-400"
                            }`}
                          ></span>
                        </div>
                        {/* User's Name, Latest Message and Email */}
                        <div className="ml-3">
                          <p className="font-semibold">{user.firstname}</p>
                          {/* Display the latest message */}
                          {latestMessage && (
                            <p className={`text-sm ${messageStyle}`}>
                              {latestMessage.content} -{" "}
                              <span className="text-xs">
                                {new Date(
                                  latestMessage.timestamp
                                ).toLocaleTimeString()}
                              </span>
                            </p>
                          )}
                        </div>
                      </li>
                    );
                  })
                ) : (
                  <li>No users found</li>
                )}
              </ul>
            </>
          )}
        </div>

        <div className="connected-vets">
          {loading ? (
            <p className="mt-5">
              <span className="loading loading-ring loading-lg text-primary"></span>{" "}
              Loading vets...
            </p>
          ) : (
            <>
              <h2 className="text-xl font-bold">Connected Vets</h2>
              <ul id="vetList">
                {vets.length > 0 ? (
                  vets.map((vet) => (
                    <li
                      key={vet.id}
                      className={`mb-4 flex items-center cursor-pointer ${
                        selectedUser?.id === vet.id ? "bg-base-200 p-1 rounded-xl" : ""
                      }`}
                      onClick={() => handleVetClick(vet)}
                    >
                      {/* Circle with user image and online status indicator */}
                      <div className="relative m-1">
                        <img
                          src={vet.image || "default_avatar.png"} // Replace 'default_avatar.png' with your default avatar image
                          alt={vet.firstname}
                          className="w-8 h-8 rounded-full"
                        />
                        <span
                          className={`absolute right-0 bottom-0 block h-1.5 w-1.5 rounded-full ring-1 ring-white ${
                            vet.status === "online"
                              ? "bg-green-400"
                              : "bg-red-400"
                          }`}
                        ></span>
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
            </>
          )}
        </div>

        <div className="connected-sellers">
          {loading ? (
            <p className="mt-5">
              <span className="loading loading-ring loading-lg text-primary"></span>{" "}
              Loading sellers...
            </p>
          ) : (
            <>
              <h2 className="text-xl font-bold">Connected Sellers</h2>
              <ul id="sellerList">
                {sellers.length > 0 ? (
                  sellers.map((seller) => (
                    <li
                      key={seller.id}
                      className={`mb-4 flex items-center cursor-pointer ${
                        selectedUser?.id === seller.id ? "bg-base-200 rounded-xl p-1" : ""
                      }`}
                      onClick={() => handleSellerClick(seller)}
                    >
                      {/* Circle with seller image and online status indicator */}
                      <div className="relative m-1">
                        <img
                          src={seller.image || "default_avatar.png"} // Replace 'default_avatar.png' with your default avatar image
                          alt={seller.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <span
                          className={`absolute right-0 bottom-0 block h-1.5 w-1.5 rounded-full ring-1 ring-white ${
                            seller.status === "online"
                              ? "bg-green-400"
                              : "bg-red-400"
                          }`}
                        ></span>
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
            </>
          )}
        </div>
      </div>

      <div className="w-3/4 p-4">
        {/* <button className="btn btn-accent" onClick={connectWebSocket}>
            Connect
          </button> */}

        {/* <button className="btn btn-accent" onClick>
            SeeMessages
          </button> */}

        {/* <div
            ref={chatAreaRef}
            className="chat-area"
            style={{ height: "300px", overflowY: "auto" }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${
                  message.senderId === user?.id ? "sender" : "receiver"
                }`}
              >
                <p>{message.content}</p>
              </div>
            ))}
          </div> */}
        {/* <div id="chat-messages" ref={chatAreaRef}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${
                  message.senderId === user.id ? "sender" : "receiver"
                }`}
              >
                <p>{message.content}</p>
              </div>
            ))}
          </div>
          <form id="messageForm" onSubmit={sendMessage}>
            <input
              type="text"
              placeholder="Type your message..."
              className="input input-bordered input-secondary w-full max-w-xs"
              value={chatContent}
              onChange={(e) => setChatContent(e.target.value)}
            />
            <button
              className="btn btn-accent"
              type="submit"
              onChange={sendMessage}
            >
              Send
            </button>
          </form> */}

        <div className="flex-1 flex flex-col">
          {selectedUser ? (
            <>
              {isUser && (
                <>
                  <div className="bg-base-100 p-4 border-b border-base-content">
                    
                    <h2 className="text-xl font-bold font-serif">
                      Chat with{" "}
                      <p
                        className="hover:scale-105 hover:text-primary hover:cursor-pointer"
                        onClick={() => {
                          window.location.href = `user/profile/${selectedUser.id}`;
                        }}
                      >
                        {" "}
                        {selectedUser.firstname} {selectedUser.lastname}
                      </p>
                    </h2>
                  </div>
                </>
              )}

              {isVet && (
                <>
                  <div className="bg-base-100 p-4 border-b border-base-content">
                    <h2 className="text-xl font-bold font-serif">
                      Chat with{" "}
                      <p
                        className="hover:scale-105 hover:text-primary hover:cursor-pointer"
                        onClick={() => {
                          window.location.href = `/vet/profile/${selectedUser.id}`;
                        }}
                      >
                        {" "}
                        {selectedUser.firstname} {selectedUser.lastname}
                      </p>
                    </h2>
                  </div>
                </>
              )}

              {isSeller && (
                <>
                  <div className="bg-base-100 p-4 border-b border-base-content">
                    <h2 className="text-xl font-bold font-serif">
                      Chat with{" "}
                      <p
                        className="hover:scale-105 hover:text-primary hover:cursor-pointer"
                        onClick={() => {
                          window.location.href = `/seller/profile/${selectedUser.id}`;
                        }}
                      >
                        {" "}
                        {selectedUser.name}
                      </p>
                    </h2>
                  </div>
                </>
              )}

              <div
                // ref={chatAreaRef}
                className="flex-1 overflow-y-auto p-4 space-y-4"
              >
                {messages?.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.senderId === user?.id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    {message.senderId === user?.id ? (
                      <>
                        <div className="chat chat-end">
                          <div className="chat-image avatar">
                            <div className="ring-accent ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
                              <img
                                alt="Tailwind CSS chat bubble component"
                                src={user?.image}
                              />
                            </div>
                          </div>
                          <div className="chat-bubble chat-bubble-accent">
                            <p className="text-base-content font-semibold font-serif">
                              {message.content}
                            </p>
                            <p className="text-xs text-base-content mt-1 flex">
                              {/* {console.log("Timestamp:", message.timestamp)} */}
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
                              {new Date(message.timestamp).toLocaleString(
                                undefined,
                                {
                                  dateStyle: "short",
                                  timeStyle: "short",
                                }
                              )}
                            </p>{" "}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="chat chat-start">
                        <div className="chat-image avatar">
                          <div className="ring-secondary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
                            <img
                              alt="Tailwind CSS chat bubble component"
                              src={selectedUser?.image}
                            />
                          </div>
                        </div>
                        <div className="chat-bubble chat-bubble-secondary">
                          <p className="text-base-content font-semibold font-serif">
                            {message.content}
                          </p>
                          <p className="text-xs text-base-content mt-1 flex">
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
                            {/* {console.log("Timestamp:", message.timestamp)} */}
                            {new Date(message.timestamp).toLocaleString(
                              undefined,
                              {
                                dateStyle: "short",
                                timeStyle: "short",
                              }
                            )}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <form onSubmit={handleSendMessage} className="p-4 bg-base-100">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black-500"
                    placeholder="Type a message..."
                  />
                  <button type="submit" className="btn btn-info">
                    <svg
                      enable-background="new 0 0 512 512"
                      height="512px"
                      id="Layer_1"
                      version="1.1"
                      viewBox="0 0 512 512"
                      width="512px"
                      // xml:space="preserve"
                      // xmlns="http://www.w3.org/2000/svg"
                      // xmlns:xlink="http://www.w3.org/1999/xlink"
                      className="w-6 h-6 fill-current stroke-current text-current"
                      // strokeWidth="2"
                      // stroke="black"
                    >
                      <path
                        d="M189.547,324.346l87.616,176.304l223.917-490L11.137,245.793L189.547,324.346z M194.754,305.243  l-136.77-60.216L433.599,64.761L194.754,305.243z M276.436,455.383l-67.787-136.416L449.62,76.36L276.436,455.383z"
                        // fill="#37404D"
                        // strokeWidth={2}
                      />
                    </svg>
                    Send
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-xl text-gray-500">
                Select a user to start chatting
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MiddleLayoutChatbox;

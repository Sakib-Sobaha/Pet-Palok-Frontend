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
    try {
      // Construct the URL for the API request
      const url = `${process.env.REACT_APP_API_URL}/user/whoami`;
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
    console.log("Message received:", message);
    if (
      (message.senderId === user?.id && message.recipientId === selectedUser?.id) ||
      (message.senderId === selectedUser?.id && message.recipientId === user?.id)  
      
    ) {
      setMessages((prevMessages) => {
        if(!prevMessages.some((msg) => msg.id === message.id)) {
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
  }, [messages]);  // This will run whenever `messages` is updated
  

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
      timestamp: new Date(),
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
                  users.map((user) => (
                    <li
                      key={user.id}
                      className={`mb-4 flex items-center cursor-pointer ${
                        selectedUser?.id === user.id ? "bg-gray-200" : ""
                      }`}
                      onClick={() => handleUserClick(user)}
                    >
                      {/* Circle with user image and online status indicator */}
                      <div className="relative">
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
                      {/* User's Name and Email */}
                      <div className="ml-3">
                        <p className="font-semibold">{user.firstname}</p>
                        {/* <p className="text-sm text-gray-500">{user.email}</p> */}
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
                        selectedUser?.id === vet.id ? "bg-gray-200" : ""
                      }`}
                      onClick={() => handleVetClick(vet)}
                    >
                      {/* Circle with user image and online status indicator */}
                      <div className="relative">
                        <img
                          src={vet.image || "default_avatar.png"} // Replace 'default_avatar.png' with your default avatar image
                          alt={vet.firstname}
                          className="w-8 h-8 rounded-full"
                        />
                        <span
                          className={`absolute right-0 bottom-0 block h-1.5 w-1.5 rounded-full ring-1 ring-white ${
                            vet.status === "online" ? "bg-green-400" : "bg-red-400"
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
                        selectedUser?.id === seller.id ? "bg-gray-200" : ""
                      }`}
                      onClick={() => handleSellerClick(seller)}
                    >
                      {/* Circle with seller image and online status indicator */}
                      <div className="relative">
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
              <div className="bg-white p-4 border-b">
                <h2 className="text-xl font-bold">
                  Chat with {selectedUser.firstname} {selectedUser.lastname}
                </h2>
              </div>
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
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.senderId === user?.id
                          ? "bg-blue-300 text-black font-serif"
                          : "bg-white text-gray-800"
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(message.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSendMessage} className="p-4 bg-white">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black-500"
                    placeholder="Type a message..."
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
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

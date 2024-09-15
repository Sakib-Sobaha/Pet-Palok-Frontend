import React, { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import { over } from "stompjs";
import { useRef } from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import ChatLeft from "./chatbox/chat-left";
import ChatRight from "./chatbox/chat-right";



var stompClient = null;

const MiddleLayoutChatbox = ({userDetails}) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [user, setUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [stompClient, setStompClient] = useState(null);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [chatContent, setChatContent] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  const chatAreaRef = useRef(null);
   useEffect(() => {
    console.log("User Details received in MiddleLayoutChatbox:", JSON.stringify(userDetails, null, 2));
  }, [userDetails]);

  useEffect(() => {
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
    fetchConnectedUsers();
  }, []);

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

  const fetchUserData = async () => {
    try {
      // Construct the URL for the API request
      const url = `${process.env.REACT_APP_API_URL}/user/whoami`;
      console.log(url);
      

      // Get the Bearer token from local storage (or wherever you store it)
      const token = localStorage.getItem("authToken");

      // Make the API request with the Authorization header
      const response = await fetch(url, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      // Parse the response data
      const data = await response.json();

      // Update the state with the fetched data
      setUser(data);
      setFirstname(data.firstname);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);



  const connectWebSocket = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No auth token found in local storage.");
      return;
    }

    let Sock = new SockJS(`http://localhost:8080/ws`);
    stompClient = over(Sock);

    stompClient.connect(
      () => onConnected(stompClient),
      onError
    );
  };

    const onConnected = (stompClient) => {
      setStompClient(stompClient);

      stompClient.subscribe(`/user/${firstname}/queue/messages`, onMessageReceived);
      stompClient.subscribe(`user/public`, onMessageReceived);

      stompClient.send("/app/user.addUser", {}, JSON.stringify({ firstname: firstname, lastname: lastname, status : "online" }));
      setIsConnected(true);
      // stompClient.subscribe("/topic/messages", onMessageReceived);
      fetchConnectedUsers();
    }

    const onError = () => {
      console.error("WebSocket error");
    }

    const sendMessage = (event) => {
      event.preventDefault();
      if(chatContent && stompClient) {
        const chatMessage = {
          senderId: user.id,
          receiverId: userDetails.id,
          content: chatContent,
          timestamp: new Date(),
        };

        stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
        setMessages((prevMessages) => [...prevMessages, chatMessage]);
        setChatContent(""); // Clear the input box
      }
    }

    const addMessage = (senderId, content) => {
      const newMessage = { senderId, content };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      scrollToBottom();
    };

    const scrollToBottom = () => {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    };

    useEffect(() => {
      setTimeout(() => {
        addMessage("bot", "Hello! How can I help you today?");
        addMessage(firstname, "Hi! I need help with my order.");
      }, 1000);
    }, []);

    const fetchAndDisplayUserChat = async (userId, recepientId) => {
      const token = localStorage.getItem("authToken");

      if(!token) {
        console.error("No auth token found in local storage.");
        return;
      }

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/messages/${user.id}/${userDetails.id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const userChat = await response.json();
        setMessages(userChat);
        scrollToBottom();
      } catch (error) {
        console.error("Failed to fetch user chat:", error);
      }
    };

    useEffect(() => {
      fetchAndDisplayUserChat(user?.id,userDetails?.id);
    }, [user, userDetails]);


      

    const onMessageReceived = async (payload) => {
      await fetchConnectedUsers();
      const message = JSON.parse(payload.body);
      setSelectedUser(userDetails)

      if(selectedUser && message.from === selectedUser.id) {
        // displayMessage(message.senderId, message.content);
      }

    };

    useEffect(() => {
      if (user && selectedUser && isConnected) {
        connectWebSocket(); // Connect to the WebSocket once user and selectedUser are defined
      }
    }, [user, selectedUser, isConnected]);






  

  return (
    <div>
      <button className="btn btn-accent" onClick={connectWebSocket}>Connect</button>

        <div ref={chatAreaRef} className="chat-area" style={{ height: '300px', overflowY: 'auto' }}>
            {messages.map((message, index) => (
                <div key={index} className={`message ${message.senderId === user.id ? 'sender' : 'receiver'}`}>
                    <p>{message.content}</p>
                </div>
            ))}
        </div>
      <div id="chat-messages" ref={chatAreaRef}>
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.senderId === user.id ? "sender" : "receiver"}`}>
            <p>{message.content}</p>
          </div>
        ))}
      </div>
      <form id="messageForm" onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Type your message..."
          value={chatContent}
          onChange={(e) => setChatContent(e.target.value)}
        />
        <button className="btn btn-accent" type="submit"
        onChange={(e) => sendMessage}>Send</button>
      </form>
    </div>
  );



    
        




    // useEffect(() => {
    //     const fetchUserData = async () => {
    //       try {
    //         // Construct the URL for the API request
    //         const url = `${process.env.REACT_APP_API_URL}/user/whoami`;
    //         console.log(url);
            
    
    //         // Get the Bearer token from local storage (or wherever you store it)
    //         const token = localStorage.getItem("authToken");
    
    //         // Make the API request with the Authorization header
    //         const response = await fetch(url, {
    //           method: "GET",
    //           headers: {
    //             'Authorization': `Bearer ${token}`,
    //             'Content-Type': 'application/json',
    //           },
    //         });
    
    //         // Parse the response data
    //         const data = await response.json();
    
    //         // Update the state with the fetched data
    //         setUser(data);
    //         setLoading(false);
    //       } catch (error) {
    //         console.error("Error fetching user data:", error);
    //         setLoading(false);
    //       }
    //     };
    
    //     // Fetch user data when the component mounts or userId changes
    //     fetchUserData();
    // }, []);


      


    


};

export default MiddleLayoutChatbox;

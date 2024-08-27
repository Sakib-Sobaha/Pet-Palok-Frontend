import React, { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import ChatLeft from "./chatbox/chat-left";
import ChatRight from "./chatbox/chat-right";

// var stompClient = null;

// const MiddleLayoutChatbox = () => {
//   const [privateChats, setPrivateChats] = useState(new Map());
//   const [publicChats, setPublicChats] = useState([]);
//   const [tab, setTab] = useState("CHATROOM");
//   const [userData, setUserData] = useState({
//     username: '',
//     receivername: '',
//     connected: false,
//     message: ''
//   });

//   useEffect(() => {
//     if (userData.connected) {
//       console.log("User data: ", userData);
//     }
//   }, [userData]);

//   const connect = () => {
//     const token = localStorage.getItem("authToken");
//     if (!token) {
//       console.error("No auth token found in local storage.");
//       return;
//     }

//     let Sock = new SockJS('http://localhost:8080/ws');
//     stompClient = over(Sock);
//     stompClient.connect(
//       { Authorization: `Bearer ${token}` }, 
//       onConnected, 
//       onError
//     );
//   };

//   const onConnected = () => {
//     setUserData({ ...userData, connected: true });
//     stompClient.subscribe('/chatroom/public', onMessageReceived);
//     stompClient.subscribe('/user/' + userData.username + '/private', onPrivateMessage);
//     userJoin();
//   };

//   const userJoin = () => {
//     const chatMessage = {
//       senderName: userData.username,
//       status: "JOIN"
//     };
//     stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
//   };

//   const onMessageReceived = (payload) => {
//     const payloadData = JSON.parse(payload.body);
//     switch (payloadData.status) {
//       case "JOIN":
//         if (!privateChats.get(payloadData.senderName)) {
//           privateChats.set(payloadData.senderName, []);
//           setPrivateChats(new Map(privateChats));
//         }
//         break;
//       case "MESSAGE":
//         publicChats.push(payloadData);
//         setPublicChats([...publicChats]);
//         break;
//     }
//   };

//   const onPrivateMessage = (payload) => {
//     const payloadData = JSON.parse(payload.body);
//     if (privateChats.get(payloadData.senderName)) {
//       privateChats.get(payloadData.senderName).push(payloadData);
//       setPrivateChats(new Map(privateChats));
//     } else {
//       let list = [];
//       list.push(payloadData);
//       privateChats.set(payloadData.senderName, list);
//       setPrivateChats(new Map(privateChats));
//     }
//   };

//   const onError = (err) => {
//     console.error("WebSocket error: ", err);
//   };

//   const handleMessage = (event) => {
//     const { value } = event.target;
//     setUserData({ ...userData, message: value });
//   };

//   const sendValue = () => {
//     if (stompClient) {
//       const chatMessage = {
//         senderName: userData.username,
//         message: userData.message,
//         status: "MESSAGE"
//       };
//       stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
//       setUserData({ ...userData, message: "" });
//     }
//   };

//   const sendPrivateValue = () => {
//     if (stompClient) {
//       const chatMessage = {
//         senderName: userData.username,
//         receiverName: tab,
//         message: userData.message,
//         status: "MESSAGE"
//       };

//       if (userData.username !== tab) {
//         privateChats.get(tab).push(chatMessage);
//         setPrivateChats(new Map(privateChats));
//       }
//       stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
//       setUserData({ ...userData, message: "" });
//     }
//   };

//   const handleUsername = (event) => {
//     const { value } = event.target;
//     setUserData({ ...userData, username: value });
//   };

//   const registerUser = () => {
//     connect();
//   };

//   return (
//     <div className="flex-1 bg-base-200 rounded-lg p-1 min-h-screen align-bottom">
//       {!userData.connected ? (
//         <div className="register">
//           <input
//             id="user-name"
//             placeholder="Enter your name"
//             name="userName"
//             value={userData.username}
//             onChange={handleUsername}
//             className="input input-bordered input-secondary w-full rounded-md mb-4"
//           />
//           <button type="button" onClick={registerUser} className="btn btn-primary w-full">
//             Connect
//           </button>
//         </div>
//       ) : (
//         <>
//           <div className="bg-base-300 rounded-lg w-full p-1 text-3xl font-bold mb-4">
//             Name
//           </div>

//           <div className="object-bottom mb-4">
//             {tab === "CHATROOM" ? (
//               <>
//                 {publicChats.map((chat, index) => (
//                   <div key={index}>
//                     {chat.senderName === userData.username ? (
//                       <ChatRight text={chat.message} time="12.45pm" />
//                     ) : (
//                       <ChatLeft sender={chat.senderName} text={chat.message} time="12.45pm" />
//                     )}
//                   </div>
//                 ))}
//               </>
//             ) : (
//               <>
//                 {[...privateChats.get(tab)].map((chat, index) => (
//                   <div key={index}>
//                     {chat.senderName === userData.username ? (
//                       <ChatRight text={chat.message} time="12.45pm" />
//                     ) : (
//                       <ChatLeft sender={chat.senderName} text={chat.message} time="12.45pm" />
//                     )}
//                   </div>
//                 ))}
//               </>
//             )}
//           </div>

//           <div className="w-full flex bottom-0">
//             <input
//               type="text"
//               placeholder="Type your message here"
//               value={userData.message}
//               onChange={handleMessage}
//               className="input input-bordered input-secondary w-full rounded-md"
//             />
//             <button
//               className="btn btn-primary rounded-md w-20"
//               onClick={tab === "CHATROOM" ? sendValue : sendPrivateValue}
//             >
//               Send
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

var stompClient = null;

const MiddleLayoutChatbox = () => {
    const [privateChats, setPrivateChats] = useState(new Map());
    const [publicChats, setPublicChats] = useState([]);
    const [tab, setTab] = useState("CHATROOM");
    const [user, setUser] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState({
        username: '',
        receivername: '',
        connected: false,
        message: ''
        });
        useEffect(() => {
            console.log(userData);
          }, [userData]);
        




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


      const connect = () => {
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.error("No auth token found in local storage.");
          return;
        }
    
        let Sock = new SockJS('http://localhost:8080/ws');
        stompClient = Client(Sock);
        stompClient.connect(
          { Authorization: `Bearer ${token}` }, 
          onConnected, 
          onError
        );
      }

      const onConnected = () => {
        setUserData({...userData,"connected": true});
        stompClient.subscribe('/chatroom/public', onMessageReceived);
        stompClient.subscribe('/user/' + user.username + '/private', onPrivateMessage);
        userJoin();
      }

      const userJoin = () => {
        const chatMessage = {
          senderName: userData.username,
          status: "JOIN"
        };
        stompClient.publish({ destination: "/app/message", body: JSON.stringify(chatMessage) });
      }

      const onMessageReceived = (payload) => {
        var payloadData = JSON.parse(payload.body);
        switch (payloadData.status) {
          case "JOIN":
            if (!privateChats.get(payloadData.senderName)) {
              privateChats.set(payloadData.senderName, []);
              setPrivateChats(new Map(privateChats));
            }
            break;
          case "MESSAGE":
            publicChats.push(payloadData);
            setPublicChats([...publicChats]);
            break;
        }
      }

      const onPrivateMessage = (payload) => {
        var payloadData = JSON.parse(payload.body);
        if (privateChats.get(payloadData.senderName)) {
          privateChats.get(payloadData.senderName).push(payloadData);
          setPrivateChats(new Map(privateChats));
        } else {
          let list = [];
          list.push(payloadData);
          privateChats.set(payloadData.senderName, list);
          setPrivateChats(new Map(privateChats));
        }
      }

        const onError = (err) => {
            console.error("WebSocket error: ", err);
        }

        const handleMessage = (event) => {
            const { value } = event.target;
            setUserData({ ...userData, "message": value });
        }

        const sendValue = () => {
            if (stompClient) {
                const chatMessage = {
                    senderName: userData.username,
                    message: userData.message,
                    status: "MESSAGE"
                };
                stompClient.publish({ destination: "/app/message", body: JSON.stringify(chatMessage) });
                setUserData({ ...userData, "message": "" });
            }
        }

        const sendPrivateValue=()=>{
            if (stompClient) {
              var chatMessage = {
                senderName: userData.username,
                receiverName:tab,
                message: userData.message,
                status:"MESSAGE"
              };
              
              if(userData.username !== tab){
                privateChats.get(tab).push(chatMessage);
                setPrivateChats(new Map(privateChats));
              }
              stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
              setUserData({...userData,"message": ""});
            }
        }

        const handleUsername = (event) => {
            const { value } = event.target;
            setUserData({ ...userData, username: value });
        }

        const registerUser=()=>{
            connect();
        }

        return (
            <div className="container">
                {userData.connected?
                <div className="chat-box">
                    <div className="member-list">
                        <ul>
                            <li onClick={()=>{setTab("CHATROOM")}} className={`member ${tab==="CHATROOM" && "active"}`}>Chatroom</li>
                            {[...privateChats.keys()].map((name,index)=>(
                                <li onClick={()=>{setTab(name)}} className={`member ${tab===name && "active"}`} key={index}>{name}</li>
                            ))}
                        </ul>
                    </div>
                    {tab==="CHATROOM" && <div className="chat-content">
                        <ul className="chat-messages">
                            {publicChats.map((chat,index)=>(
                                <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                                    {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                                    <div className="message-data">{chat.message}</div>
                                    {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                                </li>
                            ))}
                        </ul>
        
                        <div className="send-message">
                            <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} /> 
                            <button type="button" className="send-button" onClick={sendValue}>send</button>
                        </div>
                    </div>}
                    {tab!=="CHATROOM" && <div className="chat-content">
                        <ul className="chat-messages">
                            {[...privateChats.get(tab)].map((chat,index)=>(
                                <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                                    {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                                    <div className="message-data">{chat.message}</div>
                                    {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                                </li>
                            ))}
                        </ul>
        
                        <div className="send-message">
                            <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} /> 
                            <button type="button" className="send-button" onClick={sendPrivateValue}>send</button>
                        </div>
                    </div>}
                </div>
                :
                <div className="register">
                    <input
                        id="user-name"
                        placeholder="Enter your name"
                        name="userName"
                        value={userData.username}
                        onChange={handleUsername}
                        margin="normal"
                      />
                      <button type="button" onClick={registerUser}>
                            connect
                      </button> 
                </div>}
            </div>
            )
            



    


};

export default MiddleLayoutChatbox;

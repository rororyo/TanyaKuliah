//TODO: setup connects virtual currency
//TODO: implement lazy loading 
//TODO: Notifications
//TODO: Make a page for undergrads

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useSocket from "../partials/UseSocket";
import axios from "axios";

const CollegeBuddy = () => {
  const token = localStorage.getItem("token");
  const socket = useSocket(token);

  // Current user state
  const [currentUser, setCurrentUser] = useState({});



  //Online users state
  const [onlineUsers, setOnlineUsers] = useState([]);

  // Users state
  const [users, setUsers] = useState([]);

  // Recipient state
  const [recipient, setRecipient] = useState({ id: "", username: "" });

  // Message state
  const [message, setMessage] = useState("");

  // Message list state
  const [messages, setMessages] = useState([]);

  const sendMessage =async () => {
    const newMessage = { message: message, sender: currentUser,recipient };
    if(message!==""){
          setMessages((prevMessages) => [...prevMessages, newMessage]);
          socket.emit("send_message", { message, recipient });
          //save message to database
          try{
              await axios.post("http://localhost:4000/save-chat", newMessage, {withCredentials: true})
          }
          catch(err){
              console.log(err)
          }
          
    }

    setMessage("");
  };

  // Get users when page loads
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/users", {
        withCredentials: true,
      });
  
      // Update users with online status
      const usersWithStatus = data.map((user) => ({
        ...user,
        online: onlineUsers.includes(user.id),
      }));
  
      setUsers(usersWithStatus);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  
  const joinRoom = async (user) => {
    setRecipient({ id: user.id, username: user.username });
    socket.emit("join_room", { recipient: user.id });
  
    try {
      // Fetch message history from the server
      const response = await axios.get(`http://localhost:4000/messages/${user.id}`, { withCredentials: true });
      const messageHistory = response.data;

      // Update the messages state with the fetched message history
      setMessages(messageHistory);
    } catch (error) {
      console.error("Error fetching message history:", error);
    }
  };

  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/get-currentuser", {
        withCredentials: true,
      });
      setCurrentUser(data.user);
      
    } catch (error) {
      console.error("Error fetching current user:", error);
      return null;
    }
  };

  useEffect(() => {
   
    getCurrentUser();
  }, []);
  //get users list
  useEffect(() => {
    fetchUsers();
  }, [onlineUsers]);

  //get online users
  useEffect(() => {
    if (socket) {
      socket.on("online_users", (data) => {
        // Update online users state when the 'online_users' event is received
        setOnlineUsers(data);
        
      });
    }
    
    // Cleanup the socket listener when the component unmounts
    return () => {
      if (socket) {
        socket.off("online_users");
      }
    };
  }, [socket]);

  // Receive Message logic

useEffect(() => {
  if (socket) {
    socket.on("receive_message", (data) => {
      // Check if the message is from the current user
      if (data.sender.username !== currentUser.username) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: data.sender, message: data.message },
        ]);
      }
    });
  }

  // Cleanup the socket listener when the component unmounts
  return () => {
    if (socket) {
      socket.off("receive_message");
    }
  };
}, [socket, currentUser.username]);


  return (
    <div>
      <Link to={"/"}>Home</Link> <br />
      CollegeBuddy
      <h1>Welcome {currentUser.username}</h1>
      {/* Display all users */}
      <h2>You are now Chatting with: {recipient.username}</h2>
<h3>Online Users</h3>
<ul>
  {users.map((user) => (
    <li key={user.id}>
      {user.username} - {user.online ? "Online" : "Offline"}
      <button
        onClick={() => joinRoom(user)}
        className="btn btn-dark btn-sm"
      >
        Start chatting
      </button>
    </li>
  ))}
</ul>
      <h2>Messages:</h2>
{/* Display all messages */}
{messages.map((msg, index) => (
  // Display each message
  <p key={index}>
     {msg.sender.username===currentUser.username ? "You: " : msg.sender.username}: {msg.message}
  </p>
))}

      <input
        type="text"
        placeholder="Message..."
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <button className="btn btn-dark" onClick={sendMessage}>
        Send Message
      </button>
    </div>
  );
};

export default CollegeBuddy;

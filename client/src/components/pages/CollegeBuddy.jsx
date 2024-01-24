import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useSocket from "../partials/UseSocket";
import axios from "axios";

const CollegeBuddy = () => {
  const token = localStorage.getItem("token");
  const socket = useSocket(token);
  // Current user state
  const [currentUser, setCurrentUser] = useState("");
  // Users state
  const [users, setUsers] = useState([]);
  // Recipient state
  const [recipient, setRecipient] = useState({ id: "", username: "" });

  // Message state
  const [message, setMessage] = useState("");
  // Message list state
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    const newMessage = { text: message, sender: currentUser.username };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    socket.emit("send_message", { message, recipient });
    setMessage("");
  };

  // Get users when page loads
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/users", { withCredentials: true });
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const joinRoom = (user) => {
    setRecipient({ id: user.id, username: user.username });
    socket.emit("join_room", { recipient: user.id });
  };

  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/get-currentuser", { withCredentials: true });
      setCurrentUser(data.user);
    } catch (error) {
      console.error('Error fetching current user:', error);
      return null;
    }
  }

  useEffect(() => {
    fetchUsers();
    getCurrentUser();
  }, []);

  // Message logic
  useEffect(() => {
    if (socket) {
      socket.on("receive_message", (data) => {
        console.log("received message:", data.sender, data.message);
        setMessages((prevMessages) => [...prevMessages, { sender: data.sender, message: data.message }]);
      });
    }
  }, [socket]);
  return (
    <div>
      <Link to={"/"}>Home</Link> <br />
      CollegeBuddy
      <h1>Welcome {currentUser.username}</h1>
      <h2>Messages:</h2>

      {/* Display all users */}
      <h2>You are now Chatting with: {recipient.username}</h2>

      <h3>Users list</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username}
            <button onClick={() => joinRoom(user)} className="btn btn-dark btn-sm">
              Start chatting
            </button>
          </li>
        ))}
      </ul>

      {/* Display all messages */}
      {messages.map((msg, index) => (
        <p key={index}>
          {msg.sender !== currentUser.username ? `${msg.sender}: ${msg.message}` : `Me: ${msg.message}`}
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

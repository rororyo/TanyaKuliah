import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import useSocket from "../partials/UseSocket";

const CollegeBuddy = () => {
  const token = localStorage.getItem("token");
  const socket = useSocket(token);
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const sendMessage = () => {
    socket.emit("send_private_message", { message });
    setMessage("");
  };

  useEffect(() => {
    if (socket) {
      const handleReceiveMessage = (data) => {
        setMessageReceived(data.message);
      };

      // Subscribe to the event
      socket.on("receive_message", handleReceiveMessage);

      // Unsubscribe and clean up the event listener when the component unmounts
      return () => {
        socket.off("receive_message", handleReceiveMessage);
      };
    }
  }, [socket]);
  return (
    <div>
      <Link to={"/"}>Home</Link> <br />
      CollegeBuddy
      <h1>Message:</h1>
      <p>{messageReceived}</p>
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

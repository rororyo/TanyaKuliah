
//imports
import React from 'react'
import { Link } from 'react-router-dom'
import useSocket from "../partials/UseSocket";
import axios from "axios";


const GroupChat = () => {
  const token = localStorage.getItem("token");
  const socket = useSocket(token);

  //current user state
  const [currentUser, setCurrentUser] = useState({});
    // Users state
    const [users, setUsers] = useState([]);

    // Recipient state
    const [recipient, setRecipient] = useState({ id: "", username: "" });
  
    // Message state
    const [message, setMessage] = useState("");
  
    // Message list state
    const [messages, setMessages] = useState([]);
  
  return (
    <div>
        <Link to="/">Home</Link> <br />
        Group Chat
    </div>
  )
}

export default GroupChat
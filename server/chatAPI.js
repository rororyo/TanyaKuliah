import express from "express";
import { dbMiddleware } from "./dbsetup.js";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
const chatApi = express()


chatApi.use(express.json());
chatApi.use(express.urlencoded({ extended: true }));
chatApi.use(cookieParser());
chatApi.use(dbMiddleware); // Use the shared database middleware

//will be changed to get specific user by their username/id
//get id and username from users table
chatApi.get('/users', async (req, res) => {
    try {
        
        const result = await req.dbClient.query('SELECT id, username FROM users');

        res.json(result.rows);
    } catch (err) {
        console.error('Error executing the database query:', err);
        res.status(500).send(err.message);
    }
});


//decrypt cookie
chatApi.get('/get-currentuser', async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.send(decoded);
    } catch (err) {
        res.status(401).json({ message: 'Invalid token'+token });
    }})

//insert chat to database
chatApi.post("/save-chat", async (req, res) => {
    const chat = req.body;
    const client = req.dbClient;
    const token= req.cookies.token;

    if (!token){
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        await client.query("INSERT INTO messages (sender_id, recipient_id, message) VALUES ($1, $2, $3) RETURNING *", [chat.sender.id, chat.recipient.id, chat.message]);
        res.status(200).json({ message: 'Chat inserted successfully' });
    } catch (err) {
        console.error('Error inserting chat to database:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});
export default chatApi;

chatApi.get("/messages/:recipientId", async (req, res) => {
    try {
      const recipientId = req.params.recipientId;
      const client = req.dbClient;
      const token = req.cookies.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const result = await client.query(`
      SELECT messages.sender_id, messages.recipient_id, messages.message, messages.timestamp,
             sender.username as sender_username, recipient.username as recipient_username
      FROM messages
      JOIN users AS sender ON messages.sender_id = sender.id
      JOIN users AS recipient ON messages.recipient_id = recipient.id
      WHERE (recipient_id = $1 AND sender_id = $2) OR (recipient_id = $2 AND sender_id = $1)
      ORDER BY timestamp ASC;
    `, [recipientId, decoded.user.id]);
    
    const formatedMessages = result.rows.map((message) => {
      return {
        id: message.id,
        sender: {id:message.sender_id, username: message.sender_username},
        recipient: {id:message.recipient_id, username: message.recipient_username},
        message: message.message,
        timestamp: message.timestamp
      };
    })
      res.json(formatedMessages);


  
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
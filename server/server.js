//imports
import express from "express";
import  env  from "dotenv";
import bodyParser from "body-parser";
import passport from "passport";
import authApp from "./auth.js";
import cors from 'cors'
import http from 'http'
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { initializeSocketIO } from "./socket.js";
import { dbMiddleware } from "./dbsetup.js";
import cookieParser from "cookie-parser";
//const
const port=4000

//middleware
const app = express();
const server= http.createServer(app)
initializeSocketIO(server)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(cookieParser())
app.use(dbMiddleware)
app.use(authApp)
env.config()
//will be changed to get specific user by their username/id
//get id and username from users table
app.get('/users', async (req, res) => {
    try {
        // Assuming you have a 'users' table
        const result = await req.dbClient.query('SELECT id, username FROM users');

        // Process the query result as needed
        res.json(result.rows);
    } catch (err) {
        console.error('Error executing the database query:', err);
        res.status(500).send(err.message);
    }
});


//decrypt cookie
app.get('/get-currentuser', async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.send(decoded);
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }})

server.listen(port, () => console.log(`Server running on port ${port}`))
//imports
import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import passport from "passport";
import authApp from "./auth.js";
import cors from 'cors'
import http from 'http'
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { initializeSocketIO,verifyToken } from "./socket.js";
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
app.use(authApp)


app.get("/decrypt-cookie",verifyToken, (req, res) => {
    res.json({ user: req.user });
})


server.listen(port, () => console.log(`Server running on port ${port}`))
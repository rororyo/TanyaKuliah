import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from 'cors';
import env from 'dotenv';
import Cookies from 'js-cookie';

const { Client } = pg;

const authApp = express();
authApp.use(bodyParser.json());
authApp.use(bodyParser.urlencoded({ extended: true }));
authApp.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))
env.config()
const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DB,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Check for cookies
export const isLoggedin = () => {
    const token = Cookies.get('token');
    return !!token;
}

await client.connect();

const saltRounds = 10;

authApp.post("/register", async (req, res) => {
    const email = req.body.username;
    const password = req.body.password;

    try {
        const checkResult = await client.query("SELECT * FROM users WHERE email = $1", [email]);

        if (checkResult.rows.length > 0) {
            res.status(400).send("User already exists");
        } else {
            const hash = await bcrypt.hash(password, saltRounds);
            const result = await client.query("INSERT INTO users(email, password) VALUES($1, $2) RETURNING *", [email, hash]);
            const user = result.rows[0];
            const token = generateToken(user);
            res.cookie("token", token);
            res.status(200).send({ user, token });
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

authApp.post("/login", async (req, res) => {
    const email = req.body.username;
    const password = req.body.password;

    try {
        const result = await client.query("SELECT * FROM users WHERE email = $1", [email]);

        if (result.rows.length > 0) {
            const user = result.rows[0];
            const storedHashPassword = user.password;
            const valid = await bcrypt.compare(password, storedHashPassword);

            if (valid) {
                const token = generateToken(user);
                res.cookie("token", token);
                res.status(200).send({ user, token });
            } else {
                res.status(401).json({ message: "Invalid credentials" });
            }
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

authApp.get("/logout", (req, res) => {
  if(isLoggedin){
    res.clearCookie("token");
    res.send("Logout successful");
  }
    else{
      res.status(401).send("Not logged in");
    }
        
});

// Helper function to generate JWT
const generateToken = (user) => {
    return jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
};

export default authApp;

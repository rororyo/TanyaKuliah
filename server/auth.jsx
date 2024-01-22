import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import passport from "passport";
import { Strategy } from "passport-local";
import session from "express-session";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import cors from 'cors';
import env from 'dotenv';
import Cookies from 'js-cookie';

const { Client } = pg;

const authApp = express();
authApp.use(bodyParser.json());
authApp.use(bodyParser.urlencoded({ extended: true }));
authApp.use(cookieParser());
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
  
//check for cookies
export const isLoggedin=()=>{
    const token=Cookies.get('token');
    return !!token
}

await client.connect();
authApp.use(
    session({
      secret: process.env.AUTH_SECRET,
      resave: false,
      saveUninitialized: true,
    })
  );
  authApp.use(passport.initialize());
  authApp.use(passport.session());
  const saltRounds = 10;
  authApp.post("/register", async (req, res) => {
    const email = req.body.username;
    const password = req.body.password;
    try {
      const checkResult = await client.query("SELECT * FROM users where email=$1", [email]);
      if (checkResult.rows.length > 0) {
        res.status(400).send("User already exists");
      } else {
        const hash = await bcrypt.hash(password, saltRounds);
        const result = await client.query("INSERT INTO users(email, password) VALUES($1, $2) RETURNING *", [email, hash]);
        const user = result.rows[0];
        req.login(user, (err) => {
          if (err) {
            return res.status(500).send(err.message);
          }
          res.status(200).send(user);
        });
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  
  authApp.post("/login", (req, res, next) => {
    passport.authenticate("local", async (err, user, info) => {
      try {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.status(401).json({ message: "Invalid credentials" });
        }
  
        const token = jwt.sign({ user }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
  
        res.cookie("token", token);
        res.json({ user, token });
      } catch (err) {
        return next(err);
      }
    })(req, res, next);
  });
  
  authApp.get("/logout", (req, res) => {
    if (req.isAuthenticated()) {
      req.logout();
      req.session.destroy(); 
      res.clearCookie("token");
      res.send("Logout successful");
    } else {
      res.status(401).send("Not logged in");
    }
  });
authApp.get("/logout", (req, res) => {
    req.logout();
    res.clearCookie("token");
    
});

// Passport Auth Configuration
passport.use("local", new Strategy(async function verify(username, password, cb) {
    try {
      const result = await client.query("SELECT * FROM users where email=$1", [username]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashPassword = user.password;
        bcrypt.compare(password, storedHashPassword, (err, valid) => {
          if (err) {
            console.error(err);
            return cb(err);
          } else {
            if (valid) {
              return cb(null, user);
            } else {
              return cb(null, false);
            }
          }
        });
      }
      else{
        return cb("User not found");
      }
    } catch (err) {
        res.status(500).send(err.message);
    }
  }));
  
  passport.serializeUser((user, cb) => {
    cb(null, user);
  });
  
  passport.deserializeUser((user, cb) => {
    cb(null, user);
  });

export default authApp;
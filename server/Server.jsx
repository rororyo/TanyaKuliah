//imports
import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import passport from "passport";
import authApp from "./auth.js";
import cors from 'cors'

//const
const port=4000

//middleware
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(authApp)
app.use(cors())


app.listen(port, () => console.log(`Server running on port ${port}`))
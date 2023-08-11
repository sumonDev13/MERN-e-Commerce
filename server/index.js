import express from "express";
import connection from "./database/db.js";
import DefaultData from "./default.js";
import dotenv from "dotenv"



const app = express();

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;


const port = 6000;



app.listen(port , ()=>{
    console.log(`Server is running on ${port}`);
})

await connection(USERNAME,PASSWORD);

DefaultData();
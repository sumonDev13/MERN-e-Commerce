import express from "express";
import connection from "./database/db.js";
import DefaultData from "./default.js";
import dotenv from "dotenv"
import Router from "./routes/route.js"
import cors from "cors";



const app = express();
dotenv.config();

app.use(cors());
app.use(express.json({extended:true}));
app.use(express.urlencoded({extended:true}));
app.use('/api',Router);



const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;


const port = process.env.PORT || 5000;



app.listen(port , ()=>{
    console.log(`Server is running on ${port}`);
})

await connection(USERNAME,PASSWORD);

DefaultData();
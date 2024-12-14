import express from 'express';
import cors from 'cors'
import { PORT, CORS_ORIGIN } from './dbconfig/server.js'
import dbConnect from './dbconfig/dbConfig.js';
import cookieParser from 'cookie-parser';


const app = express();


// middleware
app.use(express.json());
app.use(cors({
     origin:CORS_ORIGIN,
     credentials:true
    }))
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(cookieParser())

// api




app.listen(PORT, ()=> {
    console.log(`App is listing ON PORT: ${PORT}`);
    dbConnect();
})
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import { MONGODB_URI } from "./server.js";


const dbConnect = async ()=> {
    try {
        await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`)
   console.log("Database Connection was succfully connected")
    } catch (error) {
        console.error("ERROR: ", error)
    }
}

export default dbConnect;

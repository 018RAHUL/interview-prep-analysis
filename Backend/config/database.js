import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () =>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log("Db connected successfully")
    })
    .catch((error)=>{
        console.log("DB connection issue");
        console.log(error);
        process.exit(1);
    })
}
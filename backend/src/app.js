import express from "express" 
import authRoute from "./routes/authRoute.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";


dotenv.config();


const app=express(); 
app.use(express.json());
const port=process.env.PORT ;
app.use(cookieParser());

app.use("/api/auth",authRoute);

mongoose.connect(process.env.MONGODB_URI).then((res)=>{ 
    console.log("Connected to database"+res.connection.host);

    app.listen(port,()=>{ 
    console.log(`Server running on port ${port}`);
})

 })


import express from "express" 
import authRoute from "./routes/authRoute.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import messageRoute from "./routes/messageRoute.js";
import cors from "cors";
import{app,server} from "./lib/socket.js";


dotenv.config();



app.use(express.json());
app.use(cors({ 
    origin:"http://localhost:5173",
    credentials:true,
}))
const port=process.env.PORT ;
app.use(cookieParser());

app.use("/api/auth",authRoute);
app.use("/api/message",messageRoute);

mongoose.connect(process.env.MONGODB_URI).then((res)=>{ 
    console.log("Connected to database"+res.connection.host);

    server.listen(port,()=>{ 
    console.log(`Server running on port ${port}`);
})

 })


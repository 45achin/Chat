import express from "express";
import {checkAuth} from "../middlewares/authMiddleware.js";
import { contactsForSidebar } from "../controllers/messageController.js";
import Message from "../model/messageModel.js";
import { getMessages ,sendMessage} from "../controllers/messageController.js";

const route=express.Router();

route.post("/users",checkAuth,contactsForSidebar);
route.get("/getmessages/:_id",checkAuth,getMessages);
route.post("/sendmessage/:_id",checkAuth,sendMessage);


export default route;
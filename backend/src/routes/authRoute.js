import express from 'express';
import { signup} from '../controllers/authController.js';
import {login} from '../controllers/authController.js';
import {logout} from '../controllers/authController.js'; 
import {updateProfile} from '../controllers/authController.js'; 
import {checkAuth} from '../middlewares/authMiddleware.js';

const route = express.Router();


route.post("/signup",signup); 

route.post("/login",login);

route.get("/logout",logout); 

route.put("/update-profile",checkAuth,updateProfile);


export default route;
import User from "../model/userModel.js";
import { tokenGeneration } from "../lib/token.js";
import cloudinary from "../lib/cloudinary.js";
import bcrypt from "bcryptjs";

export const signup=async(req, res)=>{ 
   const{email,username,password}=req.body; 
   try{
    
    if(!email || !username || !password){
        
        return res.status(400).json({message:"all fields are required"})

   }
   
   if(password.length<6){ 
    return res.status(400).json({message:"password must be at least 6 characters long"})
   }
   const user=await User.findOne({email});
   if(user){ 
    return res.status(400).json({message:"User already exists"})
   }

   const hashedPassword=await bcrypt.hash(password,10);
   const newUser=new User({ 
    username,
    email,
    password:hashedPassword
   }) 
   await newUser.save(); 
   if(newUser){ 
    tokenGeneration(newUser._id,res);
    res.json(newUser);
   }
}


   catch(err){ 
    console.log("Error in signup controller",err);
    res.status(500).json({message:"Internal server error"});
   }
}  

export const login=async(req,res)=>{ 
   
    const{email,password}=req.body;
    try{
        const user=await User.findOne({email})
        if(!user){
            res.status(400).json({message:"Invalid credentials"})
        } 
        const ispassword=await bcrypt.compare(password,user.password) 
        if(!ispassword){
            res.status(400).json({message:"Incorrect password"})
    }
    tokenGeneration(user._id,res);
    res.status(200).json({
        _id:user._id, 
        username:user.username,
        email:user.email
    }); 
}
    catch(error){ 
      console.log("Error in login controller",error.message);
      res.status(500).json({message:"Internal server error"});
    }

} 

export const logout=(req,res)=>{ 
    try{
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({message:"Logged out successfully"});
    } 
    catch(error){ 
        console.log("Error in logout",error.message);
        res.status(500).json({message:"Internal server error"});
    }

}

export const updateProfile=async(req,res)=>{ 
   
    try{ 
        const {profilepic}=req.body;
        const userId=req.user._id;

        if(!profilepic){ 
            return res.status(400).json()({message:"profilepic is required"});
        }
    const uploadImage=await cloudinary.uploader.upload(profilepic);
    const updateUser=await User.findByIdAndUpdate(userId,{profilepic:uploadImage.secure_url},{new:true}); 
    res.status(200).json(updateUser);
    } 
    catch(error){ 
      res.status(500).json({message:"Error in updating profile",error :error.message});       
     }

} 

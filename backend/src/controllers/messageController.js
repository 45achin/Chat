import User from "../model/userModel.js";
import Messages from "../model/messageModel.js";
import cloudinary from "../lib/cloudinary.js";
 export const contactsForSidebar=async(req,res)=>{ 
    try{ 
       const loggedUserId=req.user._id;
       const users=await User.find({_id:{$ne:loggedUserId }}).select("-password");
       if(users){ 
        res.status(200).json(users);
       }
    } 
    catch(error){ 
     console.log("Error on contactsForSidebar",error.message);
     res.status(500).json({message:"Internal server error"});
    }
 } 

 export const getMessages=async(req,res)=>{ 
    const receiverId=req.params._id;
    const senderId=req.user._id;
    try{ 
     
        const messages=Messages.find({ 
              $or:[ 
                {senderId:senderId,receiverId:receiverId},
                {senderId:receiverId,receiverId:senderId}
              ]
        })
    
    res.status(200).json(messages);
    } 
    catch(error){ 
        
    console.log("Error in getMessage Controller",error.message);
    res.status(400).json({message:"Internal server error"});

    }
 } 

 export const sendMessage=async(req,res)=>{ 
  
    try{ 
   const {text,image}=req.body;
   const receiverId=req.params._id;
   const senderId=req.user._id;

   let imageUrl;
   if(image){ 
    const uploadImage=await cloudinary.uploader.upload(image)
    imageUrl=uploadImage.secure_url;
   } 
   const newMessage=new Messages({ 
    senderId,
    receiverId,
    text,
    image:imageUrl
   });
   await newMessage.save();
   res.status(200).json(newMessage);
    }
    catch(error){ 
      console.log("Error in sendMessage controller",error.message);
      res.status(500).json({message:"Internal server error"});
    }

 }
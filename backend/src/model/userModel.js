import mongoose from "mongoose";

const userSchema=mongoose.Schema({ 
      
    email:{ 
        type:String,
        required:true,
        unique:true,
    },

    username:{ 
        type:String,
        required:true,
       
    },
    
    password:{ 
        type:String,
        required:true,
        minlength:6
    },
    profilepic:{ 
        type:String,
        default:"avtaar.png"
    }


},{timestamps:true}) 

export default mongoose.model("User",userSchema);
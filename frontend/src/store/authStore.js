import {create} from "zustand";
import {axiosInstance} from "../lib/axios";
import toast from "react-hot-toast";

export const authStore=create((set)=>({ 
    loggedUser:null,

    signup:async(data)=>{ 
        try{ 
           
            const res=await axiosInstance.post("/auth/signup",data)
            set({loggedUser:res.data})
             toast.success("Signup Successful");

        } 
        catch(err){ 
         toast.error("Signup Failed please try again");
         set({loggedUser:null});
        }
    },

    login:async(data)=>{ 
        try{ 
         const res=await axiosInstance.post("/auth/login",data);
         set({loggedUser:res.data});
         toast.success("Login Successful");
        } 
        catch(error){ 
         toast.error("Login Failed please try again");
            set({loggedUser:null});  
        }
    },
 
    logout:async(data)=>{ 
        try{ 
            
           const res=await axiosInstance.get("/auth/logout");
           set({loggedUser:null}); 
            toast.success("Logout Successfully");
        } 
        catch(error){ 
           
            toast.error("Logout failed  please try again");

        }
    },

    updateProfile:async(data)=>{ 
        try{ 
         
         const res=await axiosInstance.post("/auth/update-profile",data);
         set({loggedUser:res.data});
         toast.success("Profile Updated Successfully");

        } 
        catch(error){ 
             
            toast.error("Updating profile failed");

        }
    }

}));
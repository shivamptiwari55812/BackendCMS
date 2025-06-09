import mongoose from "mongoose";


const userSchema = new mongoose.Schema({

    username:{
        type:String,
        required:true,
        unique:true,

    },
    password:{
        type:String,
        required:true,
        
    },
    phone:{
        type:String,
        unique:true,
        required:true,

    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
},
{timestamps:true});

const user = mongoose.model("user",userSchema)

export default user;
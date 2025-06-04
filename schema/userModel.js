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
    Phone:{
        type:String,
        unique:true,
        required:true,

    },
    email:{
        type:email,
        unique:true,
        required:true,
    },
},
{timestamps:true});

const user = mongoose.model("user",userSchema)
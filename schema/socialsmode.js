import mongoose from "mongoose"

const socialSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
      },
    linkedIn:{
        type:String,
        required:false,
        unique:true
    },
    Github:{
        type:String,
        required:false,
        unique:true
    },
    Instagram:{
        type:String,
        required:false,
        unique:true
    },
    website:{
        required:false,
        type:String,
        unique:true
    },

},{
    timestamps:true
})

const socials = mongoose.model("socials",socialSchema)
export default socials
import mongoose from "mongoose"
const projectSchema = new mongoose.Schema({
    username: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
    ProjectName:{
        type:String,
        required:true,
    },
    ProjectImg:{
        type:String,
        required:true
    },
    ProjDescription:{
        type:String,
        required:true
    },
    VideoProject:{
        type:String,
        required:false
    },
    ProjectCode:{
        type:String,
        required:true
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

},
{timestamps:true}
)

const projectDB = mongoose.model("projectDB",projectSchema)

export default projectDB;
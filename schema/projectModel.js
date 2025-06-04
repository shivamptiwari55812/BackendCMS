import mongoose from "mongoose"
const projectSchema = new mongoose.Schema({
    BlogImg :{
        type:String,
        required:false
    },
    BlogText:{
        type:String,
        required:True
    },
    ProjectImg:{
        type:String,
        required:false
    },
    ProjDescription:{
        type:String,
        required:false
    },
    VideoProject:{
        type:String,
        required:false
    }

},
{timestamps:true}
)

const projectDB = mongoose.model("projectDB",projectSchema)
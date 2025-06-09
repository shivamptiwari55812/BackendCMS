import dotenv from 'dotenv'
dotenv.config();
import {  cloudinary, storage  } from "../utils/cloudinary.js";
import projectDB from "../schema/projectModel.js"
const saveProjects= async (req , res)=>{
    try{
      console.log(req.body);
      console.log("Body:", req.body);
console.log("File - Image:", req.files?.projectImg?.[0]);
console.log("File - Video:", req.files?.videoProject?.[0]);
console.log("File - PDF:", req.files?.projectCode?.[0]);

      const { projectName, projectDescription, projectImg, videoProject, projectCode } = req.body;

    if(!req.body.projectName || !req.body.projectDescription){
        return res.status(400).json({"message":'Enter all the required fields'});
    }

    console.log("Yha tk ookay h")
    const project = await projectDB.create({
        ProjectName: projectName,
        ProjDescription: projectDescription,
        ProjectImg: req.files.projectImg[0].path,
        VideoProject: req.files.videoProject[0].path,
        ProjectCode: req.files.projectCode[0].path,
        username : user._id
    });
    console.log("Yha tk bhi theek h")
    console.log(req.body)
    res.status(200).json({"message":'Successfull'});
}
catch(error){
    res.status(500).json({"message":"Server error"});
}
}




const functionality = async(req,res)=>{

    try{
        const totalNumberOfprojects = projectDB.countDocuments({username:user._id});
        if(totalNumberOfprojects === 0 || null){
            return res.status(400).json({"message":"Not available"})
        }
        return res.status(200).json({"Total Projects":totalNumberOfprojects})
    }catch(error){
        return res.status(500).json({"message":"Not available"})
        console.error(error)
    }
}


export default saveProjects ;
export {functionality};
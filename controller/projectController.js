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

console.log("User ID:", req.user.id);
const userId = req.user.id; // ✅ this is correct based on your JWT
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
        username : userId
    });
    console.log("Yha tk bhi theek h")
    console.log(req.body)
    res.status(200).json({"message":'Successfull'});
}
catch(error){
    res.status(500).json({"message":"Server error"});
}
}



const deleteProject
const functionality = async(req,res)=>{

    try{
        const username = req.user.id; 
              if(!username){
                return res.status(404).json({"message":"User not found"})
              }
        const totalNumberOfprojectImg = await projectDB.countDocuments({username:username, ProjectName: { $exists: true, $ne: null } });
        const totalNumberOfprojectDescription = await projectDB.countDocuments({username:username, ProjDescription: { $exists: true, $ne: null } });
        const totalNumberOfprojectVideo = await projectDB.countDocuments({username:username, VideoProject: { $exists: true, $ne: null } });
        const totalNumberOfprojectCode = await projectDB.countDocuments({username:username, ProjectCode: { $exists: true, $ne: null } });
        console.log(totalNumberOfprojectImg,totalNumberOfprojectDescription,totalNumberOfprojectVideo,totalNumberOfprojectCode)
        // if(totalNumberOfprojectImg === 0 || null){
        //     return res.status(400).json({"message":"Not available"})
        // }
        return res.status(200).json({TotalProjects:totalNumberOfprojectImg,TotalDescription:totalNumberOfprojectDescription,TotalVideo:totalNumberOfprojectVideo,TotalCode:totalNumberOfprojectCode})
    }catch(error){
        return res.status(500).json({"message":"Not available"})
        console.error(error)
    }
}


const sendImportant = async(req,res)=>{
    try{
        const username = req.user.id;
        if(!username){
            return res.status(404).json({"message":"User not found"})   
        }
        const importantProjects = await projectDB.find({username:username}).sort({createdAt:-1}).limit(8);
        console.log(importantProjects)
        return res.status(200).json({"message":"Successfull",importantProjects})
        
        if(!importantProjects){
            return res.status(400).json({"message":"Not available"})    
        }
    }catch(error){
        console.log(error)
    }
}



export default saveProjects ;
export {functionality , sendImportant};

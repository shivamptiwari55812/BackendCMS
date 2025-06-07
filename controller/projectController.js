import dotenv from 'dotenv'
dotenv.config();

import projectDB from "../schema/projectModel.js"
const saveProjects= async (req , res)=>{
    try{
      const { projectName, projectDescription, projectImg, videoProject, projectCode } = req.body;

    if(!req.body.projectName || !req.body.projectDescription || !req.body.projectImg || !req.body.videoProject || !req.body.projectCode ){
        res.status(400).json({"message":'Enter all the required fields'});
    }
    
    const project = await projectDB.create({
        ProjectName: projectName,
        ProjDescription: projectDescription,
        ProjectImg: projectImg,
        VideoProject: videoProject,
        ProjectCode: projectCode
    });
    console.log(req.body)
    res.status(200).json({"message":'Successfull'});
}
catch(error){
    res.status(500).json({"message":"Server error"});
}
}







export default saveProjects;
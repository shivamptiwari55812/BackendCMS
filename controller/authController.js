import dotenv from "dotenv";
dotenv.config();
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import {validationResult} from "express-validator"
import user from "../schema/userModel.js";
import bcrypt from "bcrypt"
import socials from "../schema/socialsmode.js"

//signUp function
const signUp = async(req,res)=>{

    try{
      console.log(req.body)
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()});
    }
    const {username , password , email ,phone} = req.body;
    if(!username || !email || !password || !phone){
       return res.status(400).json({"message":'Enter all the required fields'})
    }

    console.log("JAy shree ram")

    const hashPassword = await bcrypt.hash(password,10);
    const saveCredentials = await user.create({
        username:username,
        password:hashPassword,
        email:email,
        phone:phone
    });

    console.log("Jay Shree ram")
    const payload={
        id:( saveCredentials)._id,
        username:(saveCredentials).username,
        email:( saveCredentials).email,
        phone:( saveCredentials).phone

    }
     const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });
    console.log(req.body)
    console.log(token)
    res.status(200).json({"message":'Successfull', token });
    }
    catch(error){
        console.log(error);
    }

}


//login Function
const login = async (req, res)=>{

    try{
    const {username , password} = req.body;
    if(!username || !password){
       return res.status(400).json({"message":'Enter all the required fields'})
    }

  const foundUser = await user.findOne({username});
  if(!foundUser){
    return res.status(400).json({"message":"user not found"});
  }

  
  const isMatch = await bcrypt.compare(password,foundUser.password);
 
  if(!isMatch){
   return res.status(400).json({"message":"Invalid Password"});
  }
  
  const payload ={
    id:foundUser._id,
    username: foundUser.username
    

  };

  const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'2h'});

  res.status(200).json({"message":'Successfull',token});

}
  catch(error){
       console.error("Login error:", error);
    res.status(500).json({ message: 'Server error' });
  }}



  const getUserDetails = async function(req,res) {
    try{
      const username = req.user.id; 
      if(!username){
        return res.status(404).json({"message":"User not found"})
      }
    const socialDetails = await socials.findOne({ username: username }).sort({ createdAt: -1 });
    console.log(socialDetails)
    return res.status(200).json({"message":'Successfull',socialDetails});
    }

    catch(error){
       console.error("Login error:", error);
    res.status(500).json({ message: 'Server error' });
    }

  }

  const saveProfiles = async (req,res)=>{
     try{
      const userId = req.user.id;
      const{instagram , github , linkedin , website} = req.body;
      
      const createSocials = await socials.create({
        Instagram:instagram,
        Github:github,
        linkedIn:linkedin,
        website:website,
        username:userId

      });
      return res.status(200).json({"message":"Successfull"})

  }catch(error){
    console.log(error)
  }
}



  export default signUp;
  export {login};
  export {getUserDetails};
  export {saveProfiles}
import dotenv from "dotenv";
dotenv.config();
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import {validationResult} from "express-validator"
import user from "../schema/userModel.js";
import bcrypt from "bcrypt"

//signUp function
const signUp = async(req,res)=>{

    try{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()});
    }
    const {username , password , email ,Phone} = req.body;
    if(!username || !email || !password || !Phone){
       return res.status(400).json({"message":'Enter all the required fields'})
    }

    const hashPassword = await bcrypt.hash(password,10);
    const saveCredentials = await user.create({
        username:username,
        password:hashPassword,
        email:email,
        Phone:Phone
    });
    const payload={
        id:( saveCredentials)._id,
        username:(saveCredentials).username,
        email:( saveCredentials).email,
        Phone:( saveCredentials).Phone

    }
     const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });
    console.log(req.body)
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
   return res.status(400).json({"message":"Invalid Credential"});
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


  export default signUp;
  export {login};
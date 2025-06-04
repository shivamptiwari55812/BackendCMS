import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();
export async function connectMongoose(url){
     await mongoose.connect(process.env.URL).then((res) => console.log("Database connected")).catch((err) => console.log(err))
   
}
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import  {connectMongoose}   from './db/database.js';
const port = process.env.PORT || 5000;
const app = express();
// import { connectMongoose } from './db/database';

app.get('/',(req,res)=>{
    res.send("Hello world !")
})
connectMongoose();
// app.use(connectMongoose());
app.listen(port,()=>{
    console.log(`Server is running at ${port}`);
    
})
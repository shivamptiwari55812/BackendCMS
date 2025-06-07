import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import  {connectMongoose}   from './db/database.js';
const port = process.env.PORT || 5000;
const app = express();
import bodyParser from 'body-parser';
import projectRoutes from './routes/projectRoutes.js'; // Adjust the path if needed
import userRoutes from './routes/authRoutes.js'
import user from './schema/userModel.js';
dotenv.config();



// Middleware
app.use(bodyParser.json()); // or just app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Routes
app.use('/api', projectRoutes); // All routes will be prefixed with /api/projects
app.use('/api/auth',userRoutes);
app.get('/',(req,res)=>{
    res.send("Hello world !")
})


//DB
connectMongoose();


//port
app.listen(port,()=>{
    console.log(`Server is running at ${port}`);
    
})
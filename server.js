import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import  {connectMongoose}   from './db/database.js';
const port = process.env.PORT || 5000;
const app = express();
import bodyParser from 'body-parser';
import projectRoutes from './routes/projectRoutes.js'; // Adjust the path if needed

dotenv.config();

// Middleware
app.use(bodyParser.json()); // or just app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', projectRoutes); // All routes will be prefixed with /api/projects

app.get('/',(req,res)=>{
    res.send("Hello world !")
})
connectMongoose();
// app.use(connectMongoose());
app.listen(port,()=>{
    console.log(`Server is running at ${port}`);
    
})
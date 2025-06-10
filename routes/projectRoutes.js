import express from 'express';
import multer from "multer";
import verifyToken from "../middleware/authmiddleware.js";
import {functionality,sendImportant} from '../controller/projectController.js'; // Adjust path if needed
import { cloudinary, storage } from "../utils/cloudinary.js";
import saveProjects from '../controller/projectController.js';



const router = express.Router();
const upload = multer({ storage });

const multiUpload = upload.fields([
  { name: "projectImg", maxCount: 1 },
  { name: "videoProject", maxCount: 1 },
  { name: "projectCode", maxCount: 1 }
]);

// POST route to save project
router.post('/save-project', verifyToken,multiUpload ,saveProjects);
router.get("/countProject",verifyToken,functionality)
router.get("/sendImportant",verifyToken,sendImportant)

export default router;

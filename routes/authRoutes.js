import express from 'express';
import signUp from '../controller/authController.js'; // Adjust path if needed
import {login} from "../controller/authController.js";
import { getUserDetails } from '../controller/authController.js';
import { saveProfiles } from '../controller/authController.js';
import verifyToken from "../middleware/authmiddleware.js";

const router = express.Router();

// POST route to save project
router.get('/getSocialDetails',verifyToken,getUserDetails)
router.post('/save-user', signUp);
router.post('/saveProfiles',verifyToken,saveProfiles)
router.post("/login",login)
export default router;

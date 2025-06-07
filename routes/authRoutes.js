import express from 'express';
import signUp from '../controller/authController.js'; // Adjust path if needed
import {login} from "../controller/authController.js";
const router = express.Router();

// POST route to save project
router.post('/save-user', signUp);
router.post("/login",login)
export default router;

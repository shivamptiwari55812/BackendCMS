import express from 'express';
import saveProjects from '../controller/projectController.js'; // Adjust path if needed

const router = express.Router();

// POST route to save project
router.post('/save-project', saveProjects);

export default router;

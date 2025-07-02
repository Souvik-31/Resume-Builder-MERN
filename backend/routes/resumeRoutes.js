import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createResume, getResumes, getResumeById, updateResume, deleteResume } from "../controllers/resumeController.js";
import { uploadResumeImages } from "../controllers/uploadImages.js";


const resumeRouter = express.Router();
resumeRouter.post("/", protect, createResume); // Create a new resume
resumeRouter.get("/", protect, getResumes); // Get all resumes for the logged-in user
resumeRouter.get("/:id", protect, getResumeById); // Get a specific resume by ID
resumeRouter.put("/:id", protect, updateResume); // Update a resume by ID    
resumeRouter.put("/:id/upload-images", protect, uploadResumeImages); // Upload images for a resume
resumeRouter.delete("/:id", protect, deleteResume); // Delete a resume by ID

export default resumeRouter;
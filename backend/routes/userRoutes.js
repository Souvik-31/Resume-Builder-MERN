import express from "express";
import { loginUser, signupUser, getUserProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

// Route to signup a new user
userRouter.post("/signup", signupUser);

// Route to log in a user
userRouter.post("/login", loginUser);
// Route to get the profile of the logged-in user
userRouter.get("/profile", protect, getUserProfile);

export default userRouter;
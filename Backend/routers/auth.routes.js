import express from "express";
import { googleAuth, resetPassword, sendOtp, signUp, verifyOtp } from "../controllers/auth.controllers.js";
import { signIn } from "../controllers/auth.controllers.js";
import { signOut } from "../controllers/auth.controllers.js";

const authRouter=express.Router()
authRouter.post("/signup",signUp)
authRouter.post("/signin",signIn)
authRouter.get("/signout",signOut)
authRouter.post("/send-otp",sendOtp)
authRouter.post("/verify-otp",verifyOtp)
authRouter.post("/reset-password",resetPassword)
authRouter.post("/google-auth",googleAuth )
export default authRouter;
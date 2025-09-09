import express from "express";
import dotenv from "dotenv";
dotenv.config()
import connectDb from "./config/db.js"
import cookieParser from "cookie-parser";
import authRouter from "./routers/auth.routes.js"
import cors from "cors";
import userRouter from "./routers/user.routes.js";
const app = express()
const port=process.env.PORT || 5000
app.use(cors({
     origin:"http://localhost:5173",
     credentials:true
}))
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.listen(port,()=>{
     connectDb()
    console.log(`Server is running at ${port}`);
})
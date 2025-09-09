import jwt from "jsonwebtoken"

const isAuth=async(req,res,next)=>{
    try {
         const token=req.cookies.token;
         if(!token){
            return res.status(400).json({message:"token not found"})
         }  
         const decoded=jwt.verify(token,process.env.JWT_SECRET)
         if(!decoded){
            return res.status(400).json({message:"user not verify"})
         } 
         
           req.userId=decodedToken.userId;  
           next();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
    } catch (error) {
          return res.status(500).json({message:"Auth error",error})
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
    }
}
export default isAuth;
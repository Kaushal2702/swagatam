
import React, { use } from 'react'
import { useState } from 'react'
import { BsEyeFill } from "react-icons/bs";
import { BsEyeSlashFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase"; // ✅ Make sure you export `auth` from firebase.js


function SignIn () {
  const primaryColor = '#ff4d2d';
  const hoverColor = '#e64323';
  const bgcolor='#fff9f6';
  const borderColor='#ddd';
  const [showPassword,setShowPassword]=useState(false);
  const navigate=useNavigate();
  const serverURL = "http://localhost:8000"; 

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [err,setErr]=useState("");
  const [loading,setLoading]=useState(false);
  const handleSignIn=async()=>{
     setLoading(true)
     try {
          const result=await axios.post(`${serverURL}/api/auth/signin`,{
               email,password
          },{withCredentials:true});
          console.log(result)
          setErr("")
          setLoading(false)
     } catch (error) {
           if (error.response) {
      setErr( error.response.data.message);
      alert(error.response.data.message); // 👈 show user-friendly message
   } else {
      setErr(error?.response?.data?.message)
      setLoading(false)
      
   }
     }
  }
  const handleGoogleAuth = async () => {
       
      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        console.log("Google Sign-in success:", result.user);
        try {
            const {data}=await axios.post(`${serverURL}/api/auth/google-auth`,{
                 
                 email:result.user.email,
                 
            },{withCredentials:true})
            console.log("Backend Google Auth success:", data);
            alert("Signed in with Google successfully!");
            navigate("/");
        } catch (error) {
            console.log(error)
        }
       
      } catch (error) {
        console.log("Google Sign-in error:", error.message);
        alert("Google Sign-in failed!");
      }
    };
    
  return (
    <div className='min-h-screen w-full flex items-center justify-center p-4'style={{backgroundColor:bgcolor}}>
        <div className={`bg-white rounded-lg shadow-lg w-full max-w-md p-8 border-[1px]`} style={{border:`1px solid ${borderColor}`}}>
               <h1 className={`text-3xl font-bold mb-2 `} style={{color:primaryColor}}>Swagatam</h1>
               <p className='text-gray-600 mb-8'> Create your account to get started with explore the world</p>
                   
                   {/* Email */}
                   <div className='mb-4'>
                        <label htmlFor="Email" className='block text-gray-700 font medium mb-1'>Email</label>
                        <input type="email"className='w-full border rounded-lg px-3 py-3 focus:outline-none focus:border-orange-500'
                        placeholder='Enter your E-mail' style={{border:`1px solid ${borderColor}`}} onChange={(e)=>setEmail(e.target.value)} value={email} required/>
                   </div>
                   
                    {/* Password */}
                   <div className='mb-4'>
                        <label htmlFor="Password" className='block text-gray-700 font medium mb-1'>Password</label>
                        <div className='relative'>
                        <input type={`${showPassword?"text":"password"}`} className='w-full border rounded-lg px-3 py-3 focus:outline-none focus:border-orange-500'
                        placeholder='Enter your Password' style={{border:`1px solid ${borderColor}`}} onChange={(e)=>setPassword(e.target.value)} value={password}required/>
                        <button className='absolute right-3 cursor-pointer top-[17px] text-gray-500' onClick={()=>setShowPassword(prev=>!prev)}>{!showPassword?<BsEyeFill />:<BsEyeSlashFill />}</button>
                        </div>
                        
                   </div>
                    <div className='text-right mb-4 cursor-pointer text-[#ff4d2d] font-medium'onClick={()=>navigate("/forgot-password")}>Forget Password?</div>
                   
                   
                   <button className={`w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200
                     bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`} onClick={handleSignIn} disabled={loading}>
                    {loading?<Clipboard size={20} color='white'/>:"Sign In"}
                   </button>
                   {err && <p className='text-red-500 text-center my-[10px]'>*{err}</p>}
                   
                <button className='w-full mt-4 flex items-center justify-center gap-2 border
                 rounded-lg cursor-pointer px-4 py-2 transition duration-200 border-gray-200 hover:bg-gray-200' onClick={handleGoogleAuth}><FcGoogle size={20}/>
                <span>SignIn with google</span>
                
                </button>
                <p className='text-center mt-2 cursor-pointer' onClick={()=>navigate("/signup")}>Want to create a new account?<span className='text-[#ff4d2d]'>Sign Up</span></p>
        </div>
    </div>
  )
}

export default SignIn

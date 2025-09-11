
import axios from "axios";

import React, { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { serverURL } from "../App";
function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [err,setErr]=useState("");
  const [loading,setLoading]=useState(false);

  const handleSendOtp=async()=>{
       setLoading(true)
       try{
          const result=await axios.post(`${serverURL}/api/auth/send-otp`,{email},
          {withCredentials:true})
          console.log(result)
          setErr("")
          setStep(2)
          setLoading(false);
       }
       catch(error){
           setErr(error.response.data.message)
           setLoading(false);
       }
  }
const handleVerifyOtp=async()=>{
        setLoading(true)
       try{
          const result=await axios.post(`${serverURL}/api/auth/verify-otp`,{email,otp},
          {withCredentials:true})
          console.log(result)
          setStep(3)
          setLoading(false);
       }
       catch(error){
           setErr(error.response.data.message)
           setLoading(false);
       }
  }
const handleResetPassword=async()=>{
       if(newPassword!==confirmPassword){
          alert("Password and Confirm Password must be same")
          return;
       }
       setLoading(true)
       try{
          const result=await axios.post(`${serverURL}/api/auth/reset-password`,{email,newPassword},
          {withCredentials:true})
          setErr("")
          console.log(result)
          navigate("/signin")
       }
       catch(error){
           setErr(error?.response?.data?.message)
           setLoading(false);
       }
  }
  return (
    <div className="flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        {/* Header with back button */}
        <div className="flex items-center gap-4 mb-4 cursor-pointer">
          <IoMdArrowRoundBack
            size={30}
            className="text-[#ff4d2d]"
            onClick={() => navigate("/signin")}
          />
          <h1 className="text-2xl font-bold text-[#ff4d2d]">
            Forgot Password
          </h1>
        </div>

        {/* Step 1: Enter Email */}
        {step === 1 && (
          <div>
            <div className="mb-6">
              <label
                htmlFor="Email"
                className="block text-gray-700 font-medium mb-1"
              >
                Email
              </label>
              <input
                type="email"
                className="w-full border-[1px] border-gray-200 rounded-lg px-3 py-3 focus:outline-none focus:border-orange-500"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <button
              className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer"
              onClick={handleSendOtp} disabled={loading}
            >
              {loading?<Clipboard size={20} color='white'/>:"Send OTP"}
            </button>
            {err && <p className='text-red-500 text-center my-[10px]'>*{err}</p>}
          </div>
        )}

        {/* Step 2: OTP input (future step) */}
        {step === 2 && 
          <div> 
             <div className="mb-6">
              <label htmlFor="email" className="w-full border-[1px] border-gray-700 font-medium mb-1">OTP</label>
            <input
              type="text"
              className="w-full border-[1px] border-gray-200 rounded-lg px-3 py-3 focus:outline-none focus:border-orange-500"
              placeholder="Enter OTP" onChange={(e) => setOtp(e.target.value)} value={otp}
            />
          </div>
          <button className={`w-full font-semiboldpy-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`} onClick={handleVerifyOtp}>
            verify Otp  
          </button>
          </div>
        }
        {step === 3 && 
          <div> 
<div className="mb-6">
              <label htmlFor="newPassword" className="w-full  border-gray-700 font-medium mb-1">New Password</label>
            <input
              type="password"
              className="w-full border-[1px] border-gray-200 rounded-lg px-3 py-3 focus:outline-none focus:border-orange-500"
              placeholder="Enter New Password" onChange={(e) => setNewPassword(e.target.value)} value={newPassword}
            />
          </div>
          <div className="mb-6">
              <label htmlFor="ConfirmPassword" className="w-full  border-gray-700 font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              className="w-full border-[1px] border-gray-200 rounded-lg px-3 py-3 focus:outline-none focus:border-orange-500"
              placeholder="Enter Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} required
            />
          </div>
          
          <button className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`} onClick={handleResetPassword} disabled={loading}> 
           {loading?<Clipboard size={20} color='white'/>:"Reset Password"}
          </button>
          </div>
        }
      </div>
    </div>
  );
}

export default ForgotPassword;

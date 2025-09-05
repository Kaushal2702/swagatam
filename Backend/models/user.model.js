import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   fullName:{
      type:String,
      required:true
   },
   email:{
      type:String,
      required:true,
      unique:true
   },
   password:{
      type:String,  
   },
   mobile:{
      type:String,
      required:true,
      match: [/^[0-9]{10}$/, "Mobile must be 10 digits"]
   },
   role:{
     type:String,
     enum:["user","Emergency","Police Department"],
     required:true
   },
   aadhaar: {
    type: String, 
    validate: {
    validator: function (v) {
      return /^[0-9]{12}$/.test(v) || /^[A-Z][0-9]{7}$/.test(v);
    },
    message: "Invalid Aadhaar (12 digits) or Passport (1 letter + 7 digits)"
  },
      required: false
  },
  trip: {
    type: String, 
    required: false
  },
  emergency: {
    type: String, // Emergency contact number
    required: false
  },
  resetOtp:{
   type:String,
  },
  isOtpVerified:{
   type:Boolean,
   default:false
  },
  otpExpires:{
   type:Date
  }


},{timestamps:true});

const User=mongoose.model("User",userSchema);
export default User;
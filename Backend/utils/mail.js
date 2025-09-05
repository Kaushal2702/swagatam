import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  
  // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL, // your Gmail account
    pass: process.env.PASS, // your Gmail password or app password
  },
});

export const sendEmail = async (to, otp) => {
try{
  await transporter.sendMail({
      from:process.env.EMAIL,
      to,
      subject: "Password Reset OTP",
      html: `<p>Your OTP for password reset is: <b>${otp}</b> It expires in 5 minutes</p>`,
  })
  console.log("opt email sent",to);
} catch(error){
  console.log("email sending error",error);
  throw error;
}
}
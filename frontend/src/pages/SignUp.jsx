// src/components/SignUp.js

import React, { useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import axios from "axios";
import { auth } from "../../firebase";
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

function SignUp() {
  const primaryColor = "#ff4d2d";
  const bgcolor = "#fff9f6";
  const borderColor = "#ddd";

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const navigate = useNavigate();
  const serverURL = "http://localhost:8000";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [trip, setTrip] = useState("");
  const [emergency, setEmergency] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSignUp = async () => {
    if (!fullName || !email || !password) {
      return setErr("Please fill all required fields");
    }
    if (!mobile) {
      return setErr("Mobile number is required");
    }
    setErr("");
    setLoading(true);

    try {
      const result = await axios.post(
        `${serverURL}/api/auth/signup`,
        { fullName, email, mobile, password, role, aadhaar, trip, emergency },
        { withCredentials: true }
      );

      dispatch(setUserData(result.data));
      console.log("Signup success:", result.data);
      alert("Account created successfully!");
      navigate("/signin");
    } catch (error) {
      if (error.response) {
        console.log("Backend error:", error.response.data?.message);
        setErr(error.response.data?.message || "Signup failed");
      } else {
        console.log("Unexpected error:", error.message);
        setErr("Something went wrong. Try again!");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    if (!mobile || !aadhaar || !trip || !emergency) {
      return setErr("Please fill all the fields before Google Sign-in");
    }
    setErr("");
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log("Google Sign-in success:", result.user);

      const { data } = await axios.post(
        `${serverURL}/api/auth/google-auth`,
        {
          fullName: result.user.displayName,
          email: result.user.email,
          role,
          mobile,
          aadhaar,
          trip,
          emergency,
        },
        { withCredentials: true }
      );

      dispatch(setUserData(data));
      console.log("Backend Google Auth success:", data);
      alert("Signed in with Google successfully!");
      navigate("/");
    } catch (error) {
      if (error.response) {
        setErr(error.response.data?.message || "Google Auth failed");
      } else {
        console.log("Google Sign-in error:", error.message);
        setErr("Google Sign-in failed!");
      }
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{ backgroundColor: bgcolor }}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 border"
        style={{ border: `1px solid ${borderColor}` }}
      >
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: primaryColor }}
        >
          Swagatam
        </h1>
        <p className="text-gray-600 mb-8">
          Create your account to get started with exploring the world
        </p>

        <InputField
          label="Full Name"
          type="text"
          placeholder="Enter your Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          borderColor={borderColor}
          required
        />

        <InputField
          label="Email"
          type="email"
          placeholder="Enter your E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          borderColor={borderColor}
          required
        />

        <InputField
          label="Mobile No."
          type="tel"
          placeholder="Enter your Phone Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          borderColor={borderColor}
          required
        />

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full border rounded-lg px-3 py-3 focus:outline-none focus:border-orange-500"
              placeholder="Enter your Password"
              style={{ border: `1px solid ${borderColor}` }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-[17px] text-gray-500"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
            </button>
          </div>
        </div>

        <InputField
          label="Aadhaar / Passport"
          type="text"
          placeholder="Enter Aadhaar or Passport Number"
          value={aadhaar}
          onChange={(e) => setAadhaar(e.target.value)}
          borderColor={borderColor}
        />

        <InputField
          label="Trip Details"
          type="text"
          placeholder="Destination / Duration"
          value={trip}
          onChange={(e) => setTrip(e.target.value)}
          borderColor={borderColor}
        />

        <InputField
          label="Emergency Contact"
          type="text"
          placeholder="Emergency Contact No."
          value={emergency}
          onChange={(e) => setEmergency(e.target.value)}
          borderColor={borderColor}
        />

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Role</label>
          <div className="flex gap-2">
            {["user", "Emergency", "Police"].map((r) => (
              <button
                key={r}
                type="button"
                className="flex-1 border rounded-lg px-3 py-2 text-center font-medium transition-colors cursor-pointer"
                onClick={() => setRole(r)}
                style={
                  role === r
                    ? { backgroundColor: primaryColor, color: "white" }
                    : { border: `1px solid ${primaryColor}`, color: primaryColor }
                }
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer"
          onClick={handleSignUp}
          disabled={loading}
        >
          {loading ? <ClipLoader size={20} color="white" /> : "Sign Up"}
        </button>

        {err && <p className="text-red-500 text-sm mt-2">*{err}</p>}

        <button
          type="button"
          className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg cursor-pointer px-4 py-2 transition duration-200 border-gray-200 hover:bg-gray-200"
          onClick={handleGoogleAuth}
        >
          <FcGoogle size={20} />
          <span>Sign Up with Google</span>
        </button>

        <p
          className="text-center mt-2 cursor-pointer"
          onClick={() => navigate("/signin")}
        >
          Already have an account?
          <span className="text-[#ff4d2d]"> Sign In</span>
        </p>
      </div>
    </div>
  );
}

const InputField = ({ label, type, placeholder, value, onChange, borderColor, required }) => (
  <div className="mb-4">
    <label className="block text-gray-700 font-medium mb-1">{label}</label>
    <input
      type={type}
      className="w-full border rounded-lg px-3 py-3 focus:outline-none focus:border-orange-500"
      placeholder={placeholder}
      style={{ border: `1px solid ${borderColor}` }}
      value={value}
      onChange={onChange}
      required={required}
    />
  </div>
);

export default SignUp;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "swagatam-47c3d.firebaseapp.com",
  projectId: "swagatam-47c3d",
  storageBucket: "swagatam-47c3d.firebasestorage.app",
  messagingSenderId: "926350442678",
  appId: "1:926350442678:web:e229f825eab7cfc2502617",
  measurementId: "G-GRV54PNHMP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export {app,auth};
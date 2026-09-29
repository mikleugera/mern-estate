// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-c8a65.firebaseapp.com",
  projectId: "mern-estate-c8a65",
  storageBucket: "mern-estate-c8a65.firebasestorage.app",
  messagingSenderId: "230106949928",
  appId: "1:230106949928:web:351a2766b7889a6f92881d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
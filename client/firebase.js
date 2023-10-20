// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-83a56.firebaseapp.com",
  projectId: "real-estate-83a56",
  storageBucket: "real-estate-83a56.appspot.com",
  messagingSenderId: "460643476017",
  appId: "1:460643476017:web:70c82120d854635c4d6b10"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
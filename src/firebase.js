// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwdzk-mZ870YMASolR6HftRDnLr7eIkB8",
  authDomain: "fir-tutorial-523e8.firebaseapp.com",
  projectId: "fir-tutorial-523e8",
  storageBucket: "fir-tutorial-523e8.appspot.com",
  messagingSenderId: "639166466863",
  appId: "1:639166466863:web:db5c332b77ffecf568efda"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// const db = getFirestore(app);

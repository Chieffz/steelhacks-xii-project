// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0nMY0eJApeRTOL0Iwy8Fm4hNigxO_rwQ",
  authDomain: "steelhacksxii.firebaseapp.com",
  projectId: "steelhacksxii",
  storageBucket: "steelhacksxii.firebasestorage.app",
  messagingSenderId: "844090306769",
  appId: "1:844090306769:web:5643cbc43120b9dc5215f0",
  measurementId: "G-V3ELSWGK2B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ EXPORT auth
export const auth = getAuth(app);
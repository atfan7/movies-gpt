// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBSQO58TYd30MHzElixbhI-YhydtaQ9YQ",
  authDomain: "moviesgpt-44ade.firebaseapp.com",
  projectId: "moviesgpt-44ade",
  storageBucket: "moviesgpt-44ade.firebasestorage.app",
  messagingSenderId: "275247832224",
  appId: "1:275247832224:web:3c70ecaef46a679ca43dc5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
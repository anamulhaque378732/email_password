// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLF1Xo2tl7JsDkkVB1S0BwRvwa5VMRt20",
  authDomain: "user-email-password-auth-9a287.firebaseapp.com",
  projectId: "user-email-password-auth-9a287",
  storageBucket: "user-email-password-auth-9a287.firebasestorage.app",
  messagingSenderId: "97086948057",
  appId: "1:97086948057:web:ff56aa1d169a931338f4c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth
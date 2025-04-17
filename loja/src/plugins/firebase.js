// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChs7bdFv6_NmGdHVcYXXsM7nLSFpBpPUc",
  authDomain: "ppi3-8268a.firebaseapp.com",
  projectId: "ppi3-8268a",
  storageBucket: "ppi3-8268a.firebasestorage.app",
  messagingSenderId: "579949312526",
  appId: "1:579949312526:web:7b6faae1763ee836349a5f",
  measurementId: "G-B76WHFBKCN"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;
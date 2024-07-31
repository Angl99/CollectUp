// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseKey = import.meta.env.VITE_FIREBASE_PROD_KEY
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: firebaseKey,
  authDomain: "capstoneprod.firebaseapp.com",
  projectId: "capstoneprod",
  storageBucket: "capstoneprod.appspot.com",
  messagingSenderId: "916329696238",
  appId: "1:916329696238:web:f5e503d837f374409d5cff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app }
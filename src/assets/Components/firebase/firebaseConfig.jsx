// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseKey = import.meta.env.VITE_FIREBASE_KEY
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: firebaseKey,
  authDomain: "capstone-ac11e.firebaseapp.com",
  projectId: "capstone-ac11e",
  storageBucket: "capstone-ac11e.appspot.com",
  messagingSenderId: "555826150151",
  appId: "1:555826150151:web:fa308d02d680874e8e63a2",
  measurementId: "G-R2D1VKRLQV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app }
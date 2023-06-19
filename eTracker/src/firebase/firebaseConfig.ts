// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjBu4LDGYORZu6Ibh16Z12Dtz0laldvCc",
  authDomain: "etracker-d79e3.firebaseapp.com",
  projectId: "etracker-d79e3",
  storageBucket: "etracker-d79e3.appspot.com",
  messagingSenderId: "392593589562",
  appId: "1:392593589562:web:d5ab11086bdc180efafc03",
  measurementId: "G-FVF6JS8P7V"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)

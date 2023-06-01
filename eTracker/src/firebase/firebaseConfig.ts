// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMRsyagEq5Siqm94tOORarj4xyutRjKQI",
  authDomain: "etracker-4d42b.firebaseapp.com",
  projectId: "etracker-4d42b",
  storageBucket: "etracker-4d42b.appspot.com",
  messagingSenderId: "338775930643",
  appId: "1:338775930643:web:8d998927580d4e5d5b4ce6",
  measurementId: "G-9KY87PQYVV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)

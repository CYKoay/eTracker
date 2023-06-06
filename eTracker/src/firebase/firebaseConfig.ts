// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_F3b_RAyolJOba6yo1SY1sImab77Ipqg",
  authDomain: "etracker-92eaf.firebaseapp.com",
  projectId: "etracker-92eaf",
  storageBucket: "etracker-92eaf.appspot.com",
  messagingSenderId: "987353416844",
  appId: "1:987353416844:web:45e30f6feb8efde3dba7a9",
  measurementId: "G-XZZZ68PMNJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)

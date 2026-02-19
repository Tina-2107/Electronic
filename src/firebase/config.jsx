// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6vomAGiWgtl1ix8xnZ6G9ELuk36-Owhc",
  authDomain: "d-light-cdb1c.firebaseapp.com",
  projectId: "d-light-cdb1c",
  storageBucket: "d-light-cdb1c.firebasestorage.app",
  messagingSenderId: "136915027694",
  appId: "1:136915027694:web:9eb839f67ad7bd6d85d5ff",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth };

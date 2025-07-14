// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyARLpMTxUDW5B1EY56sPF8l_5kAdwMtbWw",
    authDomain: "ecommerce-f7f28.firebaseapp.com",
    projectId: "ecommerce-f7f28",
    storageBucket: "ecommerce-f7f28.firebasestorage.app",
    messagingSenderId: "581373884653",
    appId: "1:581373884653:web:87b9717bac48688af5b4e4",
    measurementId: "G-HFLQ6Z1L2M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
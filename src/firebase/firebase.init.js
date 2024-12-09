// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOpPKzz329CKmr3h0wURUKQE4zaz2mlCM",
  authDomain: "messmanagement-367a1.firebaseapp.com",
  projectId: "messmanagement-367a1",
  storageBucket: "messmanagement-367a1.firebasestorage.app",
  messagingSenderId: "987373210679",
  appId: "1:987373210679:web:fdd36439549a390bab03b2",
  measurementId: "G-0PFVV162JQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth = getAuth(app);
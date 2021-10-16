// This import loads the firebase namespace.
import firebase from 'firebase/app';

// These imports load individual services into the firebase namespace.
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';




// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpJi_qFjJKasyuK7WGmYZ1Oe8paSyTGlM",
  authDomain: "monster-hunter-82546.firebaseapp.com",
  projectId: "monster-hunter-82546",
  storageBucket: "monster-hunter-82546.appspot.com",
  messagingSenderId: "793772125228",
  appId: "1:793772125228:web:a6f9b2ad2fc6db932a7589",
  measurementId: "G-JELLT0T1F2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// firebase references
export const auth = firebase.auth();

// data structure is in docs
export const db = firebase.firestore();

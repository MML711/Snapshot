// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxDoWdDCniQwJypa6ZkObq6la99r_6JEw",
  authDomain: "chat-9370c.firebaseapp.com",
  projectId: "chat-9370c",
  storageBucket: "chat-9370c.appspot.com",
  messagingSenderId: "318981463849",
  appId: "1:318981463849:web:f922de99e51def876ca138"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
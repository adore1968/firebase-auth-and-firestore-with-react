import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBU41pfe3dmtQUSWQkk58T4kErJjuQrppI",
  authDomain: "react-fb-auth-7ff08.firebaseapp.com",
  projectId: "react-fb-auth-7ff08",
  storageBucket: "react-fb-auth-7ff08.appspot.com",
  messagingSenderId: "52851504001",
  appId: "1:52851504001:web:dc93bd4f13ba8ab91d2e80",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

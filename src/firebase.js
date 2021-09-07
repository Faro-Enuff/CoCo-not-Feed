// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import { firebaseConfig } from "../src/utils/firbaseData";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

export const googleAuth = new firebase.auth.GoogleAuthProvider();

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);

// Firestore Reference
export const db = firebase.firestore();

// Firebase Storage Reference (File & Image Upload)
export const storage = firebase.storage();

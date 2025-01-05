// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getMessaging } from 'firebase/messaging';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiNMJMuRkd0mr9woTyt8b9UWaDQLN4els",
  authDomain: "magr-7ae80.firebaseapp.com",
  projectId: "magr-7ae80",
  storageBucket: "magr-7ae80.firebasestorage.app",
  messagingSenderId: "311799049363",
  appId: "1:311799049363:web:6623316a6dec7e056d3166"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore instance
export const db = getFirestore(app);

// Possibly set up messaging
// Note: "getMessaging()" is not yet fully supported on iOS with the web SDK in RN. 
// Many devs use react-native-firebase for messaging. 
// We'll keep it here as a placeholder.
export const messaging = getMessaging(app);
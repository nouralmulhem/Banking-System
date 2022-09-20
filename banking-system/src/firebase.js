import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAvjIHSntEfnM9-BOHIAiRxO1NjWtJIts0",
  authDomain: "banking-system-4cbcc.firebaseapp.com",
  databaseURL: "https://banking-system-4cbcc-default-rtdb.firebaseio.com",
  projectId: "banking-system-4cbcc",
  storageBucket: "banking-system-4cbcc.appspot.com",
  messagingSenderId: "1022871901043",
  appId: "1:1022871901043:web:a7ce54d4bc6c8b5f64eb06",
  measurementId: "G-1VFYNL0NQG",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

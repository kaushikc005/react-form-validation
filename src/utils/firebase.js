import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { collection } from "firebase/firestore"
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "novelti-form.firebaseapp.com",
  projectId: "novelti-form",
  storageBucket: "novelti-form.appspot.com",
  messagingSenderId: "330012516169",
  appId: "1:330012516169:web:87f40e96119edfe28f0498"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const userDataRef = collection(db, "userData")
export const auth = getAuth(app);
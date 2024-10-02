import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAXm4TrR1u7JNVMeAA0LbowiYNJhdUKfws",
  authDomain: "e-mart-d2461.firebaseapp.com",
  projectId: "e-mart-d2461",
  storageBucket: "e-mart-d2461.appspot.com",
  messagingSenderId: "825478723363",
  appId: "1:825478723363:web:8c7403ee81266e0f917e96"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
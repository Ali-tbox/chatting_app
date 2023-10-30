import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBS0LdBGfHiizqEMtcbUi3K1I4XiU00UJ8",
  authDomain: "chat-4e1c1.firebaseapp.com",
  projectId: "chat-4e1c1",
  storageBucket: "chat-4e1c1.appspot.com",
  messagingSenderId: "82196261295",
  appId: "1:82196261295:web:4dd9cd922ab6d00700a75a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();

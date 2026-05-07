import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDathVdr-sROZke1jFMFimH7-RjEOJ8aXs",
  authDomain: "azwaj-marriage.firebaseapp.com",
  projectId: "azwaj-marriage",
  storageBucket: "azwaj-marriage.firebasestorage.app",
  messagingSenderId: "133077457402",
  appId: "1:133077457402:web:0fbf8eec720354fd9c6c43"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

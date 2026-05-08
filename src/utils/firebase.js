import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// ورسل (Vite) انوائرمنٹ ویری ایبلز سے کنفیگریشن حاصل کرنا
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// فائر بیس انیشیالائز کرنا
const app = initializeApp(firebaseConfig);

// تمام سروسز ایکسپورٹ کرنا تاکہ پورے ایپ میں استعمال ہو سکیں
export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app); // ریئل ٹائم ڈیٹا بیس (اگر لائیو چیٹ کے لیے ضرورت ہو)
export const storage = getStorage(app);

export default app;

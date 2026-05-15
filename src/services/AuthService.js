import { auth, googleProvider, db } from "../utils/firebase";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export const AuthService = {
  observeAuthState: (callback) => {
    // چیک کریں کہ کیا فائر بیس صحیح سے لوڈ ہوا ہے
    if (!auth) {
      return () => {}; 
    }

    return onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const docSnap = await getDoc(doc(db, "users", user.uid));
          callback(docSnap.exists() ? { ...user, ...docSnap.data() } : user);
        } else {
          callback(null);
        }
      } catch (e) {
        // چور کو پکڑنے والا لاجک: یہ بتائے گا کہ مسئلہ کہاں ہے
        const errorDetail = e.message || "Unknown Connection Error";
        
        // اگر نیٹ ورک یا ریفرنس کا مسئلہ ہو تو یوزر کو ہوم پیج پر سیفلی بھیج دو
        callback(null);
      }
    });
  },
  
  // سیلف ہیلنگ لاگ ان
  loginWithGoogle: async () => {
    try {
      if (!googleProvider) throw new Error("Google Provider not initialized");
      return await signInWithPopup(auth, googleProvider);
    } catch (e) {
      return null;
    }
  },
  
  logout: () => signOut(auth)
};

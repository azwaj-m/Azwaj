import { auth, db } from '../utils/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut 
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const AuthService = {
  // ۱۔ ای میل اور پاس ورڈ سے لاگ ان (یا اگر نیا یوزر ہے تو خودکار اکاؤنٹ بنانا)
  loginWithEmail: async (email, password) => {
    try {
      let userCredential;
      try {
        // پہلے لاگ ان کرنے کی کوشش کریں
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      } catch (loginErr) {
        // اگر اکاؤنٹ موجود نہیں ہے تو نیا اکاؤنٹ بنائیں (Sign Up)
        if (loginErr.code === 'auth/user-not-found' || loginErr.code === 'auth/invalid-credential') {
          userCredential = await createUserWithEmailAndPassword(auth, email, password);
          
          // فائر سٹور میں نیا یوزر پروفائل بنائیں
          await setDoc(doc(db, "users", userCredential.user.uid), {
            uid: userCredential.user.uid,
            email: email,
            displayName: email.split('@')[0],
            verificationStatus: 'unverified', // ڈیفالٹ غیر تصدیق شدہ
            createdAt: new Date().toISOString()
          });
        } else {
          throw loginErr;
        }
      }

      const user = userCredential.user;
      localStorage.setItem('user_session', JSON.stringify({ uid: user.uid, email: user.email }));
      return user;
    } catch (error) {
      console.error("Auth Service Error:", error);
      throw new Error(error.message);
    }
  },

  // ۲۔ گوگل لاگ ان
  loginWithGoogle: async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      // چیک کریں کہ کیا فائر سٹور میں اس کا ڈیٹا پہلے سے موجود ہے؟
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || 'Anonymous',
          photoURL: user.photoURL || '',
          verificationStatus: 'unverified',
          createdAt: new Date().toISOString()
        });
      }

      localStorage.setItem('user_session', JSON.stringify({ uid: user.uid, email: user.email }));
      return user;
    } catch (error) {
      console.error("Google Auth Error:", error);
      throw error;
    }
  },

  // ۳۔ ڈیوائس پر لاگ ان سیشن چیک کریں
  checkSessionValidity: () => {
    const session = localStorage.getItem('user_session');
    if (session) {
      return JSON.parse(session);
    }
    return null;
  },

  // ۴۔ لاگ آؤٹ
  logout: async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('user_session');
    } catch (error) {
      console.error("Logout Error:", error);
    }
  }
};

import { auth, db } from '../utils/firebase';
import {
  signInWithPhoneNumber,
  RecaptchaVerifier,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

export const AuthService = {
  googleProvider: new GoogleAuthProvider(),

  // ۱۔ گوگل پرووائیڈر لاگ ان (محفوظ فلو)
  loginWithGoogle: async () => {
    try {
      const result = await signInWithPopup(auth, AuthService.googleProvider);
      const user = result.user;
      const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

      // فون نمبر فارمیٹ کو صاف کریں اگر موجود ہو، ورنہ ای میل آئی ڈی استعمال کریں
      const docId = user.phoneNumber ? user.phoneNumber.replace('+', '') : user.uid;
      const userDocRef = doc(db, "users", docId);
      const userDoc = await getDoc(userDocRef);

      let userData = {
        uid: user.uid,
        displayName: user.displayName || "صارف",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        photoURL: user.photoURL || defaultAvatar,
        verificationStatus: 'verified',
        updatedAt: serverTimestamp()
      };

      if (!userDoc.exists()) {
        userData.createdAt = serverTimestamp();
        await setDoc(userDocRef, userData);
      } else {
        userData = { ...userDoc.data(), uid: user.uid };
      }

      return userData;
    } catch (error) {
      console.error("Google Auth Error:", error);
      throw new Error("گوگل لاگ ان کی تصدیق ناکام رہی۔");
    }
  },

  // ۲۔ ری کیپچا لائف سائیکل مینیجر (میموری لیک اور اسٹیل ریفرنس بچاؤ)
  setupRecaptcha: (containerId) => {
    try {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
      
      const container = document.getElementById(containerId);
      if (!container) return;

      window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
        size: 'invisible',
        callback: () => { console.log("reCAPTCHA solved successfully."); }
      });
    } catch (error) {
      console.error("reCAPTCHA Setup Error:", error);
    }
  },

  // ۳۔ او ٹی پی بھیجنا (بلنگ بچانے کے لیے $O(1)$ تصدیق کے ساتھ)
  sendOTP: async (phoneNumber) => {
    try {
      const docId = phoneNumber.replace('+', '');
      const userDocRef = doc(db, "users", docId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        throw new Error("یہ نمبر پہلے ہی رجسٹرڈ ہے۔ براہ کرم لاگ ان کریں۔");
      }

      const appVerifier = window.recaptchaVerifier;
      if (!appVerifier) {
        throw new Error("سیکیورٹی تصدیق کا عمل مکمل نہیں ہو سکا۔ پیج ریفریش کریں۔");
      }

      window.confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      return true;
    } catch (error) {
      console.error("OTP Error:", error);
      throw new Error(error.message || "تصدیقی کوڈ بھیجنے میں خرابی پیش آئی۔");
    }
  },

  // ۴۔ او ٹی پی کوڈ کی تصدیق
  verifyOTP: async (otpCode) => {
    try {
      const confirmationResult = window.confirmationResult;
      if (!confirmationResult) throw new Error("تصدیقی سیشن ختم ہو چکا ہے۔");
      const result = await confirmationResult.confirm(otpCode);
      return result.user;
    } catch (error) {
      throw new Error("درج کردہ تصدیقی کوڈ درست نہیں ہے۔");
    }
  },

  // ۵۔ پروفائل کو کلاؤڈ ٹائم اسٹیمپ کے ساتھ محفوظ کرنا ($O(1)$ انڈیکسنگ)
  saveUserToFirestore: async (user, displayName) => {
    try {
      if (!user) throw new Error("صارف سیشن غائب ہے۔");
      const docId = user.phoneNumber.replace('+', '');
      const userDocRef = doc(db, "users", docId);
      const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

      const userData = {
        uid: user.uid,
        phoneNumber: user.phoneNumber,
        displayName: displayName || "صارف",
        photoURL: defaultAvatar,
        verificationStatus: 'verified',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      await setDoc(userDocRef, userData);
      return userData;
    } catch (error) {
      console.error("Firestore Save Error:", error);
      throw new Error("پروفائل ڈیٹا بیس میں محفوظ نہیں کی جا سکی۔");
    }
  },

  // ۶۔ ریل ٹائم اوتھ اسٹیٹ مانیٹرنگ (سورس آف ٹروتھ گارڈ 🛡️)
  monitorAuthState: (onUserChange) => {
    return onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const docId = firebaseUser.phoneNumber 
          ? firebaseUser.phoneNumber.replace('+', '') 
          : firebaseUser.uid;
          
        const userDocRef = doc(db, "users", docId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          onUserChange({ ...userDoc.data(), uid: firebaseUser.uid });
        } else {
          onUserChange(firebaseUser);
        }
      } else {
        onUserChange(null);
      }
    });
  },

  // ۷۔ لاگ آؤٹ
  logout: async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('user_session');
    } catch (error) {
      console.error("SignOut Error:", error);
    }
  }
};

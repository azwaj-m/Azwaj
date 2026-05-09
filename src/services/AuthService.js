import { auth, db } from '../utils/firebase';
import {
  signInWithPhoneNumber,
  RecaptchaVerifier,
  signOut
} from 'firebase/auth';
import { doc, getDoc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';

export const AuthService = {
  // ۱۔ ری کیپچا ویریفائر سیٹ اپ
  setupRecaptcha: (containerId) => {
    if (!window.recaptchaVerifier) {
      const container = document.getElementById(containerId);
      if (!container) return;

      window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
        size: 'invisible',
        callback: (response) => {
          console.log("Recaptcha resolved");
        },
        'expired-callback': () => {
          console.log("Recaptcha expired");
        }
      });
    }
  },

  // ۲۔ چیک کریں کہ نمبر پہلے سے رجسٹرڈ تو نہیں
  checkIfPhoneExists: async (phoneNumber) => {
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("phoneNumber", "==", phoneNumber));
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty; // اگر خالی نہیں ہے تو اس کا مطلب ہے نمبر پہلے سے موجود ہے
    } catch (error) {
      console.error("Check Phone Error:", error);
      throw new Error("نمبر کی تصدیق کے دوران خرابی پیش آئی۔");
    }
  },

  // ۳۔ موبائل پر OTP کوڈ بھیجنا
  sendOTP: async (phoneNumber) => {
    try {
      const appVerifier = window.recaptchaVerifier;
      if (!appVerifier) {
        throw new Error("سیکیورٹی ویریفکیشن سسٹم تیار نہیں ہے۔ پیج ریفریش کریں۔");
      }
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      window.confirmationResult = confirmationResult;
      return true;
    } catch (error) {
      console.error("OTP Sending Error:", error);
      throw new Error(error.message || "او ٹی پی بھیجنے میں دشواری پیش آئی ہے۔");
    }
  },

  // ۴۔ OTP کوڈ کی تصدیق کرنا
  verifyOTP: async (otpCode) => {
    try {
      const confirmationResult = window.confirmationResult;
      if (!confirmationResult) {
        throw new Error("او ٹی پی سیشن ختم ہو چکا ہے۔ دوبارہ کوشش کریں۔");
      }
      const result = await confirmationResult.confirm(otpCode);
      return result.user;
    } catch (error) {
      console.error("OTP Verification Error:", error);
      throw new Error("درج کردہ تصدیقی کوڈ غلط ہے۔");
    }
  },

  // ۵۔ فائر سٹور میں موبائل نمبر والے صارف کا ریکارڈ بنانا / اپ ڈیٹ کرنا
  saveUserToFirestore: async (user, additionalData = {}) => {
    try {
      if (!user) throw new Error("صارف کا عارضی سیشن دستیاب نہیں ہے۔");
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      let userData = {
        uid: user.uid,
        phoneNumber: user.phoneNumber,
        verificationStatus: 'verified',
        createdAt: new Date().toISOString(),
        ...additionalData
      };

      if (!userDoc.exists()) {
        await setDoc(userDocRef, userData);
      } else {
        await setDoc(userDocRef, { ...userDoc.data(), ...additionalData }, { merge: true });
        userData = { ...userDoc.data(), ...additionalData };
      }

      // سیشن لوکل اسٹوریج میں محفوظ کریں
      localStorage.setItem('user_session', JSON.stringify({ uid: user.uid, phoneNumber: user.phoneNumber, displayName: userData.displayName }));
      return userData;
    } catch (error) {
      console.error("Save User Info Error:", error);
      throw new Error("پروفائل ڈیٹا بیس میں محفوظ نہیں ہو سکی۔");
    }
  },

  // ۶۔ موبائل نمبر اور پاس ورڈ سے لاگ ان
  loginWithPhoneAndPassword: async (phoneNumber, password) => {
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("phoneNumber", "==", phoneNumber));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error("اس نمبر سے کوئی اکاؤنٹ رجسٹرڈ نہیں ملا۔");
      }

      let foundUser = null;
      querySnapshot.forEach((doc) => {
        foundUser = doc.data();
      });

      if (foundUser && foundUser.customPassword === password) {
        const sessionUser = { uid: foundUser.uid, phoneNumber: foundUser.phoneNumber, displayName: foundUser.displayName };
        localStorage.setItem('user_session', JSON.stringify(sessionUser));
        return foundUser;
      } else {
        throw new Error("درج کردہ پاس ورڈ غلط ہے۔");
      }
    } catch (error) {
      console.error("Login Query Error:", error);
      throw new Error(error.message || "لاگ ان کے دوران خرابی پیش آئی۔");
    }
  },

  // ۷۔ لوکل سیشن چیکر
  checkSessionValidity: () => {
    const session = localStorage.getItem('user_session');
    if (session) {
      return JSON.parse(session);
    }
    return null;
  },

  // ۸۔ لاگ آؤٹ
  logout: async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('user_session');
    } catch (error) {
      console.error("Logout Error:", error);
    }
  }
};

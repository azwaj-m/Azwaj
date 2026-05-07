import { auth, db, storage } from '../utils/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// 1. لاگ ان اور پروفائل بنانا/اپڈیٹ کرنا
export const handleAuthAndProfile = async (file = null) => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    let photoURL = user.photoURL;
    
    // اگر فائل (تصویر) موجود ہے تو اپلوڈ کریں
    if (file && file instanceof File) {
      const storageRef = ref(storage, `profiles/${user.uid}`);
      await uploadBytes(storageRef, file);
      photoURL = await getDownloadURL(storageRef);
    }

    const userDoc = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: photoURL,
      lastSeen: new Date(),
      updatedAt: new Date()
    };

    await setDoc(doc(db, "users", user.uid), userDoc, { merge: true });
    return { success: true, user: userDoc };
  } catch (error) {
    console.error("Auth Error:", error);
    return { success: false, error };
  }
};

// 2. صرف پروفائل ڈیٹا اپڈیٹ کرنے کے لیے (بغیر ری-لاگ ان)
export const updateUserProfile = async (userId, data) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      ...data,
      updatedAt: new Date()
    });
    return { success: true };
  } catch (error) {
    console.error("Update Error:", error);
    return { success: false, error };
  }
};

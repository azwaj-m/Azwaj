import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, db } from '../utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({
    fullName: "لوڈنگ...",
    profileImg: "https://via.placeholder.com/150",
    isVerified: false
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. چیک کریں کہ صارف لاگ ان ہے یا نہیں
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        // 2. اگر لاگ ان ہے تو Firestore سے ڈیٹا ریئل ٹائم میں لیں
        const userDocRef = doc(db, "users", currentUser.uid);
        const unsubscribeDoc = onSnapshot(userDocRef, (snapshot) => {
          if (snapshot.exists()) {
            setUserData(snapshot.data());
          }
          setLoading(false);
        }, (error) => {
          console.error("Firestore Error:", error);
          setLoading(false);
        });
        
        return () => unsubscribeDoc();
      } else {
        setUserData(null);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // 3. ڈیٹا اپڈیٹ کرنے کا فنکشن (جو براہ راست فائر بیس میں سیو کرے گا)
  const updateProfile = async (updates) => {
    if (!user) return { success: false, error: "صارف لاگ ان نہیں ہے" };
    try {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, updates);
      return { success: true };
    } catch (error) {
      console.error("Update Error:", error);
      return { success: false, error };
    }
  };

  return (
    <UserContext.Provider value={{ user, userData, loading, updateProfile }}>
      {!loading && children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

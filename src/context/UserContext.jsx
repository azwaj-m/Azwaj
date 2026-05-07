import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, db } from '../utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({
    fullName: "مہمان صارف",
    profileImg: "https://via.placeholder.com/150",
    isVerified: false
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // اگر فائر بیس کنکشن میں مسئلہ ہو تو 5 سیکنڈ بعد لوڈنگ زبردستی ختم کر دیں
    const timeout = setTimeout(() => {
      if (loading) {
        console.warn("Firebase took too long, bypassing loading...");
        setLoading(false);
      }
    }, 5000);

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      clearTimeout(timeout);
      setUser(currentUser);
      
      if (currentUser) {
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
    }, (error) => {
      console.error("Auth Error:", error);
      setLoading(false);
    });

    return () => {
      unsubscribeAuth();
      clearTimeout(timeout);
    };
  }, []);

  const updateProfile = async (updates) => {
    if (!user) return { success: false, error: "لاگ ان ضروری ہے" };
    try {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, updates);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  return (
    <UserContext.Provider value={{ user, userData, loading, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

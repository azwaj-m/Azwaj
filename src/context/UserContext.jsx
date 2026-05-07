import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, db } from '../utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
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
    });

    return () => unsubscribeAuth();
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
      {/* سفید سکرین سے بچنے کے لیے لوڈنگ سٹیٹ کو ہینڈل کریں */}
      {loading ? (
        <div className="h-screen w-full flex items-center justify-center bg-[#FDF5F5]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4A0E0E]"></div>
        </div>
      ) : (
        children
      )}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

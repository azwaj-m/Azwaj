import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    name: "صارف کا نام",
    profileImg: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
    isVerified: true
  });

  const updateProfile = (newName, newImg) => {
    setUserData(prev => ({
      ...prev,
      name: newName || prev.name,
      profileImg: newImg || prev.profileImg
    }));
  };

  return (
    <UserContext.Provider value={{ userData, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

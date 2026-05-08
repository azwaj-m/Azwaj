import { useState, useEffect } from 'react';
import { PhotoAccessService } from '../services/PhotoAccessService';
import { useUser } from '../context/UserContext';

export const usePhotoAccess = (targetUser) => {
  const { userData } = useUser();
  const [accessStatus, setAccessStatus] = useState('none'); // none, pending, approved, rejected

  useEffect(() => {
    if (!userData || !targetUser) return;

    // ابتدائی چیک کریں
    const status = PhotoAccessService.checkPermission(userData.id, targetUser);
    setAccessStatus(status);

    // لوکل اسٹوریج میں ہونے والی تبدیلیوں کو لائیو سننے کے لیے پولنگ یا ایونٹ لسنر (پروڈکشن میں یہ فائر بیس لسنر ہوگا)
    const handleStorageChange = () => {
      const updatedStatus = PhotoAccessService.checkPermission(userData.id, targetUser);
      setAccessStatus(updatedStatus);
    };

    window.addEventListener('storage', handleStorageChange);
    // لوکل سمیلیشن الرٹس کے لیے ایک انٹرول بھی لگا دیتے ہیں تاکہ ٹیسٹنگ اسموتھ ہو
    const interval = setInterval(handleStorageChange, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [userData, targetUser]);

  const requestAccess = async () => {
    if (!userData || !targetUser) return { success: false };
    const res = await PhotoAccessService.sendRequest(userData.id, targetUser.id);
    if (res.success) {
      setAccessStatus(res.status);
    }
    return res;
  };

  return {
    accessStatus,
    canViewPhoto: accessStatus === 'approved',
    requestAccess
  };
};

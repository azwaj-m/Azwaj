// src/pages/BlockedProfiles.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const BlockedProfiles = ({ blockedUsers = [] }) => {
  const { t } = useTranslation();

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-red-600">
        {t('blocked_profiles_title', 'بلاک شدہ پروفائلز')}
      </h2>
      
      {blockedUsers.length === 0 ? (
        <p className="text-gray-500 text-center">
          {t('no_blocked_users', 'کوئی بلاک شدہ پروفائل موجود نہیں ہے۔')}
        </p>
      ) : (
        <div className="space-y-3">
          {blockedUsers.map((user) => (
            <div key={user.id} className="flex justify-between items-center border-b pb-2">
              <div className="flex items-center gap-3">
                <img src={user.photoURL || '/images/Logo.png'} alt={user.name} className="w-10 h-10 rounded-full" />
                <span>{user.name}</span>
              </div>
              <button className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-200">
                {t('unblock', 'ان بلاک')}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlockedProfiles;

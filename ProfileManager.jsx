import React, { useState } from 'react';
import ProfileSettings from '../components/ProfileSettings';
import EditProfileForm from '../components/EditProfileForm';
import BlockedProfiles from '../components/BlockedProfiles';

const ProfileManager = ({ onNavigate }) => {
  // ویوز کو کنٹرول کرنے کے لیے سٹیٹ (settings, edit, blocked)
  const [currentView, setCurrentView] = useState('settings');

  // مکمل ڈیٹا اسٹرکچر بشمول پرائیویسی اور تفصیلات
  const [userProfile, setUserProfile] = useState({
    fullName: "Ayesha Khan",
    nickName: "Ashi",
    age: "28",
    dob: "1995-05-20",
    height: "5'8\"",
    education: "Master of Arts",
    job: "Doctor",
    religion: "اسلام",
    sect: "سنی",
    city: "Lahore",
    Address: "Iqbal park house # 34/3",
    family: "2 sisters, 1 brother",
    hobbies: "Eating",
    intro: "I'm very very slow",
    likesDislikes: "Testy spicy food",
    profileImage: null,
    privacy: { 
      Address: true, 
      family: true, 
      dob: false, 
      height: false, 
      city: false, 
      job: false 
    }
  });

  // ڈیٹا محفوظ کرنے کا فنکشن
  const handleSave = (updatedData) => {
    setUserProfile(updatedData);
    setCurrentView('settings');
    alert("پروفائل اپ ڈیٹ کر دی گئی ہے!");
  };

  // رینڈرنگ لاجک (کنڈیشنل ویوز)
  if (currentView === 'edit') {
    return (
      <EditProfileForm 
        initialData={userProfile} 
        onSave={handleSave} 
        onCancel={() => setCurrentView('settings')} 
      />
    );
  }

  if (currentView === 'blocked') {
    return (
      <BlockedProfiles 
        onBack={() => setCurrentView('settings')} 
      />
    );
  }

  return (
    <div className="bg-[#FDF5F5] min-h-screen">
      <ProfileSettings
        userData={userProfile} // دوسرے کوڈ کے مطابق 'userData' استعمال کیا گیا ہے
        onEdit={() => setCurrentView('edit')}
        onNavigateBlocked={() => setCurrentView('blocked')}
        onNavigateAbout={() => onNavigate('about')}
        onNavigateHelp={() => onNavigate('help')}
        onLogout={() => window.location.reload()}
      />
    </div>
  );
};

export default ProfileManager;

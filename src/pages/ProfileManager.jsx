
import React, { useState } from 'react';

import ProfileSettings from '../components/ProfileSettings';

import EditProfileForm from '../components/EditProfileForm';



const ProfileManager = ({ onNavigate }) => {

  const [isEditing, setIsEditing] = useState(false);

  const [userProfile, setUserProfile] = useState({

    fullName: "Ayesha Khan",

    nickName: "Ashi",

    job: "Doctor",

    ctiy: "Lahore",

    privacy: { Address: true, family: true } // پرائیویسی لاک سٹیٹ

  });



  const handleSave = (updatedData) => {

    setUserProfile(updatedData);

    setIsEditing(false);

    alert("پروفائل اپ ڈیٹ کر دی گئی ہے!");

  };



  if (isEditing) {

    return <EditProfileForm initialData={userProfile} onSave={handleSave} onCancel={() => setIsEditing(false)} />;

  }



  return (

    <div className="bg-[#FDF5F5] min-h-screen">

      <ProfileSettings 

        profileData={userProfile}

        onEdit={() => setIsEditing(true)}

        // سیٹنگز کے بٹنز کو ایپ کے پیجز سے جوڑنا

        onNavigateBlocked={() => onNavigate('blocked')}

        onNavigateAbout={() => onNavigate('about')}

        onNavigateHelp={() => onNavigate('help')}

        onLogout={() => window.location.reload()}

      />

    </div>

  );

};



export default ProfileManager;


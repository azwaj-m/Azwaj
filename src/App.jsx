import React, { useState, useMemo, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { MapPin, Briefcase } from 'lucide-react';

// ڈیٹا اور کمپوننٹس
import { initialProfiles } from './utils/seedData';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import ProfileSettings from './components/ProfileSettings';
import EditProfileForm from './components/EditProfileForm';
import ProfileDetailModal from './components/ProfileDetailModal';
import Chat from './pages/Chat';
import Notifications from './pages/Notifications';
import About from './pages/About';
import HelpSupport from './pages/HelpSupport';
import BlockedProfiles from './pages/BlockedProfiles';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [activeTab, setActiveTab] = useState('discover');
  const [isEditing, setIsEditing] = useState(false);
  const [activeChatUser, setActiveChatUser] = useState(null);
  const [profiles] = useState(initialProfiles || []);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const swiperRef = useRef(null);

  const [currentUserData, setCurrentUserData] = useState({
    fullName: "Ayesha Khan",
    city: "Lahore",
    job: "Doctor",
    age: "26",
    profileImage: null,
  });

  const handleSaveProfile = (newData) => {
    setCurrentUserData(newData);
    setIsEditing(false);
  };

  const filteredProfiles = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return profiles;
    return profiles.filter(p => 
      p.fullName?.toLowerCase().includes(query) || 
      p.city?.toLowerCase().includes(query)
    );
  }, [searchQuery, profiles]);

  if (!isLoggedIn && !isGuest) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-[#4A0E0E] flex flex-col items-center justify-center p-8 text-white text-right" dir="rtl">
        <div className="mb-10 text-center">
          <img src="/images/Logo.png" alt="Azwaj Logo" className="w-32 h-32 mx-auto mb-4 object-contain" />
          <h1 className="text-5xl font-serif italic text-[#D4AF37]">Azwaj</h1>
        </div>
        <div className="w-full space-y-4">
          <button onClick={() => setIsLoggedIn(true)} className="w-full bg-[#D4AF37] text-[#4A0E0E] p-4 rounded-2xl font-black">لاگ ان کریں</button>
          <button onClick={() => setIsGuest(true)} className="w-full bg-transparent border border-[#D4AF37]/50 text-[#D4AF37] p-4 rounded-2xl font-bold">بطور مہمان جاری رکھیں</button>
        </div>
      </div>
    );
  }

  const renderMainContent = () => {
    switch (activeTab) {
      case 'discover':
        return (
          <div className="animate-in fade-in duration-500">
            <div className="px-4 flex justify-center">
              <Swiper ref={swiperRef} effect={'cards'} grabCursor={true} modules={[EffectCards]} className="w-[320px] h-[480px]">
                {filteredProfiles.map(u => (
                  <SwiperSlide key={u.id} onDoubleClick={() => setSelectedProfile(u)} className="rounded-[45px] bg-white shadow-2xl relative overflow-hidden">
                    <img src={u.profileImg || u.img} className="w-full h-full object-cover" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 p-6 flex flex-col justify-end text-white text-right">
                      <h3 className="text-2xl font-bold">{u.nickName || u.fullName}, {u.age}</h3>
                      <div className="grid grid-cols-2 gap-2 text-[10px] mt-2 opacity-80">
                         <p className="flex items-center justify-end gap-1">{u.city} <MapPin size={10}/></p>
                         <p className="flex items-center justify-end gap-1">{u.profession} <Briefcase size={10}/></p>
                      </div>
                      <button onClick={() => setSelectedProfile(u)} className="mt-5 bg-[#D4AF37] text-[#4A0E0E] text-xs font-black py-3 rounded-2xl">پروفائل دیکھیں</button>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        );
      case 'messages':
        return <Chat partner={activeChatUser} onBack={() => {setActiveChatUser(null); setActiveTab('discover');}} />;
      case 'profile':
        return isEditing ? (
          <EditProfileForm initialData={currentUserData} onSave={handleSaveProfile} onCancel={() => setIsEditing(false)} />
        ) : (
          <ProfileSettings 
            userData={currentUserData} 
            onEdit={() => setIsEditing(true)} 
            onNavigateAbout={() => setActiveTab('about')} 
            onLogout={() => {setIsLoggedIn(false); setIsGuest(false);}} 
          />
        );
      case 'notifications': return <Notifications onBack={() => setActiveTab('discover')} />;
      case 'about': return <About onBack={() => setActiveTab('profile')} />;
      default: return <div className="text-center p-10">صفحہ لوڈ ہو رہا ہے...</div>;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FDF5F5] relative overflow-x-hidden pb-28 text-right" dir="rtl">
      {['discover', 'profile', 'messages'].includes(activeTab) && (
        <Header 
          activeTab={activeTab} 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          onNotificationClick={() => setActiveTab('notifications')}
          onSettingsClick={() => {setActiveTab('profile'); setIsEditing(false);}}
        />
      )}
      
      <main className={`relative z-10 ${['discover', 'profile', 'messages'].includes(activeTab) ? '-mt-4' : 'mt-0'}`}>
        {renderMainContent()}
      </main>

      {['discover', 'messages', 'profile'].includes(activeTab) && (
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} onChatClick={() => {setActiveTab('messages'); setActiveChatUser(null);}} />
      )}

      {selectedProfile && (
        <ProfileDetailModal profile={selectedProfile} onClose={() => setSelectedProfile(null)} onStartChat={() => {setActiveChatUser(selectedProfile); setSelectedProfile(null); setActiveTab('messages');}} />
      )}
    </div>
  );
};

export default App;

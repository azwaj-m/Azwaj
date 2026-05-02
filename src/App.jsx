import React, { useState, useMemo, useRef } from 'react';
import {
  Settings, Home, Heart, User, MessageCircle, Search, 
  SlidersHorizontal, Bell, Compass, MapPin, Briefcase
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';

// کمپوننٹس اور پیجز
import { initialProfiles } from './utils/seedData';
import ProfileSettings from './components/ProfileSettings';
import EditProfileForm from './components/EditProfileForm';
import ProfileDetailModal from './components/ProfileDetailModal';
import Chat from './pages/Chat';
import Notifications from './pages/Notifications';
import About from './pages/About';
import HelpSupport from './pages/HelpSupport';
import BlockedProfiles from './pages/BlockedProfiles';

const App = () => {
  // سٹیٹس مینجمنٹ
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [activeTab, setActiveTab] = useState('discover'); // مین ٹیب کنٹرول
  const [isPremium, setIsPremium] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeChatUser, setActiveChatUser] = useState(null);
  const [profiles] = useState(initialProfiles || []);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const swiperRef = useRef(null);

  // سرچ فلٹرنگ
  const filteredProfiles = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return profiles;
    return profiles.filter(p =>
      (p.fullName || "").toLowerCase().includes(query) ||
      (p.city || "").toLowerCase().includes(query) ||
      (p.profession || "").toLowerCase().includes(query)
    );
  }, [searchQuery, profiles]);

  // آتھنٹیکیشن اسکرین (لاگ ان نہ ہونے کی صورت میں)
  if (!isLoggedIn && !isGuest) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-[#4A0E0E] flex flex-col items-center justify-center p-8 text-white text-right" dir="rtl">
        <div className="mb-10 text-center">
          <img src="/images/Logo.png" alt="Azwaj Logo" className="w-32 h-32 mx-auto mb-4 object-contain drop-shadow-2xl" 
               onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=Azwaj"; }} />
          <h1 className="text-5xl font-serif italic text-[#D4AF37] tracking-tighter">Azwaj</h1>
        </div>
        <div className="w-full space-y-4">
          <input type="text" placeholder="ای میل یا فون نمبر" className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 outline-none text-right placeholder-white/40" />
          <button onClick={() => setIsLoggedIn(true)} className="w-full bg-[#D4AF37] text-[#4A0E0E] p-4 rounded-2xl font-black text-lg shadow-xl active:scale-95 transition-all">لاگ ان کریں</button>
          <button onClick={() => setIsGuest(true)} className="w-full bg-transparent border border-[#D4AF37]/50 text-[#D4AF37] p-4 rounded-2xl font-bold hover:bg-[#D4AF37]/10 transition-all">بطور مہمان جاری رکھیں</button>
        </div>
      </div>
    );
  }

  // مین ایپ رینڈرنگ لاجک
  const renderMainContent = () => {
    switch (activeTab) {
      case 'discover':
        return (
          <div className="animate-in fade-in slide-in-from-bottom duration-500">
            <div className="px-4 flex justify-center">
              <Swiper ref={swiperRef} effect={'cards'} grabCursor={true} modules={[EffectCards]} className="w-[320px] h-[480px]">
                {filteredProfiles.map(u => (
                  <SwiperSlide key={u.id} onDoubleClick={() => setSelectedProfile(u)} className="rounded-[45px] bg-white shadow-2xl border-[6px] border-white overflow-hidden relative">
                    <img src={u.profileImg || u.img} className="w-full h-full object-cover" alt={u.nickName} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent p-6 flex flex-col justify-end text-white">
                      <h3 className="text-2xl font-bold">{u.nickName || u.fullName}, {u.age}</h3>
                      <div className="grid grid-cols-2 gap-2 text-[10px] opacity-80 border-t border-white/10 pt-3 mt-2">
                        <p className="flex items-center justify-end gap-1">{u.city} <MapPin size={10}/></p>
                        <p className="flex items-center justify-end gap-1">{u.profession} <Briefcase size={10}/></p>
                      </div>
                      <button onClick={() => setSelectedProfile(u)} className="mt-5 bg-[#D4AF37] text-[#4A0E0E] text-xs font-black py-3 rounded-2xl shadow-lg active:scale-95 transition-all">پروفائل دیکھیں</button>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            {/* نئے رشتے (Horizontal List) */}
            <div className="mt-10 px-6">
              <h4 className="font-black text-[#4A0E0E] text-lg mb-4">نئے رشتے</h4>
              <div className="flex gap-5 overflow-x-auto pb-4 no-scrollbar">
                {profiles.slice(0, 6).map((u, i) => (
                  <div key={i} onClick={() => setSelectedProfile(u)} className="flex-shrink-0 cursor-pointer text-center group">
                    <div className="w-16 h-16 rounded-full border-2 border-[#D4AF37] p-1 shadow-md">
                      <img src={u.profileImg || u.img} className="w-full h-full rounded-full object-cover" alt="" />
                    </div>
                    <p className="text-[10px] mt-2 font-bold text-[#4A0E0E]">{u.nickName || u.fullName.split(' ')[0]}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'messages':
        return <Chat partner={activeChatUser} onBack={() => {setActiveChatUser(null); setActiveTab('discover');}} />;

      case 'notifications':
        return <Notifications onBack={() => setActiveTab('discover')} />;

      case 'profile':
        return !isEditing ? (
          <ProfileSettings 
            onEdit={() => setIsEditing(true)} 
            onNavigateAbout={() => setActiveTab('about')}
            onNavigateHelp={() => setActiveTab('help')}
            onNavigateBlocked={() => setActiveTab('blocked')}
          />
        ) : (
          <EditProfileForm onSave={() => setIsEditing(false)} onCancel={() => setIsEditing(false)} />
        );

      case 'about': return <About onBack={() => setActiveTab('profile')} />;
      case 'help': return <HelpSupport onBack={() => setActiveTab('profile')} />;
      case 'blocked': return <BlockedProfiles onBack={() => setActiveTab('profile')} />;
      
      default:
        return <div className="text-center p-10">صفحہ دستیاب نہیں ہے</div>;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FDF5F5] relative overflow-x-hidden pb-28 text-right" dir="rtl">
      {/* ہیڈر - صرف مین پیجز پر دکھائیں */}
      {['discover', 'profile', 'messages'].includes(activeTab) && (
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 h-[280px] bg-gradient-to-b from-[#4A0E0E] to-[#631212] rounded-b-[60px] shadow-2xl z-0"></div>
          <header className="relative z-10 p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/images/Logo.png" className="w-10 h-10 rounded-full border border-[#D4AF37]/30" alt="Logo" />
              <span className="text-2xl font-serif font-bold text-[#D4AF37]">Azwaj</span>
            </div>
            <div className="flex gap-4">
              <Bell className="text-white/80 cursor-pointer" onClick={() => setActiveTab('notifications')} size={22} />
              <Settings className="text-[#D4AF37] cursor-pointer" onClick={() => setActiveTab('profile')} size={22} />
            </div>
          </header>

          {/* سرچ بار صرف ڈسکور پر */}
          <div className={`relative z-10 px-6 mt-2 mb-8 transition-opacity duration-300 ${activeTab === 'discover' ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
            <div className="relative flex items-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-5 py-3.5 shadow-2xl">
              <Search size={20} className="text-[#D4AF37]" />
              <input
                type="text"
                placeholder="تلاش کریں..."
                className="bg-transparent w-full px-3 outline-none text-white placeholder-gray-300 text-sm text-right"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <SlidersHorizontal size={20} className="text-[#D4AF37] cursor-pointer" />
            </div>
          </div>
        </div>
      )}

      {/* مین مواد */}
      <main className={`relative z-10 ${['discover', 'profile', 'messages'].includes(activeTab) ? '-mt-4' : 'mt-0'}`}>
        {renderMainContent()}
      </main>

      {/* باٹم نیویگیشن بار */}
      {['discover', 'messages', 'profile'].includes(activeTab) && (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] bg-[#4A0E0E] p-4 flex justify-around items-center rounded-[35px] shadow-2xl z-[100] border border-white/10">
          <button onClick={() => {setActiveTab('discover'); setActiveChatUser(null);}} className={`transition-all ${activeTab === 'discover' ? 'text-[#D4AF37] scale-125' : 'text-white/30'}`}>
            <Compass size={24} />
          </button>
          <button onClick={() => {setActiveTab('messages'); setActiveChatUser(null);}} className={`transition-all ${activeTab === 'messages' ? 'text-[#D4AF37] scale-125' : 'text-white/30'}`}>
            <MessageCircle size={24} />
          </button>
          <div onClick={() => setActiveTab('matches')} className="bg-gradient-to-br from-[#D4AF37] to-[#B8860B] p-4 rounded-full -mt-14 border-[6px] border-[#FDF5F5] shadow-2xl cursor-pointer active:scale-90 transition-transform">
            <Heart size={28} fill="#4A0E0E" stroke="#4A0E0E" />
          </div>
          <button onClick={() => setActiveTab('discover')} className="text-white/30"><Search size={24} /></button>
          <button onClick={() => {setActiveTab('profile'); setIsEditing(false);}} className={`transition-all ${activeTab === 'profile' ? 'text-[#D4AF37] scale-125' : 'text-white/30'}`}>
            <User size={24} />
          </button>
        </nav>
      )}

      {/* پاپ اپ ماڈل */}
      {selectedProfile && (
        <ProfileDetailModal
          profile={selectedProfile}
          onClose={() => setSelectedProfile(null)}
          isPremium={isPremium}
          onStartChat={() => {
            setActiveChatUser(selectedProfile);
            setSelectedProfile(null);
            setActiveTab('messages');
          }}
        />
      )}
    </div>
  );
};

export default App;


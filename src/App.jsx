import React, { useState, useMemo, useRef } from 'react';
import { 
  Settings, Home, Heart, User, CheckCircle, MessageCircle, 
  Send, X, Lock, Search, SlidersHorizontal, Bell, LogIn,
  Compass, Shield, MapPin, Moon, Briefcase, Ruler
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';

// فرضی ڈیٹا اور پیجز کی امپورٹ (اگر موجود ہوں)
import { initialProfiles } from './utils/seedData';
import Discover from './pages/Discover';
import ProfileSettings from './components/ProfileSettings';
import EditProfileForm from './components/EditProfileForm';
import ProfileDetailModal from './components/ProfileDetailModal';

const App = () => {
  // ایپ سٹیٹس
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [activeTab, setActiveTab] = useState('discover');
  const [isPremium, setIsPremium] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // ڈیٹا سٹیٹس
  const [profiles] = useState(initialProfiles || [
    { id: 0, fullName: "سارہ احمد", nickName: "سارہ", age: 27, height: "5'4", religion: "اسلام", profession: "ٹیچر", city: "کراچی", phone: "0300-1112223", profileImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" },
    { id: 1, fullName: "عائشہ خان", nickName: "عائشہ", age: 28, height: "5'5", religion: "اسلام", profession: "ڈاکٹر", city: "لاہور", phone: "0312-4445556", profileImg: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400" }
  ]);
  
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const swiperRef = useRef(null);

  // سرچ فلٹرنگ لاجک
  const filteredProfiles = useMemo(() => {
    if (!searchQuery.trim()) return profiles;
    const query = searchQuery.toLowerCase();
    return profiles.filter(p =>
      (p.fullName || "").toLowerCase().includes(query) ||
      (p.city || "").toLowerCase().includes(query) ||
      (p.profession || "").toLowerCase().includes(query)
    );
  }, [searchQuery, profiles]);

  // لاگ ان اسکرین (Authentication UI)
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
          
          <div className="flex items-center gap-2 py-2">
            <div className="flex-1 h-px bg-white/10"></div>
            <span className="text-[10px] opacity-40">یا</span>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          <button onClick={() => setIsLoggedIn(true)} className="w-full bg-white text-gray-700 p-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-md active:scale-95 transition-all">
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
            گوگل کے ساتھ لاگ ان کریں
          </button>

          <button onClick={() => setIsGuest(true)} className="w-full bg-transparent border border-[#D4AF37]/50 text-[#D4AF37] p-4 rounded-2xl font-bold hover:bg-[#D4AF37]/10 transition-all">بطور مہمان جاری رکھیں</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FDF5F5] relative overflow-x-hidden pb-28 text-right" dir="rtl">
      
      {/* ہیڈر اور سرچ بار (صرف ڈسکور ٹیب پر) */}
      {activeTab === 'discover' && (
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 h-[280px] bg-gradient-to-b from-[#4A0E0E] to-[#631212] rounded-b-[60px] shadow-2xl z-0"></div>
          
          <header className="relative z-10 p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
               <img src="/images/Logo.png" className="w-10 h-10 rounded-full border border-[#D4AF37]/30" alt="Logo" />
               <span className="text-2xl font-serif font-bold text-[#D4AF37]">Azwaj</span>
            </div>
            <div className="flex gap-4">
               <Bell className="text-white/80 cursor-pointer" size={22} />
               <Settings className="text-[#D4AF37] cursor-pointer" onClick={() => setActiveTab('profile')} size={22} />
            </div>
          </header>

          <div className="relative z-10 px-6 mt-2 mb-8">
            <div className="relative flex items-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-5 py-3.5 shadow-2xl focus-within:bg-white/20 transition-all">
              <Search size={20} className="text-[#D4AF37]" />
              <input
                type="text"
                placeholder="نام، شہر یا پیشہ تلاش کریں..."
                className="bg-transparent w-full px-3 outline-none text-white placeholder-gray-300 text-sm text-right"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <SlidersHorizontal size={20} className="text-[#D4AF37] cursor-pointer" />
            </div>
          </div>
        </div>
      )}

      {/* مین کنٹینٹ سیکشن */}
      <main className="relative z-10">
        {activeTab === 'discover' && (
          <div className="animate-in fade-in slide-in-from-bottom duration-500">
            {/* سوائپر کارڈز */}
            <div className="-mt-4 px-4 flex justify-center">
              <Swiper ref={swiperRef} effect={'cards'} grabCursor={true} modules={[EffectCards]} className="w-[320px] h-[480px]">
                {filteredProfiles.map(u => (
                  <SwiperSlide key={u.id} onDoubleClick={() => setSelectedProfile(u)} className="rounded-[45px] bg-white shadow-2xl border-[6px] border-white overflow-hidden relative">
                    <img src={u.profileImg || u.img} className="w-full h-full object-cover" alt={u.nickName} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent p-6 flex flex-col justify-end text-white">
                      <div className="flex items-center justify-end gap-2 mb-1">
                         <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                         <h3 className="text-2xl font-bold">{u.nickName || u.fullName}, {u.age}</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[10px] opacity-80 border-t border-white/10 pt-3 mt-2">
                        <p className="flex items-center justify-end gap-1">{u.height} <Ruler size={10}/></p>
                        <p className="flex items-center justify-end gap-1">{u.religion} <Moon size={10}/></p>
                        <p className="flex items-center justify-end gap-1">{u.city || u.district} <MapPin size={10}/></p>
                        <p className="flex items-center justify-end gap-1">{u.profession || u.job} <Briefcase size={10}/></p>
                      </div>
                      <button onClick={() => setSelectedProfile(u)} className="mt-5 bg-[#D4AF37] text-[#4A0E0E] text-xs font-black py-3 rounded-2xl shadow-lg active:scale-95 transition-all">پروفائل کی تفصیل</button>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* ہوریزنٹل ممبر لسٹ */}
            <div className="mt-10 px-6">
               <h4 className="font-black text-[#4A0E0E] text-lg mb-4 flex items-center justify-between">
                 <span className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest cursor-pointer">Explore All</span>
                 نئے رشتے
               </h4>
               <div className="flex gap-5 overflow-x-auto pb-4 no-scrollbar">
                 {profiles.slice(0,6).map((u, i) => (
                   <div key={i} onClick={() => { setSearchQuery(""); setSelectedProfile(u); }} className="flex-shrink-0 cursor-pointer text-center group">
                     <div className="w-18 h-18 rounded-full border-2 border-[#D4AF37] p-1 group-hover:scale-105 transition-transform shadow-md">
                       <img src={u.profileImg || u.img} className="w-16 h-16 rounded-full object-cover" alt="" />
                     </div>
                     <p className="text-[10px] mt-2 font-bold text-[#4A0E0E]">{u.nickName || u.fullName.split(' ')[0]}</p>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        )}

        {/* پروفائل اور ایڈٹ سیکشن */}
        {activeTab === 'profile' && (
          <div className="animate-in slide-in-from-left duration-300">
            {!isEditing ? (
              <ProfileSettings onEdit={() => setIsEditing(true)} />
            ) : (
              <EditProfileForm 
                onSave={(data) => { setIsEditing(false); alert("تبدیلیاں محفوظ کر لی گئیں!"); }} 
                onCancel={() => setIsEditing(false)} 
              />
            )}
          </div>
        )}

        {/* دیگر ٹیبز */}
        {(activeTab === 'matches' || activeTab === 'messages') && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-10">
            <div className="w-20 h-20 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-4">
               <Heart className="text-[#D4AF37] animate-bounce" size={40} />
            </div>
            <h3 className="text-xl font-bold text-[#4A0E0E]">جلد آ رہا ہے!</h3>
            <p className="text-xs text-gray-400 mt-2 leading-relaxed">ہم اس فیچر پر کام کر رہے ہیں تاکہ آپ کو بہترین تجربہ مل سکے۔</p>
          </div>
        )}
      </main>

      {/* باٹم نیویگیشن بار */}
      {!isEditing && (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] bg-[#4A0E0E] p-4 flex justify-around items-center rounded-[35px] shadow-[0_20px_50px_rgba(0,0,0,0.4)] z-[100] border border-white/10">
          <button onClick={() => setActiveTab('discover')} className={`transition-all ${activeTab === 'discover' ? 'text-[#D4AF37] scale-125' : 'text-white/30'}`}>
            <Compass size={24} />
          </button>
          <button onClick={() => setActiveTab('messages')} className={`transition-all ${activeTab === 'messages' ? 'text-[#D4AF37] scale-125' : 'text-white/30'}`}>
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

      {/* پروفائل ڈیٹیل ماڈل (پاپ اپ) */}
      {selectedProfile && (
        <ProfileDetailModal 
          profile={selectedProfile} 
          onClose={() => setSelectedProfile(null)} 
          isPremium={isPremium}
          onUpgrade={() => { setSelectedProfile(null); setActiveTab('matches'); }}
        />
      )}
    </div>
  );
};

export default App;

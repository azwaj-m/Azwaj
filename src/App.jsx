import React, { useState, useRef } from 'react';
import { Settings, Home, Heart, User, CheckCircle, MessageCircle } from 'lucide-react';
import ProfileSettings from './components/ProfileSettings';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';

const App = () => {
  const [view, setView] = useState('home'); // 'home', 'profile', 'settings'
  const [isPremium, setIsPremium] = useState(false);
  const [activeProfile, setActiveProfile] = useState(null);
  const swiperRef = useRef(null);

  const users = [
    { id: 0, nickName: "سارہ", age: 27, height: "5'4", religion: "اسلام", job: "ٹیچر", district: "کراچی", status: "کنواری", phone: "0300-1112223", realName: "سارہ احمد", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" },
    { id: 1, nickName: "عائشہ", age: 28, height: "5'5", religion: "اسلام", job: "ڈاکٹر", district: "لاہور", status: "طلاق یافتہ", phone: "0312-4445556", realName: "عائشہ خان", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400" },
    { id: 2, nickName: "زینب", age: 24, height: "5'2", religion: "اسلام", job: "بینکر", district: "اسلام آباد", status: "کنواری", phone: "0333-7778889", realName: "زینب علی", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400" }
  ];

  const handleThumbnailClick = (index) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  const handleDoubleClick = (user) => {
    if (!isPremium) {
      alert("مزید معلومات اور چیٹ کے لیے پریمیم ممبر بننا لازمی ہے!");
    } else {
      setActiveProfile(user);
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FDF5F5] pb-32 relative font-sans text-right" dir="rtl">
      
      {/* Header */}
      <div className="bg-[#4A0E0E] p-6 pb-20 rounded-b-[50px] flex justify-between items-center shadow-xl">
        <div className="text-[#D4AF37] font-bold italic text-xl">AZWAJ</div>
        <Settings 
          className="text-[#D4AF37] cursor-pointer hover:scale-110 transition-transform" 
          onClick={() => setView('settings')} 
        />
      </div>

      {view === 'home' && (
        <div className="animate-in fade-in duration-500">
          {/* Swiper Cards */}
          <div className="-mt-12 px-4">
            <Swiper 
              ref={swiperRef}
              effect={'cards'} 
              grabCursor={true} 
              modules={[EffectCards]} 
              className="w-[300px] h-[420px]"
            >
              {users.map(u => (
                <SwiperSlide key={u.id} onDoubleClick={() => handleDoubleClick(u)} className="rounded-[30px] bg-white shadow-2xl border-4 border-white overflow-hidden relative">
                  <img src={u.img} className="w-full h-full object-cover" alt={u.nickName} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent p-6 flex flex-col justify-end text-white">
                    <div className="flex items-center gap-2 mb-1">
                       <h3 className="text-2xl font-black">{u.nickName}, {u.age}</h3>
                       <CheckCircle size={16} className="text-blue-400" />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs opacity-90 font-medium">
                      <span>ہائٹ: {u.height}</span>
                      <span>مذہب: {u.religion}</span>
                      <span>کاروبار: {u.job}</span>
                      <span>ضلع: {u.district}</span>
                    </div>
                    <p className="mt-3 text-[10px] text-[#D4AF37] font-bold">رابطہ کے لیے ڈبل کلک کریں ✨</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Active Thumbnails List */}
          <div className="mt-8 px-6">
            <h4 className="text-[#4A0E0E] font-bold mb-4 border-r-4 border-[#D4AF37] pr-2 text-sm italic">آن لائن ممبرز</h4>
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
              {users.map((u, index) => (
                <div 
                  key={u.id} 
                  onClick={() => handleThumbnailClick(index)}
                  className="flex-shrink-0 text-center cursor-pointer transform active:scale-90 transition-all"
                >
                  <div className="w-16 h-16 rounded-full border-2 border-[#D4AF37] p-0.5 overflow-hidden">
                    <img src={u.img} className="w-full h-full rounded-full object-cover" />
                  </div>
                  <p className="text-[10px] mt-1 font-bold text-gray-700">{u.nickName}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {view === 'profile' && (
        <div className="p-8 text-center animate-in slide-in-from-left duration-300">
           <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 border-4 border-[#4A0E0E]"></div>
           <h2 className="text-xl font-bold">آپ کی پروفائل</h2>
           <p className="text-gray-500">پروفائل ایڈٹ کرنے کا فیچر جلد آ رہا ہے</p>
        </div>
      )}

      {/* Full Profile & Chat Room (Locked behind Premium) */}
      {activeProfile && (
        <div className="fixed inset-0 z-[600] bg-white p-8 overflow-y-auto animate-in slide-in-from-bottom duration-300">
          <div className="flex justify-between items-center mb-6">
            <button onClick={() => setActiveProfile(null)} className="text-3xl text-gray-400">×</button>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Premium Unlocked</span>
          </div>
          
          <img src={activeProfile.img} className="w-32 h-32 rounded-3xl object-cover mx-auto mb-4 shadow-lg" />
          <h2 className="text-2xl font-bold text-[#4A0E0E] text-center mb-6">{activeProfile.realName}</h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-xl flex justify-between">
               <span className="text-gray-500">فون نمبر:</span>
               <span className="font-bold font-mono">{activeProfile.phone}</span>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl flex justify-between">
               <span className="text-gray-500">ازواجی حیثیت:</span>
               <span className="font-bold">{activeProfile.status}</span>
            </div>
            
            <div className="mt-8 border-t pt-6">
               <h4 className="font-bold text-[#4A0E0E] mb-4 flex items-center gap-2">
                 <MessageCircle size={20} /> پرائیویٹ چیٹ روم
               </h4>
               <div className="bg-gray-100 h-40 rounded-2xl flex items-center justify-center text-gray-400 italic text-sm p-4 text-center">
                 {activeProfile.nickName} کے ساتھ گفتگو شروع کریں...
               </div>
               <div className="mt-2 flex gap-2">
                 <input type="text" placeholder="پیغام لکھیں..." className="flex-1 p-3 border rounded-xl outline-none" />
                 <button className="bg-[#4A0E0E] text-white p-3 rounded-xl">بھیجیں</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile Settings Modal */}
      {view === 'settings' && (
        <div className="fixed inset-0 z-[500] bg-black/60 backdrop-blur-sm flex items-end">
          <div className="w-full bg-white rounded-t-[40px] relative animate-in slide-in-from-bottom duration-300">
            <button onClick={() => setView('home')} className="absolute top-4 left-6 text-2xl text-gray-400">×</button>
            <ProfileSettings />
          </div>
        </div>
      )}

      {/* Footer Nav */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-[#4A0E0E] p-4 flex justify-around rounded-full shadow-2xl z-[100] border border-[#D4AF37]/30">
        <Home 
          className={`cursor-pointer transition-all ${view === 'home' ? 'text-[#D4AF37] scale-110' : 'text-[#D4AF37]/40'}`} 
          onClick={() => setView('home')} 
          size={24}
        />
        <div 
          className="bg-[#D4AF37] p-3 rounded-full -mt-12 border-4 border-[#FDF5F5] shadow-lg cursor-pointer hover:rotate-12 transition-transform" 
          onClick={() => { setIsPremium(true); alert("Premium Active: اب آپ ڈبل کلک کر کے چیٹ کر سکتے ہیں!"); }}
        >
          <Heart size={28} fill="#4A0E0E" stroke="#4A0E0E" />
        </div>
        <User 
          className={`cursor-pointer transition-all ${view === 'profile' ? 'text-[#D4AF37] scale-110' : 'text-[#D4AF37]/40'}`} 
          onClick={() => setView('profile')} 
          size={24}
        />
      </div>
    </div>
  );
};

export default App;

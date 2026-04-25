import React, { useState, useEffect } from 'react';
import { auth, googleProvider, db } from './utils/firebase';
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { ref, onValue, push, serverTimestamp } from 'firebase/database';
import { Home, User, Heart, MessageCircle, LogIn, CheckCircle, Camera } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';

const App = () => {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('home'); 
  const [activeChat, setActiveChat] = useState(null);
  const [isPremium, setIsPremium] = useState(false);

  // ۷ فرضی پروفائلز
  const fakeProfiles = [
    { id: "1", nickName: "سارہ", age: 24, height: "5'4", district: "کراچی", job: "ڈیزائنر", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400", status: "کنواری" },
    { id: "2", nickName: "عائشہ", age: 26, height: "5'5", district: "لاہور", job: "ڈاکٹر", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400", status: "کنواری" },
    { id: "3", nickName: "مریم", age: 28, height: "5'3", district: "اسلام آباد", job: "ٹیچر", img: "https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?w=400", status: "بیوہ" },
    { id: "4", nickName: "زینب", age: 25, height: "5'6", district: "فیصل آباد", job: "بینکر", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400", status: "طلاق یافتہ" },
    { id: "5", nickName: "فاطمہ", age: 22, height: "5'2", district: "ملتان", job: "طالب علم", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400", status: "کنواری" },
    { id: "6", nickName: "روبینہ", age: 30, height: "5'4", district: "پشاور", job: "نرس", img: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400", status: "کنواری" },
    { id: "7", nickName: "بشریٰ", age: 27, height: "5'5", district: "کوئٹہ", job: "آئی ٹی ایکسپرٹ", img: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=400", status: "کنواری" }
  ];

  useEffect(() => {
    onAuthStateChanged(auth, (u) => setUser(u));
  }, []);

  const handleLogin = () => signInWithPopup(auth, googleProvider);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#4A0E0E] p-6 text-center">
        <div className="w-24 h-24 bg-[#D4AF37] rounded-full mb-6 flex items-center justify-center shadow-2xl">
          <Heart size={48} fill="#4A0E0E" />
        </div>
        <h1 className="text-3xl font-bold text-[#D4AF37] mb-2">AZWAJ MARRIAGE</h1>
        <p className="text-white/70 mb-8">بہترین رشتے کی تلاش یہاں ختم ہوتی ہے</p>
        <button onClick={handleLogin} className="flex items-center gap-3 bg-white text-gray-800 px-8 py-4 rounded-full font-bold shadow-xl active:scale-95 transition-all">
          <LogIn size={20} /> گوگل کے ساتھ لاگ ان کریں
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FDF5F5] pb-24 relative font-sans text-right" dir="rtl">
      {/* Header */}
      <div className="bg-[#4A0E0E] p-6 pb-20 rounded-b-[50px] shadow-xl flex justify-between items-center">
        <span className="text-[#D4AF37] font-bold text-xl italic">AZWAJ</span>
        <img src={user.photoURL} className="w-10 h-10 rounded-full border-2 border-[#D4AF37]" onClick={() => setView('profile')} />
      </div>

      {view === 'home' && (
        <div className="px-4 -mt-12 animate-in fade-in duration-500">
          <Swiper effect={'cards'} grabCursor={true} modules={[EffectCards]} className="w-[300px] h-[400px]">
            {fakeProfiles.map(u => (
              <SwiperSlide key={u.id} onDoubleClick={() => isPremium ? setActiveChat(u) : alert("معلومات کے لیے پریمیم ممبر بنیں")} className="rounded-[30px] bg-white shadow-2xl overflow-hidden relative border-4 border-white">
                <img src={u.img} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent p-6 flex flex-col justify-end text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-2xl font-bold">{u.nickName}, {u.age}</h3>
                    <CheckCircle size={16} className="text-blue-400" />
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 text-[10px] opacity-80">
                    <p>کاروبار: {u.job}</p>
                    <p>ضلع: {u.district}</p>
                    <p>قد: {u.height}</p>
                    <p>حیثیت: {u.status}</p>
                  </div>
                  <p className="mt-2 text-[10px] text-[#D4AF37]">رابطہ کے لیے ڈبل کلک کریں</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          <div className="mt-8">
             <h4 className="font-bold text-[#4A0E0E] pr-2 border-r-4 border-[#D4AF37] mb-4">نئے ممبرز</h4>
             <div className="flex gap-4 overflow-x-auto no-scrollbar">
                {fakeProfiles.map(u => (
                  <div key={u.id} className="flex-shrink-0 text-center">
                    <img src={u.img} className="w-16 h-16 rounded-full border-2 border-[#D4AF37] object-cover" />
                    <p className="text-[10px] mt-1 font-bold">{u.nickName}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>
      )}

      {view === 'profile' && (
        <div className="p-6 animate-in slide-in-from-bottom">
           <h2 className="text-2xl font-bold text-[#4A0E0E] mb-6 text-center">پروفائل بنائیں</h2>
           <div className="space-y-4">
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center border-2 border-dashed border-[#D4AF37]">
                   <Camera className="text-gray-400" />
                </div>
                <button className="text-xs text-[#4A0E0E] mt-2 font-bold underline">تصویر اپلوڈ کریں</button>
              </div>
              <input type="text" placeholder="نک نیم" className="w-full p-4 rounded-2xl border outline-none" />
              <input type="number" placeholder="عمر" className="w-full p-4 rounded-2xl border outline-none" />
              <select className="w-full p-4 rounded-2xl border outline-none bg-white">
                <option>مذہب منتخب کریں</option>
                <option>اسلام</option>
              </select>
              <button className="w-full bg-[#4A0E0E] text-[#D4AF37] py-4 rounded-2xl font-bold mt-4 shadow-lg">پروفائل محفوظ کریں</button>
           </div>
        </div>
      )}

      {/* Chat Room */}
      {activeChat && (
        <div className="fixed inset-0 z-[1000] bg-white flex flex-col">
          <div className="bg-[#4A0E0E] p-4 text-[#D4AF37] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={activeChat.img} className="w-10 h-10 rounded-full border border-[#D4AF37]" />
              <p className="font-bold">{activeChat.nickName}</p>
            </div>
            <button onClick={() => setActiveChat(null)} className="text-2xl">×</button>
          </div>
          <div className="flex-1 bg-[#FDF5F5] p-4 overflow-y-auto">
             <div className="bg-white p-3 rounded-2xl rounded-br-none shadow-sm max-w-[80%] mb-4">
                السلام علیکم! مجھے آپ کی پروفائل پسند آئی ہے۔
             </div>
          </div>
          <div className="p-4 bg-white border-t flex gap-2">
            <input type="text" placeholder="پیغام لکھیں..." className="flex-1 p-3 bg-gray-100 rounded-xl outline-none" />
            <button className="bg-[#4A0E0E] text-[#D4AF37] p-3 rounded-xl"><MessageCircle /></button>
          </div>
        </div>
      )}

      {/* Footer Nav */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-[#4A0E0E] p-4 flex justify-around rounded-full shadow-2xl z-[100]">
        <Home className={`${view === 'home' ? 'text-[#D4AF37]' : 'text-[#D4AF37]/40'}`} onClick={() => setView('home')} />
        <div className="bg-[#D4AF37] p-3 rounded-full -mt-12 border-4 border-[#FDF5F5] shadow-lg" onClick={() => { setIsPremium(true); alert("پریمیم ایکٹیو! اب آپ چیٹ کر سکتے ہیں۔")}}>
          <Heart size={28} fill="#4A0E0E" />
        </div>
        <User className={`${view === 'profile' ? 'text-[#D4AF37]' : 'text-[#D4AF37]/40'}`} onClick={() => setView('profile')} />
      </div>
    </div>
  );
};

export default App;

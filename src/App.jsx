import React, { useState, useEffect } from 'react';
import { db, auth } from './utils/firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import { Search, Heart, MessageCircle, User, Home, Bell, Settings, LogIn } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/effect-cards';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isRegistered, setIsRegistered] = useState(false);
  const [profiles, setProfiles] = useState([
    {id:"1", name:"Aisha Khan", city:"Lahore", age:"28", profession:"Doctor", img:"https://images.unsplash.com/photo-1518171120140-6f781561730d"}
  ]);

  // رجسٹریشن فارم کا ڈیٹا
  const [formData, setFormData] = useState({ name: '', age: '', profession: '', city: '' });

  useEffect(() => {
    const q = query(collection(db, "profiles"));
    const unsubscribe = onSnapshot(q, (snap) => {
      if (!snap.empty) {
        const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProfiles(data);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();
    if(formData.name && formData.city) {
      setIsRegistered(true);
      setActiveTab('home');
    }
  };

  // --- رجسٹریشن فارم UI ---
  if (!isRegistered) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-[#4A0E0E] flex flex-col justify-center p-8 text-[#D4AF37]">
        <div className="text-center mb-10">
          <Heart className="mx-auto mb-4" size={50} fill="#D4AF37" />
          <h1 className="text-4xl font-black italic">AZWAJ</h1>
          <p className="text-sm opacity-60 uppercase tracking-widest mt-2">خوش آمدید! رجسٹریشن مکمل کریں</p>
        </div>
        
        <form onSubmit={handleRegister} className="space-y-4">
          <input 
            type="text" placeholder="آپ کا نام" required
            className="w-full p-4 rounded-2xl bg-white/10 border border-[#D4AF37]/30 text-white outline-none"
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <input 
            type="number" placeholder="عمر" required
            className="w-full p-4 rounded-2xl bg-white/10 border border-[#D4AF37]/30 text-white outline-none"
            onChange={(e) => setFormData({...formData, age: e.target.value})}
          />
          <input 
            type="text" placeholder="پیشہ" 
            className="w-full p-4 rounded-2xl bg-white/10 border border-[#D4AF37]/30 text-white outline-none"
            onChange={(e) => setFormData({...formData, profession: e.target.value})}
          />
          <input 
            type="text" placeholder="شہر" required
            className="w-full p-4 rounded-2xl bg-white/10 border border-[#D4AF37]/30 text-white outline-none"
            onChange={(e) => setFormData({...formData, city: e.target.value})}
          />
          <button type="submit" className="w-full bg-[#D4AF37] text-[#4A0E0E] py-4 rounded-2xl font-black text-lg shadow-2xl">
            رجسٹریشن مکمل کریں
          </button>
        </form>
      </div>
    );
  }

  // --- مین ایپ UI ---
  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FDF5F5] pb-28 relative">
      <div className="bg-[#4A0E0E] p-8 pb-20 rounded-b-[60px] shadow-2xl relative border-b-2 border-[#D4AF37]/50">
        <div className="flex justify-between items-start mb-6">
          <div className="flex gap-4 text-[#D4AF37]/60">
             <Bell size={24}/>
             <User size={24}/>
          </div>
          <div className="text-right">
             <h1 className="text-[#D4AF37] text-3xl font-black italic tracking-tighter">AZWAJ</h1>
             <p className="text-[#D4AF37]/60 text-[10px] font-bold tracking-[0.2em]">MARRIAGE</p>
          </div>
        </div>
        <div className="relative mt-8">
          <input type="text" placeholder="تلاش کریں..." className="w-full p-4 pl-12 rounded-full bg-white/10 border border-[#D4AF37]/20 text-white outline-none" />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]" size={20} />
        </div>
      </div>

      <div className="px-6 -mt-12 z-10 relative">
        <Swiper effect={'cards'} grabCursor={true} modules={[EffectCards]} className="w-full h-[500px]">
          {profiles.map((p) => (
            <SwiperSlide key={p.id} className="bg-white rounded-[50px] shadow-2xl overflow-hidden border border-gray-100">
              <div className="relative h-3/5">
                <img src={p.img} className="h-full w-full object-cover" />
              </div>
              <div className="p-8 text-center">
                <h3 className="font-extrabold text-[#4A0E0E] text-2xl uppercase">{p.name}</h3>
                <p className="text-gray-500 text-sm font-bold mt-2 italic">{p.age} سال • {p.profession} • {p.city}</p>
                <button className="w-full bg-[#4A0E0E] text-[#D4AF37] py-4 rounded-3xl font-black mt-6 shadow-xl active:scale-95 transition-all uppercase">
                  Connect Now
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* نیویگیشن بار */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-[#4A0E0E] p-4 flex justify-around items-center rounded-full shadow-2xl border border-[#D4AF37]/30 z-[100]">
         <Home className="text-[#D4AF37]" size={24}/>
         <MessageCircle className="text-[#D4AF37]/40" size={24}/>
         <div className="bg-[#D4AF37] p-3 rounded-full -mt-12 shadow-lg border-4 border-[#FDF5F5]">
            <Heart className="text-[#4A0E0E]" size={28} fill="currentColor" />
         </div>
         <Settings className="text-[#D4AF37]/40" size={24}/>
         <User className="text-[#D4AF37]/40" size={24}/>
      </div>
    </div>
  );
};

export default App;

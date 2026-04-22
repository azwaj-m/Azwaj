import React, { useState, useEffect } from 'react';
import { db, auth } from './utils/firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import { Search, Heart, MessageCircle, User, Home, TreeDeciduous, Bell, Settings } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/effect-cards';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  // بٹن ایکشنز کے فنکشنز
  const handleConnect = (name) => alert(`Connecting with ${name}...`);
  const handleViewShajra = (name) => alert(`Opening Shajra Tree of ${name}...`);
  const handleSearch = (e) => console.log("Searching for:", e.target.value);

  useEffect(() => {
    const q = query(collection(db, "profiles"));
    const unsubscribe = onSnapshot(q, (snap) => {
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProfiles(data);
      setLoading(false);
    }, () => setLoading(false));
    return () => unsubscribe();
  }, []);

  // نیویگیشن رینڈرنگ
  const renderContent = () => {
    if (activeTab === 'chat') return <div className="p-10 text-center mt-20 font-bold text-[#4A0E0E]">چیٹ سسٹم جلد آ رہا ہے...</div>;
    if (activeTab === 'profile') return <div className="p-10 text-center mt-20 font-bold text-[#4A0E0E]">آپ کا پروفائل ایڈٹ کریں</div>;
    
    return (
      <div className="px-6 -mt-12 z-10 relative">
        <Swiper
          effect={'cards'}
          grabCursor={true}
          modules={[EffectCards]}
          className="w-full h-[540px]"
        >
          {profiles.length > 0 ? profiles.map((p) => (
            <SwiperSlide key={p.id} className="bg-white rounded-[50px] shadow-2xl overflow-hidden border border-gray-100">
              <div className="relative h-2/3">
                <img src={p.img || 'https://via.placeholder.com/400x600'} className="h-full w-full object-cover" />
                <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md p-2 px-3 rounded-2xl flex items-center gap-2 border border-white/20">
                  <TreeDeciduous className="text-[#D4AF37]" size={18} />
                  <span className="text-white text-[10px] font-bold">7-GENERATION SHAJRA VERIFIED</span>
                </div>
                <button onClick={() => alert("Added to favorites!")} className="absolute top-4 right-4 bg-white/80 p-2 rounded-full shadow-lg">
                  <Heart size={20} className="text-[#4A0E0E]" />
                </button>
              </div>
              
              <div className="p-6 text-center">
                <h3 className="font-extrabold text-[#4A0E0E] text-2xl uppercase tracking-wider">{p.name}</h3>
                <div className="flex justify-center gap-4 text-xs text-gray-500 my-3 font-bold">
                  <span className="flex items-center gap-1 border-r pr-4 uppercase tracking-tighter italic">AGE: {p.age}, {p.profession}</span>
                  <span className="flex items-center gap-1 uppercase italic tracking-tighter">CITY: {p.city}</span>
                </div>
                
                <div className="flex gap-3 mt-4">
                  <button 
                    onClick={() => handleViewShajra(p.name)}
                    className="flex-1 bg-[#D4AF37]/20 text-[#4A0E0E] py-3 rounded-2xl font-bold border border-[#D4AF37]/40 text-xs"
                  >
                    VIEW SHAJRA TREE
                  </button>
                  <button 
                    onClick={() => handleConnect(p.name)}
                    className="flex-1 bg-[#4A0E0E] text-[#D4AF37] py-3 rounded-2xl font-bold shadow-lg text-xs"
                  >
                    CONNECT
                  </button>
                </div>
              </div>
            </SwiperSlide>
          )) : (
            <div className="bg-white rounded-[50px] p-20 text-center shadow-xl">لوڈنگ یا ڈیٹا موجود نہیں...</div>
          )}
        </Swiper>

        {/* Top Matches Section */}
        <div className="mt-8 mb-10">
           <div className="flex justify-between items-center px-2 mb-4">
              <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Explore All</span>
              <h4 className="text-[#4A0E0E] font-black text-sm uppercase">Top Shajra-Verified Matches</h4>
           </div>
           <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
             {profiles.slice(0, 5).map(m => (
               <div key={m.id} className="min-w-[80px] text-center">
                  <div className="w-16 h-16 rounded-full border-2 border-[#D4AF37] p-1 mx-auto relative">
                    <img src={m.img} className="w-full h-full rounded-full object-cover" />
                    <div className="absolute -bottom-1 -right-1 bg-[#D4AF37] rounded-full p-0.5 border-2 border-white">
                      <TreeDeciduous size={10} className="text-[#4A0E0E]"/>
                    </div>
                  </div>
                  <p className="text-[10px] font-bold mt-2 text-[#4A0E0E]">{m.name.split(' ')[0]}</p>
               </div>
             ))}
           </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FDF5F5] pb-28 relative font-sans">
      
      {/* Header Section */}
      <div className="bg-[#4A0E0E] p-8 pb-20 rounded-b-[60px] shadow-2xl relative border-b-2 border-[#D4AF37]/50">
        <div className="flex justify-between items-start mb-6">
          <div className="flex gap-4">
             <Bell className="text-[#D4AF37]/60" size={24}/>
             <User className="text-[#D4AF37]/60" size={24} onClick={() => setActiveTab('profile')}/>
          </div>
          <div className="text-right">
             <h1 className="text-[#D4AF37] text-3xl font-black italic tracking-tighter leading-none">AZWAJ</h1>
             <p className="text-[#D4AF37]/60 text-[10px] font-bold tracking-[0.2em]">MARRIAGE</p>
          </div>
        </div>
        
        <div className="relative mt-8">
          <input 
            onChange={handleSearch}
            type="text" 
            placeholder="Search..." 
            className="w-full p-4 pl-12 rounded-full bg-white/10 border border-[#D4AF37]/20 text-white placeholder:text-[#D4AF37]/40 outline-none"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]" size={20} />
        </div>
      </div>

      {renderContent()}

      {/* --- Tab Navigation --- */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-[#4A0E0E] p-4 flex justify-around items-center rounded-full shadow-2xl border border-[#D4AF37]/30 z-[100]">
         <Home 
            onClick={() => setActiveTab('home')} 
            className={activeTab === 'home' ? "text-[#D4AF37]" : "text-[#D4AF37]/40"} 
            size={24}/>
         <MessageCircle 
            onClick={() => setActiveTab('chat')} 
            className={activeTab === 'chat' ? "text-[#D4AF37]" : "text-[#D4AF37]/40"} 
            size={24}/>
         <div className="bg-[#D4AF37] p-3 rounded-full -mt-12 shadow-lg border-4 border-[#FDF5F5]">
            <TreeDeciduous className="text-[#4A0E0E]" size={28} />
         </div>
         <Settings className="text-[#D4AF37]/40" size={24}/>
         <User 
            onClick={() => setActiveTab('profile')} 
            className={activeTab === 'profile' ? "text-[#D4AF37]" : "text-[#D4AF37]/40"} 
            size={24}/>
      </div>
    </div>
  );
};

export default App;

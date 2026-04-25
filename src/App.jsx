import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Menu, Bell, Search, SlidersHorizontal, Heart, X, Star, ShieldCheck, Lock, Users, MessageSquareHeart, Home, UserCircle, CheckCircle } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';

const App = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // دائرے کی حرکت کے لیے Motion Values
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-180, 180]);

  const mainCards = [
    { id: 1, name: "Ayesha", age: 24, edu: "Masters in Psychology", loc: "Lahore, Pakistan", religion: "Muslim", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" },
    { id: 2, name: "Fatima", age: 22, edu: "Bachelors in CS", loc: "Karachi, Pakistan", religion: "Muslim", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400" },
    { id: 3, name: "Zainab", age: 26, edu: "M.B.B.S", loc: "Islamabad, Pakistan", religion: "Muslim", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400" },
  ];

  const circularMembers = [
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
    "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=100",
    "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=100",
    "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=100",
    "https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?w=100",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100"
  ];

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FDF5F5] relative overflow-hidden font-sans shadow-2xl" dir="ltr">
      
      {/* Header */}
      <header className="bg-gradient-to-b from-[#4A0E0E] to-[#631212] p-5 pb-20 rounded-b-[50px] shadow-lg relative z-50">
        <div className="flex justify-between items-center mb-6">
          <Menu className="text-[#D4AF37] cursor-pointer" onClick={() => setIsDrawerOpen(true)} />
          <div className="flex flex-col items-center">
             <img src="/images/Logo.png" className="h-10" alt="Azwaj Logo" />
             <span className="text-[#D4AF37] text-[10px] tracking-widest mt-1">AZWAJ</span>
          </div>
          <div className="relative cursor-pointer" onClick={() => alert('No new notifications')}>
            <Bell className="text-[#D4AF37]" />
            <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-[#4A0E0E] text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">3</span>
          </div>
        </div>
        <div className="relative bg-white rounded-full p-1 flex items-center shadow-md">
          <Search className="text-gray-400 ml-3" size={20} />
          <input type="text" placeholder="Search by name, city..." className="flex-grow p-2 text-sm outline-none rounded-full" />
          <div className="bg-[#4A0E0E] p-2 rounded-full text-[#D4AF37] cursor-pointer"><SlidersHorizontal size={18} /></div>
        </div>
      </header>

      {/* Main Content with Semi-Circular Drag */}
      <main className="relative -mt-10 px-5 z-20 flex flex-col items-center">
        
        {/* Semi-Circle of Images (Manual Drag) */}
        <div className="absolute top-10 w-full h-[400px] flex justify-center pointer-events-none">
          <motion.div 
            style={{ rotate }}
            drag="x"
            dragConstraints={{ left: -200, right: 200 }}
            onDrag={(e, info) => x.set(info.offset.x)}
            className="relative w-full h-full flex justify-center items-center pointer-events-auto cursor-grab active:cursor-grabbing"
          >
            {circularMembers.map((img, i) => {
              const angle = (i / circularMembers.length) * 360;
              return (
                <motion.img
                  key={i}
                  src={img}
                  className="absolute w-14 h-14 rounded-full border-2 border-[#D4AF37] object-cover shadow-lg bg-white"
                  style={{
                    transform: `rotate(${angle}deg) translateY(-180px) rotate(-${angle}deg)`,
                  }}
                />
              );
            })}
          </motion.div>
        </div>

        {/* Swiper Cards */}
        <div className="relative z-30 mt-10">
          <Swiper
            effect={'cards'}
            grabCursor={true}
            loop={true}
            modules={[EffectCards]}
            className="w-[280px] h-[380px]"
            onSlideChange={(s) => setActiveIndex(s.realIndex)}
          >
            {mainCards.map(user => (
              <SwiperSlide key={user.id} className="rounded-3xl shadow-2xl bg-white border-4 border-white overflow-hidden relative">
                <img src={user.img} className="w-full h-full object-cover" alt={user.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4A0E0E] via-transparent p-5 flex flex-col justify-end text-white text-center">
                  <div className="flex items-center gap-2 justify-center mb-1">
                    <h3 className="text-xl font-bold">{user.name}, {user.age}</h3>
                    <CheckCircle size={16} className="text-[#D4AF37]" />
                  </div>
                  <p className="text-[10px] opacity-90">{user.edu} | {user.loc}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-8 mt-6 items-center z-40">
          <button onClick={() => alert('Passed')} className="bg-white p-3 rounded-full shadow-lg text-red-500 hover:scale-110 transition"><X size={24}/></button>
          <button onClick={() => alert('Liked')} className="bg-[#4A0E0E] p-5 rounded-full shadow-xl text-[#D4AF37] border-4 border-white hover:scale-110 transition"><Heart size={30} fill="#D4AF37"/></button>
          <button onClick={() => alert('Super Liked')} className="bg-white p-3 rounded-full shadow-lg text-yellow-500 hover:scale-110 transition"><Star size={24}/></button>
        </div>

        {/* Info Grid */}
        <div className="w-full mt-8 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-[#D4AF37]/20 grid grid-cols-4 gap-2 z-40">
          {[
            { Icon: ShieldCheck, t: "Verified" },
            { Icon: Lock, t: "Private" },
            { Icon: Users, t: "Serious" },
            { Icon: MessageSquareHeart, t: "Matches" }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <item.Icon className="text-[#4A0E0E] mb-1" size={18} />
              <p className="text-[8px] font-bold text-gray-600">{item.t}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer Nav */}
      <footer className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#4A0E0E] p-3 pb-6 rounded-t-[30px] flex justify-around items-center z-[100] border-t border-[#D4AF37]/30">
        <Home className="text-[#D4AF37] cursor-pointer" size={24} onClick={() => window.location.reload()} />
        <Heart className="text-[#D4AF37]/50 cursor-pointer" size={24} />
        <div className="bg-[#D4AF37] p-3 rounded-full -mt-10 border-4 border-[#FDF5F5] shadow-lg cursor-pointer">
          <Heart size={24} fill="#4A0E0E" stroke="#4A0E0E" />
        </div>
        <MessageSquareHeart className="text-[#D4AF37]/50 cursor-pointer" size={24} />
        <UserCircle className="text-[#D4AF37]/50 cursor-pointer" size={24} />
      </footer>
    </div>
  );
};

export default App;

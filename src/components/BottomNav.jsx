import React from 'react';
import { Compass, MessageCircle, Heart, Search, User } from 'lucide-react';

const BottomNav = ({ activeTab, setActiveTab, onChatClick }) => {
  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] bg-[#4A0E0E] p-4 flex justify-around items-center rounded-[35px] shadow-2xl z-[100] border border-white/10">
      <button onClick={() => setActiveTab('discover')} className={`transition-all ${activeTab === 'discover' ? 'text-[#D4AF37] scale-125' : 'text-white/30'}`}>
        <Compass size={24} />
      </button>
      <button onClick={onChatClick} className={`transition-all ${activeTab === 'messages' ? 'text-[#D4AF37] scale-125' : 'text-white/30'}`}>
        <MessageCircle size={24} />
      </button>
      <div onClick={() => setActiveTab('matches')} className="bg-gradient-to-br from-[#D4AF37] to-[#B8860B] p-4 rounded-full -mt-14 border-[6px] border-[#FDF5F5] shadow-2xl cursor-pointer active:scale-90 transition-transform">
        <Heart size={28} fill="#4A0E0E" stroke="#4A0E0E" />
      </div>
      <button onClick={() => setActiveTab('discover')} className="text-white/30"><Search size={24} /></button>
      <button onClick={() => setActiveTab('profile')} className={`transition-all ${activeTab === 'profile' ? 'text-[#D4AF37] scale-125' : 'text-white/30'}`}>
        <User size={24} />
      </button>
    </nav>
  );
};

export default BottomNav;

import React from 'react';
import { Home, Heart, MessageCircle, User, Crown, Bell, Users } from 'lucide-react';

const BottomNav = ({ activeTab, setActiveTab }) => {
  // تمام ٹیبز کو ایک جگہ جمع کر دیا گیا ہے
  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Activity', icon: Bell },
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'discover', label: 'Matches', icon: Heart }, // Discover اور Matches کو ایک کر دیا گیا
    { id: 'home', label: 'Home', icon: Home },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] max-w-md mx-auto">
      {/* مین نیویگیشن بار */}
      <nav className="bg-[#F5E6D3]/90 backdrop-blur-md py-1 px-2 border-t border-[#D4AF37]/30 flex justify-around items-end rounded-t-[30px] shadow-[0_-5px_20px_rgba(0,0,0,0.1)]">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          // چیٹ بٹن کو سینٹرل فلوٹنگ لک دی گئی ہے
          if (tab.id === 'chat') {
            return (
              <div key={tab.id} className="relative -top-6">
                <button 
                  onClick={() => setActiveTab(tab.id)} 
                  className="bg-[#4A0E0E] p-4 rounded-full border-4 border-[#FDF5F5] shadow-2xl active:scale-90 transition-all"
                >
                  <Icon size={24} className="text-[#D4AF37]" />
                </button>
              </div>
            );
          }

          return (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)} 
              className={`flex flex-col items-center gap-0 transition-all duration-300 ${
                isActive ? 'text-[#4A0E0E] scale-110' : 'text-gray-400 opacity-70'
              }`}
            >
              <Icon size={18} strokeWidth={isActive ? 3 : 2} />
              <span className={`text-[7px] font-black uppercase tracking-tighter ${isActive ? 'opacity-100' : 'opacity-60'}`}>
                {tab.label}
              </span>
              {isActive && <span className="w-1 h-1 bg-[#4A0E0E] rounded-full"></span>}
            </button>
          );
        })}
      </nav>

      {/* پریمیم اسٹیٹس بار (Super Thin) */}
      <div className="bg-[#4A0E0E] py-0.5 px-4 flex justify-between items-center text-[7px] text-white/80 font-bold uppercase tracking-widest">
         <div className="flex items-center gap-0">
           <span className="text-[#D4AF37]">Premium</span>
           <Crown size={10} className="text-[#D4AF37] fill-[#D4AF37]/20"/>
         </div>
         <div className="flex gap-3">
           <span>25 Exclusive</span>
           <span className="opacity-40">|</span>
           <span>12 Inprogress</span>
           <span className="opacity-40">|</span>
           <span>88 Viewed</span>
         </div>
      </div>
    </div>
  );
};

export default BottomNav;

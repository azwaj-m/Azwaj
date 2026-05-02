import React from 'react';
import { Home, Heart, MessageCircle, User, Crown } from 'lucide-react';

const BottomNav = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'profile', icon: User },
    { id: 'subscription', icon: Crown },
    { id: 'messages', icon: MessageCircle },
    { id: 'matches', icon: Heart },
    { id: 'home', icon: Home },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100]">
      {/* Thin Main Bar */}
      <div className="bg-[#F5E6D3] py-2 px-2 border-t border-[#D4AF37]/30 flex justify-around items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          if (tab.id === 'messages') {
            return (
              <div key={tab.id} className="relative -top-4">
                <div onClick={() => setActiveTab(tab.id)} className="bg-[#4A0E0E] p-3 rounded-full border-2 border-white shadow-xl cursor-pointer">
                  <Icon size={20} className="text-[#D4AF37]" />
                </div>
              </div>
            );
          }

          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`transition-all ${isActive ? 'text-[#4A0E0E] scale-110' : 'text-gray-400 opacity-60'}`}>
              <Icon size={20} />
            </button>
          );
        })}
      </div>
      
      {/* Super Thin Status Bar */}
      <div className="bg-[#4A0E0E] py-1 px-4 flex justify-between items-center text-[7px] text-white/70 font-bold uppercase tracking-tighter">
         <span>Premium <Crown size={8} className="inline text-[#D4AF37]"/></span>
         <span>25 Exclusive | 12 Inprogress | 88 Viewed</span>
      </div>
    </div>
  );
};

export default BottomNav;

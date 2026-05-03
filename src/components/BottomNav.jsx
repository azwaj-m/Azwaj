import React from 'react';
import { Home, Heart, MessageCircle, User, Crown, Bell } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const BottomNav = ({ activeTab, setActiveTab }) => {
  const { t } = useTranslation();

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'discover', label: 'Matches', icon: Heart },
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'notifications', label: 'Activity', icon: Bell },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] max-w-md mx-auto">
      {/* مین نیویگیشن بار */}
      <nav className="bg-[#F5E6D3]/95 backdrop-blur-md py-3 px-2 border-t border-[#D4AF37]/40 flex justify-around items-center rounded-t-[30px] shadow-[0_-8px_25px_rgba(0,0,0,0.15)]">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center gap-1 min-w-[60px] transition-all duration-300 active:scale-90 ${
                isActive ? 'text-[#4A0E0E]' : 'text-gray-500'
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-[#4A0E0E]/10' : ''}`}>
                <Icon 
                  size={24} 
                  strokeWidth={isActive ? 3.5 : 2.5} 
                  className={isActive ? 'drop-shadow-sm' : ''}
                />
              </div>
              <span className={`text-[9px] font-black uppercase tracking-tighter transition-all ${
                isActive ? 'opacity-100 scale-105' : 'opacity-70'
              }`}>
                {t(tab.id, tab.label)}
              </span>
              {isActive && <div className="w-5 h-1 bg-[#4A0E0E] rounded-full mt-0.5"></div>}
            </button>
          );
        })}
      </nav>

      {/* پریمیم اسٹیٹس بار */}
      <div className="bg-[#4A0E0E] py-1.5 px-4 flex justify-between items-center text-[8px] text-white font-black uppercase tracking-widest border-t border-[#D4AF37]/20">
         <div className="flex items-center gap-1">
           <Crown size={12} className="text-[#D4AF37] fill-[#D4AF37]"/>
           <span className="text-[#D4AF37]">Premium</span>
         </div>
         <div className="flex gap-4 items-center">
           <div className="flex flex-col items-end">
             <span className="text-[7px] opacity-60">Exclusive</span>
             <span>25</span>
           </div>
           <span className="w-[1px] h-3 bg-white/20"></span>
           <div className="flex flex-col items-end">
             <span className="text-[7px] opacity-60">Inprogress</span>
             <span>12</span>
           </div>
           <span className="w-[1px] h-3 bg-white/20"></span>
           <div className="flex flex-col items-end">
             <span className="text-[7px] opacity-60">Viewed</span>
             <span>88</span>
           </div>
         </div>
      </div>
    </div>
  );
};

export default BottomNav;

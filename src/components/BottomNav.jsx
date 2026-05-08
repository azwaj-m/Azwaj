import React from 'react';
import { Home, Heart, MessageCircle, User, Crown, Bell, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useUser } from '../context/UserContext';

const BottomNav = ({ activeTab, setActiveTab, setNotificationFilter }) => {
  const { t } = useTranslation();
  const { userData } = useUser();

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'discover', label: 'Matches', icon: Heart },
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'notifications', label: 'Activity', icon: Bell },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  // کاؤنٹرز پر کلک کرنے کا ہینڈلر جو یوزر کو نوٹیفکیشن پیج پر متعلقہ فلٹر کے ساتھ بھیجے گا
  const handleStatClick = (filterType) => {
    setActiveTab('notifications');
    if (typeof setNotificationFilter === 'function') {
      setNotificationFilter(filterType);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] max-w-md mx-auto">
      {/* ۱۔ مین نیویگیشن بار */}
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
              {isActive && <div className="w-5 h-1 bg-[#4A0E0E] rounded-full mt-0.5 animate-in fade-in zoom-in duration-200"></div>}
            </button>
          );
        })}
      </nav>

      {/* ۲۔ پریمیم، ویریفیکیشن اور فعال لوکل اسٹیٹس بار (کلک ایبل کاؤنٹرز کے ساتھ) */}
      <div className="bg-[#4A0E0E] py-1.5 px-4 flex justify-between items-center text-[8px] text-white font-black uppercase tracking-widest border-t border-[#D4AF37]/20 select-none">
         <div className="flex items-center gap-3">
           <div className="flex items-center gap-1 active:scale-95 transition-transform cursor-pointer">
             <Crown size={12} className="text-[#D4AF37] fill-[#D4AF37]"/>
             <span className="text-[#D4AF37]">Premium</span>
           </div>
           {userData?.verificationStatus === 'verified' && (
             <div className="flex items-center gap-0.5 text-blue-400">
               <ShieldCheck size={11} className="fill-blue-500 text-white" />
               <span>Verified</span>
             </div>
           )}
         </div>
         
         {/* تین لائیو فعال بٹنز جو براہ راست نوٹیفکیشنز سے منسلک ہیں */}
         <div className="flex gap-4 items-center">
           {/* Exclusive بٹن */}
           <button 
             onClick={() => handleStatClick('exclusive')}
             className="flex flex-col items-end active:scale-95 transition-transform hover:text-[#D4AF37] outline-none"
           >
             <span className="text-[7px] opacity-60">Exclusive</span>
             <span className="font-bold text-[10px]">25</span>
           </button>
           <span className="w-[1px] h-3 bg-white/20"></span>
           
           {/* Inprogress بٹن */}
           <button 
             onClick={() => handleStatClick('inprogress')}
             className="flex flex-col items-end active:scale-95 transition-transform hover:text-[#D4AF37] outline-none"
           >
             <span className="text-[7px] opacity-60">Inprogress</span>
             <span className="font-bold text-[10px]">12</span>
           </button>
           <span className="w-[1px] h-3 bg-white/20"></span>
           
           {/* Viewed بٹن */}
           <button 
             onClick={() => handleStatClick('viewed')}
             className="flex flex-col items-end active:scale-95 transition-transform hover:text-[#D4AF37] outline-none"
           >
             <span className="text-[7px] opacity-60">Viewed</span>
             <span className="font-bold text-[10px]">88</span>
           </button>
         </div>
      </div>
    </div>
  );
};

export default BottomNav;

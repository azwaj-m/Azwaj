import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  User, Heart, ShieldAlert, Crown, HelpCircle, 
  LogOut, X, Home, Search, MessageCircle, Languages 
} from 'lucide-react';
import LanguageSelectorModal from './LanguageSelectorModal';

const Sidebar = ({ isOpen, setIsOpen, activePage, setActivePage, onAction, onEditProfile }) => {
  const { t, i18n } = useTranslation();
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);

  // تمام فیچرز کی لسٹ - کوئی کوڈ حذف نہیں کیا گیا
  const menuItems = [
    { id: 'home', icon: Home, label: t('home', 'ہوم'), action: () => setActivePage && setActivePage('home') },
    { id: 'profile', icon: User, label: 'میری پروفائل', action: () => onEditProfile() },
    { id: 'discover', icon: Heart, label: 'پسندیدہ رشتے', action: () => onAction('main', 'discover') },
    { id: 'chat', icon: MessageCircle, label: t('chat', 'چیٹ'), action: () => setActivePage && setActivePage('chat') },
    { id: 'blocked', icon: ShieldAlert, label: 'بلاک شدہ لسٹ', action: () => onAction('blocked') },
    { id: 'premium', icon: Crown, label: 'پریمیم ممبرشپ', action: () => onAction('premium') },
    { id: 'help', icon: HelpCircle, label: 'مدد اور سپورٹ', action: () => onAction('help') }
  ];

  const isRTL = i18n.dir() === 'rtl';

  return (
    <>
      {/* Overlay: z-index 250 تاکہ سب کچھ ڈھانپ لے */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/70 z-[250] backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Content: z-index 300 تاکہ ہیڈر کے اوپر نظر آئے */}
      <div 
        className={`fixed top-0 ${isRTL ? 'right-0' : 'left-0'} h-full w-[290px] bg-[#FDF5F5] z-[300] shadow-[0_0_40px_rgba(0,0,0,0.4)] transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : (isRTL ? 'translate-x-full' : '-translate-x-full')
        } flex flex-col`}
      >
        
        {/* Header Section: رنگ اور ڈیزائن آپ کی تصویر کے مطابق */}
        <div className="bg-[#4A0E0E] p-8 text-center relative overflow-hidden flex-shrink-0">
          <button 
            onClick={() => setIsOpen(false)} 
            className={`absolute top-5 ${isRTL ? 'left-5' : 'right-5'} text-[#D4AF37] hover:scale-110 transition-transform`}
          >
            <X size={26} />
          </button>
          
          <div className="relative inline-block mt-4">
            <div className="w-20 h-20 rounded-full border-4 border-[#D4AF37] overflow-hidden mx-auto shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400" 
                alt="User" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
          <h2 className="text-[#D4AF37] mt-3 text-xl font-black italic tracking-tighter uppercase">صارف کا نام</h2>
          <p className="text-[#D4AF37]/60 text-[8px] uppercase font-bold tracking-[0.2em]">Verified Account</p>
        </div>

        {/* Menu Items: اسکرول ایبل لسٹ */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                item.action();
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all group ${
                activePage === item.id ? 'bg-[#4A0E0E]/5' : 'hover:bg-[#4A0E0E]/5'
              }`}
            >
              <div className={`flex items-center gap-4 w-full ${isRTL ? 'flex-row' : 'flex-row-reverse'}`}>
                 <div className="bg-[#F5E6D3] p-2 rounded-xl text-[#4A0E0E] group-hover:bg-[#4A0E0E] group-hover:text-[#D4AF37] transition-all flex-shrink-0">
                   <item.icon size={20} strokeWidth={2.5} />
                 </div>
                 <span className={`text-[#4A0E0E] font-bold text-sm flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                   {item.label}
                 </span>
              </div>
            </button>
          ))}
        </nav>

        {/* Footer Section: لینگویج سلیکٹر اور ورژن */}
        <div className="p-5 border-t border-[#4A0E0E]/10 bg-white/50">
          {/* لینگویج بٹن - 100% ورکنگ */}
          <button 
            onClick={() => setIsLangModalOpen(true)}
            className="w-full flex items-center justify-between p-4 bg-[#3D1212] border-2 border-[#D4AF37]/30 rounded-[20px] text-[#D4AF37] hover:bg-[#4A0E0E] transition-all mb-4 shadow-md"
          >
            <div className="flex items-center gap-3">
              <Languages size={18} />
              <span className="text-[10px] font-black uppercase tracking-widest">{t('language', 'زبان منتخب کریں')}</span>
            </div>
            <span className="text-[9px] font-black bg-[#D4AF37] text-[#4A0E0E] px-2 py-0.5 rounded-md uppercase">
              {i18n.language}
            </span>
          </button>

          <div className="flex flex-col items-center">
             <button className="flex items-center gap-2 text-red-600 font-black uppercase text-[10px] mb-3 hover:scale-105 transition-transform">
               <LogOut size={16} /> لاگ آؤٹ
             </button>
             <p className="text-[7px] text-gray-400 font-bold uppercase tracking-[0.2em]">
               Version 2.0.4 • Azwaj Ecosystem
             </p>
          </div>
        </div>
      </div>

      {/* لینگویج ماڈل کنٹرول */}
      <LanguageSelectorModal 
        isOpen={isLangModalOpen} 
        onClose={() => setIsLangModalOpen(false)} 
      />
    </>
  );
};

export default Sidebar;

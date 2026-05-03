import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Languages, Home, Search, MessageCircle, User, Settings, LogOut } from 'lucide-react';
import LanguageSelectorModal from './LanguageSelectorModal';

const Sidebar = ({ isOpen, setIsOpen, activePage, setActivePage }) => {
  const { t, i18n } = useTranslation();
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);

  // مینو آئٹمز کی لسٹ
  const menuItems = [
    { id: 'home', icon: Home, label: t('home', 'Home') },
    { id: 'discover', icon: Search, label: t('discover', 'Discover') },
    { id: 'chat', icon: MessageCircle, label: t('chat', 'Chat') },
    { id: 'profile', icon: User, label: t('profile', 'Profile') },
  ];

  return (
    <>
      {/* سائیڈ بار کنٹینر */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#4A0E0E] transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out shadow-2xl`}>
        <div className="p-6 flex flex-col h-full">
          
          <h2 className="text-[#D4AF37] text-2xl font-black italic mb-8">AZWAJ</h2>

          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
                  activePage === item.id ? 'bg-[#D4AF37] text-[#4A0E0E]' : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                <item.icon size={20} />
                <span className="font-bold text-sm">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* زبان تبدیل کرنے کا بٹن */}
          <div className="mt-auto border-t border-white/10 pt-6">
            <button 
              onClick={() => setIsLangModalOpen(true)}
              className="w-full flex items-center justify-between p-4 bg-[#3D1212] border border-[#D4AF37]/30 rounded-2xl text-[#D4AF37] hover:bg-[#5A1212] transition-all"
            >
              <div className="flex items-center gap-3">
                <Languages size={20} />
                <span className="text-xs font-black uppercase tracking-widest">{t('language', 'Language')}</span>
              </div>
              <span className="text-[10px] font-bold opacity-70 uppercase">{i18n.language}</span>
            </button>
          </div>
        </div>
      </div>

      {/* لینگویج ماڈل */}
      <LanguageSelectorModal 
        isOpen={isLangModalOpen} 
        onClose={() => setIsLangModalOpen(false)} 
      />

      {/* باہر کلک کرنے پر بند ہونے والا حصہ */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

// یہ لائن سب سے اہم ہے، جس کی وجہ سے ایرر آ رہا تھا

export default Sidebar;

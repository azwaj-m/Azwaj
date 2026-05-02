import React from 'react';
import { Bell, Settings, Search, SlidersHorizontal } from 'lucide-react';

const Header = ({ activeTab, searchQuery, setSearchQuery, onNotificationClick, onSettingsClick }) => {
  return (
    <div className="relative">
      <div className="absolute top-0 left-0 right-0 h-[280px] bg-gradient-to-b from-[#4A0E0E] to-[#631212] rounded-b-[60px] shadow-2xl z-0"></div>
      <header className="relative z-10 p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/images/Logo.png" className="w-10 h-10 rounded-full border border-[#D4AF37]/30" alt="Logo" />
          <span className="text-2xl font-serif font-bold text-[#D4AF37]">Azwaj</span>
        </div>
        <div className="flex gap-4">
          <Bell className="text-white/80 cursor-pointer" onClick={onNotificationClick} size={22} />
          <Settings className="text-[#D4AF37] cursor-pointer" onClick={onSettingsClick} size={22} />
        </div>
      </header>

      {activeTab === 'discover' && (
        <div className="relative z-10 px-6 mt-2 mb-8">
          <div className="relative flex items-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-5 py-3.5 shadow-2xl">
            <Search size={20} className="text-[#D4AF37]" />
            <input
              type="text"
              placeholder="تلاش کریں..."
              className="bg-transparent w-full px-3 outline-none text-white placeholder-gray-300 text-sm text-right"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SlidersHorizontal size={20} className="text-[#D4AF37] cursor-pointer" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;

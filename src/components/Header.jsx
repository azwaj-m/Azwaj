import React from 'react';
import { Bell, Menu, Search, Filter } from 'lucide-react';

const Header = ({ searchQuery, setSearchQuery, toggleSidebar, onNotificationClick }) => {
  return (
    <header className="bg-[#3D0A0A] pt-4 pb-6 px-4 rounded-b-[45px] shadow-2xl relative z-50 border-b-2 border-[#D4AF37]/30" dir="rtl">
      
      {/* ٹاپ سیکشن: لوگو اور بٹنز */}
      <div className="flex justify-between items-center mb-6">
        {/* سائیڈ بار ٹوگل (پروفائل امیج) */}
        <div 
          className="w-10 h-10 rounded-full border-2 border-[#D4AF37] overflow-hidden bg-white cursor-pointer active:scale-90 transition-transform shadow-inner"
          onClick={toggleSidebar}
        >
          <img 
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100" 
            className="w-full h-full object-cover" 
            alt="User" 
          />
        </div>

        {/* پریمیم لوگو برانڈنگ */}
        <div className="flex items-center gap-3">
          <div className="text-left leading-tight">
            <h1 className="text-2xl font-black text-[#D4AF37] tracking-tighter uppercase leading-none">
              Azwaj
            </h1>
            <p className="text-[9px] font-bold text-[#D4AF37]/80 tracking-[0.3em] uppercase text-right">
              Marriage
            </p>
          </div>
          <div className="bg-gradient-to-br from-[#D4AF37] to-[#AA8928] p-1.5 rounded-xl rotate-3 shadow-lg">
            <img src="/images/Logo.png" className="w-7 h-7 object-contain brightness-110" alt="Logo" />
          </div>
        </div>

        {/* نوٹیفیکیشن بٹن */}
        <button 
          onClick={onNotificationClick} 
          className="bg-[#D4AF37] p-2 rounded-full shadow-xl active:scale-95 transition-all relative"
        >
          <Bell size={18} fill="#3D0A0A" stroke="none" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-[#3D0A0A] rounded-full"></span>
        </button>
      </div>

      {/* سرچ بار سیکشن - مختلف کلر (Creamy White) */}
      <div className="flex gap-2 items-center">
        <button
          onClick={toggleSidebar}
          className="bg-[#D4AF37] p-2.5 rounded-2xl shadow-lg active:scale-90 text-[#3D0A0A]"
        >
          <Menu size={20} />
        </button>

        <div className="relative flex-1 group">
          <input
            type="text"
            placeholder="ملک، نام، عمر، مذہب یا پیشہ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F5E6D3] border-2 border-[#D4AF37]/20 rounded-2xl py-3 px-10 text-[#3D0A0A] text-right outline-none text-[11px] font-bold focus:border-[#D4AF37] transition-all placeholder:text-[#3D0A0A]/40 shadow-xl"
          />
          <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3D0A0A]/60" />
          <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D4AF37]" />
        </div>
      </div>

      {/* کوئیک فلٹر انڈیکیٹر (اختیاری) */}
      <div className="flex justify-center gap-4 mt-3 opacity-60">
        <div className="w-1 h-1 rounded-full bg-[#D4AF37]"></div>
        <div className="w-1 h-1 rounded-full bg-[#D4AF37]"></div>
        <div className="w-1 h-1 rounded-full bg-[#D4AF37]"></div>
      </div>
    </header>
  );
};

export default Header;

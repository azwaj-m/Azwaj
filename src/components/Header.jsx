import React from 'react';
import { Bell, Menu, Search } from 'lucide-react';

const Header = ({ searchQuery, setSearchQuery, toggleSidebar, onNotificationClick }) => {
  return (
    <header className="bg-[#3D0A0A] pt-4 pb-8 px-4 rounded-b-[40px] shadow-2xl relative z-50" dir="rtl">
      {/* ٹاپ سیکشن: نوٹیفکیشن، لوگو اور پروفائل */}
      <div className="flex justify-between items-center mb-6">
        {/* نوٹیفیکیشن بٹن */}
        <button 
          onClick={onNotificationClick} 
          className="bg-[#D4AF37] p-2.5 rounded-full shadow-lg active:scale-95 transition-all relative group"
        >
          <Bell size={20} fill="#4A0E0E" stroke="none" />
          {/* متحرک نوٹیفیکیشن ڈاٹ */}
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-600 border-2 border-[#3D0A0A] rounded-full animate-pulse"></span>
        </button>

        {/* برانڈنگ: لوگو اور نام ایک لائن میں */}
        <div className="flex items-center gap-2">
          <img src="/images/Logo.png" className="w-8 h-8 object-contain" alt="Logo" />
          <h1 className="text-sm font-serif text-[#D4AF37] font-black uppercase tracking-[0.1em] whitespace-nowrap">
             Azwaj Marriage
          </h1>
        </div>

        {/* یوزر پروفائل / سائیڈ بار ٹوگل */}
        <div 
          className="w-10 h-10 rounded-full border-2 border-[#D4AF37] overflow-hidden bg-white cursor-pointer active:scale-90 transition-transform shadow-lg"
          onClick={toggleSidebar}
        >
          <img 
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100" 
            className="w-full h-full object-cover" 
            alt="User" 
          />
        </div>
      </div>

      {/* سرچ اور مینیو سیکشن */}
      <div className="flex gap-2 items-center">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="نام، شہر یا مذہب سے تلاش کریں..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-full py-3 px-10 text-white text-right outline-none text-[12px] focus:bg-white/20 transition-all placeholder:text-white/50 shadow-inner"
          />
          <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#D4AF37]" />
        </div>
        
        <button
          onClick={toggleSidebar}
          className="bg-[#D4AF37] p-3 rounded-2xl shadow-lg active:scale-90 transition-all hover:bg-[#c4a132] text-[#4A0E0E]"
        >
          <Menu size={22} />
        </button>
      </div>
    </header>
  );
};

export default Header;


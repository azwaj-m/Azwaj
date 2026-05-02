import React from 'react';
import { Bell, Menu, Search } from 'lucide-react';

const Header = ({ searchQuery, setSearchQuery, toggleSidebar }) => {
  return (
    <div className="bg-[#3D0A0A] pt-4 pb-6 px-4 rounded-b-[40px] shadow-2xl relative z-50" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => alert('نوٹیفیکیشنز جلد دستیاب ہوں گے')}
          className="bg-[#D4AF37] p-2 rounded-full shadow-lg active:scale-95 transition-transform"
        >
          <Bell size={18} fill="#4A0E0E" stroke="none" />
        </button>
        
        <div className="flex flex-col items-center">
           <img src="/images/Logo.png" className="w-8 h-8 object-contain mb-1" alt="L" />
           <h1 className="text-sm font-serif text-[#D4AF37] font-black uppercase tracking-[0.2em] leading-none">
              Azwaj Marriage
           </h1>
        </div>

        <div 
          className="w-10 h-10 rounded-full border-2 border-[#D4AF37] overflow-hidden bg-white cursor-pointer active:scale-90 transition-transform shadow-lg"
          onClick={toggleSidebar}
        >
          <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100" className="w-full h-full object-cover" alt="U" />
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <div className="relative flex-1">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="نام، شہر یا مذہب سے تلاش کریں..." 
            className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-full py-2.5 px-10 text-white text-right outline-none text-[12px] focus:bg-white/20 transition-all placeholder:text-white/50"
          />
          <Search size={18} className="absolute right-3 top-3 text-[#D4AF37]" />
        </div>
        <button 
          onClick={toggleSidebar}
          className="bg-[#D4AF37] p-2.5 rounded-xl shadow-lg active:scale-90 transition-transform hover:bg-[#c4a132]"
        >
          <Menu size={20} className="text-[#4A0E0E]" />
        </button>
      </div>
    </div>
  );
};

export default Header;

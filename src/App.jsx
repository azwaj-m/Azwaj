import React, { useState, useRef } from 'react';
import { Menu, Bell, Search, SlidersHorizontal, Heart, X, Star, ShieldCheck, Lock, Users, MessageSquareHeart, Home, UserCircle, CheckCircle } from 'lucide-react';

// Swiper Components & Styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';

const App = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const swiperRef = useRef(null);

  // ۱. مین کارڈز کا ڈیٹا (لامحدود لوپ کے لیے)
  const mainCards = [
    { id: 1, name: "Ayesha", age: 24, edu: "Masters in Psychology", loc: "Lahore, Pakistan", religion: "Muslim", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" },
    { id: 2, name: "Fatima", age: 22, edu: "Bachelors in CS", loc: "Karachi, Pakistan", religion: "Muslim", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400" },
    { id: 3, name: "Zainab", age: 26, edu: "M.B.B.S", loc: "Islamabad, Pakistan", religion: "Muslim", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400" },
  ];

  // ۲. نیچے والے سرکلر ممبرز کا ڈیٹا (گھومنے والی اینیمیشن کے لیے)
  const circularMembers = [
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
    "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=100",
    "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=100",
    "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=100",
    "https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?w=100",
  ];

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FDF5F5] relative overflow-hidden font-sans shadow-2xl" dir="ltr">
      
      {/* === سائیڈ بار / Drawer === */}
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-black/50 z-[1000] animate-in fade-in" onClick={() => setIsDrawerOpen(false)}>
          <div className="absolute left-0 top-0 h-full w-64 bg-[#4A0E0E] p-6 text-[#D4AF37] shadow-xl animate-in slide-in-from-left" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-10">
              <img src="/images/Logo.png" className="h-10" alt="Logo" />
              <X className="cursor-pointer" onClick={() => setIsDrawerOpen(false)} />
            </div>
            <nav className="space-y-6 font-semibold">
              <p className="border-b border-[#D4AF37]/20 pb-2">Home</p>
              <p className="border-b border-[#D4AF37]/20 pb-2">My Profile</p>
              <p className="border-b border-[#D4AF37]/20 pb-2">Settings</p>
              <p className="border-b border-[#D4AF37]/20 pb-2 text-red-400">Logout</p>
            </nav>
          </div>
        </div>
      )}

      {/* === ہیڈر (Header) === */}
      <header className="bg-gradient-to-b from-[#4A0E0E] to-[#631212] p-5 pb-24 rounded-b-[60px] shadow-lg relative z-10">
        <div className="flex justify-between items-center mb-6">
          <Menu className="text-[#D4AF37] cursor-pointer" onClick={() => setIsDrawerOpen(true)} />
          <img src="/images/Logo.png" className="h-12" alt="Azwaj Logo" /> {/* لوگو پبلک فولڈر سے */}
          <div className="relative">
            <Bell className="text-[#D4AF37]" />
            <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-[#4A0E0E] text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">3</span>
          </div>
        </div>
        
        {/* سرچ بار */}
        <div className="relative bg-white rounded-full p-1 shadow-inner flex items-center">
          <Search className="text-gray-400 ml-3" size={20} />
          <input type="text" placeholder="Search by name, city or profession..." className="flex-grow p-2 pl-3 text-sm outline-none rounded-full" />
          <div className="bg-[#4A0E0E] p-2 rounded-full text-[#D4AF37] ml-1">
            <SlidersHorizontal size={18} />
          </div>
        </div>
      </header>

      {/* === مین کنٹینٹ (سوائپر کارڈز) === */}
      <main className="relative -mt-16 px-5 z-20">
        <div className="flex justify-between mb-4 px-2">
          <button className="bg-[#4A0E0E] text-[#D4AF37] text-xs px-4 py-1.5 rounded-full flex items-center gap-1.5 font-medium shadow"><SlidersHorizontal size={14}/> Filters</button>
          <button className="bg-[#4A0E0E] text-[#D4AF37] text-xs px-4 py-1.5 rounded-full flex items-center gap-1.5 font-medium shadow"><Heart size={14}/> Preferences</button>
        </div>

        {/* ۳. گھومنے والے کارڈز (Swiper Effects with Infinite Loop) */}
        <Swiper
          ref={swiperRef}
          effect={'cards'}
          grabCursor={true}
          loop={true} // لامحدود لوپ
          autoplay={{ delay: 5000, disableOnInteraction: false }} // خودکار گھومنا
          modules={[EffectCards, Autoplay]}
          className="w-[300px] h-[400px]"
        >
          {mainCards.map(user => (
            <SwiperSlide key={user.id} className="rounded-3xl shadow-xl bg-white border-4 border-white overflow-hidden relative">
              <img src={user.img} className="w-full h-full object-cover" alt={user.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent p-5 flex flex-col justify-end text-white text-right">
                <div className="flex items-center gap-2 justify-end mb-1">
                  <h3 className="text-2xl font-bold">{user.name}, {user.age}</h3>
                  <CheckCircle size={18} className="text-[#D4AF37]" />
                </div>
                <p className="text-xs opacity-80">{user.edu}</p>
                <p className="text-xs opacity-80">{user.loc}</p>
                <p className="text-xs opacity-80">{user.religion}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* ایکشن بٹنز */}
        <div className="flex justify-center gap-6 mt-6 items-center">
          <div className="bg-white p-3 rounded-full shadow-lg text-gray-400 border border-gray-100 cursor-pointer active:scale-90 transition"><X size={28}/></div>
          <div className="bg-[#4A0E0E] p-4 rounded-full shadow-lg text-[#D4AF37] border-4 border-white cursor-pointer active:scale-90 transition"><Heart size={32} fill="#D4AF37"/></div>
          <div className="bg-white p-3 rounded-full shadow-lg text-gray-400 border border-gray-100 cursor-pointer active:scale-90 transition"><Star size={28}/></div>
        </div>
      </main>

      {/* === ۴. نیچے گھومتی ہوئی تصاویر (Circular Bottom Animation) === */}
      <div className="relative mt-10 h-40 flex justify-center items-center">
        {circularMembers.map((img, i) => {
          // CSS اینیمیشن کی لاجک جو تصویروں کو دائرے میں گھمائے گی
          const delay = i * 2; // ہر تصویر کے درمیان وقفہ
          return (
            <img 
              key={i} 
              src={img} 
              className="absolute w-14 h-14 rounded-full border-2 border-[#D4AF37] object-cover animate-circular-flow shadow-md"
              style={{ animationDelay: `-${delay}s` }} // منفی تاخیر تاکہ سب ایک ساتھ شروع ہوں
              alt="Member"
            />
          );
        })}
        {/* فیچرز پینل (درمیان میں) */}
        <div className="absolute top-1/2 -translate-y-1/2 w-[90%] bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white grid grid-cols-4 text-center z-10">
          {[
            { Icon: ShieldCheck, text: "Verified Profiles" },
            { Icon: Lock, text: "Private & Secure" },
            { Icon: Users, text: "Serious Matches" },
            { Icon: MessageSquareHeart, text: "Meaningful Connections" }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <item.Icon className="text-[#4A0E0E]" size={20} />
              <p className="text-[9px] font-medium text-gray-700 leading-tight">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* === فوٹر (Footer) === */}
      <footer className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-gradient-to-t from-[#4A0E0E] to-[#631212] p-4 pb-6 rounded-t-3xl flex justify-around items-center z-50 text-[#D4AF37]/50">
        {[
          { Icon: Home, label: "Discover", active: true },
          { Icon: Heart, label: "Matches" },
          { Icon: Heart, label: "Center", isCenter: true }, // سینٹر دل
          { Icon: MessageSquareHeart, label: "Messages" },
          { Icon: UserCircle, label: "Profile" }
        ].map((item, i) => item.isCenter ? (
          // سینٹر والا بڑا دل
          <div key={i} className="bg-white/10 p-1.5 rounded-full -mt-12 scale-110 border-4 border-[#FDF5F5] shadow-lg">
            <div className="bg-gradient-to-b from-[#D4AF37] to-[#B6912A] p-3 rounded-full">
              <Heart size={24} fill="#4A0E0E" stroke="#4A0E0E" />
            </div>
          </div>
        ) : (
          // عام بٹنز
          <div key={i} className={`flex flex-col items-center gap-1 cursor-pointer ${item.active ? 'text-[#D4AF37]' : ''}`}>
            <item.Icon size={22} />
            <p className="text-[10px] font-medium">{item.label}</p>
          </div>
        ))}
      </footer>

      {/* CSS اینیمیشن کی تعریف (Tailwind میں شامل کرنے کے لیے) */}
      <style>{`
        @keyframes circular-flow {
          0% { transform: translate(-150px, 0px) scale(0.6); opacity: 0; z-index: 1; }
          10% { transform: translate(-100px, 50px) scale(0.8); opacity: 1; z-index: 5; }
          50% { transform: translate(0px, 100px) scale(1.1); opacity: 1; z-index: 10; } /* سب سے بڑا اور سامنے */
          90% { transform: translate(100px, 50px) scale(0.8); opacity: 1; z-index: 5; }
          100% { transform: translate(150px, 0px) scale(0.6); opacity: 0; z-index: 1; } /* کارڈز کے پیچھے غائب */
        }
        .animate-circular-flow {
          animation: circular-flow 12s linear infinite; /* اینیمیشن کا وقت اور لوپ */
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default App;

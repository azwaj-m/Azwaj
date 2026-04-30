import React from 'react';
import { Search, Bell, Heart, CheckCircle, ShieldCheck, Lock, Users, ChevronRight, MessageCircle, User, Home as HomeIcon } from 'lucide-react';

const Home = () => {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#F8F1E7] pb-32 font-sans text-[#4A0E0E] overflow-x-hidden">
      {/* Top Header Section */}
      <div className="bg-[#4A0E0E] pt-8 pb-16 px-6 rounded-b-[40px] relative shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center text-[#4A0E0E] text-[10px] font-bold">A</div>
            <span className="text-[#D4AF37] font-serif font-bold text-xs leading-tight">AZWAJ<br/>MARRIAGE</span>
          </div>
          <div className="bg-[#5D1212] p-2 rounded-full relative border border-[#D4AF37]/30">
            <Bell size={20} className="text-[#D4AF37]" />
            <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full border border-[#4A0E0E]"></span>
          </div>
        </div>

        <div className="flex flex-col items-center mb-6">
          <h1 className="text-[#D4AF37] text-3xl font-serif tracking-[0.2em] font-bold text-center">AZWAJ MARRIAGE</h1>
        </div>

        {/* Search Bar */}
        <div className="relative group px-2">
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full bg-[#FDF5F5] rounded-full py-3 px-6 pr-12 text-sm shadow-inner focus:outline-none border-none"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#4A0E0E] p-1.5 rounded-full">
            <Search size={18} className="text-[#D4AF37]" />
          </div>
        </div>
      </div>

      {/* Main Profile Card (Featured) */}
      <div className="px-5 -mt-10 relative z-10">
        <div className="bg-white rounded-[35px] shadow-2xl overflow-hidden border-b-4 border-[#D4AF37]">
          <div className="relative h-72 bg-gray-200">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" 
              alt="Featured Profile" 
              className="w-full h-full object-cover"
            />
            {/* Shajra Badge */}
            <div className="absolute top-4 left-4 bg-[#D4AF37]/90 backdrop-blur-md p-2 rounded-xl text-[9px] font-bold text-[#4A0E0E] flex flex-col items-center border border-white/50 shadow-lg">
              <span>7-GENERATION</span>
              <span>SHAJRA VERIFIED</span>
              <ShieldCheck size={22} className="mt-1" />
            </div>
            <button className="absolute top-4 right-4 bg-black/20 backdrop-blur-md p-2 rounded-full border border-white/30">
              <Heart size={20} className="text-[#D4AF37] fill-[#D4AF37]" />
            </button>
          </div>
          
          <div className="p-6 text-center bg-gradient-to-b from-white to-[#FDF5F5]">
            <h2 className="text-2xl font-bold tracking-widest uppercase text-[#4A0E0E]">Aisha Khan</h2>
            <div className="flex flex-col items-center gap-1 mt-2 text-sm font-medium text-gray-600">
              <div className="flex items-center gap-2 uppercase tracking-tighter"><Users size={14} className="text-[#D4AF37]"/> Age: 28, Profession: Doctor</div>
              <div className="flex items-center gap-2 uppercase tracking-tighter">📍 City: Lahore</div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button className="flex-1 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white py-3.5 rounded-2xl font-bold shadow-lg text-[11px] uppercase tracking-wider active:scale-95 transition-transform">VIEW SHAJRA</button>
              <button className="flex-1 bg-[#4A0E0E] text-white py-3.5 rounded-2xl font-bold shadow-lg text-[11px] uppercase tracking-wider active:scale-95 transition-transform">CONNECT</button>
            </div>
          </div>
        </div>
      </div>

      {/* Top Verified Matches */}
      <div className="mt-10 px-6">
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-bold text-xs tracking-widest uppercase border-l-4 border-[#D4AF37] pl-3">Top Verified Matches</h3>
          <button className="text-[#B8860B] text-[10px] font-black flex items-center gap-1">EXPLORE ALL <ChevronRight size={14}/></button>
        </div>
        <div className="flex gap-5 overflow-x-auto pb-4 no-scrollbar">
          {[
            {name: 'Maria', job: 'Doctor'},
            {name: 'Sarah', job: 'Engineer'},
            {name: 'Usman', job: 'Analyst'},
            {name: 'Hina', job: 'Architect'},
            {name: 'Ali', job: 'Doctor'}
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center min-w-[70px]">
              <div className="relative w-16 h-16 rounded-full border-2 border-[#D4AF37] p-0.5 shadow-md">
                <img src={`https://i.pravatar.cc/150?u=${idx + 10}`} className="rounded-full w-full h-full object-cover" alt={item.name} />
                <div className="absolute bottom-0 right-0 bg-white rounded-full">
                  <CheckCircle className="text-yellow-600 fill-yellow-600 bg-white rounded-full border-white" size={18} />
                </div>
              </div>
              <span className="text-[11px] font-bold mt-2 text-[#4A0E0E]">{item.name}</span>
              <span className="text-[9px] text-gray-500 font-medium">{item.job}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-2 px-6 mt-8">
        {[
          { icon: ShieldCheck, title: "100% Verified", desc: "Profiles Manually Verified" },
          { icon: Lock, title: "Privacy Focused", desc: "Your privacy is priority" },
          { icon: Users, title: "Serious Matches", desc: "Connect with serious partners" }
        ].map((badge, i) => (
          <div key={i} className="flex flex-col items-center text-center p-2 bg-white/40 rounded-2xl border border-white/60">
            <badge.icon size={22} className="text-[#D4AF37] mb-2" />
            <h4 className="text-[9px] font-bold uppercase tracking-tighter leading-tight">{badge.title}</h4>
            <p className="text-[8px] text-gray-400 mt-1 leading-[1.2]">{badge.desc}</p>
          </div>
        ))}
      </div>

      {/* Premium Stats Box */}
      <div className="mx-6 mt-8 bg-[#4A0E0E]/5 backdrop-blur-sm rounded-[25px] p-5 border border-[#D4AF37]/20 flex justify-between shadow-sm">
        {[
          { label: "Exclusive", value: "25" },
          { label: "Inprogress", value: "12" },
          { label: "You Viewed", value: "88" },
          { label: "Viewed Yours", value: "19" }
        ].map((stat, i) => (
          <div key={i} className="flex flex-col items-center">
            <span className="text-base font-black text-[#4A0E0E]">{stat.value}</span>
            <span className="text-[8px] text-gray-500 font-bold uppercase tracking-tighter">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Luxury Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-lg border-t border-gray-100 flex items-end justify-between px-4 pb-2 pt-1 z-50 rounded-t-[30px] shadow-[0_-10px_30px_rgba(0,0,0,0.08)]">
        <div className="flex flex-col items-center bg-[#F1E4D1] px-5 py-2.5 rounded-2xl border border-[#D4AF37]/30 mb-1">
          <HomeIcon size={20} className="text-[#4A0E0E] mb-1" />
          <span className="text-[9px] font-black text-[#4A0E0E] uppercase tracking-tighter">Home</span>
        </div>

        {[
          { label: "Matches", icon: Heart },
          { label: "Live Chat", icon: MessageCircle },
          { label: "Activity", icon: Bell },
          { label: "Profile", icon: User }
        ].map((item, idx) => (
          <div key={idx} className="flex flex-col items-center mb-3 px-1 transition-opacity opacity-50 hover:opacity-100 cursor-pointer">
            <item.icon size={22} className="text-gray-400 mb-1" />
            <span className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter">{item.label}</span>
          </div>
        ))}

        {/* Floating Premium Button */}
        <div className="bg-[#4A0E0E] p-4 rounded-t-[35px] flex flex-col items-center shadow-2xl -mb-2 border-t-2 border-[#D4AF37] min-w-[70px] active:scale-95 transition-transform">
          <div className="text-[#D4AF37] mb-1">
             <ShieldCheck size={20} fill="#D4AF37" className="text-[#4A0E0E]" />
          </div>
          <span className="text-[8px] font-black text-[#D4AF37] uppercase tracking-widest">Premium</span>
        </div>
      </nav>
    </div>
  );
};

export default Home;

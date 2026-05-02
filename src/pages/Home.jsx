import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { Heart, MessageCircle, UserSearch, MapPin, Briefcase, ShieldCheck } from 'lucide-react';

const Home = ({ profiles, setSelectedProfile }) => {
  return (
    <div className="flex flex-col pb-20 overflow-x-hidden" dir="rtl">
      
      {/* 1. پریمیم کارڈ سوائپر (Top Section) */}
      <div className="mt-6 mb-10">
        <h3 className="text-[#4A0E0E] font-black text-xs mb-4 px-6 uppercase tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse"></span>
          نمایاں رشتے
        </h3>
        <Swiper 
          effect={'cards'} 
          grabCursor={true} 
          modules={[EffectCards]} 
          className="w-[280px] h-[380px]"
        >
          {profiles.slice(0, 5).map((u) => (
            <SwiperSlide key={`swipe-${u.id}`} className="rounded-[35px] bg-[#FFF9F2] shadow-2xl border border-[#D4AF37]/20 overflow-hidden">
              <div className="h-[65%] relative">
                <img src={u.img} className="w-full h-full object-cover" alt={u.fullName} />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-[#D4AF37] shadow-sm">
                  <p className="text-[8px] font-black text-[#4A0E0E] flex items-center gap-1">
                    <ShieldCheck size={10} className="text-[#D4AF37]" /> VERIFIED
                  </p>
                </div>
              </div>
              <div className="p-4 text-center">
                <h2 className="text-lg font-black text-[#4A0E0E]">{u.fullName}</h2>
                <p className="text-[10px] text-[#D4AF37] font-bold">{u.profession}</p>
                <button 
                  onClick={() => setSelectedProfile(u)} 
                  className="mt-4 w-full bg-[#4A0E0E] text-[#D4AF37] py-2.5 rounded-2xl font-black text-[10px] shadow-lg active:scale-95 transition-transform"
                >
                  پروفائل دیکھیں
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 2. تمام پروفائلز کی لسٹ (Bottom Section) */}
      <div className="px-4 space-y-6">
        <h3 className="text-[#4A0E0E] font-black text-xs mb-2 px-2 uppercase tracking-widest">
          تمام ممبرز ({profiles.length})
        </h3>
        
        {profiles.length > 0 ? (
          profiles.map((profile) => (
            <div 
              key={profile.id} 
              className="bg-white rounded-[35px] overflow-hidden shadow-xl border border-[#D4AF37]/10 group animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              {/* امیج سیکشن */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={profile.img} 
                  alt={profile.fullName} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                
                <div className="absolute bottom-4 left-6 right-6 flex justify-between items-end">
                  <div className="text-right">
                    <h3 className="text-white text-xl font-black">{profile.fullName}</h3>
                    <p className="text-[#D4AF37] text-xs font-bold flex items-center gap-1">
                      <Briefcase size={12} /> {profile.profession}
                    </p>
                  </div>
                  <div className="bg-[#D4AF37] text-[#4A0E0E] text-[10px] font-black px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                    <MapPin size={10} /> {profile.city}
                  </div>
                </div>
              </div>

              {/* ایکشن بٹنز */}
              <div className="p-5 flex gap-3">
                <button 
                  onClick={() => setSelectedProfile(profile)}
                  className="flex-1 bg-[#4A0E0E] text-white py-3 rounded-2xl font-black text-xs flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg"
                >
                  <UserSearch size={16} className="text-[#D4AF37]" />
                  پروفائل دیکھیں
                </button>
                
                <button 
                  className="bg-[#D4AF37]/20 text-[#4A0E0E] p-4 rounded-2xl hover:bg-[#D4AF37] transition-colors active:scale-90 shadow-inner"
                  onClick={() => alert('میسج سروس جلد آرہی ہے')}
                >
                  <MessageCircle size={20} />
                </button>

                <button 
                  className="bg-red-50 text-red-500 p-4 rounded-2xl hover:bg-red-500 hover:text-white transition-colors active:scale-90 shadow-inner"
                  onClick={() => alert('پسندیدہ لسٹ میں شامل کر دیا گیا')}
                >
                  <Heart size={20} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-[35px] border-2 border-dashed border-[#D4AF37]/20">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-[#4A0E0E] font-bold">کوئی پروفائل نہیں ملی</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

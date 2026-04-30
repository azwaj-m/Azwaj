import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import { X, Heart, MapPin, Search, ChevronLeft } from 'lucide-react';

const Discover = ({ profiles, onProfileClick }) => {
  // اگر سرچ میں کچھ نہ ملے
  if (profiles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-gray-500">
        <Search size={48} className="mb-4 opacity-20" />
        <p>آپ کی تلاش کے مطابق کوئی پروفائل نہیں ملی۔</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full relative pt-4 pb-10">
      
      {/* 1. مین سوئپر کارڈز */}
      <div className="w-[320px] h-[440px] z-30">
        <Swiper
          effect={'cards'}
          grabCursor={true}
          modules={[EffectCards]}
          className="w-full h-full"
        >
          {profiles.map((p) => (
            <SwiperSlide key={p.id} className="rounded-[40px] border-4 border-white shadow-2xl bg-white overflow-hidden">
              <div className="relative w-full h-full cursor-pointer" onClick={() => onProfileClick(p)}>
                <img src={p.profileImg} className="w-full h-full object-cover" alt={p.fullName} />
                <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black/90 via-black/20 to-transparent text-white text-right">
                  <h3 className="text-2xl font-bold">{p.fullName}, {p.age}</h3>
                  <div className="flex items-center justify-end gap-1 opacity-90 mt-1">
                    <span className="text-xs">{p.city}</span>
                    <MapPin size={12} />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 2. ایکشن بٹنز (سوئپر کے فوراً نیچے) */}
      <div className="flex items-center gap-6 mt-6 mb-10">
        <button className="p-3 bg-white rounded-full shadow-lg text-gray-400 hover:text-red-500 transition-all active:scale-90 border border-gray-100">
          <X size={28} strokeWidth={3} />
        </button>
        <button className="p-4 bg-gradient-to-br from-[#4A0E0E] to-[#8B1A1A] rounded-full shadow-xl text-[#D4AF37] border-2 border-[#D4AF37]/30 active:scale-90">
          <Heart size={32} fill="currentColor" />
        </button>
      </div>

      {/* 3. چھوٹی پروفائلز لائن (Top Verified Matches) */}
      <div className="w-full px-6 overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <button className="text-[10px] font-bold text-[#4A0E0E]/50 flex items-center gap-1">
            <ChevronLeft size={12} /> سب دیکھیں
          </button>
          <h4 className="text-sm font-bold text-[#4A0E0E]">ٹاپ ویریفائیڈ میچز</h4>
        </div>

        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4" style={{ scrollbarWidth: 'none' }}>
          {profiles.map((p) => (
            <div 
              key={`thumb-${p.id}`} 
              className="flex-shrink-0 flex flex-col items-center gap-2 cursor-pointer"
              onClick={() => onProfileClick(p)}
            >
              <div className="relative p-1 rounded-full border-2 border-[#D4AF37]">
                <img 
                  src={p.profileImg} 
                  className="w-16 h-16 rounded-full object-cover shadow-md" 
                  alt={p.fullName} 
                />
                <div className="absolute bottom-0 left-0 bg-green-500 w-4 h-4 rounded-full border-2 border-white shadow-sm"></div>
              </div>
              <div className="text-center">
                <p className="text-[11px] font-bold text-[#4A0E0E] leading-tight">{p.fullName.split(' ')[0]}</p>
                <p className="text-[9px] text-gray-500">{p.profession.split(' ')[0]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Discover;

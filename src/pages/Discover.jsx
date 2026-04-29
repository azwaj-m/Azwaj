import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import CircularDiscovery from '../components/CircularDiscovery';
import { X, Heart } from 'lucide-react';

const Discover = ({ profiles, onProfileClick }) => {
  const [rotation, setRotation] = useState(0);

  const handleSlideChange = (swiper) => {
    // 360 ڈگری / 12 پروفائلز = 30 ڈگری ہر سلائیڈ پر
    setRotation(swiper.activeIndex * 30);
  };

  return (
    <div className="flex flex-col items-center min-h-screen w-full relative pt-8 bg-[#FDF5F5]">
      
      {/* کارڈ اسٹیک - سامنے والا حصہ */}
      <div className="w-[310px] h-[430px] z-30 shadow-2xl">
        <Swiper
          effect={'cards'}
          grabCursor={true}
          modules={[EffectCards]}
          onSlideChange={handleSlideChange}
          className="w-full h-full"
        >
          {profiles.slice(0, 12).map((p) => (
            <SwiperSlide key={p.id} className="rounded-[40px] bg-white overflow-hidden border border-white/50">
              <div className="relative w-full h-full" onClick={() => onProfileClick(p)}>
                <img src={p.profileImg} className="w-full h-full object-cover" alt="" />
                <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent text-white text-right" dir="rtl">
                  <h3 className="text-2xl font-bold">{p.fullName}, {p.age}</h3>
                  <p className="text-sm opacity-80">{p.profession}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* سرکلر ڈسکوری - کارڈ کے پیچھے سے اوپر نکلتا ہوا (تصویر کے مطابق) */}
      <div className="absolute top-[280px] w-full flex justify-center z-10 scale-125">
        <CircularDiscovery profiles={profiles} rotation={rotation} onSelect={onProfileClick} />
      </div>

      {/* کنٹرول بٹنز */}
      <div className="fixed bottom-24 flex items-center gap-6 z-40">
        <button className="p-4 bg-white rounded-full shadow-lg text-red-500 border active:scale-95 transition-all">
          <X size={28} />
        </button>
        <button className="p-5 bg-gradient-to-br from-[#4A0E0E] to-[#631212] rounded-full shadow-xl text-[#D4AF37] border-2 border-[#D4AF37]/30 active:scale-95 transition-all">
          <Heart size={30} fill="currentColor" />
        </button>
      </div>
    </div>
  );
};

export default Discover;

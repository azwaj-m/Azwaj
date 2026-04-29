import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import CircularDiscovery from '../components/CircularDiscovery';
import { X, Heart, Star } from 'lucide-react';

const Discover = ({ profiles, onProfileClick, currentUser }) => {
  const [rotation, setRotation] = useState(0);

  // جب کارڈ بدلے گا تو دائرہ 36 ڈگری گھومے گا
  const handleSlideChange = (swiper) => {
    setRotation(swiper.activeIndex * 36);
  };

  return (
    <div className="flex flex-col items-center px-6 overflow-hidden min-h-screen">
      {/* 1. کارڈ اسٹیک (Front Layer) */}
      <div className="w-full max-w-[320px] h-[420px] z-20 mt-10">
        <Swiper 
          effect={'cards'} 
          grabCursor={true} 
          modules={[EffectCards]} 
          onSlideChange={handleSlideChange}
          className="h-full"
        >
          {profiles.slice(0, 10).map((p) => (
            <SwiperSlide key={p.id} className="rounded-3xl shadow-2xl overflow-hidden bg-white border-2 border-azwaj-gold/20">
              <div className="relative h-full" onClick={() => onProfileClick(p)}>
                <img src={p.profileImg} className="w-full h-full object-cover" alt="" />
                <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent text-white">
                  <h3 className="text-2xl font-bold">{p.fullName}, {p.age}</h3>
                  <p className="text-sm opacity-80">{p.profession}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 2. سرکلر ڈسکوری (Back Layer - Overlapping) */}
      <div className="relative -mt-32 z-10 w-full">
        <CircularDiscovery profiles={profiles} rotation={rotation} onSelect={onProfileClick} />
      </div>

      {/* 3. ایکشن بٹنز */}
      <div className="fixed bottom-24 flex items-center gap-6 z-30">
        <button className="p-4 bg-white rounded-full shadow-xl text-red-500 border active:scale-90 transition-transform">
          <X size={28} />
        </button>
        <button className="p-4 bg-white rounded-full shadow-xl text-green-500 border active:scale-90 transition-transform">
          <Heart size={28} fill="currentColor" />
        </button>
      </div>
    </div>
  );
};

export default Discover;

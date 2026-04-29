import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import CircularDiscovery from '../components/CircularDiscovery';
import { X, Heart } from 'lucide-react';

const Discover = ({ profiles, onProfileClick }) => {
  const [rotation, setRotation] = useState(0);

  const handleSlideChange = (swiper) => {
    // ہر کارڈ بدلنے پر دائرہ 30 ڈگری گھومے گا
    setRotation(swiper.activeIndex * 30);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen relative overflow-hidden pt-10">
      
      {/* کارڈ اسٹیک - یہ تصویر کے مطابق اوپر رہے گا */}
      <div className="w-[320px] h-[450px] z-20">
        <Swiper
          effect={'cards'}
          grabCursor={true}
          modules={[EffectCards]}
          onSlideChange={handleSlideChange}
          className="h-full"
        >
          {profiles.slice(0, 10).map((p) => (
            <SwiperSlide key={p.id} className="bg-white rounded-[40px]">
              <div className="relative h-full w-full" onClick={() => onProfileClick(p)}>
                <img src={p.profileImg} className="w-full h-full object-cover" alt={p.fullName} />
                <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent text-white text-right">
                  <h3 className="text-2xl font-bold">{p.fullName}, {p.age}</h3>
                  <p className="text-sm opacity-80">{p.profession}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* سرکلر ڈسکوری - یہ کارڈ کے پیچھے آدھا چھپا ہوا ہوگا */}
      <div className="absolute top-[320px] left-0 right-0 flex justify-center z-10 scale-110">
        <CircularDiscovery profiles={profiles} rotation={rotation} onSelect={onProfileClick} />
      </div>

      {/* کنٹرول بٹنز - تصویر کے مطابق پوزیشن */}
      <div className="fixed bottom-28 flex gap-8 z-30">
        <button className="p-4 bg-white rounded-full shadow-lg text-red-500 active:scale-90 transition-transform border">
          <X size={32} />
        </button>
        <button className="p-4 bg-[#4A0E0E] rounded-full shadow-lg text-[#D4AF37] active:scale-90 transition-transform border-2 border-[#D4AF37]">
          <Heart size={32} fill="currentColor" />
        </button>
      </div>
    </div>
  );
};

export default Discover;

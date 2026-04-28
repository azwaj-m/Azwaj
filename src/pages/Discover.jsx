import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Heart, X, Star, CheckCircle } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/effect-cards';

const Discover = ({ profiles = [], rotation = 0, setRotation }) => {
  // صرف وہ پروفائلز نکالیں جو واقعی موجود ہیں
  const validProfiles = profiles.filter(p => p && p.id);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Upper Circles */}
      <div className="relative w-full h-[120px] mb-6 flex justify-center items-end opacity-100 pointer-events-none z-10">
        {validProfiles.slice(0, 6).map((p, i) => {
          const angle = (i / (Math.max(1, validProfiles.length - 1))) * Math.PI;
          const x = Math.cos(angle) * 140;
          const y = Math.sin(angle) * 70;
          return (
            <motion.div
              key={`circle-${p.id}`}
              className="absolute w-14 h-14 rounded-full border-[3px] border-[#D4AF37]/60 overflow-hidden shadow-lg bg-white"
              animate={{ x, y: -y, rotate: -rotation }}
            >
              <img src={p.profileImg || "/images/Logo.png"} className="w-full h-full object-cover" alt="" />
            </motion.div>
          );
        })}
      </div>

      {/* Card Stack */}
      <main className="relative z-20 flex justify-center mb-10">
        <Swiper
          effect={'cards'}
          grabCursor={true}
          modules={[EffectCards]}
          className="w-[290px] h-[370px]"
          onProgress={(s) => setRotation && setRotation(s.progress * 10)}
        >
          {validProfiles.length > 0 ? validProfiles.map((user) => (
            <SwiperSlide key={user.id} className="rounded-[40px] bg-white border-[6px] border-white shadow-2xl overflow-hidden relative">
              <img src={user.profileImg || "https://via.placeholder.com/400"} className="w-full h-full object-cover" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 p-6 flex flex-col justify-end text-white text-right" dir="rtl">
                <div className="flex items-center gap-2 mb-2">
                   {user.verificationStatus && <CheckCircle size={18} className="text-yellow-500 fill-yellow-500" />}
                   <h3 className="text-2xl font-bold">{user.fullName}, {user.age || '24'}</h3>
                </div>
                <p className="text-sm opacity-90">{user.profession || user.education || 'Member'}</p>
                <p className="text-xs opacity-80">{user.city || 'Pakistan'}</p>
              </div>
            </SwiperSlide>
          )) : (
            <SwiperSlide className="rounded-[40px] bg-gray-100 flex items-center justify-center text-gray-400">
              ڈیٹا لوڈ ہو رہا ہے...
            </SwiperSlide>
          )}
        </Swiper>
      </main>

      {/* Buttons */}
      <div className="flex items-center gap-8 mb-12 z-30">
          <button className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center text-red-500"><X size={32}/></button>
          <button className="w-20 h-20 rounded-full bg-[#4A0E0E] shadow-2xl flex items-center justify-center text-[#D4AF37]"><Heart size={40} fill="currentColor"/></button>
          <button className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center text-yellow-500"><Star size={32} fill="currentColor"/></button>
      </div>
    </div>
  );
};

export default Discover;

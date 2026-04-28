import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Discover = ({ profiles, onProfileClick }) => {
  // ایک وقت میں 30 سے 40 پروفائلز دکھانے کی حد
  const displayLimit = 40; 
  const displayProfiles = profiles.slice(0, displayLimit);

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
      {/* سینٹرل سرکل لاجک - 360 ڈگری ڈسٹری بیوشن */}
      <div className="relative w-[320px] h-[320px] rounded-full border-2 border-dashed border-yellow-500/20 animate-[spin_60s_linear_infinite]">
        {displayProfiles.slice(0, 12).map((p, i) => {
          const angle = (i * 360) / 12; // 12 پروفائلز دائرے کے گرد
          return (
            <motion.div
              key={p.id}
              onClick={() => onProfileClick(p)}
              className="absolute w-16 h-16 rounded-full border-2 border-[#D4AF37] overflow-hidden bg-white cursor-pointer shadow-lg"
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${angle}deg) translate(160px) rotate(-${angle}deg) translateX(-50%) translateY(-50%)`,
              }}
              whileHover={{ scale: 1.2, zIndex: 50 }}
            >
              <img src={p.profileImg} className="w-full h-full object-cover" alt="" />
              {p.isOnline && <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>}
            </motion.div>
          );
        })}
      </div>

      {/* مرکزی بٹن */}
      <div className="absolute z-10 bg-[#4A0E0E] p-6 rounded-full border-4 border-[#D4AF37] shadow-2xl text-[#D4AF37]">
         <h2 className="font-bold text-center leading-tight">تلاش<br/>رشتہ</h2>
      </div>
    </div>
  );
};

export default Discover;

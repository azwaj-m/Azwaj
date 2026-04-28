import React from 'react';
import { motion } from 'framer-motion';

const CircularDiscovery = ({ profiles, onSelect }) => {
  // مخصوص حد: 30 سے 40 پروفائلز
  const limitedProfiles = profiles.slice(0, 40);

  return (
    <div className="relative w-full h-[450px] flex items-center justify-center">
      <div className="absolute w-[300px] h-[300px] border-2 border-[#D4AF37]/30 rounded-full animate-[spin_40s_linear_infinite]">
        {limitedProfiles.slice(0, 10).map((profile, i) => {
          const angle = (i * 360) / 10;
          return (
            <motion.div
              key={profile.id}
              onClick={() => onSelect(profile)}
              className="absolute w-14 h-14 rounded-full border-2 border-[#4A0E0E] overflow-hidden cursor-pointer"
              style={{
                top: '50%', left: '50%',
                transform: `rotate(${angle}deg) translate(150px) rotate(-${angle}deg) translateX(-50%) translateY(-50%)`
              }}
            >
              <img src={profile.profileImg} className="w-full h-full object-cover" />
            </motion.div>
          );
        })}
      </div>
      <div className="z-10 bg-[#4A0E0E] text-[#D4AF37] p-5 rounded-full border-4 border-[#D4AF37] shadow-xl font-bold">
        Azwaj
      </div>
    </div>
  );
};

export default CircularDiscovery;

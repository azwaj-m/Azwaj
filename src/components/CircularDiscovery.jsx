import React from 'react';
import { motion } from 'framer-motion';

const CircularDiscovery = ({ profiles, onSelect, rotation }) => {
  const limitedProfiles = profiles.slice(0, 12); // دائرے کے لیے 12 پروفائلز کافی ہیں

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center overflow-visible">
      {/* گھومنے والا بیرونی دائرہ */}
      <motion.div 
        animate={{ rotate: rotation }}
        transition={{ type: "spring", stiffness: 60, damping: 15 }}
        className="absolute w-[340px] h-[340px] border-[1px] border-azwaj-gold/30 rounded-full"
      >
        {limitedProfiles.map((profile, i) => {
          const angle = (i * 360) / limitedProfiles.length;
          return (
            <div
              key={profile.id}
              className="absolute w-14 h-14 rounded-full border-2 border-azwaj-gold overflow-hidden shadow-lg bg-white"
              style={{ 
                top: "50%", 
                left: "50%", 
                transform: `rotate(${angle}deg) translate(170px) rotate(-${angle}deg) translateX(-50%) translateY(-50%)`,
                transformOrigin: "0 0"
              }}
              onClick={() => onSelect(profile)}
            >
              <img src={profile.profileImg} className="w-full h-full object-cover" alt="" />
            </div>
          );
        })}
      </motion.div>

      {/* مرکزی لوگو (جو ٹچ کرنے پر کارڈز کے پیچھے محسوس ہوگا) */}
      <div className="z-0 opacity-20 pointer-events-none">
        <div className="bg-azwaj-maroon text-azwaj-gold p-8 rounded-full border-4 border-azwaj-gold shadow-2xl font-bold text-xl">
          AZWAJ
        </div>
      </div>
    </div>
  );
};

export default CircularDiscovery;


import React, { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

import { EffectCards } from 'swiper/modules';

import 'swiper/css';

import 'swiper/css/effect-cards';

import { X, Heart, Star, MapPin, Briefcase, CheckCircle } from 'lucide-react';

import { motion } from 'framer-motion';



const Discover = ({ profiles, onProfileClick }) => {

  const [activeProfiles, setActiveProfiles] = useState(profiles.slice(0, 40));



  const handleAction = (type, profile) => {

    console.log(`${type} for ${profile.fullName}`);

    // یہاں آپ Firebase میں لائک/ڈس لائک کا ڈیٹا سیو کر سکتے ہیں

  };



  return (

    <div className="flex flex-col items-center py-4 px-6 overflow-hidden min-h-screen">

      {/* سرکلر نیٹ ورک اینیمیشن (Top Section) */}

      <div className="relative w-full h-[220px] flex items-center justify-center mb-8">

         <div className="absolute w-48 h-48 border border-azwaj-gold/20 rounded-full animate-[spin_30s_linear_infinite]"></div>

         {activeProfiles.slice(0, 8).map((p, i) => (

            <div key={p.id} className="absolute w-12 h-12 rounded-full border-2 border-azwaj-gold overflow-hidden shadow-lg"

                 style={{ transform: `rotate(${i * 45}deg) translate(90px) rotate(-${i * 45}deg)` }}>

              <img src={p.profileImg} className="w-full h-full object-cover" alt="" />

            </div>

         ))}

         <div className="z-10 bg-azwaj-maroon p-4 rounded-full border-2 border-azwaj-gold text-azwaj-gold font-bold text-xs shadow-2xl">

            Azwaj

         </div>

      </div>



      {/* کارڈ اسٹیکنگ (Main Action) */}

      <div className="w-full max-w-[320px] h-[400px] mb-20">

        <Swiper effect={'cards'} grabCursor={true} modules={[EffectCards]} className="h-full">

          {activeProfiles.map((p) => (

            <SwiperSlide key={p.id} className="rounded-3xl shadow-2xl overflow-hidden bg-white border border-gray-100">

              <div className="relative h-full" onClick={() => onProfileClick(p)}>

                <img src={p.profileImg} className="w-full h-full object-cover" alt="" />

                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent text-white">

                  <div className="flex items-center gap-2">

                    <h3 className="text-xl font-bold">{p.fullName}, {p.age}</h3>

                    {p.verificationStatus && <CheckCircle size={16} className="text-azwaj-gold fill-azwaj-gold/20" />}

                  </div>

                  <p className="text-xs flex items-center gap-1 opacity-90"><Briefcase size={12}/> {p.profession}</p>

                  <p className="text-xs flex items-center gap-1 opacity-90"><MapPin size={12}/> {p.city}</p>

                </div>

              </div>

            </SwiperSlide>

          ))}

        </Swiper>

      </div>



      {/* کنٹرول بٹنز (Like/Pass) */}

      <div className="fixed bottom-28 flex items-center gap-6 z-20">

        <button onClick={() => handleAction('pass', {})} className="p-4 bg-white rounded-full shadow-xl text-red-500 border border-gray-100 active:scale-90 transition-transform">

          <X size={28} />

        </button>

        <button onClick={() => handleAction('superlike', {})} className="p-3 bg-white rounded-full shadow-xl text-blue-400 border border-gray-100 active:scale-90 transition-transform">

          <Star size={20} fill="currentColor" />

        </button>

        <button onClick={() => handleAction('like', {})} className="p-4 bg-white rounded-full shadow-xl text-green-500 border border-gray-100 active:scale-90 transition-transform">

          <Heart size={28} fill="currentColor" />

        </button>

      </div>

    </div>

  );

};



export default Discover;


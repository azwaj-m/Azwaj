import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Autoplay, Navigation } from 'swiper/modules';
import { MapPin, ShieldCheck, ChevronRight, Heart } from 'lucide-react';

// Swiper Styles
import 'swiper/css';
import 'swiper/css/effect-cards';

const Home = ({ setSelectedProfile }) => {
  // فرضی ڈیٹا تصاویر کے ساتھ
  const demoProfiles = [
    { id: 1, name: 'Aisha Khan', age: 24, job: 'Doctor', city: 'Lahore', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500' },
    { id: 2, name: 'Sana Ali', age: 26, job: 'Designer', city: 'Karachi', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500' },
    { id: 3, name: 'Maria Nawaz', age: 22, job: 'Engineer', city: 'Islamabad', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500' },
    { id: 4, name: 'Zainab Fatima', age: 25, job: 'Teacher', city: 'Multan', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500' }
  ];

  return (
    <div className="flex flex-col gap-8 pb-28 pt-4">
      
      {/* 1. تھری ڈی سوئپر کارڈز (The Stack) */}
      <div className="px-12 relative h-[400px] flex items-center justify-center">
        <Swiper
          effect={'cards'}
          grabCursor={true}
          centeredSlides={true}
          modules={[EffectCards, Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          cardsEffect={{
            slideShadows: false,
            rotate: true,
            perSlideRotate: 2,
            perSlideOffset: 8,
          }}
          className="w-full max-w-[260px] h-[380px]"
        >
          {demoProfiles.map((p) => (
            <SwiperSlide key={p.id} className="rounded-[45px] bg-white shadow-2xl border-[6px] border-white overflow-hidden">
              <div className="relative h-full w-full" onClick={() => setSelectedProfile(p)}>
                {/* پروفائل تصویر */}
                <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                
                {/* تصویر کے اوپر بیج */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/30">
                  <Heart size={16} className="text-white fill-[#D4AF37]" />
                </div>

                {/* انفارمیشن پینل (بالکل تصویر کی طرح) */}
                <div className="absolute inset-x-0 bottom-0 bg-white p-5 m-2 rounded-[35px] shadow-xl text-center border border-gray-50">
                  <h2 className="text-[#4A0E0E] font-black text-xl tracking-tighter uppercase">{p.name}</h2>
                  
                  <div className="flex flex-col items-center gap-1 mt-1">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                      Age: <span className="text-[#4A0E0E]">{p.age}</span> • Prof: <span className="text-[#4A0E0E]">{p.job}</span>
                    </p>
                    <div className="flex items-center gap-1 text-[9px] font-black text-[#D4AF37] uppercase">
                      <MapPin size={10} /> {p.city}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 bg-[#F5E6D3] text-[#4A0E0E] py-2.5 rounded-2xl text-[9px] font-black uppercase tracking-widest active:scale-95 transition-all">View Profile</button>
                    <button className="flex-1 bg-[#4A0E0E] text-[#D4AF37] py-2.5 rounded-2xl text-[9px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all">Connect</button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 2. ٹاپ ویریفائیڈ میچز (Stories Style) */}
      <div className="px-5">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[#4A0E0E] font-black text-xs uppercase tracking-[0.2em]">Top Verified Matches</h3>
          <div className="text-[9px] font-bold text-[#D4AF37] flex items-center gap-1 uppercase italic">Explore All <ChevronRight size={12} /></div>
        </div>
        
        <div className="flex gap-5 overflow-x-auto no-scrollbar">
          {demoProfiles.map((p) => (
            <div key={p.id} className="flex flex-col items-center gap-2 flex-shrink-0">
              <div className="relative p-1 rounded-full border-2 border-[#D4AF37] shadow-sm">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-0 right-0 bg-[#D4AF37] p-0.5 rounded-full border-2 border-white">
                   <ShieldCheck size={10} className="text-white" />
                </div>
              </div>
              <span className="text-[10px] font-black text-[#4A0E0E] uppercase">{p.name.split(' ')[0]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. ٹرسٹ بیجز */}
      <div className="px-6 flex justify-between">
         <TrustBadge label="100% Verified" sub="Manual Check" />
         <TrustBadge label="Privacy Focused" sub="Top Security" />
         <TrustBadge label="Serious Matches" sub="Life Partners" />
      </div>

    </div>
  );
};

const TrustBadge = ({ label, sub }) => (
  <div className="flex flex-col items-center text-center">
    <div className="bg-[#F5E6D3] p-2 rounded-xl mb-1"><ShieldCheck size={14} className="text-[#4A0E0E]" /></div>
    <h4 className="text-[8px] font-black text-[#4A0E0E] uppercase">{label}</h4>
    <p className="text-[7px] text-gray-400 font-bold">{sub}</p>
  </div>
);

export default Home;

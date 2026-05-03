import React from 'react';
import { MapPin, Briefcase, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
// آپ کے فائل ٹری کے مطابق درست پاتھ
import { useSearchTranslator } from '../hooks/useSearchTranslator';

const Discover = ({ profiles, setSelectedProfile }) => {
  const { t } = useTranslation();
  
  // ہک کو استعمال کرتے ہوئے پروفائلز کا ترجمہ حاصل کرنا
  // یہ خودکار طور پر 'bio' یا 'description' کو ترجمہ کرے گا
  const { translatedResults, isTranslating } = useSearchTranslator(profiles);

  return (
    <div className="p-4 bg-[#FDF5F5] min-h-full animate-in fade-in duration-700">
      
      {/* ہیڈنگ سیکشن */}
      <div className="mb-6">
        <h2 className="text-[#4A0E0E] text-2xl font-black italic uppercase tracking-wider">
          {t('explore_all', 'Explore Matches')}
        </h2>
        <div className="w-20 h-1 bg-[#D4AF37] rounded-full mt-1"></div>
        
        {/* اگر ترجمہ ہو رہا ہو تو ایک چھوٹا سا انڈیکیٹر دکھائیں */}
        {isTranslating ? (
          <p className="text-[#D4AF37] text-[10px] mt-2 font-bold animate-pulse">
            Translating profiles to your language...
          </p>
        ) : (
          <p className="text-gray-500 text-xs mt-2 font-medium">
            {t('search_placeholder', 'Find your perfect match from across the globe')}
          </p>
        )}
      </div>

      {/* پروفائل گرڈ */}
      <div className="grid grid-cols-2 gap-4 pb-20">
        {translatedResults && translatedResults.map((profile) => (
          <div
            key={profile.id}
            className="bg-white rounded-[25px] overflow-hidden shadow-md border border-gray-100 flex flex-col hover:shadow-xl transition-all active:scale-95"
          >
            {/* امیج سیکشن */}
            <div className="relative h-40">
              <img
                src={profile.image || "https://readymadeui.com/profile_2.webp"}
                alt={profile.fullName}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-md p-1.5 rounded-full shadow-sm">
                <Star size={12} className="text-[#D4AF37] fill-[#D4AF37]" />
              </div>
            </div>

            {/* ڈیٹیلز سیکشن */}
            <div className="p-3 flex-1 flex flex-col">
              <h3 className="text-[#4A0E0E] font-black text-sm truncate">
                {profile.fullName}
              </h3>

              <div className="mt-2 space-y-1">
                {/* پیشہ - Static i18n کے ساتھ */}
                <div className="flex items-center gap-1.5 text-gray-500">
                  <Briefcase size={10} className="text-[#D4AF37]" />
                  <span className="text-[10px] font-bold">
                    {t(profile.profession?.toLowerCase(), profile.profession || "Professional")}
                  </span>
                </div>

                {/* لوکیشن اور عمر */}
                <div className="flex items-center gap-1.5 text-gray-500">
                  <MapPin size={10} className="text-[#D4AF37]" />
                  <span className="text-[10px] font-medium">
                    {profile.age} {t('age')}, {t(profile.city?.toLowerCase(), profile.city)}
                  </span>
                </div>

                {/* پروفائل کا مختصر ترجمہ شدہ بائیو (اگر دستیاب ہو) */}
                {profile.displayBio && (
                  <p className="text-[9px] text-gray-400 line-clamp-1 italic mt-1">
                    {profile.displayBio}
                  </p>
                )}
              </div>

              {/* ویو بٹن */}
              <button
                onClick={() => setSelectedProfile(profile)}
                className="mt-4 w-full bg-[#4A0E0E] text-[#D4AF37] py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter shadow-lg active:bg-[#3D1212] transition-colors"
              >
                {t('view_profile', 'View Profile')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Discover;

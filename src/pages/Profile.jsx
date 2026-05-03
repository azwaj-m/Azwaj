import React from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, ArrowLeft } from 'lucide-react';

const Profile = ({ profile, onBack }) => {
  const { t } = useTranslation();
  if (!profile) return null;

  return (
    <div className="fixed inset-0 bg-[#FDFCFB] z-[100] overflow-y-auto pb-20 animate-in slide-in-from-bottom duration-300" dir="rtl">
      <div className="relative h-[45vh] w-full">
        <img src={profile.img} className="w-full h-full object-cover" alt={profile.name} />
        <button onClick={onBack} className="absolute top-6 right-6 bg-white/20 backdrop-blur-md p-3 rounded-2xl border border-white/30 text-white"><ArrowLeft size={24} /></button>
      </div>
      <div className="px-6 -mt-10 relative bg-[#FDFCFB] rounded-t-[50px] pt-8">
        <h2 className="text-3xl font-black text-[#4A0E0E] tracking-tighter mb-2">{profile.name}</h2>
        <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-sm mb-6 uppercase">
          <MapPin size={16} /> {t(profile.cityKey)}, {t(profile.countryKey)}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
             <p className="text-gray-400 text-[10px] uppercase font-bold">{t('age')}</p>
             <p className="text-[#4A0E0E] font-black">{profile.age}</p>
          </div>
          <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
             <p className="text-gray-400 text-[10px] uppercase font-bold">{t('prof')}</p>
             <p className="text-[#4A0E0E] font-black">{t(profile.jobKey)}</p>
          </div>
        </div>
        <button className="w-full bg-[#4A0E0E] text-[#D4AF37] py-5 rounded-[25px] mt-8 font-black text-sm shadow-2xl active:scale-95 transition-all uppercase tracking-[0.2em]">{t('connect')}</button>
      </div>
    </div>
  );
};
export default Profile;

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, MapPin, Calendar, Ruler, GraduationCap, Briefcase, Moon, Users, MessageCircle, Heart, Shield, Info, CheckCircle, Tag, User } from 'lucide-react';

const ProfileDetailModal = ({ profile, onClose, onLike, isPremium, onUpgrade, onStartChat }) => {
  const { t } = useTranslation();
  const [liked, setLiked] = useState(false);

  if (!profile) return null;

  const detailItems = [
    { icon: User, label: t('full_name'), value: profile.fullName },
    { icon: Tag, label: t('nick_name'), value: profile.nickName || t('not_available') },
    { icon: Calendar, label: t('age_label'), value: profile.age || profile.dob },
    { icon: Briefcase, label: t('prof'), value: t(profile.jobKey || 'not_available') },
    { icon: MapPin, label: t('city'), value: t(profile.cityKey || 'not_available') },
    { icon: Moon, label: t('religion'), value: t(profile.religionKey || 'islam') },
  ];

  return (
    <div className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center bg-black/90 backdrop-blur-md p-0 sm:p-4">
      <div className="w-full max-w-md bg-[#FDF5F5] h-[92vh] flex flex-col overflow-hidden rounded-t-[45px] border-t-4 border-[#D4AF37]/20">
        <header className="bg-gradient-to-l from-[#4A0E0E] to-[#631212] p-6 flex items-center justify-between">
          <button onClick={onClose} className="text-white bg-white/10 p-2 rounded-full"><X size={24} /></button>
          <h2 className="text-lg font-bold text-[#D4AF37] font-serif">{t('profile_card')}</h2>
          <div className="w-10"></div>
        </header>
        <div className="flex-1 overflow-y-auto px-6 pt-6 pb-40 space-y-6" dir={t('dir')}>
          <div className="relative w-full aspect-[4/5] bg-[#3D1212] rounded-[50px] border-8 border-white overflow-hidden shadow-2xl">
            <img src={profile.img} className="w-full h-full object-cover" alt={profile.name} />
          </div>
          <div className="bg-white p-7 rounded-[40px] shadow-sm border border-red-50">
            <div className="grid grid-cols-2 gap-4">
              {detailItems.map((item, idx) => (
                <div key={idx} className="bg-[#FDF5F5] p-4 rounded-3xl flex flex-col items-end">
                  <div className="flex items-center gap-2 mb-1 opacity-50">
                    <span className="text-[9px] font-bold text-gray-500">{item.label}</span>
                    <item.icon size={12} className="text-[#4A0E0E]" />
                  </div>
                  <p className="text-[11px] font-black text-[#4A0E0E] text-right">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8 flex gap-4 z-[100] bg-white">
          <button onClick={() => isPremium ? onStartChat(profile) : alert(t('upgrade_msg'))} className="flex-[4] h-16 bg-[#4A0E0E] text-[#D4AF37] rounded-3xl font-black flex items-center justify-center gap-3">
            <MessageCircle size={22} /> {t('start_chat')}
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProfileDetailModal;

import React from 'react';
import { useTranslation } from 'react-i18next';
import { User, ShieldCheck, Lock, Bell, UserX, HelpCircle, Info, LogOut, ChevronRight } from 'lucide-react';

const ProfileManager = ({ onEditProfile, setCurrentView }) => {
  const { t } = useTranslation();
  const sections = [
    { id: 'personal', title: t('personal_info'), subtitle: t('update_details'), icon: <User size={20} />, action: onEditProfile },
    { id: 'privacy', title: t('privacy_settings'), subtitle: t('manage_visibility'), icon: <Lock size={20} />, action: () => {} },
    { id: 'help', title: t('help_center'), subtitle: t('faqs'), icon: <HelpCircle size={20} />, action: () => setCurrentView('help') }
  ];

  return (
    <div className="p-4 pb-24" dir={t('dir')}>
      <div className="bg-white/50 rounded-[35px] p-2 mb-6">
        {sections.map(item => (
          <div key={item.id} onClick={item.action} className="bg-white p-4 rounded-2xl flex items-center justify-between mb-3 shadow-sm cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="bg-[#FDF5F5] p-3 rounded-xl text-[#4A0E0E]">{item.icon}</div>
              <div>
                <h4 className="text-[#4A0E0E] font-black text-sm">{item.title}</h4>
                <p className="text-gray-400 text-[10px] font-medium">{item.subtitle}</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-gray-300" />
          </div>
        ))}
      </div>
      <button onClick={() => window.location.reload()} className="w-full flex items-center justify-center gap-2 p-4 text-red-600 font-black uppercase text-xs">
        <LogOut size={16} /> {t('logout')}
      </button>
    </div>
  );
};
export default ProfileManager;

import { useTranslation } from 'react-i18next';
import { allLanguages } from '../utils/languages';

const ProfileSettings = () => {
  const { i18n, t } = useTranslation();

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-black text-[#4A0E0E]">{t('settings', 'Settings')}</h2>
      
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
          {t('app_language', 'App Language')}
        </label>
        
        <div className="mt-3 grid grid-cols-1 gap-2">
          {allLanguages.slice(0, 8).map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                i18n.changeLanguage(lang.code);
                document.documentElement.dir = i18n.dir(lang.code);
              }}
              className={`flex justify-between items-center p-3 rounded-xl border transition-all ${
                i18n.language === lang.code 
                ? 'border-[#D4AF37] bg-[#FDF5F5] text-[#4A0E0E]' 
                : 'border-gray-100 text-gray-500'
              }`}
            >
              <span className="text-sm font-bold">{lang.native}</span>
              {i18n.language === lang.code && <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ProfileSettings;

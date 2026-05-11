import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: { welcome: "Welcome" } },
      ur: { translation: { welcome: "خوش آمدید" } }
    },
    fallbackLng: 'ur',
    debug: false,
    interpolation: { escapeValue: false }
  });

if (typeof i18n.dir !== 'function') {
  i18n.dir = (lng) => {
    const currentLang = lng || i18n.language || 'ur';
    return (currentLang === 'ur' || currentLang === 'ar') ? 'rtl' : 'ltr';
  };
}

export default i18n;

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// تمام JSON فائلوں کو خودکار طور پر لوڈ کرنے کے لیے 'import.meta.glob' کا استعمال
const modules = import.meta.glob('./locales/*.json', { eager: true });

const resources = {};

// فائلوں کو i18next کے فارمیٹ میں ترتیب دینا
Object.keys(modules).forEach((path) => {
  // فائل کا نام نکالنا (مثلاً './locales/ur.json' سے 'ur' نکالنا)
  const langCode = path.split('/').pop().replace('.json', '');
  resources[langCode] = {
    translation: modules[path].default || modules[path]
  };
});

i18n
  .use(LanguageDetector) // صارف کی ترجیحی زبان خود پہچاننے کے لیے
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en', // اگر زبان نہ ملے تو انگلش دکھائے
    debug: false,
    interpolation: {
      escapeValue: false, // React خود XSS سے بچاتا ہے
    },
    react: {
      useSuspense: false // ٹرمکس اور موبائل براؤزر پر بہتر کارکردگی کے لیے
    }
  });

// جب زبان بدلے تو پیج کی سمت (RTL/LTR) خودکار طور پر بدلنا
i18n.on('languageChanged', (lng) => {
  const dir = i18n.dir(lng);
  document.documentElement.dir = dir;
  document.documentElement.lang = lng;
});

export default i18n;

import { useTranslation } from 'react-i18next';

export const useSearchTranslator = () => {
  const { t } = useTranslation();

  // ہر قسم کے ٹیکسٹ کو صاف کرنے کا فنکشن (اعراب، اسپیشل کریکٹرز اور فالتو اسپیسز کا خاتمہ)
  const normalizeText = (text) => {
    if (!text) return '';
    return text
      .toString()
      .toLowerCase()
      // اردو اعراب اور ہندی ڈائیکریٹکس کو ہٹانے کے لیے یونی کوڈ فلٹر
      .replace(/[\u064B-\u065F\u0670\u093C]/g, '') 
      .trim();
  };

  // ملٹی لینگویج سرچ فلٹر
  const matchProfile = (profile, searchQuery) => {
    const query = normalizeText(searchQuery);
    if (!query) return true;

    // پروفائل کے بنیادی ڈیٹا کو نارملائز کرنا
    const name = normalizeText(profile.name);
    const age = normalizeText(profile.age);

    // لوکلائزڈ فیلڈز (شہر، ملک اور پیشے کا موجودہ زبان میں ترجمہ)
    const cityLocal = normalizeText(t(profile.cityKey));
    const countryLocal = normalizeText(t(profile.countryKey));
    const jobLocal = normalizeText(t(profile.jobKey));

    // اصل ڈیٹا کیز (تاکہ اگر کوئی براہ راست انگلش کی ورڈ جیسے 'lahore' یا 'doctor' سرچ کرے تو بھی کام کرے)
    const cityKey = normalizeText(profile.cityKey);
    const countryKey = normalizeText(profile.countryKey);
    const jobKey = normalizeText(profile.jobKey);

    // سرچ انڈیکس: ہر وہ ممکنہ لفظ جہاں سے میچنگ کی جا سکتی ہے
    return (
      name.includes(query) ||
      age.includes(query) ||
      cityLocal.includes(query) ||
      countryLocal.includes(query) ||
      jobLocal.includes(query) ||
      cityKey.includes(query) ||
      countryKey.includes(query) ||
      jobKey.includes(query)
    );
  };

  return { matchProfile, normalizeText };
};

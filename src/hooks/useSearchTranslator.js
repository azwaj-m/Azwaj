import { useState, useEffect } from 'react';
// آپ کے فائل ٹری کے مطابق درست پاتھ: src/utils/translator.js
import { translateBulk } from '../utils/translator';
import i18n from 'i18next';

/**
 * سرچ رزلٹس کو خودکار طور پر ترجمہ کرنے والا ہک
 * @param {Array} results - ڈیٹا بیس سے آنے والے پروفائلز کی لسٹ
 * @returns {Object} - ترجمہ شدہ رزلٹس اور لوڈنگ اسٹیٹ
 */
export const useSearchTranslator = (results) => {
  const [translatedResults, setTranslatedResults] = useState(results);
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    const processTranslations = async () => {
      // اگر رزلٹس خالی ہوں یا زبان انگلش ہو تو ترجمہ نہ کریں
      if (!results || results.length === 0 || i18n.language === 'en') {
        setTranslatedResults(results);
        return;
      }

      setIsTranslating(true);

      try {
        // 1. وہ فیلڈز نکالیں جن کا ترجمہ ضروری ہے (مثلاً bio، city، یا profession)
        // یاد رہے کہ مذہب (Religion) جیسی چیزیں i18n.js کے ذریعے ہینڈل ہونی چاہئیں
        const textsToTranslate = results.map(user => user.bio || "");

        // 2. بلک ٹرانسلیٹر کو کال کریں (src/utils/translator.js سے)
        const translatedBios = await translateBulk(textsToTranslate, i18n.language);

        // 3. اصل ڈیٹا میں ترجمہ شدہ ٹیکسٹ شامل کریں
        const finalData = results.map((user, index) => ({
          ...user,
          // ایک نیا فیلڈ 'displayBio' بنائیں تاکہ اصل ڈیٹا محفوظ رہے
          displayBio: translatedBios[index] || user.bio
        }));

        setTranslatedResults(finalData);
      } catch (error) {
        console.error("Hook Translation Error:", error);
        setTranslatedResults(results);
      } finally {
        setIsTranslating(false);
      }
    };

    processTranslations();
  }, [results, i18n.language]);

  return { translatedResults, isTranslating };
};

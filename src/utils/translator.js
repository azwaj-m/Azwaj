// src/utils/translator.js

// ایک سادہ میموری کیشے (Cache) تاکہ بار بار ایک ہی چیز ترجمہ نہ ہو
const translationCache = {};

/**
 * یکمشت ڈیٹا کو ترجمہ کرنے والا فنکشن (کیشنگ کے ساتھ)
 * @param {Array} items - ڈیٹا کی لسٹ (مثلاً پروفائلز کے بائیو)
 * @param {string} targetLang - جس زبان میں ترجمہ کرنا ہے (مثلاً 'ur')
 * @returns {Promise<Array>} - ترجمہ شدہ لسٹ
 */
export const translateBulk = async (items, targetLang) => {
  // اگر کوئی ڈیٹا نہ ہو یا زبان انگلش ہو تو اصل ڈیٹا واپس کر دیں
  if (!items || items.length === 0 || targetLang === 'en') return items;

  // 1. کیشے چیک کریں: کیا یہ لسٹ پہلے ہی اس زبان میں ترجمہ ہو چکی ہے؟
  const cacheKey = `${targetLang}-${items.join('|')}`;
  if (translationCache[cacheKey]) {
    console.log("🚀 Cache Hit: Returning saved translation");
    return translationCache[cacheKey];
  }

  // 2. ڈیٹا کو جوڑنا تاکہ ایک ہی ریکویسٹ جائے
  const combinedText = items.join(" ||| ");

  try {
    // گوگل فری API کا استعمال
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(combinedText)}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();

    // 3. گوگل سے واپس آنے والے ڈیٹا کو صاف کر کے دوبارہ لسٹ بنانا
    const translatedFull = data[0].map(x => x[0]).join("");
    const translatedResults = translatedFull.split(" ||| ").map(item => item.trim());

    // 4. مستقبل کے لیے کیشے میں محفوظ کریں
    translationCache[cacheKey] = translatedResults;

    return translatedResults;

  } catch (error) {
    console.error("🛑 Bulk Translation Error:", error);
    return items; // غلطی کی صورت میں اصل انگلش ڈیٹا دکھا دیں تاکہ ایپ کریش نہ ہو
  }
};

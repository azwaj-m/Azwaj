// AI Content Filter (Basic implementation for Urdu/English sensitive keywords)
const bannedWords = ['بدتمیز', 'گالی', 'fake', 'scam', 'abuse']; 

export const checkContentAI = (text) => {
  // یہ فنکشن بعد میں اصلی AI API (جیسے Gemini API) سے جوڑا جا سکتا ہے
  const lowerText = text.toLowerCase();
  const isSafe = !bannedWords.some(word => lowerText.includes(word));
  return isSafe;
};

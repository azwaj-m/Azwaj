const sensitivePatterns = [/badword/i, /[a-z0-9]+@[a-z]+\.[a-z]{2,}/, /(\+92|0)[0-9]{10}/];
export const checkContentAI = (text) => {
  if (!text) return true;
  return !sensitivePatterns.some(pattern => pattern.test(text));
};
export const sanitizeInput = (text) => text.replace(/[<>]/g, "");

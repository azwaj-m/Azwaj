
import { db } from './firebase';

import { doc, getDoc } from 'firebase/firestore';



// 1. محفوظ چیٹ آئی ڈی جنریٹر

export const getSecureChatId = (uid1, uid2) => {

  return [uid1, uid2].sort().join('_');

};



// 2. مواد کی فلٹرنگ (Bad words / Contact prevention)

const BANNED_KEYWORDS = ['spam', 'abuse', 'contact', '@', '+92', '03'];

export const sanitizeMessage = (text) => {

  let cleanText = text;

  BANNED_KEYWORDS.forEach(word => {

    const regex = new RegExp(word, 'gi');

    cleanText = cleanText.replace(regex, '***');

  });

  return cleanText;

};


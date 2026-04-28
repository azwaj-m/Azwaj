
import { db } from './firebase';

import { doc, getDoc, setDoc } from 'firebase/firestore';



// 1. ڈیٹا پاتھ سیکیورٹی (Chat ID Generator)

export const getSecureChatId = (uid1, uid2) => {

  return [uid1, uid2].sort().join('_');

};



// 2. ایکسیس کنٹرول (Frontend check before calling Firebase)

export const validateAccess = async (userId) => {

  const userDoc = await getDoc(doc(db, "users", userId));

  return userDoc.exists() && userDoc.data().isBlocked !== true;

};



// 3. مواد کی فلٹرنگ (Bad words prevention)

const BANNED_KEYWORDS = ['spam', 'abuse', 'contact', '@', '+92'];

export const sanitizeMessage = (text) => {

  let cleanText = text;

  BANNED_KEYWORDS.forEach(word => {

    const regex = new RegExp(word, 'gi');

    cleanText = cleanText.replace(regex, '***');

  });

  return cleanText;

};


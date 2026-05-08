// سادہ لوکل اسٹوریج کو سیکیور بنانے کے لیے بیس ۶۴ یا انکرپشن لاجک
const SECRET_KEY = "Azwaj_Secure_Token_Key_2026";

// ڈیٹا کو انکوڈ کرنے کا طریقہ کار (بیسک پروٹیکشن)
const encrypt = (txt) => {
  try {
    return btoa(encodeURIComponent(txt).replace(/%([0-9A-F]{2})/g, (match, p1) => {
      return String.fromCharCode('0x' + p1);
    }));
  } catch (e) {
    return txt;
  }
};

// ڈیٹا کو واپس ڈی کوڈ کرنے کا طریقہ کار
const decrypt = (str) => {
  try {
    return decodeURIComponent(atob(str).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  } catch (e) {
    return str;
  }
};

export const secureStorage = {
  setItem: (key, value) => {
    const encryptedKey = encrypt(key);
    const encryptedValue = encrypt(JSON.stringify(value));
    localStorage.setItem(encryptedKey, encryptedValue);
  },
  
  getItem: (key) => {
    try {
      const encryptedKey = encrypt(key);
      const encryptedValue = localStorage.getItem(encryptedKey);
      if (!encryptedValue) return null;
      return JSON.parse(decrypt(encryptedValue));
    } catch (e) {
      return null;
    }
  },
  
  removeItem: (key) => {
    const encryptedKey = encrypt(key);
    localStorage.removeItem(encryptedKey);
  },
  
  clear: () => {
    localStorage.clear();
  }
};

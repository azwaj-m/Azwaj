const { translate } = require('@vitalets/google-translate-api');
const fs = require('fs');
const path = require('path');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const masterEnglish = {
  marriage: "Marriage",
  search_placeholder: "Search by country, name, age...",
  view_profile: "View Profile",
  connect: "Connect",
  top_matches: "Top Verified Matches",
  explore_all: "Explore All",
  age: "Age",
  prof: "Profession",
  verified_label: "Verified",
  verified_sub: "100% Secure",
  start_chat: "Start Chat",
  upgrade_msg: "Please upgrade to Premium",
  logout: "Logout",
  dir: "ltr"
};

// باقی ماندہ زبانوں کی لسٹ
const targetLanguages = ['tr', 'fr', 'es', 'hi', 'bn', 'id', 'ru', 'zh', 'de', 'it', 'pt', 'ja', 'ko']; 

const localesDir = path.join(__dirname, 'src', 'locales');

async function startTranslation() {
  console.log("🚀 Anti-Block Mode: ON (7-second interval)");

  for (const lang of targetLanguages) {
    const filePath = path.join(localesDir, `${lang}.json`);
    
    if (fs.existsSync(filePath)) {
      console.log(`⏩ Skipping ${lang} (Already exists)`);
      continue;
    }

    const translatedData = {};
    console.log(`\n🌍 Translating to ${lang}...`);
    
    for (const [key, value] of Object.entries(masterEnglish)) {
      try {
        if (key === 'dir') {
          translatedData[key] = (lang === 'ur' || lang === 'ar') ? 'rtl' : 'ltr';
          continue;
        }

        // آپ کی فرمائش کے مطابق 7 سیکنڈ کا وقفہ
        await sleep(7000); 
        
        const res = await translate(value, { to: lang });
        translatedData[key] = res.text;
        console.log(`   ✅ ${key}: ${res.text}`);
      } catch (err) {
        console.error(`   🛑 Security break! Waiting 60 seconds...`);
        await sleep(60000); // 1 منٹ کا لمبا وقفہ تاکہ آئی پی صاف ہو جائے
        translatedData[key] = value; 
      }
    }

    fs.writeFileSync(filePath, JSON.stringify(translatedData, null, 2));
    console.log(`💾 Done: ${lang}.json`);
    
    // زبان بدلنے پر 20 سیکنڈ کا وقفہ
    console.log("⏳ Taking a 20-second breather...");
    await sleep(20000);
  }
  console.log("\n✨ Mission Accomplished! All languages are ready.");
}

startTranslation();

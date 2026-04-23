import React, { useState } from 'react';
import { db, auth } from '../utils/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { ShieldAlert, Eye, EyeOff, Save } from 'lucide-react';

const ProfileSettings = ({ userProfile, lang = 'ur' }) => {
  const [showWarning, setShowWarning] = useState(null);
  const [displayName, setDisplayName] = useState(userProfile.dn || "");
  const [privacy, setPrivacy] = useState(userProfile.p || { n: 0, ph: 0, ad: 0 });

  const warnings = {
    ur: "انتباہ! اسے آن کرنے سے آپ کی اصل معلومات تمام صارفین دیکھ سکیں گے۔ کیا آپ جاری رکھنا چاہتے ہیں؟",
    en: "Warning! Enabling this will make your personal info visible to all users. Continue?"
  };

  const handleToggle = (field) => {
    const currentStatus = privacy[field];
    if (currentStatus === 0) {
      setShowWarning(field);
    } else {
      updatePrivacy(field, 0);
    }
  };

  const updatePrivacy = async (field, value) => {
    const profileRef = doc(db, "profiles", auth.currentUser.uid);
    const newPrivacy = { ...privacy, [field]: value };
    try {
      await updateDoc(profileRef, { p: newPrivacy });
      setPrivacy(newPrivacy);
      setShowWarning(null);
    } catch (e) { alert("Error updating privacy"); }
  };

  const saveDisplayName = async () => {
    const profileRef = doc(db, "profiles", auth.currentUser.uid);
    await updateDoc(profileRef, { dn: displayName });
    alert("نام محفوظ ہو گیا");
  };

  return (
    <div className="p-8 pt-12">
      <h2 className="text-2xl font-black text-[#4A0E0E] mb-8 flex items-center gap-2 italic">
        <ShieldAlert className="text-[#D4AF37]" /> سیکیورٹی سینٹر
      </h2>

      <div className="space-y-6">
        {/* Optional Name */}
        <div className="bg-gray-50 p-5 rounded-[25px] border border-gray-100">
          <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">آپشنل ڈسپلے نام</label>
          <div className="flex gap-2">
            <input 
              value={displayName} 
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="مثلاً: مسافر" 
              className="flex-1 p-3 rounded-xl border-none outline-none text-sm font-bold bg-white shadow-inner" 
            />
            <button onClick={saveDisplayName} className="bg-[#4A0E0E] text-[#D4AF37] p-3 rounded-xl"><Save size={20}/></button>
          </div>
        </div>

        {/* Privacy Toggles */}
        {[
          { label: 'اصل نام دکھائیں', key: 'n' },
          { label: 'فون نمبر دکھائیں', key: 'ph' },
          { label: 'پتہ دکھائیں', key: 'ad' }
        ].map((item) => (
          <div key={item.key} className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl">
            <span className="text-sm font-bold text-[#4A0E0E]">{item.label}</span>
            <button 
              onClick={() => handleToggle(item.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black transition-all ${privacy[item.key] ? 'bg-green-100 text-green-700' : 'bg-[#4A0E0E] text-[#D4AF37]'}`}
            >
              {privacy[item.key] ? <Eye size={14}/> : <EyeOff size={14}/>}
              {privacy[item.key] ? 'ظاہر ہے' : 'پوشیدہ'}
            </button>
          </div>
        ))}
      </div>

      {showWarning && (
        <div className="fixed inset-0 bg-[#4A0E0E]/90 z-[300] flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-[40px] text-center shadow-2xl">
            <ShieldAlert size={40} className="text-red-600 mx-auto mb-4 animate-bounce" />
            <p className="font-bold text-[#4A0E0E] mb-8">{warnings[lang]}</p>
            <div className="flex gap-3">
              <button onClick={() => setShowWarning(null)} className="flex-1 py-4 bg-gray-100 rounded-2xl font-bold text-sm">منسوخ</button>
              <button onClick={() => updatePrivacy(showWarning, 1)} className="flex-1 py-4 bg-red-600 text-white rounded-2xl font-bold text-sm shadow-lg">جی ہاں، آن کریں</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSettings;

import React, { useState } from 'react';
import { ArrowRight, ShieldOff, UserX, Unlock, AlertCircle } from 'lucide-react';

const BlockedProfiles = ({ onBack }) => {
  // فرضی ڈیٹا (آپ اسے بعد میں اپنی API سے جوڑ سکتے ہیں)
  const [blockedList, setBlockedList] = useState([
    { id: 1, name: "عاصم خان", city: "کراچی", date: "20 اپریل 2026", img: "https://via.placeholder.com/150" },
    { id: 2, name: "نامعلوم ممبر", city: "لاہور", date: "15 اپریل 2026", img: "https://via.placeholder.com/150" }
  ]);

  const handleUnblock = (id, name) => {
    if (window.confirm(`کیا آپ ${name} کو ان بلاک کرنا چاہتے ہیں؟`)) {
      setBlockedList(blockedList.filter(user => user.id !== id));
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-right duration-500 bg-[#FDF5F5] min-h-screen pb-20 text-right" dir="rtl">
      {/* ہیڈر */}
      <div className="bg-[#4A0E0E] p-8 rounded-b-[50px] shadow-xl text-white relative overflow-hidden">
        <button onClick={onBack} className="mb-4 bg-white/10 p-2 rounded-full">
          <ArrowRight size={20} />
        </button>
        <div className="flex items-center justify-between">
          <ShieldOff size={40} className="text-[#D4AF37]" />
          <div>
            <h1 className="text-3xl font-black text-[#D4AF37]">بلاک لسٹ</h1>
            <p className="text-white/60 text-xs font-medium">پروفائلز جنہیں آپ نے بلاک کیا ہے</p>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-6">
        {blockedList.length > 0 ? (
          <div className="space-y-4">
            {blockedList.map((user) => (
              <div key={user.id} className="bg-white p-4 rounded-[30px] shadow-sm border border-red-50 flex items-center gap-4 transition-all hover:border-[#D4AF37]/30">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-100 flex-shrink-0">
                  <img src={user.img} alt={user.name} className="w-full h-full object-cover grayscale" />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-bold text-[#4A0E0E] text-md">{user.name}</h3>
                  <div className="flex items-center justify-end gap-2 text-[10px] text-gray-400 font-medium">
                    <span>{user.city}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span>بلاک کیا گیا: {user.date}</span>
                  </div>
                </div>

                <button 
                  onClick={() => handleUnblock(user.id, user.name)}
                  className="bg-[#FDF5F5] p-3 rounded-2xl text-red-500 hover:bg-red-50 transition-colors"
                >
                  <Unlock size={20} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-red-50 text-center flex flex-col items-center">
            <div className="bg-gray-50 p-6 rounded-full mb-4">
              <UserX size={48} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-black text-[#4A0E0E]">کوئی بلاک پروفائل نہیں</h3>
            <p className="text-xs text-gray-400 mt-2 font-medium leading-relaxed">آپ کی بلاک لسٹ اس وقت خالی ہے۔</p>
          </div>
        )}

        {/* معلوماتی الرٹ */}
        <div className="mt-8 bg-amber-50 p-5 rounded-[30px] border border-amber-200 flex items-start gap-4">
          <AlertCircle className="text-amber-600 flex-shrink-0" size={20} />
          <p className="text-[11px] text-amber-800 font-medium leading-relaxed">
            کسی پروفائل کو ان بلاک کرنے کے بعد وہ دوبارہ آپ کو پیغامات بھیج سکیں گے اور آپ کی پروفائل دیکھ سکیں گے۔
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlockedProfiles;

import React from 'react';
import { X, Lock, MessageCircle, DollarSign } from 'lucide-react';

const ProfileDetail = ({ profile, currentUser, onClose, onStartChat }) => {
  const isPremium = currentUser?.isPremium || false;

  return (
    <div className="fixed inset-0 z-[600] bg-black/90 backdrop-blur-xl flex flex-col">
      <button onClick={onClose} className="absolute top-6 right-6 text-white bg-white/20 p-3 rounded-full"><X /></button>
      
      <div className="h-1/3 relative">
        <img src={profile.img || 'https://via.placeholder.com/400'} className="w-full h-full object-cover" />
      </div>

      <div className="flex-1 bg-white rounded-t-[50px] -mt-10 p-8 space-y-6 overflow-y-auto">
        <h2 className="text-3xl font-black text-[#4A0E0E]">{profile.dn || "صارف"}</h2>
        <p className="text-gray-500 font-bold">{profile.religion} ({profile.sect}) • {profile.age} سال</p>
        
        <div className="bg-[#4A0E0E]/5 p-6 rounded-3xl">
           <p className="text-xs font-bold text-[#4A0E0E] mb-2 uppercase italic">تعارف</p>
           <p className="text-sm leading-relaxed text-gray-700">{profile.bio || 'معلومات دستیاب نہیں'}</p>
        </div>

        {isPremium ? (
          <button onClick={() => onStartChat(profile.uid)} className="w-full bg-green-600 text-white p-5 rounded-2xl font-black flex items-center justify-center gap-3">
            <MessageCircle /> براہ راست بات چیت شروع کریں
          </button>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-2xl text-[10px] text-yellow-800 font-bold">
               رابطہ نمبر اور بات چیت کے لیے 500 روپے کی ادائیگی لازمی ہے۔
            </div>
            <button className="w-full bg-[#D4AF37] text-[#4A0E0E] p-5 rounded-2xl font-black flex items-center justify-center gap-3 shadow-lg">
              <DollarSign /> ممبر شپ حاصل کریں
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileDetail;

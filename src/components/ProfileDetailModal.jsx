import React, { useState, useEffect } from 'react';
import { X, MessageCircle, MapPin, Briefcase, GraduationCap, Calendar, Sparkles } from 'lucide-react';
import VerifiedBadge from './VerifiedBadge';

const ProfileDetailModal = ({ profile, onClose, onStartChat }) => {
  const [domVisible, setDomVisible] = useState(true);

  // اگر کوئی نئی پروفائل پاس ہو تو دوبارہ ایکٹیو کریں
  useEffect(() => {
    if (profile) setDomVisible(true);
  }, [profile]);

  if (!profile || !domVisible) return null;

  // تمام اوورلیز کو زبردستی بند کرنے کا ماسٹر پلان
  const forceCloseModal = () => {
    setDomVisible(false); // 1. لوکل کمپوننٹ کو فوری کچل دیں
    if (onClose) {
      onClose(); // 2. پیرنٹ کنٹرولر کو مطلع کریں
    }
  };

  const handleStartChatAction = () => {
    if (onStartChat) {
      onStartChat(profile);
    }
    // فوراً اسکرین صاف کریں
    forceCloseModal();
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-[99999] flex items-end justify-center p-4 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#FFFDF9] w-full max-w-md rounded-[35px] max-h-[85vh] overflow-y-auto shadow-2xl flex flex-col border border-[#D4AF37]/20 no-scrollbar relative animate-in slide-in-from-bottom duration-300">

        {/* 📸 ہیڈر تصویر */}
        <div className="relative h-64 bg-[#F5E6D3]/30 p-2 rounded-t-[35px]">
          <div className="w-full h-full rounded-[28px] overflow-hidden relative shadow-inner">
            <img
              src={profile.photoURL || profile.img || 'https://via.placeholder.com/400'}
              alt={profile.fullName || profile.name}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* بند کرنے کا کراس بٹن */}
          <button
            type="button"
            onClick={forceCloseModal}
            className="absolute top-6 left-6 p-2.5 bg-[#4A0E0E]/90 hover:bg-[#4A0E0E] border border-[#D4AF37]/30 text-[#D4AF37] rounded-full shadow-lg transition-all active:scale-90 z-50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 📝 تفصیلات کا ایریا */}
        <div className="px-6 pb-8 pt-2 text-right" dir="rtl">
          <div className="flex items-center justify-start gap-2 mb-1">
            <h2 className="text-xl font-black text-[#4A0E0E] tracking-tight">{profile.fullName || profile.name || 'معزز صارف'}</h2>
            {(profile.isVerified || profile.verificationStatus === 'verified') && <VerifiedBadge status="verified" />}
          </div>

          <div className="flex items-center justify-start gap-1.5 text-gray-400 text-[11px] font-bold">
            <span>{profile.gender || 'برائے رشتہ'}</span>
            <span>•</span>
            <span className="flex items-center gap-1">{profile.age || 'N/A'} سال <Calendar size={11} className="text-[#D4AF37]" /></span>
          </div>

          <div className="w-full border-t border-gray-100 my-4" />

          {/* بنیادی انفارمیشن گریڈ */}
          <div className="grid grid-cols-1 gap-2.5">
            <div className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-xl shadow-xs">
              <MapPin className="w-4 h-4 text-[#4A0E0E]" />
              <div className="text-right">
                <p className="text-[9px] text-gray-400 font-bold">موجودہ شہر</p>
                <p className="text-xs font-black text-[#4A0E0E]">{profile.city || 'پاکستان'}</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-xl shadow-xs">
              <Briefcase className="w-4 h-4 text-[#4A0E0E]" />
              <div className="text-right">
                <p className="text-[9px] text-gray-400 font-bold">پیشہ / ملازمت</p>
                <p className="text-xs font-black text-[#4A0E0E]">{profile.profession || profile.jobKey || 'ملازمت'}</p>
              </div>
            </div>
          </div>

          {/* میرے بارے میں تعارف */}
          <div className="space-y-2 mt-4">
            <h4 className="font-black text-[#4A0E0E] text-xs flex items-center justify-start gap-1">
              मेरे बारे में <Sparkles size={11} className="text-[#D4AF37]" />
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed bg-[#F5E6D3]/20 border border-[#D4AF37]/10 p-3.5 rounded-2xl font-bold">
              {profile.about || 'صارف نے ابھی کوئی ذاتی تفصیل شیئر نہیں کی ہے۔'}
            </p>
          </div>

          {/* 👑 شاہی رابطہ بٹن */}
          <button
            type="button"
            onClick={handleStartChatAction}
            className="w-full h-12 mt-6 flex items-center justify-center gap-2 bg-gradient-to-r from-[#4A0E0E] to-[#3D0A0A] text-[#D4AF37] rounded-xl text-xs font-black shadow-xl border border-[#D4AF37]/20 active:scale-98 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            رابطہ قائم کریں (میسج بھیجیں)
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProfileDetailModal;

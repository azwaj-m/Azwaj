import React from 'react';
import { 
  X, MapPin, Calendar, Ruler, GraduationCap, Briefcase, 
  Moon, Users, Star, ThumbsUp, Heart, Shield, Home, Tag, 
  AlignRight, Info, MessageCircle
} from 'lucide-react';

const ProfileDetailModal = ({ profile, onClose }) => {
  // 15 تفصیلات جو فارم کے مطابق ترتیب دی گئی ہیں
  const detailItems = [
    { icon: User, label: "نام", value: profile.fullName },
    { icon: Tag, label: "عرفیت", value: profile.nickName || "دستیاب نہیں" },
    { icon: Calendar, label: "تاریخ پیدائش", value: profile.dob || "1995-05-20" },
    { icon: Ruler, label: "قد", value: profile.height || "5'8\"" },
    { icon: MapPin, label: "شہر", value: profile.city },
    { icon: Users, label: "فیملی", value: profile.family || "2 بہنیں، 1 بھائی" },
    { icon: Home, label: "پتہ", value: profile.Address || "لاہور، پاکستان" },
    { icon: GraduationCap, label: "تعلیم", value: profile.education || "Master of Arts" },
    { icon: Briefcase, label: "پیشہ", value: profile.profession || profile.job || "ڈاکٹر" },
    { icon: Moon, label: "مذہب", value: profile.religion || "اسلام" },
    { icon: Moon, label: "مسلک", value: profile.sect || "سنی" },
    { icon: Star, label: "مشغلے", value: profile.hobbies || "مطالعہ" },
    { icon: ThumbsUp, label: "پسند/ناپسند", value: profile.likesDislikes || "سادہ کھانا" },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm transition-all">
      <div className="w-full max-w-md bg-[#2D0A0A] h-screen sm:h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300">
        
        {/* --- ہیڈر (Header) --- */}
        <header className="bg-gradient-to-l from-[#4A0E0E] to-[#631212] p-6 rounded-b-[40px] shadow-lg flex items-center justify-between sticky top-0 z-50">
          <button onClick={onClose} className="text-white opacity-80 p-2 hover:bg-white/10 rounded-full transition-all">
            <X size={24} />
          </button>
          <h2 className="text-xl font-bold text-[#D4AF37]">پروفائل کی تفصیل</h2>
          <div className="w-10"></div>
        </header>

        {/* --- مین کنٹینٹ (Main Content) --- */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-6 pt-6 pb-32 space-y-6" dir="rtl">
          
          {/* پروفائل فوٹو سیکشن */}
          <div className="relative flex justify-center">
            <div className="relative w-56 h-72 bg-[#3D1212] rounded-[30px] border-2 border-[#D4AF37] overflow-hidden shadow-2xl">
              <img src={profile.profileImg} className="w-full h-full object-cover" alt={profile.fullName} />
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-[10px] text-white font-bold uppercase tracking-widest">آن لائن</span>
                </div>
              </div>
            </div>
          </div>

          {/* تعارف (Intro) */}
          <div className="bg-white p-6 rounded-[35px] shadow-xl border border-red-50">
            <h3 className="text-[#4A0E0E] font-black text-sm mb-3 flex items-center justify-end gap-2 border-b border-red-50 pb-2">
              تعارف <AlignRight size={16} />
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed text-right">
              {profile.intro || "میں ایک ذمہ دار اور سلجھی ہوئی انسان ہوں، اپنے پیشے اور روایات کا احترام کرتی ہوں۔"}
            </p>
          </div>

          {/* تفصیلی معلومات کی لسٹ */}
          <div className="bg-white p-6 rounded-[35px] shadow-xl border border-red-50">
            <h3 className="text-[#4A0E0E] font-black text-sm mb-4 flex items-center justify-end gap-2 border-b border-red-50 pb-2">
              مکمل کوائف <Info size={16} />
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {detailItems.map((item, idx) => (
                <div key={idx} className="bg-[#FDF5F5] p-3 rounded-2xl flex flex-col items-end justify-center border border-red-50">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] font-bold text-gray-400 uppercase">{item.label}</span>
                    <item.icon size={12} className="text-[#D4AF37]" />
                  </div>
                  <p className="text-[11px] font-bold text-[#4A0E0E] text-right">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* تصدیقی بیج (Verification) */}
          <div className="bg-gradient-to-r from-[#D4AF37]/10 to-white p-5 rounded-[30px] border-2 border-[#D4AF37]/20 flex items-center justify-between">
            <Shield size={32} className="text-[#D4AF37]" />
            <div className="text-right">
              <h4 className="text-[#4A0E0E] font-bold text-xs">شجرہ تصدیق شدہ (Verified)</h4>
              <p className="text-[10px] text-gray-500">اس پروفائل کی مکمل جانچ پڑتال کی جا چکی ہے</p>
            </div>
          </div>
        </div>

        {/* --- فوٹر ایکشن بٹن (Footer) --- */}
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-gradient-to-t from-[#2D0A0A] via-[#2D0A0A] to-transparent z-50 flex gap-3">
          <button className="flex-1 h-16 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#4A0E0E] rounded-2xl font-black flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all">
            <MessageCircle size={20} /> رابطہ کریں
          </button>
          <button className="w-16 h-16 bg-[#4A0E0E] text-white rounded-2xl flex items-center justify-center shadow-xl active:scale-95 transition-all border border-[#D4AF37]/30">
            <Heart size={24} className="fill-current" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProfileDetailModal;

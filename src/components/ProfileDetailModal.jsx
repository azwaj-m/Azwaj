import React, { useState } from 'react';
import { 
  X, MapPin, Calendar, Ruler, GraduationCap, Briefcase, 
  Moon, Users, Star, ThumbsUp, Heart, Shield, Home, Tag, 
  AlignRight, Info, MessageCircle, User
} from 'lucide-react';

const ProfileDetailModal = ({ profile, onClose, onLike, isPremium }) => {
  const [liked, setLiked] = useState(false);

  if (!profile) return null;

  // 15 تفصیلات جو ڈیٹا سے متحرک (Dynamic) طور پر لی گئی ہیں
  const detailItems = [
    { icon: User, label: "نام", value: profile.fullName || profile.nickName },
    { icon: Tag, label: "عرفیت", value: profile.nickName || "دستیاب نہیں" },
    { icon: Calendar, label: "عمر / پیدائش", value: profile.age ? `${profile.age} سال` : (profile.dob || "25 سال") },
    { icon: Ruler, label: "قد", value: profile.height || "5'5\"" },
    { icon: MapPin, label: "شہر", value: profile.city || profile.district },
    { icon: Users, label: "فیملی", value: profile.family || "معلومات محفوظ ہیں" },
    { icon: Home, label: "پتہ", value: profile.Address || "تصدیق شدہ ممبر" },
    { icon: GraduationCap, label: "تعلیم", value: profile.education || "گریجویٹ" },
    { icon: Briefcase, label: "پیشہ", value: profile.profession || profile.job || "پرائیویٹ جاب" },
    { icon: Moon, label: "مذہب", value: profile.religion || "اسلام" },
    { icon: Moon, label: "مسلک", value: profile.sect || "سنی" },
    { icon: Star, label: "مشغلے", value: profile.hobbies || "کتب بینی" },
    { icon: ThumbsUp, label: "پسند/ناپسند", value: profile.likesDislikes || "سادگی" },
  ];

  // چیٹ شروع کرنے کا فنکشن
  const handleStartChat = () => {
    if (!isPremium) {
      alert("چیٹ شروع کرنے کے لیے پریمیم پلان حاصل کریں!");
      return;
    }
    alert(`${profile.nickName} کے ساتھ چیٹ روم تیار کیا جا رہا ہے...`);
    // یہاں آپ Chat logic یا Navigation کال کر سکتے ہیں
  };

  // لائک کرنے کا فنکشن
  const handleLikeToggle = () => {
    setLiked(!liked);
    if (onLike) onLike(profile.id);
    if (!liked) {
      alert(`${profile.nickName} کو آپ کی دلچسپی کا پیغام بھیج دیا گیا ہے!`);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md transition-all">
      <div className="w-full max-w-md bg-[#FDF5F5] h-full sm:h-[95vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-500 rounded-t-[40px] sm:rounded-[40px]">
        
        {/* --- متحرک ہیڈر (Header) --- */}
        <header className="bg-gradient-to-l from-[#4A0E0E] to-[#631212] p-6 shadow-lg flex items-center justify-between sticky top-0 z-50">
          <button onClick={onClose} className="text-white hover:bg-white/10 p-2 rounded-full transition-all">
            <X size={24} />
          </button>
          <h2 className="text-xl font-bold text-[#D4AF37] font-serif tracking-wide">پروفائل کارڈ</h2>
          <div className="w-10"></div>
        </header>

        {/* --- مین کنٹینٹ (Main Content) --- */}
        <div className="flex-1 overflow-y-auto px-6 pt-6 pb-32 space-y-6 no-scrollbar" dir="rtl">
          
          {/* پروفائل فوٹو اور سٹیٹس */}
          <div className="relative flex justify-center">
            <div className="relative w-full aspect-[3/4] max-h-[400px] bg-[#3D1212] rounded-[40px] border-4 border-white shadow-2xl overflow-hidden group">
              <img 
                src={profile.profileImg || profile.img} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                alt={profile.fullName} 
              />
              <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2 border border-white/20">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] text-white font-black">آن لائن</span>
              </div>
              <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>
          </div>

          {/* تعارف (Introduction) */}
          <div className="bg-white p-6 rounded-[35px] shadow-sm border border-red-100">
            <h3 className="text-[#4A0E0E] font-black text-sm mb-3 flex items-center justify-end gap-2">
              ایک نظر میں <AlignRight size={18} className="text-[#D4AF37]" />
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed text-right font-medium">
              {profile.intro || "یہ ممبر ایک سنجیدہ رشتے کی تلاش میں ہے اور فیملی اقدار پر یقین رکھتا ہے۔ مزید تفصیلات کے لیے رابطہ کریں۔"}
            </p>
          </div>

          {/* کوائف کی لسٹ (Details Grid) */}
          <div className="bg-white p-6 rounded-[35px] shadow-sm border border-red-100">
            <h3 className="text-[#4A0E0E] font-black text-sm mb-4 flex items-center justify-end gap-2 border-b border-red-50 pb-3">
              تفصیلی معلومات <Info size={18} className="text-[#D4AF37]" />
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {detailItems.map((item, idx) => (
                <div key={idx} className="bg-[#FDF5F5] p-3 rounded-2xl flex flex-col items-end border border-red-50 hover:bg-[#FCECEC] transition-colors">
                  <div className="flex items-center gap-1.5 mb-1 opacity-60">
                    <span className="text-[8px] font-bold text-gray-500 uppercase">{item.label}</span>
                    <item.icon size={10} className="text-[#4A0E0E]" />
                  </div>
                  <p className="text-[11px] font-black text-[#4A0E0E] text-right truncate w-full">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ویریفیکیشن بیج (Trust) */}
          <div className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] p-5 rounded-[30px] flex items-center justify-between shadow-lg shadow-yellow-900/20">
            <Shield size={35} className="text-[#4A0E0E]" />
            <div className="text-right text-[#4A0E0E]">
              <h4 className="font-black text-xs">شجرہ ویریفائیڈ (Verified)</h4>
              <p className="text-[9px] font-bold opacity-80">اس ممبر کی معلومات درست پائی گئی ہیں</p>
            </div>
          </div>
        </div>

        {/* --- ایکشن بٹنز (Footer Actions) --- */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#FDF5F5] via-[#FDF5F5] to-transparent flex gap-4 z-[60]">
          <button 
            onClick={handleStartChat}
            className="flex-[3] h-16 bg-[#4A0E0E] text-[#D4AF37] rounded-3xl font-black flex items-center justify-center gap-3 shadow-2xl active:scale-95 transition-all"
          >
            <MessageCircle size={22} /> پیغام بھیجیں
          </button>
          
          <button 
            onClick={handleLikeToggle}
            className={`flex-1 h-16 rounded-3xl flex items-center justify-center shadow-2xl active:scale-95 transition-all border-2 ${
              liked 
              ? 'bg-red-500 border-red-500 text-white' 
              : 'bg-white border-[#4A0E0E]/10 text-[#4A0E0E]'
            }`}
          >
            <Heart size={26} className={liked ? "fill-current" : ""} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProfileDetailModal;

import React, { useState } from 'react';
import { 
  X, MapPin, Calendar, Ruler, GraduationCap, Briefcase, 
  Moon, Users, Star, ThumbsUp, Heart, Shield, Home, Tag, 
  AlignRight, Info, MessageCircle, User, CreditCard, CheckCircle
} from 'lucide-react';

const ProfileDetailModal = ({ profile, onClose, onLike, isPremium, onUpgrade, onStartChat }) => {
  const [liked, setLiked] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  if (!profile) return null;

  // ڈیٹا کی ہم آہنگی: یہاں ہم چیک کر رہے ہیں کہ اگر ڈیٹا EditProfileForm سے آ رہا ہے تو اسے کیسے دکھانا ہے
  const detailItems = [
    { icon: User, label: "نام", value: profile.fullName || "نام دستیاب نہیں" },
    { icon: Tag, label: "عرفیت", value: profile.nickName || "دستیاب نہیں" },
    { icon: Calendar, label: "عمر / پیدائش", value: profile.dob || profile.age || "دستیاب نہیں" },
    { icon: Ruler, label: "قد", value: profile.height || "دستیاب نہیں" },
    { icon: MapPin, label: "شہر", value: profile.city || profile.ctiy || "دستیاب نہیں" },
    { icon: Users, label: "فیملی", value: profile.family || "معلومات محفوظ ہیں" },
    { icon: Home, label: "پتہ", value: profile.privacy?.Address ? "تصدیق شدہ ممبر" : (profile.Address || "دستیاب نہیں") },
    { icon: GraduationCap, label: "تعلیم", value: profile.education || "دستیاب نہیں" },
    { icon: Briefcase, label: "پیشہ", value: profile.job || profile.profession || "دستیاب نہیں" },
    { icon: Moon, label: "مذہب", value: profile.religion || "اسلام" },
    { icon: Moon, label: "مسلک", value: profile.sect || "سنی" },
    { icon: Star, label: "مشغلے", value: profile.hobbies || "دستیاب نہیں" },
    { icon: ThumbsUp, label: "پسند/ناپسند", value: profile.likesDislikes || "دستیاب نہیں" },
  ];

  const handleChatRequest = () => {
    if (!isPremium) {
      setShowPremiumModal(true);
      return;
    }
    if (onStartChat) onStartChat(profile);
  };

  const handleLikeToggle = () => {
    setLiked(!liked);
    if (onLike) onLike(profile.id || profile.fullName);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center bg-black/90 backdrop-blur-md transition-all p-0 sm:p-4">
      
      {/* پریمیم پاپ اپ */}
      {showPremiumModal && (
        <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/60 p-6">
          <div className="bg-white rounded-[40px] w-full max-w-xs p-8 text-center animate-in zoom-in duration-300 shadow-2xl">
            <div className="w-20 h-20 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="text-[#D4AF37]" size={40} />
            </div>
            <h3 className="text-xl font-black text-[#4A0E0E] mb-2">رابطہ ممکن نہیں!</h3>
            <p className="text-xs text-gray-500 mb-6 leading-relaxed">براہ کرم کسی بھی ممبر سے براہ راست بات چیت کرنے کے لیے ہمارا پریمیم پلان حاصل کریں۔</p>
            <div className="space-y-3">
              <button onClick={onUpgrade} className="w-full bg-[#D4AF37] text-[#4A0E0E] py-4 rounded-2xl font-black shadow-lg active:scale-95 transition-all">پریمیم پلان دیکھیں</button>
              <button onClick={() => setShowPremiumModal(false)} className="w-full bg-gray-100 text-gray-600 py-4 rounded-2xl font-bold">بعد میں</button>
            </div>
          </div>
        </div>
      )}

      {/* مین کارڈ */}
      <div className="w-full max-w-md bg-[#FDF5F5] h-[92vh] sm:h-[95vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-500 rounded-t-[45px] border-t-4 border-[#D4AF37]/20">
        
        {/* ہیڈر */}
        <header className="bg-gradient-to-l from-[#4A0E0E] to-[#631212] p-6 flex items-center justify-between sticky top-0 z-50">
          <button onClick={onClose} className="text-white bg-white/10 p-2 rounded-full hover:bg-white/20 transition-all">
            <X size={24} />
          </button>
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-bold text-[#D4AF37] font-serif">پروفائل کارڈ</h2>
          </div>
          <div className="w-10"></div>
        </header>

        {/* کنٹینٹ */}
        <div className="flex-1 overflow-y-auto px-6 pt-6 pb-40 space-y-6" dir="rtl">
          
          {/* فوٹو سیکشن */}
          <div className="relative group">
            <div className="relative w-full aspect-[4/5] bg-[#3D1212] rounded-[50px] border-8 border-white shadow-2xl overflow-hidden">
              <img 
                src={profile.profileImage || profile.profileImg || "https://via.placeholder.com/400x500?text=No+Image"} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                alt={profile.fullName} 
              />
              <div className="absolute top-6 right-6 bg-green-500/20 backdrop-blur-xl px-4 py-2 rounded-full flex items-center gap-2 border border-green-500/30">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping"></div>
                <span className="text-[10px] text-white font-black uppercase tracking-widest">Active</span>
              </div>
            </div>
          </div>

          {/* انفارمیشن گریڈ */}
          <div className="bg-white p-7 rounded-[40px] shadow-sm border border-red-50">
            <div className="flex items-center justify-between mb-6 border-b border-gray-50 pb-4">
               <Info size={20} className="text-[#D4AF37]" />
               <h3 className="text-[#4A0E0E] font-black text-md">تفصیلی بائیو ڈیٹا</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {detailItems.map((item, idx) => (
                <div key={idx} className="bg-[#FDF5F5] p-4 rounded-3xl flex flex-col items-end group hover:bg-[#D4AF37]/5 transition-all border border-transparent hover:border-[#D4AF37]/20">
                  <div className="flex items-center gap-2 mb-1 opacity-50">
                    <span className="text-[9px] font-bold text-gray-500">{item.label}</span>
                    <item.icon size={12} className="text-[#4A0E0E]" />
                  </div>
                  <p className="text-[12px] font-black text-[#4A0E0E] text-right break-words w-full">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ٹرسٹ کارڈ */}
          <div className="bg-gradient-to-br from-[#4A0E0E] to-[#2D0909] p-6 rounded-[40px] flex items-center justify-between shadow-xl">
             <div className="bg-[#D4AF37] p-3 rounded-2xl shadow-inner">
                <Shield size={30} className="text-[#4A0E0E]" />
             </div>
             <div className="text-right">
                <div className="flex items-center justify-end gap-2 mb-1">
                  <CheckCircle size={14} className="text-[#D4AF37]" />
                  <h4 className="font-black text-[#D4AF37] text-sm italic">شجرہ ویریفائیڈ</h4>
                </div>
                <p className="text-[10px] text-white/60 font-medium leading-tight">اس اکاؤنٹ کی مینوئل تصدیق کی جا چکی ہے۔</p>
             </div>
          </div>
        </div>

        {/* ایکشن بار */}
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#FDF5F5] via-[#FDF5F5] to-transparent flex gap-4 z-[100]">
          <button 
            onClick={handleChatRequest}
            className="flex-[4] h-16 bg-[#4A0E0E] text-[#D4AF37] rounded-3xl font-black flex items-center justify-center gap-3 shadow-lg active:scale-95 transition-all group"
          >
            <MessageCircle size={22} />
            <span className="text-lg">چیٹ شروع کریں</span>
          </button>
          
          <button 
            onClick={handleLikeToggle}
            className={`flex-1 h-16 rounded-3xl flex items-center justify-center shadow-lg active:scale-95 transition-all border-2 ${
              liked 
              ? 'bg-red-500 border-red-500 text-white animate-pulse' 
              : 'bg-white border-[#4A0E0E]/10 text-[#4A0E0E]'
            }`}
          >
            <Heart size={28} className={liked ? "fill-current" : ""} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailModal;

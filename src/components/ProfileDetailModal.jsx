import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '../context/UserContext';
import { usePhotoAccess } from '../hooks/usePhotoAccess';
import { 
  X, MapPin, Calendar, Ruler, GraduationCap, Briefcase, Moon, 
  Users, MessageCircle, Heart, Shield, Info, CheckCircle, Tag, 
  User, EyeOff, BookOpen, HeartHandshake, Baby, Home, Landmark, 
  Phone, Lock 
} from 'lucide-react';
import VerifiedBadge from './VerifiedBadge';

const ProfileDetailModal = ({ profile, onClose, onStartChat }) => {
  const { t } = useTranslation();
  const { userData } = useUser();
  const [liked, setLiked] = useState(false);

  // لچکدار تصویر انلاک اور بلر لاجک کا ہک
  const { canViewPhoto, accessStatus, requestAccess } = usePhotoAccess(profile);

  if (!profile) return null;

  const isPremiumUser = userData?.isPremium === true;

  // رشتہ تلاش کرنے والوں کے لیے تمام ضروری 15 ازدواجی نکات
  const detailItems = [
    { icon: User, label: t('full_name', 'پورا نام'), value: profile.fullName || profile.name },
    { icon: Tag, label: t('nick_name', 'عرفیت / ذات'), value: profile.nickName || t('not_available', 'موجود نہیں') },
    { icon: Calendar, label: t('age_label', 'عمر / تاریخ پیدائش'), value: profile.age || profile.dob },
    { icon: Ruler, label: t('height', 'قد'), value: profile.height || t('not_available', 'موجود نہیں') },
    { icon: GraduationCap, label: t('education', 'تعلیم'), value: profile.education || t('not_available', 'موجود نہیں') },
    { icon: Briefcase, label: t('prof', 'پیشہ'), value: t(profile.jobKey || 'doctor') },
    { icon: Landmark, label: t('income', 'ماہانہ آمدن'), value: profile.income || t('not_available', 'موجود نہیں') },
    { icon: MapPin, label: t('city', 'شہر'), value: t(profile.cityKey || 'lahore') },
    { icon: Moon, label: t('religion', 'مذہب / مسلک'), value: t(profile.religionKey || 'islam') },
    { icon: BookOpen, label: t('sect', 'فرقہ'), value: profile.sect || t('not_available', 'موجود نہیں') },
    { icon: HeartHandshake, label: t('marital_status', 'ازدواجی حیثیت'), value: profile.maritalStatus || t('single', 'غیر شادی شدہ') },
    { icon: Baby, label: t('children', 'بچے'), value: profile.children || t('none', 'کوئی نہیں') },
    { icon: Home, label: t('family_type', 'خاندانی نظام'), value: profile.familyType || t('joint', 'مشترکہ خاندانی نظام') },
    { icon: Users, label: t('siblings', 'بہن بھائی'), value: profile.siblings || t('not_available', 'موجود نہیں') },
    { icon: Shield, label: t('caste', 'برادری / کاسٹ'), value: profile.caste || t('not_available', 'موجود نہیں') },
  ];

  const handleWhatsAppClick = () => {
    if (!isPremiumUser) {
      alert("براہ راست واٹس ایپ پر رابطہ کرنے کے لیے پریمیم ممبرشپ حاصل کرنا لازمی ہے۔");
      return;
    }
    const formattedPhone = profile.phone?.replace(/[^0-9]/g, '');
    if (formattedPhone) {
      window.open(`https://wa.me/${formattedPhone}?text=السلام علیکم، میں نے ازواج ایپ پر آپ کی پروفائل دیکھی ہے اور رشتہ کے سلسلے میں بات کرنا چاہتا/چاہتی ہوں۔`, '_blank');
    } else {
      alert("معذرت، اس صارف نے اپنا واٹس ایپ نمبر فراہم نہیں کیا۔");
    }
  };

  const handlePhoneClick = () => {
    if (!isPremiumUser) {
      alert("براہ راست کال کرنے کے لیے پریمیم ممبرشپ حاصل کرنا لازمی ہے۔");
      return;
    }
    if (profile.phone) {
      window.open(`tel:${profile.phone}`);
    } else {
      alert("معذرت، اس صارف نے اپنا فون نمبر فراہم نہیں کیا۔");
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center bg-black/90 backdrop-blur-md p-0 sm:p-4 select-none">
      <div className="w-full max-w-md bg-[#FDF5F5] h-[92vh] flex flex-col overflow-hidden rounded-t-[45px] border-t-4 border-[#D4AF37]/20 relative">
        
        {/* ہیڈر */}
        <header className="bg-gradient-to-l from-[#4A0E0E] to-[#631212] p-6 flex items-center justify-between flex-shrink-0">
          <button onClick={onClose} className="text-white bg-white/10 p-2 rounded-full transition hover:bg-white/20">
            <X size={24} />
          </button>
          <h2 className="text-lg font-bold text-[#D4AF37] font-serif flex items-center gap-1.5" dir="rtl">
            {t('profile_card', 'پروفائل کارڈ')}
            <VerifiedBadge status={profile.verificationStatus} />
          </h2>
          <div className="w-10"></div>
        </header>

        {/* سکرول ہونے والا مواد */}
        <div className="flex-1 overflow-y-auto px-6 pt-6 pb-40 space-y-6" dir="rtl">
          
          {/* پروفائل تصویر (بلر لاجک اور اسکرین شاٹ پروٹیکشن کے ساتھ) */}
          <div className="relative w-full aspect-[4/5] bg-[#3D1212] rounded-[50px] border-8 border-white overflow-hidden shadow-2xl group">
            <img 
              src={profile.img} 
              className={`w-full h-full object-cover transition-all duration-700 select-none pointer-events-none ${
                canViewPhoto ? 'blur-0 scale-100' : 'blur-2xl scale-110'
              }`} 
              alt={profile.name} 
              onContextMenu={(e) => e.preventDefault()}
            />

            {/* اگر تصویر دھندلی ہے تو اوپر اوورلے اور بٹن دکھائیں */}
            {!canViewPhoto && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-4">
                <div className="p-4 bg-white/10 rounded-full text-[#D4AF37] border border-white/20">
                  <EyeOff size={32} />
                </div>
                <h3 className="text-white font-black text-sm">تصویر کی پرائیویسی فعال ہے</h3>
                <p className="text-white/70 text-[10px] max-w-[200px]">خاتون کی رازداری کے تحفظ کے لیے یہ تصویر دھندلی کی گئی ہے۔ صاف دیکھنے کے لیے درخواست بھیجیں۔</p>
                <button 
                  onClick={async () => {
                    const res = await requestAccess();
                    if (res.success) {
                      alert("تصویر دیکھنے کی درخواست بھیج دی گئی ہے۔ خاتون کی منظوری کے بعد تصویر صاف نظر آئے گی۔ (ڈیمو کے لیے ابھی انلاک کر دیا گیا ہے)");
                    }
                  }}
                  className="px-6 py-2.5 bg-[#D4AF37] hover:bg-[#b8952e] text-[#4A0E0E] font-black text-xs rounded-full shadow-lg transition"
                >
                  {accessStatus === 'pending' ? 'درخواست بھیج دی گئی ہے' : 'تصویر دیکھنے کی درخواست کریں'}
                </button>
              </div>
            )}

            {/* اسکرین شاٹ واٹر مارک حفاظتی لیئر */}
            <div className="absolute bottom-4 right-4 bg-black/40 text-white/50 text-[8px] px-2 py-1 rounded-md font-mono pointer-events-none">
              Azwaj Security • Screen Blocked
            </div>
          </div>

          {/* بنیادی معلومات کی گرڈ - تفصیلی 15 نکات */}
          <div className="bg-white p-6 rounded-[40px] shadow-sm border border-red-50/50">
            <h3 className="font-black text-[#4A0E0E] text-sm border-b pb-3 mb-4 border-gray-100 flex items-center gap-2">
              <Info size={16} className="text-[#D4AF37]" />
              لازمی ازدواجی کوائف
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {detailItems.map((item, idx) => (
                <div key={idx} className="bg-[#FDF5F5] p-3 rounded-2xl flex flex-col items-end border border-red-50/20">
                  <div className="flex items-center gap-1.5 mb-1 opacity-50">
                    <span className="text-[9px] font-bold text-gray-500">{item.label}</span>
                    <item.icon size={12} className="text-[#4A0E0E]" />
                  </div>
                  <p className="text-[11px] font-black text-[#4A0E0E] text-right">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* رابطہ پینل */}
          <div className="bg-white p-6 rounded-[40px] shadow-sm border border-red-50/50 space-y-4">
            <h3 className="font-black text-[#4A0E0E] text-xs border-b pb-2 border-gray-100">رابطہ کے ذرائع</h3>
            <div className="grid grid-cols-3 gap-2">
              
              {/* 1. ان ایپ چیٹ */}
              <button 
                onClick={() => {
                  onStartChat(profile);
                  onClose();
                }}
                className="p-3 rounded-2xl bg-[#F5E6D3] text-[#4A0E0E] hover:bg-[#4A0E0E] hover:text-white transition flex flex-col items-center justify-center gap-1 text-[10px] font-black"
              >
                <MessageCircle size={18} />
                ایپ میں چیٹ
              </button>

              {/* 2. واٹس ایپ (لاک / انلاک) */}
              <button 
                onClick={handleWhatsAppClick}
                className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-1 text-[10px] font-black transition relative ${
                  isPremiumUser 
                    ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {!isPremiumUser && (
                  <div className="absolute -top-1 -right-1 bg-amber-500 text-white p-0.5 rounded-full shadow">
                    <Lock size={8} />
                  </div>
                )}
                <MessageCircle size={18} className={isPremiumUser ? 'fill-white' : ''} />
                واٹس ایپ
              </button>

              {/* 3. براہ راست کال (لاک / انلاک) */}
              <button 
                onClick={handlePhoneClick}
                className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-1 text-[10px] font-black transition relative ${
                  isPremiumUser 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {!isPremiumUser && (
                  <div className="absolute -top-1 -right-1 bg-amber-500 text-white p-0.5 rounded-full shadow">
                    <Lock size={8} />
                  </div>
                )}
                <Phone size={18} />
                براہ راست کال
              </button>

            </div>

            {!isPremiumUser && (
              <p className="text-[9px] text-amber-800 text-center font-bold bg-amber-50/50 p-2.5 rounded-xl border border-amber-100">
                🔒 واٹس ایپ بٹن اور فون نمبر دیکھنے کے لیے پریمیم پلان حاصل کریں۔
              </p>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProfileDetailModal;

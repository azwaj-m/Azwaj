import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '../context/UserContext';
import {
  User, Heart, ShieldAlert, Crown, HelpCircle,
  LogOut, X, Languages, Camera, ShieldCheck, Shield, Download
} from 'lucide-react';
import LanguageSelectorModal from './LanguageSelectorModal';
import VerifiedBadge from './VerifiedBadge';

const Sidebar = ({ isOpen, onClose, onAction }) => {
  const { t, i18n } = useTranslation();
  const { userData, updateProfile } = useUser();
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBtn, setShowInstallBtn] = useState(false);
  const fileInputRef = useRef(null);

  // 📱 PWA انسٹالیشن سپورٹ (ایپ انسٹال بٹن کی لائیو لاجک)
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBtn(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // اگر ایپ پہلے سے انسٹال ہو
    window.addEventListener('appinstalled', () => {
      setShowInstallBtn(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallApp = async () => {
    if (!deferredPrompt) {
      alert("یہ ایپ پہلے سے انسٹال شدہ ہے یا آپ کا برائوزر اس کی اجازت نہیں دے رہا۔");
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowInstallBtn(false);
    }
    setDeferredPrompt(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (updateProfile) {
          updateProfile(userData?.name, reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // 🛠️ تمام مینیو بٹنز کی ایکٹیو لاجک (روٹنگ ایونٹس کے ساتھ فکسڈ)
  const menuItems = [
    { 
      id: 'profile', 
      label: t('my_profile', 'میری پروفائل'), 
      icon: User, 
      action: () => {
        if (onAction) onAction('main'); 
        setTimeout(() => window.dispatchEvent(new CustomEvent('switch-tab', { detail: 'profile' })), 50);
      } 
    },
    { 
      id: 'verification', 
      label: t('cnic_verification', 'شناختی تصدیق (CNIC)'), 
      icon: ShieldCheck, 
      action: () => {
        if (onAction) onAction('verification');
      } 
    },
    { 
      id: 'privacy_settings', 
      label: t('privacy_settings', 'پرائیویسی سیٹنگز'), 
      icon: Shield, 
      action: () => {
        // پروفائل مینیجر کے اندر پرائیویسی سیٹنگز کا سب ویو ایکٹیو کرنے کے لیے
        if (onAction) onAction('profile');
        setTimeout(() => window.dispatchEvent(new CustomEvent('open-privacy-settings')), 100);
      } 
    },
    { 
      id: 'discover', 
      label: t('favorite_matches', 'پسندیدہ رشتے'), 
      icon: Heart, 
      action: () => {
        if (onAction) onAction('main');
        setTimeout(() => window.dispatchEvent(new CustomEvent('switch-tab', { detail: 'discover' })), 50);
      } 
    },
    { 
      id: 'blocked', 
      label: t('blocked_list', 'بلاک شدہ لسٹ'), 
      icon: ShieldAlert, 
      action: () => {
        if (onAction) onAction('profile');
        setTimeout(() => window.dispatchEvent(new CustomEvent('open-blocked-list')), 100);
      } 
    },
    { 
      id: 'premium', 
      label: t('premium_membership', 'پریمیم ممبرشپ'), 
      icon: Crown, 
      action: () => {
        if (onAction) onAction('premium');
      } 
    },
    { 
      id: 'help', 
      label: t('help_support', 'مدد اور سپورٹ'), 
      icon: HelpCircle, 
      action: () => {
        if (onAction) onAction('help');
      } 
    }
  ];

  const isRTL = i18n.dir() === 'rtl';

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-[150] backdrop-blur-xs transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      <div className={`fixed top-0 ${isRTL ? 'right-0' : 'left-0'} h-full w-72 bg-[#FFFDF9] z-[200] transform transition-transform duration-300 flex flex-col border-[#D4AF37]/10 shadow-2xl ${isRTL ? (isOpen ? 'translate-x-0' : 'translate-x-full') : (isOpen ? 'translate-x-0' : '-translate-x-full')}`}>

        {/* 👑 پریمیم برانڈ ہیڈر زون */}
        <div className="bg-gradient-to-b from-[#4A0E0E] to-[#3D0A0A] p-6 text-center relative flex-shrink-0 rounded-b-[30px] border-b border-[#D4AF37]/20 shadow-lg">
          <button type="button" onClick={onClose} className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} text-[#D4AF37] p-1.5 hover:bg-white/10 rounded-full transition-all active:scale-90`}>
            <X size={20} />
          </button>

          <div className="relative inline-block mt-4 group">
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
            <div
              className="w-22 h-22 rounded-[25px] border-2 border-[#D4AF37] overflow-hidden mx-auto shadow-xl cursor-pointer relative transition-transform active:scale-95"
              onClick={() => fileInputRef.current.click()}
            >
              <img src={userData?.profileImg || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"} alt="User" className="w-full h-full object-cover group-hover:opacity-40 transition-opacity" />
              <Camera className="absolute inset-0 m-auto text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
            </div>
          </div>
          
          <h2 className="text-[#D4AF37] mt-3 text-lg font-black tracking-tight flex items-center justify-center gap-1">
            {userData?.name || "شاہ زیب خان"}
            <VerifiedBadge status={userData?.verificationStatus || 'verified'} />
          </h2>
          <p className="text-[#D4AF37]/80 text-[9px] font-black uppercase tracking-widest mt-1 bg-white/10 py-1 px-3 rounded-full inline-block border border-[#D4AF37]/20">
            Royal Premium Member
          </p>
        </div>

        {/* 📜 مینیو لسٹنگ ایکشنز */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1.5 no-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => { item.action(); onClose(); }}
              className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-[#4A0E0E]/5 group transition-all text-right active:scale-99"
            >
              <div className={`flex items-center gap-3.5 w-full ${isRTL ? 'flex-row' : 'flex-row-reverse'}`}>
                 <div className="bg-[#F5E6D3]/40 p-2 rounded-xl text-[#4A0E0E] group-hover:bg-[#4A0E0E] group-hover:text-[#D4AF37] transition-all shadow-xs">
                   <item.icon size={16} />
                 </div>
                 <span className={`text-[#4A0E0E] font-black text-xs flex-1 transition-colors ${isRTL ? 'text-right' : 'text-left'}`}>
                   {item.label}
                 </span>
              </div>
            </button>
          ))}

          {/* 🌐 زبان تبدیل کرنے کا آپشن */}
          <button
            type="button"
            onClick={() => { setIsLangModalOpen(true); onClose(); }}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-white border border-gray-200 text-[#4A0E0E] hover:border-[#D4AF37]/50 active:scale-98 transition-all shadow-xs"
          >
            <div className={`flex items-center gap-3.5 w-full ${isRTL ? 'flex-row' : 'flex-row-reverse'}`}>
              <div className="bg-[#F5E6D3]/60 p-2 rounded-xl text-[#4A0E0E]">
                <Languages size={16} />
              </div>
              <span className={`font-black flex-1 text-xs ${isRTL ? 'text-right' : 'text-left'}`}>
                {t('select_language', 'زبان تبدیل کریں (Language)')}
              </span>
            </div>
          </button>

          {/* 📲 لائیو ایپ انسٹال بٹن */}
          {showInstallBtn && (
            <button
              type="button"
              onClick={handleInstallApp}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38F1D] text-[#4A0E0E] mt-3 shadow-md active:scale-98 transition-all"
            >
              <div className={`flex items-center gap-3.5 w-full ${isRTL ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className="bg-[#4A0E0E] p-2 rounded-xl text-[#D4AF37]">
                  <Download size={16} />
                </div>
                <span className="font-black flex-1 text-xs text-center tracking-wide">
                  ایپ انسٹال کریں (Install App)
                </span>
              </div>
            </button>
          )}
        </div>

        {/* 🚪 لاگ آؤٹ اور ورژن بار */}
        <div className="bg-[#FFFDF9] border-t border-gray-100 p-5 text-center flex-shrink-0">
           <button 
             type="button"
             onClick={() => { if(confirm("کیا آپ لاگ آؤٹ کرنا چاہتے ہیں؟")) window.location.reload(); }} 
             className="flex items-center gap-1.5 text-red-600 font-black text-xs mb-3 mx-auto active:scale-95 transition-all"
           >
             <LogOut size={14} /> {t('logout', 'سیسٹم سے لاگ آؤٹ کریں')}
           </button>
           <p className="text-[8px] text-gray-400 font-bold uppercase tracking-wider">
             Version 2.0.5 • Azwaj Royal Ecosystem
           </p>
        </div>
      </div>

      <LanguageSelectorModal
        isOpen={isLangModalOpen}
        onClose={() => setIsLangModalOpen(false)}
      />
    </>
  );
};

export default Sidebar;

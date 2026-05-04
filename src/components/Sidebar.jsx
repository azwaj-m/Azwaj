import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  User, Heart, ShieldAlert, Crown, HelpCircle, 
  LogOut, X, Languages, Camera 
} from 'lucide-react';
import LanguageSelectorModal from './LanguageSelectorModal';

const Sidebar = ({ isOpen, onClose, onAction, onEditProfile }) => {
  const { t, i18n } = useTranslation();
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [profileImg, setProfileImg] = useState("https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400");
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImg(reader.result);
        // یہاں آپ API کال بھی کر سکتے ہیں تاکہ سرور پر فوٹو اپ ڈیٹ ہو
        console.log("New Profile Image Ready");
      };
      reader.readAsDataURL(file);
    }
  };

  const menuItems = [
    { id: 'profile', label: 'میری پروفائل', icon: User, action: () => onEditProfile() },
    { id: 'discover', label: 'پسندیدہ رشتے', icon: Heart, action: () => onAction('main', 'discover') },
    { id: 'blocked', label: 'بلاک شدہ لسٹ', icon: ShieldAlert, action: () => onAction('blocked') },
    { id: 'premium', label: 'پریمیم ممبرشپ', icon: Crown, action: () => onAction('premium') },
    { id: 'help', label: 'مدد اور سپورٹ', icon: HelpCircle, action: () => onAction('help') }
  ];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-[150] backdrop-blur-sm transition-opacity" onClick={onClose} />
      )}

      <div className={`fixed top-0 left-0 h-full w-72 bg-[#FDF5F5] z-[200] transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Header Section with Profile Upload */}
        <div className="bg-[#4A0E0E] p-8 text-center relative overflow-hidden flex-shrink-0">
          <button onClick={onClose} className="absolute top-4 left-4 text-[#D4AF37]">
            <X size={24} />
          </button>
          
          <div className="relative inline-block mt-4 group">
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleImageChange} 
            />
            <div 
              className="w-24 h-24 rounded-full border-4 border-[#D4AF37] overflow-hidden mx-auto shadow-xl cursor-pointer relative"
              onClick={() => fileInputRef.current.click()}
            >
              <img src={profileImg} alt="User" className="w-full h-full object-cover group-hover:opacity-50 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="text-white" size={24} />
              </div>
            </div>
            {/* Camera Floating Button */}
            <button 
              onClick={() => fileInputRef.current.click()}
              className="absolute bottom-0 right-0 bg-[#D4AF37] p-1.5 rounded-full border-2 border-[#4A0E0E] text-[#4A0E0E] shadow-lg"
            >
              <Camera size={14} />
            </button>
          </div>
          <h2 className="text-[#D4AF37] mt-4 text-2xl font-black italic tracking-tighter">صارف کا نام</h2>
          <p className="text-[#D4AF37]/60 text-[8px] uppercase font-bold tracking-[0.2em]">Verified Account</p>
        </div>

        {/* Scrollable Menu Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 pb-24 scrollbar-hide">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { item.action(); onClose(); }}
              className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-[#4A0E0E]/5 transition-colors group"
            >
              <div className="flex items-center gap-4 flex-row-reverse w-full">
                 <div className="bg-[#F5E6D3] p-2 rounded-xl text-[#4A0E0E] group-hover:bg-[#4A0E0E] group-hover:text-[#D4AF37] transition-all">
                   <item.icon size={20} />
                 </div>
                 <span className="text-[#4A0E0E] font-bold text-right flex-1 mr-4">{item.label}</span>
              </div>
            </button>
          ))}

          <button
            onClick={() => setIsLangModalOpen(true)}
            className="w-full flex items-center justify-between p-3 rounded-2xl bg-[#4A0E0E] text-[#D4AF37] mt-4 shadow-lg hover:bg-[#5A1212] transition-all"
          >
            <div className="flex items-center gap-4 flex-row-reverse w-full">
              <div className="bg-[#D4AF37] p-2 rounded-xl text-[#4A0E0E]">
                <Languages size={20} />
              </div>
              <span className="font-bold text-right flex-1 mr-4 text-xs uppercase tracking-widest">
                {t('select_language', 'زبان تبدیل کریں')}
              </span>
            </div>
          </button>
        </div>

        {/* Footer Info */}
        <div className="bg-[#FDF5F5] border-t border-[#4A0E0E]/10 p-6 text-center flex-shrink-0">
           <div className="flex flex-col items-center">
             <button className="flex items-center gap-2 text-red-600 font-black uppercase text-xs mb-4 hover:scale-105 transition-transform">
               <LogOut size={16} /> لاگ آؤٹ
             </button>
             <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">
               Version 2.0.4 • Azwaj Ecosystem
             </p>
           </div>
        </div>
      </div>

      <LanguageSelectorModal isOpen={isLangModalOpen} onClose={() => setIsLangModalOpen(false)} />
    </>
  );
};

export default Sidebar;

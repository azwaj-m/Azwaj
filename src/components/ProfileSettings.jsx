import React, { useState } from 'react';
import { 
  User, ShieldCheck, Lock, Bell, Heart, EyeOff, 
  UserMinus, HelpCircle, Info, ChevronLeft, Camera, LogOut 
} from 'lucide-react';

const ProfileSettings = ({ onEdit, onLogout }) => {
  const [profileImage, setProfileImage] = useState("https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200");

  // تصویر تبدیل کرنے کا فنکشن
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      alert("پروفائل تصویر اپ ڈیٹ کر دی گئی ہے!");
    }
  };

  const settingsGroups = [
    {
      title: "ACCOUNT SETTINGS",
      items: [
        { icon: User, label: "Personal Information", sub: "Update your personal details", action: () => onEdit && onEdit() },
        { icon: ShieldCheck, label: "Verification", sub: "Verify your profile and documents", verified: true, action: () => alert("ویریفیکیشن کا عمل شروع کریں") },
        { icon: Lock, label: "Privacy Settings", sub: "Manage who can see your profile", action: () => alert("پرائیویسی سیٹنگز جلد آ رہی ہیں") },
        { icon: Bell, label: "Notification Settings", sub: "Manage your notifications", action: () => alert("نوٹیفیکیشنز آن/آف کریں") },
      ]
    },
    {
      title: "PREFERENCES",
      items: [
        { icon: Heart, label: "Partner Preferences", sub: "Update your partner preferences", action: () => alert("شریکِ حیات کی ترجیحات مرتب کریں") },
        { icon: EyeOff, label: "Hidden Profiles", sub: "Manage hidden profiles list", action: () => alert("چھپائے گئے پروفائلز") },
        { icon: UserMinus, label: "Blocked Profiles", sub: "Manage blocked users", action: () => alert("بلاک کردہ صارفین") },
      ]
    },
    {
      title: "SUPPORT",
      items: [
        { icon: HelpCircle, label: "Help & Support", sub: "Get help and support", action: () => alert("مدد کے لیے رابطہ کریں") },
        { icon: Info, label: "About Azwaj Marriage", sub: "Learn more about us", action: () => alert("ہمارے بارے میں مزید جانیں") },
      ]
    }
  ];

  return (
    <div className="pb-10 animate-in fade-in duration-500" dir="ltr">
      {/* پروفائل ہیڈر */}
      <div className="px-6 flex flex-col items-center">
        <div className="relative group">
          <div className="w-28 h-28 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gray-200 transition-transform group-hover:scale-105">
            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <label className="absolute bottom-1 right-1 p-2 bg-[#4A0E0E] text-[#D4AF37] rounded-full border-2 border-white shadow-lg cursor-pointer hover:bg-[#631212] transition-all">
            <Camera size={16} />
            <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
          </label>
        </div>
        
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold text-[#4A0E0E] flex items-center justify-center gap-2">
            Aisha Khan <ShieldCheck size={20} className="text-yellow-600 fill-yellow-600/20" />
          </h2>
          <p className="text-sm text-gray-500 font-medium">28 • Doctor • Lahore</p>
          
          <div className="mt-3 inline-flex items-center gap-2 bg-green-50 px-4 py-1.5 rounded-full border border-green-100 shadow-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-bold text-green-700 uppercase tracking-tighter">Profile 100% Complete</span>
          </div>
        </div>
      </div>

      {/* پریمیم کارڈ */}
      <div className="px-6 mt-8">
        <button 
          onClick={() => alert("پریمیم سبسکرپشن پلانز چیک کریں")}
          className="w-full bg-gradient-to-r from-[#4A0E0E] to-[#8B1A1A] rounded-3xl p-5 shadow-xl relative overflow-hidden group active:scale-95 transition-all text-left"
        >
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#D4AF37] rounded-2xl flex items-center justify-center shadow-lg transform -rotate-6 group-hover:rotate-0 transition-transform">
                <Heart className="text-[#4A0E0E] fill-[#4A0E0E]" size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold">Upgrade to Premium</h4>
                <p className="text-[#D4AF37] text-[10px] mt-0.5 font-medium tracking-wide">Unlock exclusive features</p>
              </div>
            </div>
            <div className="bg-[#D4AF37] text-[#4A0E0E] px-4 py-2 rounded-xl text-[10px] font-black shadow-lg uppercase">
              Upgrade
            </div>
          </div>
          {/* بیک گراؤنڈ ڈیزائن */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        </button>
      </div>

      {/* سیٹنگز گروپس */}
      <div className="mt-8 space-y-8 px-6">
        {settingsGroups.map((group, gIdx) => (
          <div key={gIdx}>
            <h3 className="text-[10px] font-black text-gray-400 tracking-[0.2em] mb-4 px-2 uppercase">{group.title}</h3>
            <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
              {group.items.map((item, iIdx) => (
                <div 
                  key={iIdx} 
                  onClick={item.action}
                  className={`flex items-center justify-between p-4 cursor-pointer hover:bg-[#FDF5F5]/50 active:bg-gray-50 transition-all ${iIdx !== group.items.length - 1 ? 'border-b border-gray-50' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-[#FDF5F5] flex items-center justify-center text-[#4A0E0E]">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-[#4A0E0E]">{item.label}</h5>
                      <p className="text-[10px] text-gray-400 font-medium">{item.sub}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.verified && <ShieldCheck size={16} className="text-yellow-600 fill-yellow-600/10" />}
                    <ChevronLeft size={16} className="text-gray-300 rotate-180" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* لاگ آؤٹ بٹن */}
      <div className="px-6 mt-10 mb-6">
        <button 
          onClick={() => {
            if(window.confirm("کیا آپ واقعی لاگ آؤٹ کرنا چاہتے ہیں؟")) {
              onLogout ? onLogout() : window.location.reload();
            }
          }}
          className="w-full py-4 flex items-center justify-center gap-3 text-red-600 font-bold bg-white rounded-2xl border border-red-50 shadow-sm active:bg-red-50 active:scale-95 transition-all"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;

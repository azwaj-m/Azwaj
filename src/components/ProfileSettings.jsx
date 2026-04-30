import React from 'react';
import { 
  User, ShieldCheck, Lock, Bell, Heart, EyeOff, 
  UserMinus, HelpCircle, Info, ChevronLeft, Camera, Settings, LogOut 
} from 'lucide-react';

const ProfileSettings = () => {
  const settingsGroups = [
    {
      title: "ACCOUNT SETTINGS",
      items: [
        { icon: User, label: "Personal Information", sub: "Update your personal details" },
        { icon: ShieldCheck, label: "Verification", sub: "Verify your profile and documents", verified: true },
        { icon: Lock, label: "Privacy Settings", sub: "Manage who can see your profile" },
        { icon: Bell, label: "Notification Settings", sub: "Manage your notifications" },
      ]
    },
    {
      title: "PREFERENCES",
      items: [
        { icon: Heart, label: "Partner Preferences", sub: "Update your partner preferences" },
        { icon: EyeOff, label: "Hidden Profiles", sub: "Manage hidden profiles list" },
        { icon: UserMinus, label: "Blocked Profiles", sub: "Manage blocked users" },
      ]
    },
    {
      title: "SUPPORT",
      items: [
        { icon: HelpCircle, label: "Help & Support", sub: "Get help and support" },
        { icon: Info, label: "About Azwaj Marriage", sub: "Learn more about us" },
      ]
    }
  ];

  return (
    <div className="pb-10" dir="ltr">
      {/* پروفائل ہیڈر */}
      <div className="px-6 flex flex-col items-center">
        <div className="relative">
          <div className="w-28 h-28 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gray-200">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <button className="absolute bottom-1 right-1 p-2 bg-[#4A0E0E] text-white rounded-full border-2 border-white shadow-lg">
            <Camera size={16} />
          </button>
        </div>
        
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold text-[#4A0E0E] flex items-center justify-center gap-2">
            Aisha Khan <ShieldCheck size={20} className="text-yellow-600 fill-yellow-600/20" />
          </h2>
          <p className="text-sm text-gray-500 font-medium">28 • Doctor • Lahore</p>
          <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">Member ID: AZM123456</p>
          
          <div className="mt-3 inline-flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full border border-green-100">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-bold text-green-700 uppercase">Profile 100% Complete</span>
          </div>
        </div>
      </div>

      {/* پریمیم کارڈ */}
      <div className="px-6 mt-8">
        <div className="bg-gradient-to-r from-[#4A0E0E] to-[#8B1A1A] rounded-3xl p-5 shadow-xl relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#D4AF37] rounded-2xl flex items-center justify-center shadow-lg transform -rotate-6">
                <Heart className="text-white fill-white" size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold">Upgrade to Premium</h4>
                <p className="text-[#D4AF37] text-[10px] mt-0.5">Unlock exclusive features and filters</p>
              </div>
            </div>
            <button className="bg-[#D4AF37] text-[#4A0E0E] px-4 py-2 rounded-xl text-xs font-black shadow-lg hover:bg-white transition-colors uppercase">
              Upgrade
            </button>
          </div>
        </div>
      </div>

      {/* سیٹنگز لسٹ */}
      <div className="mt-8 space-y-8 px-6">
        {settingsGroups.map((group, gIdx) => (
          <div key={gIdx}>
            <h3 className="text-[11px] font-black text-gray-400 tracking-widest mb-4 px-2 uppercase">{group.title}</h3>
            <div className="bg-white rounded-[30px] shadow-sm border border-gray-100 overflow-hidden">
              {group.items.map((item, iIdx) => (
                <div 
                  key={iIdx} 
                  className={`flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors ${iIdx !== group.items.length - 1 ? 'border-bottom border-gray-50' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-[#FDF5F5] flex items-center justify-center text-[#4A0E0E]">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-[#4A0E0E]">{item.label}</h5>
                      <p className="text-[10px] text-gray-400">{item.sub}</p>
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
        <button className="w-full py-4 flex items-center justify-center gap-3 text-red-600 font-bold bg-white rounded-2xl border border-red-50 shadow-sm active:scale-95 transition-all">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;

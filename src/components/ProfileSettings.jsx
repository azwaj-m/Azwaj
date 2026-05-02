import React from 'react';
import { 
  User, ShieldCheck, Lock, Bell, Heart, EyeOff, 
  UserMinus, HelpCircle, Info, ChevronLeft, Camera, LogOut 
} from 'lucide-react';

const ProfileSettings = ({ userData, onEdit, onLogout }) => {
  // اب یہ ڈیٹا App.jsx سے آئے گا نہ کہ فکس ہوگا
  const displayImage = userData?.profileImage || "https://via.placeholder.com/150";
  const displayName = userData?.fullName || "User Name";
  const displaySub = `${userData?.age || '28'} • ${userData?.job || 'Professional'} • ${userData?.city || 'City'}`;

  const settingsGroups = [
    {
      title: "ACCOUNT SETTINGS",
      items: [
        { icon: User, label: "Personal Information", sub: "Update your personal details", action: () => onEdit && onEdit() },
        { icon: ShieldCheck, label: "Verification", sub: "Verify your profile and documents", verified: true, action: () => {} },
        { icon: Lock, label: "Privacy Settings", sub: "Manage who can see your profile", action: () => {} },
        { icon: Bell, label: "Notification Settings", sub: "Manage your notifications", action: () => {} },
      ]
    },
    // باقی گروپس وہی رہیں گے...
  ];

  return (
    <div className="pb-10 animate-in fade-in duration-500" dir="ltr">
      <div className="px-6 flex flex-col items-center">
        <div className="relative group">
          <div className="w-28 h-28 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gray-200">
            <img src={displayImage} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <button onClick={onEdit} className="absolute bottom-1 right-1 p-2 bg-[#4A0E0E] text-[#D4AF37] rounded-full border-2 border-white shadow-lg">
            <Camera size={16} />
          </button>
        </div>
        
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold text-[#4A0E0E] flex items-center justify-center gap-2">
            {displayName} <ShieldCheck size={20} className="text-yellow-600" />
          </h2>
          <p className="text-sm text-gray-500 font-medium">{displaySub}</p>
        </div>
      </div>

      <div className="mt-8 space-y-8 px-6">
        {settingsGroups.map((group, gIdx) => (
          <div key={gIdx}>
            <h3 className="text-[10px] font-black text-gray-400 tracking-[0.2em] mb-4 px-2 uppercase">{group.title}</h3>
            <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
              {group.items.map((item, iIdx) => (
                <div key={iIdx} onClick={item.action} className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#FDF5F5]/50 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-[#FDF5F5] flex items-center justify-center text-[#4A0E0E]">
                      <item.icon size={20} />
                    </div>
                    <div className="text-left">
                      <h5 className="text-sm font-bold text-[#4A0E0E]">{item.label}</h5>
                      <p className="text-[10px] text-gray-400 font-medium">{item.sub}</p>
                    </div>
                  </div>
                  <ChevronLeft size={16} className="text-gray-300 rotate-180" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* لاگ آؤٹ بٹن وہی رہے گا */}
    </div>
  );
};
export default ProfileSettings;

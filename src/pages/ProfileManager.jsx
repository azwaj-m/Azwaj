import React from 'react';
import { 
  User, ShieldCheck, Lock, Bell, 
  UserX, HelpCircle, Info, LogOut, ChevronRight 
} from 'lucide-react';

const ProfileManager = ({ onEditProfile, setCurrentView }) => {
  // مین مینو کیٹیگری
  const sections = [
    {
      id: 'personal',
      title: 'Personal Information',
      subtitle: 'Update your personal details',
      icon: <User size={20} />,
      action: () => onEditProfile() // ایڈٹ پروفائل فارم کھولے گا
    },
    {
      id: 'verification',
      title: 'Verification',
      subtitle: 'Verify your profile and documents',
      icon: <ShieldCheck size={20} />,
      action: () => alert('Verification module: Please upload your ID.')
    },
    {
      id: 'privacy',
      title: 'Privacy Settings',
      subtitle: 'Manage who can see your profile',
      icon: <Lock size={20} />,
      action: () => alert('Privacy: Profile visibility set to Public.')
    },
    {
      id: 'notifications',
      title: 'Notification Settings',
      subtitle: 'Manage your notifications',
      icon: <Bell size={20} />,
      action: () => alert('Notifications: All alerts are enabled.')
    }
  ];

  // کمیونٹی سیکشن
  const communitySection = [
    {
      id: 'blocked',
      title: 'Blocked Profiles',
      subtitle: 'Manage blocked users',
      icon: <UserX size={20} />,
      action: () => setCurrentView('blocked') // بلاک شدہ لسٹ والا ویو دکھائے گا
    }
  ];

  // سپورٹ سیکشن
  const supportSection = [
    {
      id: 'help',
      title: 'Help Center',
      subtitle: 'FAQs and support',
      icon: <HelpCircle size={20} />,
      action: () => setCurrentView('help') // مدد والا ویو دکھائے گا
    },
    {
      id: 'about',
      title: 'About',
      subtitle: 'Version 2.0.4',
      icon: <Info size={20} />,
      action: () => alert('Azwaj App v2.0.4 - Built with React & Termux')
    }
  ];

  const RenderItem = ({ item }) => (
    <div 
      onClick={item.action}
      className="bg-white p-4 rounded-2xl flex items-center justify-between mb-3 shadow-sm border border-transparent active:border-[#D4AF37] active:scale-[0.98] transition-all cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <div className="bg-[#FDF5F5] p-3 rounded-xl text-[#4A0E0E]">
          {item.icon}
        </div>
        <div>
          <h4 className="text-[#4A0E0E] font-black text-sm">{item.title}</h4>
          <p className="text-gray-400 text-[10px] font-medium">{item.subtitle}</p>
        </div>
      </div>
      <ChevronRight size={16} className="text-gray-300" />
    </div>
  );

  return (
    <div className="p-4 pb-24 animate-in slide-in-from-bottom duration-500">
      {/* اکاؤنٹ سیٹنگز */}
      <div className="bg-white/50 rounded-[35px] p-2 mb-6">
        {sections.map(item => <RenderItem key={item.id} item={item} />)}
      </div>

      {/* کمیونٹی سیکشن */}
      <h3 className="text-[#4A0E0E]/40 font-black text-[10px] uppercase tracking-[0.2em] mb-3 ml-4 italic">Community</h3>
      <div className="bg-white/50 rounded-[30px] p-2 mb-6">
        {communitySection.map(item => <RenderItem key={item.id} item={item} />)}
      </div>

      {/* سپورٹ سیکشن */}
      <h3 className="text-[#4A0E0E]/40 font-black text-[10px] uppercase tracking-[0.2em] mb-3 ml-4 italic">Support</h3>
      <div className="bg-white/50 rounded-[30px] p-2 mb-6">
        {supportSection.map(item => <RenderItem key={item.id} item={item} />)}
      </div>

      {/* لاگ آؤٹ بٹن */}
      <button 
        className="w-full flex items-center justify-center gap-2 p-4 text-red-600 font-black uppercase text-xs mt-4 active:scale-95 transition-all"
        onClick={() => {
           if(window.confirm('Are you sure you want to logout?')) {
             window.location.reload();
           }
        }}
      >
        <LogOut size={16} /> Logout
      </button>
    </div>
  );
};

export default ProfileManager;

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  User, ShieldCheck, Lock, Bell, UserX, 
  HelpCircle, Info, LogOut, ChevronRight, 
  Camera, MapPin, Briefcase, Heart 
} from 'lucide-react';

// Components
import ProfileSettings from '../components/ProfileSettings';
import EditProfileForm from '../components/EditProfileForm';
import BlockedProfiles from '../components/BlockedProfiles';

// Utils
import { translateBulk } from '../utils/translator';

const ProfileManager = ({ onNavigate }) => {
  const { t, i18n } = useTranslation();
  const [currentView, setCurrentView] = useState('settings');

  // پروفائل ڈیٹا بشمول پرائیویسی
  const [userProfile, setUserProfile] = useState({
    fullName: "Ayesha Khan",
    nickName: "Ashi",
    age: "28",
    dob: "1995-05-20",
    height: "5'8\"",
    education: "Master of Arts",
    job: "Doctor",
    religion: "islam", // Key used for i18n
    sect: "sunni",    // Key used for i18n
    city: "Lahore",
    Address: "Iqbal park house # 34/3",
    family: "2 sisters, 1 brother",
    hobbies: "Eating",
    intro: "I'm very very slow",
    likesDislikes: "Testy spicy food",
    profileImage: null,
    privacy: { 
      Address: true, 
      family: true, 
      dob: false, 
      height: false, 
      city: false, 
      job: false 
    }
  });

  // آٹو ٹرانسلیشن لاجک (صارف کے بائیو کے لیے)
  const [displayIntro, setDisplayIntro] = useState(userProfile.intro);

  useEffect(() => {
    const translateIntro = async () => {
      if (i18n.language !== 'en') {
        const result = await translateBulk([userProfile.intro], i18n.language);
        setDisplayIntro(result[0]);
      } else {
        setDisplayIntro(userProfile.intro);
      }
    };
    translateIntro();
  }, [i18n.language, userProfile.intro]);

  // ڈیٹا محفوظ کرنے کا فنکشن
  const handleSave = (updatedData) => {
    setUserProfile(updatedData);
    setCurrentView('settings');
    // پروفیشنل ٹوسٹ میسج یہاں آ سکتا ہے
  };

  // رینڈرنگ لاجک
  if (currentView === 'edit') {
    return (
      <EditProfileForm 
        initialData={userProfile} 
        onSave={handleSave} 
        onCancel={() => setCurrentView('settings')} 
      />
    );
  }

  if (currentView === 'blocked') {
    return (
      <BlockedProfiles 
        onBack={() => setCurrentView('settings')} 
      />
    );
  }

  // مین سیٹنگز لسٹ کا ڈیٹا
  const menuSections = [
    { 
      id: 'personal', 
      title: t('personal_info'), 
      subtitle: t('update_details'), 
      icon: <User size={20} />, 
      action: () => setCurrentView('edit') 
    },
    { 
      id: 'privacy', 
      title: t('privacy_settings'), 
      subtitle: t('manage_visibility'), 
      icon: <Lock size={20} />, 
      action: () => {} // یہاں پرائیویسی موڈل کھولا جا سکتا ہے
    },
    { 
      id: 'blocked', 
      title: t('blocked_users'), 
      subtitle: t('manage_blocked'), 
      icon: <UserX size={20} />, 
      action: () => setCurrentView('blocked') 
    },
    { 
      id: 'help', 
      title: t('help_center'), 
      subtitle: t('faqs'), 
      icon: <HelpCircle size={20} />, 
      action: () => onNavigate('help') 
    }
  ];

  return (
    <div className="bg-[#FDF5F5] min-h-screen pb-24" dir={t('dir')}>
      {/* پروفائل ہیڈر کارڈ */}
      <div className="p-6 bg-white rounded-b-[40px] shadow-sm mb-6 flex flex-col items-center">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden border-4 border-[#FFEBEC]">
            {userProfile.profileImage ? (
              <img src={userProfile.profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User size={48} className="m-6 text-gray-400" />
            )}
          </div>
          <button className="absolute bottom-0 right-0 bg-[#4A0E0E] p-2 rounded-full text-white shadow-lg">
            <Camera size={16} />
          </button>
        </div>
        <h2 className="mt-4 text-xl font-black text-[#4A0E0E]">{userProfile.fullName}</h2>
        <p className="text-gray-400 text-sm font-medium italic">"{displayIntro}"</p>
      </div>

      {/* مینیو لسٹ */}
      <div className="px-4">
        <div className="bg-white/50 rounded-[35px] p-2">
          {menuSections.map(item => (
            <div 
              key={item.id} 
              onClick={item.action} 
              className="bg-white p-4 rounded-2xl flex items-center justify-between mb-3 shadow-sm hover:bg-gray-50 transition-colors cursor-pointer"
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
          ))}
        </div>

        {/* لاگ آؤٹ بٹن */}
        <button 
          onClick={() => window.location.reload()} 
          className="w-full mt-6 flex items-center justify-center gap-2 p-4 text-red-600 font-black uppercase text-xs tracking-widest hover:bg-red-50 rounded-2xl transition-all"
        >
          <LogOut size={16} /> {t('logout')}
        </button>
      </div>
    </div>
  );
};

export default ProfileManager;

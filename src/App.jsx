import React, { useState, useMemo } from 'react';
import { initialProfiles } from './utils/seedData';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Sidebar from './components/Sidebar';
import ProfileDetailModal from './components/ProfileDetailModal';
import EditProfileForm from './components/EditProfileForm';

// پیجز کی امپورٹ
import Home from './pages/Home';
import Discover from './pages/Discover';
import Chat from './pages/Chat';
import Notifications from './pages/Notifications';
import ProfileManager from './pages/ProfileManager';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [currentView, setCurrentView] = useState('main'); 
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isPremium, setIsPremium] = useState(false);

  // سرچ فلٹر لاجک
  const filteredProfiles = useMemo(() => {
    return initialProfiles.filter(p =>
      p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.profession.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.religion && p.religion.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery]);

  // سائیڈ بار ایکشن ہینڈلر
  const handleSidebarAction = (view) => {
    setCurrentView(view);
    setIsSidebarOpen(false);
  };

  // چیٹ شروع کرنے کا فنکشن
  const handleStartChat = (profile) => {
    console.log("Chat started with:", profile.fullName);
    setActiveTab('chat');
    setSelectedProfile(null);
  };

  // پریمیم اپ گریڈ ہینڈلر
  const handleUpgrade = () => {
    setCurrentView('premium');
    setSelectedProfile(null);
  };

  // مرکزی مواد رینڈر کرنے کا فنکشن (ٹیبز اور سائیڈ بار ویوز کے لیے)
  const renderContent = () => {
    if (currentView === 'main') {
      switch (activeTab) {
        case 'home':
          return <Home profiles={filteredProfiles} setSelectedProfile={setSelectedProfile} />;
        case 'discover':
          return <Discover />;
        case 'chat':
          return <Chat />;
        case 'notifications':
          return <Notifications />;
        case 'profile':
          return <ProfileManager />;
        default:
          return <Home profiles={filteredProfiles} setSelectedProfile={setSelectedProfile} />;
      }
    }

    // سائیڈ بار کے مخصوص صفحات
    if (currentView === 'blocked') {
      return (
        <div className="p-10 text-center animate-in slide-in-from-bottom duration-500">
           <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚫</span>
           </div>
           <h2 className="text-[#4A0E0E] font-black mb-2 text-xl">بلاک شدہ لسٹ</h2>
           <p className="text-gray-500 text-sm mb-6">آپ نے فی الحال کسی کو بلاک نہیں کیا ہے۔</p>
           <button onClick={() => setCurrentView('main')} className="bg-[#4A0E0E] text-[#D4AF37] px-6 py-2 rounded-xl font-bold shadow-lg">واپس جائیں</button>
        </div>
      );
    }

    if (currentView === 'premium') {
      return (
        <div className="p-10 text-center animate-in fade-in">
           <h2 className="text-[#4A0E0E] font-black mb-4 text-xl">پریمیم پلان</h2>
           <p className="text-gray-600 mb-6">مکمل رسائی حاصل کرنے کے لیے اپنا پلان منتخب کریں۔</p>
           <button onClick={() => {setIsPremium(true); setCurrentView('main');}} className="bg-[#D4AF37] text-[#4A0E0E] px-8 py-3 rounded-2xl font-black shadow-lg mb-4 w-full">پلان خریدیں</button>
           <button onClick={() => setCurrentView('main')} className="text-[#4A0E0E] font-black underline block w-full">بعد میں</button>
        </div>
      );
    }

    if (currentView === 'help') {
      return (
        <div className="p-10 text-center animate-in fade-in">
           <h2 className="text-[#4A0E0E] font-black mb-4 text-xl">مدد اور سپورٹ</h2>
           <p className="text-gray-600 mb-6">سپورٹ کے لیے ای میل کریں: support@azwaj.com</p>
           <button onClick={() => setCurrentView('main')} className="text-[#4A0E0E] font-black underline">بند کریں</button>
        </div>
      );
    }

    return null;
  };

  // اگر ایڈٹ پروفائل ویو میں ہے
  if (currentView === 'edit_profile') {
    return (
      <EditProfileForm 
        onSave={(updatedData) => {
          console.log("Data Saved:", updatedData);
          setCurrentView('main');
        }} 
        onCancel={() => setCurrentView('main')} 
      />
    );
  }

  return (
    <div className="max-w-md mx-auto h-screen bg-[#FDF5F5] flex flex-col overflow-hidden relative shadow-2xl">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onAction={handleSidebarAction}
        onEditProfile={() => setCurrentView('edit_profile')}
      />

      {/* پروفائل ڈیٹیل ماڈل */}
      {selectedProfile && (
        <ProfileDetailModal
          profile={selectedProfile}
          onClose={() => setSelectedProfile(null)}
          isPremium={isPremium}
          onUpgrade={handleUpgrade}
          onStartChat={handleStartChat}
          onLike={(id) => console.log("Liked profile ID:", id)}
        />
      )}

      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        toggleSidebar={() => setIsSidebarOpen(true)}
      />

      <main className="flex-1 overflow-y-auto no-scrollbar pt-2 pb-32">
        {renderContent()}
      </main>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;

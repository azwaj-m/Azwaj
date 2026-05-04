import React, { useState, useMemo } from 'react';
import { initialProfiles } from './utils/seedData';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Sidebar from './components/Sidebar';
import ProfileDetailModal from './components/ProfileDetailModal';
import EditProfileForm from './components/EditProfileForm';

// Pages
import Home from './pages/Home';
import Discover from './pages/Discover';
import Chat from './pages/Chat';
import Notifications from './pages/Notifications';
import ProfileManager from './pages/ProfileManager';
import Subscription from './pages/Subscription';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [currentView, setCurrentView] = useState('main');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isPremium, setIsPremium] = useState(false);

  const filteredProfiles = useMemo(() => {
    return initialProfiles.filter(p =>
      p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.profession.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleSidebarAction = (view, tab = 'home') => {
    if(tab) setActiveTab(tab);
    setCurrentView(view);
    setIsSidebarOpen(false);
  };

  const renderContent = () => {
    if (currentView === 'main') {
      switch (activeTab) {
        case 'home': return <Home profiles={filteredProfiles} setSelectedProfile={setSelectedProfile} />;
        case 'discover': return <Discover profiles={filteredProfiles} setSelectedProfile={setSelectedProfile} />;
        case 'chat': return <Chat />;
        case 'notifications': return <Notifications setActiveTab={setActiveTab} setCurrentView={setCurrentView} />;
        case 'profile': return <ProfileManager />;
        default: return <Home profiles={filteredProfiles} setSelectedProfile={setSelectedProfile} />;
      }
    }
    if (currentView === 'blocked') return <div className="p-10 text-center text-[#4A0E0E]">🚫 بلاک شدہ لسٹ</div>;
    if (currentView === 'premium') return <Subscription onUpgrade={() => { setIsPremium(true); setCurrentView('main'); }} />;
    if (currentView === 'help') return <div className="p-10 text-center text-[#4A0E0E]">مدد اور سپورٹ</div>;
    return null;
  };

  if (currentView === 'edit_profile') {
    return <EditProfileForm onSave={() => setCurrentView('main')} onCancel={() => setCurrentView('main')} />;
  }

  return (
    <div className="max-w-md mx-auto h-screen bg-[#FDF5F5] flex flex-col overflow-hidden relative shadow-2xl">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onAction={handleSidebarAction}
        onEditProfile={() => setCurrentView('edit_profile')}
      />

      {selectedProfile && (
        <ProfileDetailModal
          profile={selectedProfile}
          onClose={() => setSelectedProfile(null)}
          isPremium={isPremium}
          onUpgrade={() => setCurrentView('premium')}
          onStartChat={() => setActiveTab('chat')}
        />
      )}

      {activeTab !== 'chat' && (
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          toggleSidebar={() => setIsSidebarOpen(true)}
          onNotificationClick={() => setActiveTab('notifications')}
        />
      )}

      <main className={`flex-1 overflow-y-auto no-scrollbar pb-24 ${activeTab === 'chat' ? 'pt-0' : 'pt-2'}`}>
        {renderContent()}
      </main>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;

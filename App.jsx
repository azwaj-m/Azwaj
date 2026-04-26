import React, { useState, useEffect } from 'react';
import { Menu, Bell, X, Plus, User, LogOut, Info, MapPin, Heart, CheckCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Discover from './pages/Discover';

const App = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [profiles, setProfiles] = useState([
    { id: 1, fullName: 'Ayesha', dob: '2000-01-01', education: 'Masters in Psychology', city: 'Lahore, Pakistan', profileImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400' }
  ]);
  const [rotation, setRotation] = useState(0);

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FDF5F5] relative overflow-hidden" dir="rtl">
      
      {/* Header with Arc Shape */}
      <header className="bg-[#4A0E0E] pt-12 pb-24 relative z-10 shadow-2xl overflow-hidden rounded-b-[100px] border-b-4 border-yellow-600/50">
        <div className="flex justify-between items-center px-6 mb-4 relative z-20">
          <Menu className="text-yellow-500 cursor-pointer" onClick={() => setIsDrawerOpen(true)} />
          <Bell className="text-yellow-500" />
        </div>
        
        <div className="flex flex-col items-center relative z-20">
          <h1 className="text-yellow-500 text-4xl font-serif font-bold tracking-tighter italic">Azwaj</h1>
          <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent mt-2"></div>
        </div>
      </header>

      {/* Main Content Component */}
      <Discover profiles={profiles} rotation={rotation} setRotation={setRotation} />

      {/* Feature Icons Banner */}
      <div className="grid grid-cols-4 gap-2 bg-white/80 backdrop-blur-sm mx-6 p-4 rounded-3xl border border-gray-100 shadow-lg mb-20 relative z-40">
        <div className="flex flex-col items-center text-center">
          <CheckCircle size={20} className="text-yellow-600 mb-1" />
          <span className="text-[8px] font-bold leading-tight">Verified Profiles</span>
        </div>
        <div className="flex flex-col items-center text-center border-l border-gray-200">
          <div className="text-yellow-600 mb-1">🔒</div>
          <span className="text-[8px] font-bold leading-tight">Private & Secure</span>
        </div>
        <div className="flex flex-col items-center text-center border-l border-gray-200">
          <Heart size={20} className="text-yellow-600 mb-1" />
          <span className="text-[8px] font-bold leading-tight">Serious Matches</span>
        </div>
        <div className="flex flex-col items-center text-center border-l border-gray-200">
          <div className="text-yellow-600 mb-1">💬</div>
          <span className="text-[8px] font-bold leading-tight">Meaningful Connections</span>
        </div>
      </div>
    </div>
  );
};

export default App;

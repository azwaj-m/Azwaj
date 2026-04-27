import React, { useState, useEffect } from 'react';
import { db } from './utils/firebase';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import Discover from './pages/Discover';
import ProfileSettings from './components/ProfileSettings';

const App = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [profiles, setProfiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const q = query(collection(db, "profiles"), orderBy("createdAt", "desc"), limit(50));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProfiles(data);
    });
    return () => unsubscribe();
  }, []);

  const filteredProfiles = profiles.filter(p => 
    (p.fullName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.city || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.profession || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.country || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FDF5F5] font-sans">
      <header className="bg-[#4A0E0E] p-6 text-center text-[#D4AF37]">
        <h1 className="text-3xl font-serif font-bold">AZWAJ</h1>
        <input 
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="نام، شہر یا پیشہ سرچ کریں..."
          className="w-full mt-4 p-3 rounded-full text-black outline-none border-2 border-[#D4AF37]"
        />
      </header>
      <main className="pb-24">
        {activeTab === 'discover' ? <Discover profiles={filteredProfiles} /> : <ProfileSettings />}
      </main>
      <nav className="fixed bottom-0 w-full max-w-md flex justify-around p-4 bg-[#4A0E0E] border-t border-[#D4AF37]/30">
         <button onClick={() => setActiveTab('discover')} className={activeTab === 'discover' ? 'text-[#D4AF37]' : 'text-white'}>Discover</button>
         <button onClick={() => setActiveTab('profile')} className={activeTab === 'profile' ? 'text-[#D4AF37]' : 'text-white'}>Profile</button>
      </nav>
    </div>
  );
};
export default App;

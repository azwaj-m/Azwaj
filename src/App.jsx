import React, { useState, useEffect } from 'react';
import { db } from './utils/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import Discover from './pages/Discover';
import { Bell, Menu, Compass, Heart, MessageCircle, User, Search } from 'lucide-react';

const App = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const q = query(collection(db, "profiles"), orderBy("createdAt", "desc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProfiles(data);
        setLoading(false);
      }, (error) => {
        console.error("Firebase Error:", error);
        setLoading(false);
      });
      return () => unsubscribe();
    } catch (err) {
      console.error("Setup Error:", err);
      setLoading(false);
    }
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#4A0E0E] text-[#D4AF37]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#D4AF37]"></div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FDF5F5] relative overflow-hidden font-sans">
      <header className="p-6 flex items-center justify-between">
        <Menu className="text-[#4A0E0E]" />
        <div className="flex flex-col items-center">
           <img src="/images/Logo.png" alt="Azwaj" className="h-12 mb-1" />
           <h1 className="text-2xl font-serif font-bold text-[#4A0E0E]">Azwaj</h1>
        </div>
        <Bell className="text-[#4A0E0E]" />
      </header>

      <div className="px-6 mb-4">
        <div className="relative flex items-center bg-white/50 border border-gray-200 rounded-full px-4 py-3">
          <Search size={18} className="text-gray-400" />
          <input type="text" placeholder="نام یا شہر سے تلاش کریں..." className="bg-transparent w-full px-3 outline-none text-sm" />
        </div>
      </div>

      {/* اگر پروفائلز موجود ہوں تب ہی ڈسکور دکھائیں */}
      {profiles.length > 0 ? (
        <Discover profiles={profiles} rotation={0} setRotation={() => {}} />
      ) : (
        <div className="text-center p-10 text-gray-500">کوئی پروفائل نہیں ملی</div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t flex justify-around p-4 z-50">
        <Compass className="text-[#4A0E0E]" />
        <Heart className="text-gray-400" />
        <div className="bg-[#4A0E0E] p-3 rounded-full -mt-8 border-4 border-[#FDF5F5] text-[#D4AF37]">
          <Heart fill="currentColor" />
        </div>
        <MessageCircle className="text-gray-400" />
        <User className="text-gray-400" />
      </nav>
    </div>
  );
};

export default App;

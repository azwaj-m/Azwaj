import React, { useState, useEffect } from 'react';
import { db } from './utils/firebase';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';

const App = () => {
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
    Object.values(p).some(val => String(val).toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FDF5F5] font-sans text-right" dir="rtl">
      <header className="bg-[#4A0E0E] p-6 text-center text-[#D4AF37] sticky top-0 z-10">
        <h1 className="text-3xl font-serif font-bold">AZWAJ</h1>
        <input 
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="نام، شہر یا مسلک سے تلاش کریں..."
          className="w-full mt-4 p-3 rounded-lg text-black outline-none border-2 border-[#D4AF37] text-center"
        />
      </header>

      <main className="p-4 pb-24">
        {filteredProfiles.map(p => (
          <div key={p.id} className="bg-white border-2 border-[#D4AF37] rounded-xl p-4 mb-6 shadow-lg">
            <img src={p.profilePic || 'https://via.placeholder.com/150'} alt="Profile" className="w-32 h-32 mx-auto rounded-full border-4 border-[#4A0E0E] object-cover mb-4" />
            <h2 className="text-2xl font-bold text-[#4A0E0E] text-center mb-2">{p.fullName} ({p.nickName})</h2>
            
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
              <p><strong>مذہب:</strong> {p.religion}</p>
              <p><strong>مسلک:</strong> {p.sect}</p>
              <p><strong>تعلیم:</strong> {p.education}</p>
              <p><strong>کاروبار:</strong> {p.job}</p>
              <p><strong>پیدائش:</strong> {p.dob}</p>
              <p><strong>قد:</strong> {p.height}</p>
              <p><strong>شہر:</strong> {p.city}</p>
            </div>

            <hr className="my-3 border-[#D4AF37]/30" />
            
            <div className="text-sm space-y-2">
              <p><strong>مستقل پتہ:</strong> {p.permAddress}</p>
              <p><strong>عارضی پتہ:</strong> {p.tempAddress}</p>
              <p><strong>پسند/ناپسند:</strong> {p.likesDislikes}</p>
              <p><strong>مشاغل:</strong> {p.hobbies}</p>
              <p><strong>فیملی ممبرز:</strong> {p.family}</p>
              <p className="bg-[#FDF5F5] p-2 rounded mt-2 italic text-[#4A0E0E]">
                <strong>تعارف:</strong> {p.intro}
              </p>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};
export default App;

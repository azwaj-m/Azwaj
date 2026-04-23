import React, { useState } from 'react';
import { db, auth } from '../utils/firebase';
import { doc, setDoc } from 'firebase/firestore';

const Registration = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    dn: '', religion: '', sect: '', job: '', hobbies: '', bio: '', age: '', city: '',
    p: { n: 0, ph: 0, ad: 0 }, isPremium: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, "profiles", auth.currentUser.uid), {
        ...formData,
        uid: auth.currentUser.uid,
        fn: auth.currentUser.displayName || "صارف",
        ph: auth.currentUser.phoneNumber || ""
      });
      onComplete();
    } catch (err) { alert("ڈیٹا محفوظ کرنے میں غلطی آئی"); }
  };

  return (
    <div className="p-8 bg-[#FDF5F5] min-h-screen pb-24">
      <h2 className="text-2xl font-black text-[#4A0E0E] mb-6 text-center italic">پروفائل مکمل کریں</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input placeholder="آپشنل ڈسپلے نام" className="w-full p-4 rounded-2xl border" onChange={e => setFormData({...formData, dn: e.target.value})} required />
        
        <div className="flex gap-2">
          <select className="w-1/2 p-4 rounded-2xl border bg-white" onChange={e => setFormData({...formData, religion: e.target.value})}>
            <option>مذہب</option>
            <option>اسلام</option><option>عیسائیت</option><option>ہندو</option><option>سکھ</option>
          </select>
          <select className="w-1/2 p-4 rounded-2xl border bg-white" onChange={e => setFormData({...formData, sect: e.target.value})}>
            <option>مسلک</option>
            <option>سنی (حنفی)</option><option>سنی (اہلحدیث)</option><option>شیعہ</option><option>دیوبندی</option><option>بریلوی</option>
          </select>
        </div>

        <input placeholder="کاروبار / تعلیم" className="w-full p-4 rounded-2xl border" onChange={e => setFormData({...formData, job: e.target.value})} />
        <textarea placeholder="مختصر تعارف اور پسندیدگیاں..." className="w-full p-4 rounded-2xl border h-32" onChange={e => setFormData({...formData, bio: e.target.value})} />
        
        <div className="flex gap-2">
          <input placeholder="عمر" className="w-1/2 p-4 rounded-2xl border text-center" onChange={e => setFormData({...formData, age: e.target.value})} />
          <input placeholder="شہر" className="w-1/2 p-4 rounded-2xl border text-center" onChange={e => setFormData({...formData, city: e.target.value})} />
        </div>

        <button type="submit" className="w-full bg-[#4A0E0E] text-[#D4AF37] p-5 rounded-2xl font-black shadow-lg">محفوظ کریں</button>
      </form>
    </div>
  );
};

export default Registration;

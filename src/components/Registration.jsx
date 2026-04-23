import React, { useState } from 'react';
import { db, auth } from '../utils/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { checkContentAI } from '../utils/security';

const Registration = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    dn: '', religion: '', sect: '', job: '', bio: '', age: '', city: '',
    isApproved: false, // Default is False
    isPremium: false,
    p: { n: 0, ph: 0, ad: 0 }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // AI سیکیورٹی چیک
    if (!checkContentAI(formData.bio) || !checkContentAI(formData.dn)) {
      alert("معذرت! آپ کے پروفائل میں غیر مناسب الفاظ پائے گئے ہیں۔ براہ کرم درست معلومات درج کریں۔");
      return;
    }

    try {
      await setDoc(doc(db, "profiles", auth.currentUser.uid), {
        ...formData,
        uid: auth.currentUser.uid,
        fn: auth.currentUser.displayName || "صارف",
        ph: auth.currentUser.phoneNumber || "",
        createdAt: new Date()
      });
      alert("آپ کی معلومات موصول ہو گئی ہیں۔ ایڈمن کی تصدیق کے بعد آپ کا پروفائل لائیو ہو جائے گا۔");
      onComplete();
    } catch (err) { alert("Error saving data"); }
  };

  return (
    <div className="p-8 bg-[#FDF5F5] min-h-screen">
       {/* فارم کا وہی ڈیزائن جو پہلے دیا گیا تھا، بس اس میں اوپر والا لاجک کام کرے گا */}
       <h2 className="text-xl font-bold mb-4 text-[#4A0E0E]">پروفائل ویریفیکیشن فارم</h2>
       <form onSubmit={handleSubmit} className="space-y-4">
          <input placeholder="نام" className="w-full p-4 rounded-2xl border" onChange={e => setFormData({...formData, dn: e.target.value})} required />
          <textarea placeholder="اپنا مکمل تعارف لکھیں..." className="w-full p-4 rounded-2xl border h-32" onChange={e => setFormData({...formData, bio: e.target.value})} required />
          <button type="submit" className="w-full bg-[#4A0E0E] text-[#D4AF37] p-5 rounded-2xl font-black">تصدیق کے لیے بھیجیں</button>
       </form>
    </div>
  );
};

export default Registration;

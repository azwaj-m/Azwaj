import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { db, storage } from '../utils/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const Verification = ({ onBack }) => {
  const { user, userData } = useUser();
  const [cnicFile, setCnicFile] = useState(null);
  const [selfieFile, setSelfieFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!cnicFile || !selfieFile) {
      setMessage("براہ کرم شناختی کارڈ اور سیلفی دونوں تصاویر اپلوڈ کریں۔");
      return;
    }

    setUploading(true);
    setMessage('');

    try {
      // 1. Storage میں شناختی کارڈ اپلوڈ کریں
      const cnicRef = ref(storage, `verifications/${user.uid}/cnic_${Date.now()}`);
      await uploadBytes(cnicRef, cnicFile);
      const cnicUrl = await getDownloadURL(cnicRef);

      // 2. Storage میں سیلفی اپلوڈ کریں
      const selfieRef = ref(storage, `verifications/${user.uid}/selfie_${Date.now()}`);
      await uploadBytes(selfieRef, selfieFile);
      const selfieUrl = await getDownloadURL(selfieRef);

      // 3. Firestore میں یوزر کا سٹیٹس اپڈیٹ کریں
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        verificationStatus: "pending", // pending, verified, rejected
        cnicDocUrl: cnicUrl,
        selfieDocUrl: selfieUrl,
        verificationSubmittedAt: new Date().toISOString()
      });

      setMessage("آپ کی دستاویزات موصول ہو گئی ہیں۔ تصدیق کا عمل 24 گھنٹوں میں مکمل ہو جائے گا۔");
    } catch (error) {
      console.error("Verification Upload Error:", error);
      setMessage("اپلوڈ کرنے میں مسئلہ پیش آیا۔ دوبارہ کوشش کریں۔");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4 text-right" dir="rtl">
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="text-xl font-bold text-[#4A0E0E]">پروفائل کی تصدیق (CNIC)</h2>
        <button onClick={onBack} className="text-gray-500 hover:text-black">← واپسی</button>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed">
        ازواج ایپ پر سنجیدہ رشتوں کو یقینی بنانے کے لیے شناختی کارڈ کی تصدیق لازمی ہے۔ آپ کا ڈیٹا مکمل طور پر محفوظ رکھا جائے گا اور کسی دوسرے یوزر کو نہیں دکھایا جائے گا۔
      </p>

      {userData?.verificationStatus === 'verified' ? (
        <div className="p-4 bg-green-100 text-green-800 rounded-lg text-center font-bold">
          ✅ آپ کا اکاؤنٹ تصدیق شدہ (Verified) ہے۔
        </div>
      ) : userData?.verificationStatus === 'pending' ? (
        <div className="p-4 bg-yellow-100 text-yellow-800 rounded-lg text-center font-bold animate-pulse">
          ⏳ آپ کی درخواست زیرِ غور ہے۔ تصدیق جاری ہے...
        </div>
      ) : (
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">شناختی کارڈ کی فرنٹ تصویر:</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => setCnicFile(e.target.files[0])}
              className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">اپنی ایک تازہ سیلفی (شناختی کارڈ ہاتھ میں پکڑ کر):</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => setSelfieFile(e.target.files[0])}
              className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
            />
          </div>

          {message && (
            <div className={`p-3 rounded-lg text-xs font-semibold ${message.includes('کامیاب') || message.includes('زیرِ غور') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={uploading}
            className="w-full py-2 px-4 bg-[#4A0E0E] text-white rounded-lg font-bold hover:bg-opacity-90 transition disabled:bg-gray-400"
          >
            {uploading ? "اپلوڈ ہو رہا ہے..." : "دستاویزات جمع کرائیں"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Verification;

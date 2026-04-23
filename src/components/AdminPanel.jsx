import React, { useState, useEffect } from 'react';
import { db } from '../utils/firebase';
import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { CheckCircle, XCircle, ShieldCheck } from 'lucide-react';

const AdminPanel = () => {
  const [pendingUsers, setPendingUsers] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "profiles"), where("isApproved", "==", false));
    return onSnapshot(q, (snap) => {
      setPendingUsers(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  const approveUser = async (uid) => {
    // سیکیورٹی چیک: صرف ایڈمن ہی یہ ایکشن لے سکے گا
    await updateDoc(doc(db, "profiles", uid), {
      isApproved: true,
      isPremium: true, // ادائیگی کی تصدیق کے بعد پریمیئم کر دیا جائے گا
      verifiedAt: new Date()
    });
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <h2 className="text-2xl font-black text-[#4A0E0E] mb-6 flex items-center gap-2">
        <ShieldCheck className="text-green-600" /> ایڈمن ویریفیکیشن پینل
      </h2>
      <div className="space-y-4">
        {pendingUsers.map(u => (
          <div key={u.id} className="p-4 border-2 border-dashed border-gray-200 rounded-3xl flex justify-between items-center">
            <div>
              <p className="font-bold">{u.fn} ({u.dn})</p>
              <p className="text-xs text-gray-400">مذہب: {u.religion} | مسلک: {u.sect}</p>
            </div>
            <button 
              onClick={() => approveUser(u.id)}
              className="bg-green-600 text-white p-3 rounded-2xl flex items-center gap-2 font-bold text-xs shadow-lg shadow-green-100"
            >
              <CheckCircle size={16}/> تصدیق کریں
            </button>
          </div>
        ))}
        {pendingUsers.length === 0 && <p className="text-center text-gray-400 italic">کوئی درخواست زیرِ التواء نہیں ہے</p>}
      </div>
    </div>
  );
};

export default AdminPanel;

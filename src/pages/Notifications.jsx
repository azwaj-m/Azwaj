import React from 'react';
import { Bell, ArrowRight, Heart, MessageCircle, UserPlus } from 'lucide-react';

const Notifications = ({ onBack }) => {
  const notifications = [
    { id: 1, type: 'match', text: 'سارہ نے آپ کی پروفائل کو پسند کیا ہے!', time: '2 منٹ پہلے', icon: <Heart className="text-red-500" size={18} /> },
    { id: 2, type: 'message', text: 'احمد کا نیا پیغام موصول ہوا', time: '1 گھنٹہ پہلے', icon: <MessageCircle className="text-blue-500" size={18} /> },
    { id: 3, type: 'system', text: 'آپ کی پروفائل 80% مکمل ہے', time: '5 گھنٹے پہلے', icon: <UserPlus className="text-green-500" size={18} /> },
  ];

  return (
    <div className="animate-in fade-in duration-300 bg-white min-h-[70vh] rounded-t-[40px] p-6 shadow-inner">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black text-[#4A0E0E]">نوٹیفیکیشنز</h2>
        <button onClick={onBack} className="p-2 bg-gray-100 rounded-full text-[#4A0E0E]">
          <ArrowRight size={20} />
        </button>
      </div>

      <div className="space-y-4">
        {notifications.map((n) => (
          <div key={n.id} className="flex items-center gap-4 p-4 rounded-2xl bg-[#FDF5F5] border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-all">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
              {n.icon}
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-[#4A0E0E] leading-tight">{n.text}</p>
              <span className="text-[10px] text-gray-400">{n.time}</span>
            </div>
            <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;

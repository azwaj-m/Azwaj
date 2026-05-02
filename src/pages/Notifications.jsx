import React from 'react';
import { Bell, ArrowRight, Heart, MessageCircle, UserPlus, ChevronLeft } from 'lucide-react';

const Notifications = ({ onBack, onNavigate }) => {
  // فرضی ڈیٹا میں 'target' شامل کیا گیا ہے تاکہ معلوم ہو کہاں جانا ہے
  const notifications = [
    { 
      id: 1, 
      type: 'match', 
      text: 'سارہ نے آپ کی پروفائل کو پسند کیا ہے!', 
      time: '2 منٹ پہلے', 
      icon: <Heart className="text-red-500" size={18} />,
      target: 'discover' // یا 'matches' اگر آپ کا الگ پیج ہے
    },
    { 
      id: 2, 
      type: 'message', 
      text: 'احمد کا نیا پیغام موصول ہوا', 
      time: '1 گھنٹہ پہلے', 
      icon: <MessageCircle className="text-blue-500" size={18} />,
      target: 'messages'
    },
    { 
      id: 3, 
      type: 'system', 
      text: 'آپ کی پروفائل 80% مکمل ہے', 
      time: '5 گھنٹے پہلے', 
      icon: <UserPlus className="text-green-500" size={18} />,
      target: 'profile'
    },
  ];

  // نوٹیفیکیشن پر کلک کرنے کا ہینڈلر
  const handleNotificationClick = (target) => {
    if (onNavigate) {
      onNavigate(target);
    }
  };

  return (
    <div className="animate-in fade-in duration-300 bg-white min-h-[80vh] rounded-t-[40px] p-6 shadow-inner relative z-50">
      {/* ہیڈر */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black text-[#4A0E0E]">نوٹیفیکیشنز</h2>
        <button 
          onClick={onBack} 
          className="p-2 bg-gray-100 rounded-full text-[#4A0E0E] hover:bg-[#D4AF37]/20 transition-colors"
        >
          <ArrowRight size={20} />
        </button>
      </div>

      {/* نوٹیفیکیشن لسٹ */}
      <div className="space-y-4">
        {notifications.map((n) => (
          <div 
            key={n.id} 
            onClick={() => handleNotificationClick(n.target)}
            className="flex items-center gap-4 p-4 rounded-2xl bg-[#FDF5F5] border border-[#D4AF37]/10 hover:border-[#D4AF37]/40 hover:shadow-md transition-all cursor-pointer active:scale-[0.98]"
          >
            {/* آئیکن ہولڈر */}
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-50">
              {n.icon}
            </div>

            {/* متن اور وقت */}
            <div className="flex-1 text-right">
              <p className="text-sm font-bold text-[#4A0E0E] leading-tight">{n.text}</p>
              <span className="text-[10px] text-gray-400 mt-1 block">{n.time}</span>
            </div>

            {/* ایکشن انڈیکیٹر */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
              <ChevronLeft size={14} className="text-[#D4AF37]/50" />
            </div>
          </div>
        ))}
      </div>

      {/* اگر نوٹیفیکیشن نہ ہوں */}
      {notifications.length === 0 && (
        <div className="text-center py-20 opacity-30">
          <Bell size={48} className="mx-auto mb-4" />
          <p className="font-bold">کوئی نیا نوٹیفیکیشن نہیں ہے</p>
        </div>
      )}
    </div>
  );
};

export default Notifications;

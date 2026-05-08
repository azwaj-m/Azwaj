import React, { useEffect } from 'react';
import { Bell, X, MessageCircle, Heart, Eye } from 'lucide-react';

const NotificationToast = ({ notification, onClose }) => {
  useEffect(() => {
    // 4 سیکنڈ کے بعد نوٹیفکیشن خود بخود غائب ہو جائے گا
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [notification, onClose]);

  if (!notification) return null;

  // نوٹیفکیشن کی قسم کے حساب سے آئیکن منتخب کریں
  const getIcon = () => {
    switch (notification.type) {
      case 'chat':
        return <MessageCircle className="text-emerald-500" size={20} />;
      case 'like':
        return <Heart className="text-rose-500 fill-rose-500" size={20} />;
      case 'photo_request':
        return <Eye className="text-amber-500" size={20} />;
      default:
        return <Bell className="text-[#D4AF37]" size={20} />;
    }
  };

  return (
    <div 
      className="fixed top-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-white/95 backdrop-blur-md rounded-3xl p-4 shadow-2xl border border-gray-100 z-[9999] flex items-center gap-3 animate-slide-in select-none"
      dir="rtl"
    >
      {/* آئیکن ہولڈر */}
      <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center flex-shrink-0">
        {getIcon()}
      </div>

      {/* ٹیکسٹ کا حصہ */}
      <div className="flex-1 text-right">
        <h4 className="text-xs font-black text-[#4A0E0E]">{notification.title}</h4>
        <p className="text-[10px] font-bold text-gray-500 mt-0.5">{notification.message}</p>
      </div>

      {/* بند کرنے کا بٹن */}
      <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition">
        <X size={16} className="text-gray-400" />
      </button>
    </div>
  );
};

export default NotificationToast;

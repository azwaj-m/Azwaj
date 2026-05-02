import React, { useState } from 'react';
import { 
  Bell, Heart, MessageCircle, Eye, CheckCircle, 
  UserPlus, ShieldAlert, Gift, Settings, Clock 
} from 'lucide-react';

const Notifications = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  // فرضی ڈیٹا (بعد میں آپ اسے ڈیٹا بیس سے جوڑ سکتے ہیں)
  const notificationsData = [
    {
      id: 1,
      type: 'match',
      title: 'نیا میچ!',
      desc: 'ماریا نے آپ کی پروفائل پسند کی ہے۔',
      time: '2 منٹ پہلے',
      icon: Heart,
      color: 'text-red-500',
      bg: 'bg-red-50',
      unread: true
    },
    {
      id: 2,
      type: 'message',
      title: 'نیا پیغام',
      desc: 'عثمان نے آپ کو پیغام بھیجا: "السلام علیکم..."',
      time: '15 منٹ پہلے',
      icon: MessageCircle,
      color: 'text-blue-500',
      bg: 'bg-blue-50',
      unread: true
    },
    {
      id: 3,
      type: 'view',
      title: 'پروفائل ویو',
      desc: 'سارہ نے آپ کی پروفائل دیکھی ہے۔',
      time: '1 گھنٹہ پہلے',
      icon: Eye,
      color: 'text-amber-500',
      bg: 'bg-amber-50',
      unread: false
    },
    {
      id: 4,
      type: 'system',
      title: 'پروفائل ویریفائیڈ',
      desc: 'مبارک ہو! آپ کی پروفائل کی تصدیق ہو گئی ہے۔',
      time: '2 گھنٹے پہلے',
      icon: CheckCircle,
      color: 'text-green-500',
      bg: 'bg-green-50',
      unread: false
    }
  ];

  const filters = ['All', 'New Matches', 'Messages', 'System'];

  return (
    <div className="flex flex-col h-full bg-[#FDF5F5] animate-in fade-in duration-500">
      
      {/* ہیڈر سیکشن */}
      <div className="bg-gradient-to-b from-[#4A0E0E] to-[#631212] p-6 pb-10 rounded-b-[40px] shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <button className="bg-white/10 p-2 rounded-xl text-white">
            <Settings size={20} />
          </button>
          <h2 className="text-xl font-black text-[#D4AF37] tracking-wider uppercase">Notifications</h2>
          <div className="w-10"></div>
        </div>

        {/* فلٹرز */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2" dir="rtl">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-full text-[11px] font-bold whitespace-nowrap transition-all ${
                activeFilter === f 
                ? 'bg-[#D4AF37] text-[#4A0E0E] shadow-md scale-105' 
                : 'bg-white/10 text-white/70 border border-white/5'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* نوٹیفیکیشن لسٹ */}
      <div className="flex-1 -mt-6 px-4 space-y-3 pb-32 overflow-y-auto no-scrollbar" dir="rtl">
        {notificationsData.map((notif) => (
          <div 
            key={notif.id}
            className={`p-4 rounded-[30px] flex items-center gap-4 border transition-all active:scale-[0.98] ${
              notif.unread ? 'bg-white border-[#D4AF37]/30 shadow-md' : 'bg-white/50 border-gray-100'
            }`}
          >
            {/* آئکن */}
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${notif.bg}`}>
              <notif.icon className={notif.color} size={24} />
            </div>

            {/* متن */}
            <div className="flex-1 min-w-0 text-right">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-gray-400 font-medium flex items-center gap-1">
                  {notif.time} <Clock size={10} />
                </span>
                <h4 className="text-sm font-black text-[#4A0E0E] truncate">{notif.title}</h4>
              </div>
              <p className="text-[12px] text-gray-600 leading-tight line-clamp-2">
                {notif.desc}
              </p>
            </div>

            {/* ان ریڈ ڈاٹ */}
            {notif.unread && (
              <div className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
            )}
          </div>
        ))}

        {/* خالی حالت (Empty State) */}
        {notificationsData.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 opacity-30">
            <Bell size={60} className="mb-4" />
            <p className="font-bold">کوئی نیا نوٹیفیکیشن نہیں ہے</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;

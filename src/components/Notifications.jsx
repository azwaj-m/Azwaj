import React from 'react';
import { useTranslation } from 'react-i18next';
import { MessageCircle, Heart, Crown, User, ChevronLeft, Clock, Star, Eye } from 'lucide-react';

const Notifications = ({ setActiveTab, setCurrentView }) => {
  const { t } = useTranslation();

  // نوٹیفیکیشنز کا ڈیٹا کیٹیگری اور اردو ترجمے کے ساتھ
  const sections = [
    {
      title: t('new_notifications', 'نئے نوٹیفیکیشنز'),
      data: [
        {
          id: 1,
          title: t('notif_msg_title', 'عائشہ خان نے آپ کو پیغام بھیجا ہے'),
          time: t('2_mins_ago', '۲ منٹ پہلے'),
          icon: <MessageCircle size={16} />,
          bgColor: 'bg-emerald-50',
          iconColor: 'text-emerald-600',
          target: { tab: 'chat', view: 'main' }
        },
        {
          id: 2,
          title: t('notif_premium_title', 'پریمیم آفر: 50% خصوصی ڈسکاؤنٹ'),
          time: t('just_now', 'ابھی ابھی'),
          icon: <Crown size={16} />,
          bgColor: 'bg-amber-50',
          iconColor: 'text-amber-600',
          target: { tab: 'home', view: 'premium' }
        }
      ]
    },
    {
      title: t('earlier_notifications', 'پہلے کے نوٹیفیکیشنز'),
      data: [
        {
          id: 3,
          title: t('notif_like_title', 'کسی صارف نے آپ کی پروفائل کو پسند کیا ہے'),
          time: t('3_hours_ago', '۳ گھنٹے پہلے'),
          icon: <Heart size={16} />,
          bgColor: 'bg-rose-50',
          iconColor: 'text-rose-600',
          target: { tab: 'notifications', view: 'main' }
        },
        {
          id: 4,
          title: t('notif_photo_req_title', 'کسی نے آپ کی تصویر صاف دیکھنے کی درخواست کی ہے'),
          time: t('4_hours_ago', '۴ گھنٹے پہلے'),
          icon: <Eye size={16} />,
          bgColor: 'bg-blue-50',
          iconColor: 'text-blue-600',
          target: { tab: 'notifications', view: 'main' }
        },
        {
          id: 5,
          title: t('notif_views_title', 'آپ کی پروفائل کو ۵ لوگوں نے دیکھا ہے'),
          time: t('5_hours_ago', '۵ گھنٹے پہلے'),
          icon: <User size={16} />,
          bgColor: 'bg-purple-50',
          iconColor: 'text-purple-600',
          target: { tab: 'profile', view: 'main' }
        }
      ]
    }
  ];

  const handleNotificationClick = (target) => {
    if (target.tab) setActiveTab(target.tab);
    if (target.view) setCurrentView(target.view);
  };

  return (
    <div className="bg-[#FDF5F5] min-h-full pb-20 animate-in fade-in duration-500" dir="rtl">
      
      {/* ہیڈر */}
      <div className="p-4 flex justify-between items-center bg-white border-b border-gray-100 sticky top-0 z-10">
        <h2 className="text-[#4A0E0E] text-lg font-black font-serif">
          {t('activity_title', 'سرگرمیاں')}
        </h2>
        <button className="text-[10px] font-bold text-[#D4AF37] bg-[#4A0E0E] px-4 py-1.5 rounded-full transition active:scale-95">
          {t('mark_all_read', 'سب کو پڑھا ہوا نشان زد کریں')}
        </button>
      </div>

      <div className="p-4 space-y-6">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-3">
            {/* سیکشن ٹائٹل */}
            <div className="flex items-center gap-2 px-1">
              <span className="text-[#4A0E0E] font-black text-xs tracking-wider">{section.title}</span>
              <div className="flex-1 h-[1px] bg-gray-200"></div>
            </div>

            {/* نوٹیفیکیشن کارڈز */}
            <div className="space-y-2">
              {section.data.map((n) => (
                <div 
                  key={n.id}
                  onClick={() => handleNotificationClick(n.target)}
                  className="bg-white p-3.5 rounded-2xl flex items-center justify-between shadow-sm border border-transparent active:border-[#D4AF37]/50 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className={`${n.bgColor} ${n.iconColor} p-2.5 rounded-xl flex-shrink-0`}>
                      {n.icon}
                    </div>
                    <div className="text-right">
                      <h4 className="text-[#4A0E0E] font-bold text-[11px] leading-tight">{n.title}</h4>
                      <div className="flex items-center gap-1 mt-1 text-gray-400">
                        <Clock size={8} />
                        <span className="text-[9px] font-medium">{n.time}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronLeft size={14} className="text-gray-300" />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* پریمیم سجیشن کارڈ */}
        <div className="mt-8 bg-gradient-to-r from-[#4A0E0E] to-[#631919] p-5 rounded-[30px] shadow-lg relative overflow-hidden text-right">
          <Star className="absolute -left-2 -top-2 text-[#D4AF37] opacity-20" size={60} />
          <h3 className="text-[#D4AF37] font-black text-xs italic">{t('top_suggestion', 'بہترین تجویز')}</h3>
          <p className="text-white text-[10px] mt-1.5 opacity-90">
            {t('complete_profile_tip', '۳ گنا زیادہ رشتے حاصل کرنے کے لیے اپنی پروفائل کو مکمل کریں!')}
          </p>
          <button 
            onClick={() => setCurrentView('edit_profile')}
            className="mt-3.5 bg-[#D4AF37] hover:bg-[#b8952e] text-[#4A0E0E] text-[9px] font-black px-4 py-1.5 rounded-lg transition active:scale-95"
          >
            {t('update_now', 'ابھی اپ ڈیٹ کریں')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;

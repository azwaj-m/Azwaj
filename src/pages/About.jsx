import React from 'react';
import { ShieldCheck, Heart, Users, Globe, Lock, CheckCircle, ArrowRight } from 'lucide-react';

const About = ({ onBack }) => {
  const features = [
    {
      icon: <ShieldCheck className="text-[#D4AF37]" size={28} />,
      title: "مکمل رازداری",
      desc: "آپ کا ڈیٹا اور تصاویر ہمارے محفوظ سرورز پر انکرپٹڈ رہتی ہیں۔"
    },
    {
      icon: <CheckCircle className="text-[#D4AF37]" size={28} />,
      title: "تصدیق شدہ پروفائلز",
      desc: "ہر پروفائل کی مینوئل ویریفیکیشن کی جاتی ہے تاکہ صرف سنجیدہ لوگ شامل ہوں۔"
    },
    {
      icon: <Heart className="text-[#D4AF37]" size={28} />,
      title: "اسلامی اقدار",
      desc: "ہماری ایپ مکمل طور پر اسلامی اور خاندانی روایات کے مطابق ڈیزائن کی گئی ہے۔"
    }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-right duration-500 bg-[#FDF5F5] min-h-screen pb-20 text-right" dir="rtl">
      {/* ہیڈر سیکشن */}
      <div className="bg-[#4A0E0E] p-8 rounded-b-[50px] shadow-2xl relative overflow-hidden">
        <div className="absolute top-[-20px] left-[-20px] w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
        <button onClick={onBack} className="mb-6 bg-white/10 p-2 rounded-full text-white">
          <ArrowRight size={20} />
        </button>
        <div className="text-center">
          <img src="/images/Logo.png" alt="Azwaj" className="w-24 h-24 mx-auto mb-4 object-contain" />
          <h1 className="text-4xl font-serif font-bold text-[#D4AF37] mb-2">ازواج</h1>
          <p className="text-white/60 text-sm font-medium">سنجیدہ رشتوں کا بااعتماد پلیٹ فارم</p>
        </div>
      </div>

      <div className="px-6 -mt-8">
        {/* تعارف کارڈ */}
        <div className="bg-white p-6 rounded-[35px] shadow-xl border border-red-50 mb-8">
          <h2 className="text-xl font-black text-[#4A0E0E] mb-4">ہمارا مقصد</h2>
          <p className="text-sm text-gray-600 leading-relaxed font-medium">
            ازواج کا قیام اس مقصد کے لیے عمل میں لایا گیا ہے کہ مسلمان بھائیوں اور بہنوں کو ایک ایسا پلیٹ فارم مہیا کیا جائے جہاں وہ مکمل پرائیویسی اور عزت و احترام کے ساتھ اپنے جیون ساتھی کی تلاش کر سکیں۔ ہم جدید ٹیکنالوجی کو روایتی اقدار کے ساتھ ملا کر ایک محفوظ ماحول فراہم کرتے ہیں۔
          </p>
        </div>

        {/* خصوصیات */}
        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-black text-[#4A0E0E] pr-2">ہم کیوں؟</h3>
          {features.map((item, idx) => (
            <div key={idx} className="bg-white p-5 rounded-[30px] flex items-center gap-4 border border-red-50 shadow-sm">
              <div className="bg-[#FDF5F5] p-3 rounded-2xl">
                {item.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-[#4A0E0E] text-md">{item.title}</h4>
                <p className="text-[11px] text-gray-500 font-medium">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ورژن اور کاپی رائٹ */}
        <div className="text-center py-6 border-t border-red-100">
          <div className="flex justify-center gap-6 mb-4">
            <Globe className="text-[#4A0E0E]/40" size={20} />
            <Lock className="text-[#4A0E0E]/40" size={20} />
            <Users className="text-[#4A0E0E]/40" size={20} />
          </div>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Version 1.0.2 - Tezro Ecosystem</p>
          <p className="text-[11px] text-[#4A0E0E] mt-1 font-black">© 2026 ازواج میرج بیورو۔ تمام حقوق محفوظ ہیں۔</p>
        </div>
      </div>
    </div>
  );
};

export default About;

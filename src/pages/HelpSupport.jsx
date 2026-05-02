import React, { useState } from 'react';
import { 
  ArrowRight, Mail, MessageSquare, Phone, 
  ChevronDown, ChevronUp, HelpCircle, ShieldCheck, 
  AlertCircle 
} from 'lucide-react';

const HelpSupport = ({ onBack }) => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "کیا میری معلومات محفوظ ہیں؟",
      a: "جی ہاں، ازواج ایپ پر آپ کا تمام ڈیٹا انکرپٹڈ ہے اور ہم کبھی بھی آپ کی اجازت کے بغیر معلومات تیسرے فریق کو فراہم نہیں کرتے۔"
    },
    {
      q: "پریمیم ممبرشپ کے کیا فوائد ہیں؟",
      a: "پریمیم ممبرز براہ راست چیٹ کر سکتے ہیں، پروفائلز کو لائک کر سکتے ہیں اور تلاش کے بہتر فلٹرز استعمال کر سکتے ہیں۔"
    },
    {
      q: "جعلی پروفائل کی رپورٹ کیسے کریں؟",
      a: "کسی بھی پروفائل پر جا کر 'رپورٹ' کے بٹن کو دبائیں یا براہ راست سپورٹ ٹیم کو ای میل کریں۔"
    }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-right duration-500 bg-[#FDF5F5] min-h-screen pb-20 text-right" dir="rtl">
      {/* ہیڈر */}
      <div className="bg-[#4A0E0E] p-8 rounded-b-[50px] shadow-xl text-white relative overflow-hidden">
        <button onClick={onBack} className="mb-4 bg-white/10 p-2 rounded-full">
          <ArrowRight size={20} />
        </button>
        <div className="flex items-center justify-between">
          <HelpCircle size={40} className="text-[#D4AF37]" />
          <div>
            <h1 className="text-3xl font-black text-[#D4AF37]">مدد و تعاون</h1>
            <p className="text-white/60 text-xs">ہم آپ کی خدمت کے لیے حاضر ہیں</p>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-6">
        {/* کوئیک سپورٹ کارڈز */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-5 rounded-[30px] shadow-md border border-red-50 flex flex-col items-center text-center">
            <div className="bg-blue-50 p-3 rounded-2xl mb-2 text-blue-600">
              <Mail size={24} />
            </div>
            <span className="text-[10px] font-bold text-gray-500 uppercase">ای میل</span>
            <p className="text-[11px] font-black text-[#4A0E0E]">support@azwaj.com</p>
          </div>
          <div className="bg-white p-5 rounded-[30px] shadow-md border border-red-50 flex flex-col items-center text-center">
            <div className="bg-green-50 p-3 rounded-2xl mb-2 text-green-600">
              <MessageSquare size={24} />
            </div>
            <span className="text-[10px] font-bold text-gray-500 uppercase">واٹس ایپ</span>
            <p className="text-[11px] font-black text-[#4A0E0E]">0300-1234567</p>
          </div>
        </div>

        {/* FAQs سیکشن */}
        <div className="space-y-4 mb-8">
          <h2 className="text-lg font-black text-[#4A0E0E] pr-2">عام سوالات</h2>
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-[25px] shadow-sm border border-red-50 overflow-hidden">
              <button 
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 flex items-center justify-between text-right"
              >
                {openFaq === idx ? <ChevronUp size={18} className="text-[#D4AF37]" /> : <ChevronDown size={18} className="text-gray-400" />}
                <span className="text-sm font-bold text-[#4A0E0E]">{faq.q}</span>
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 animate-in slide-in-from-top duration-300">
                  <p className="text-xs text-gray-500 leading-relaxed font-medium bg-[#FDF5F5] p-3 rounded-xl">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* سیکیورٹی الرٹ */}
        <div className="bg-gradient-to-r from-[#D4AF37]/10 to-transparent p-5 rounded-[30px] border border-[#D4AF37]/30 flex items-center gap-4">
          <div className="p-3 bg-white rounded-2xl shadow-sm">
             <ShieldCheck className="text-[#4A0E0E]" size={24} />
          </div>
          <div>
            <h4 className="text-sm font-black text-[#4A0E0E]">محفوظ رہیے!</h4>
            <p className="text-[10px] text-gray-500 font-medium leading-tight">کبھی بھی اپنا پاس ورڈ یا بینکنگ معلومات کسی کو نہ دیں۔</p>
          </div>
        </div>

        <button 
          onClick={() => window.open('tel:03001234567')}
          className="w-full mt-8 bg-[#4A0E0E] text-[#D4AF37] py-4 rounded-2xl font-black shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <Phone size={20} /> براہ راست کال کریں
        </button>
      </div>
    </div>
  );
};

export default HelpSupport;

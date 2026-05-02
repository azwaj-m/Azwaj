import React from 'react';
import { Check, Crown, Star, ShieldCheck } from 'lucide-react';

const Subscription = ({ onUpgrade }) => {
  const plans = [
    {
      name: "SILVER",
      duration: "1 MONTH",
      price: "$19.99",
      color: "from-gray-300 to-gray-500",
      icon: <Star className="text-gray-600" size={30} />,
      btnBg: "bg-gray-700"
    },
    {
      name: "GOLD",
      duration: "3 MONTHS",
      price: "$39.99",
      color: "from-[#D4AF37] to-[#BF953F]",
      icon: <Crown className="text-[#4A0E0E]" size={35} />,
      btnBg: "bg-[#4A0E0E]",
      popular: true
    },
    {
      name: "PLATINUM",
      duration: "6 MONTHS",
      price: "$59.99",
      color: "from-gray-100 to-gray-400",
      icon: <Crown className="text-gray-800" size={30} />,
      btnBg: "bg-gray-800"
    }
  ];

  const features = [
    "Send Unlimited Messages",
    "Full Profile Access",
    "Highlighted Profile Badge",
    "See Visitors Who Viewed You"
  ];

  return (
    <div className="min-h-full bg-[#FDF5F5] pb-20 animate-in fade-in duration-700">
      {/* ٹاپ بینر */}
      <div className="relative h-56 bg-[#4A0E0E] rounded-b-[50px] flex flex-col items-center justify-center p-6 text-center shadow-2xl overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]"></div>
        <Crown className="text-[#D4AF37] mb-2 animate-bounce" size={40} />
        <h1 className="text-[#D4AF37] text-3xl font-black tracking-widest uppercase italic">Premium Access</h1>
        <p className="text-white/80 text-sm mt-2 font-medium">Unlock your destiny with our exclusive features</p>
      </div>

      {/* فیچرز لسٹ */}
      <div className="mx-6 -mt-8 bg-white rounded-[30px] p-6 shadow-xl border border-[#D4AF37]/20 relative z-10">
        <div className="grid grid-cols-1 gap-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="bg-[#D4AF37]/20 p-1 rounded-full">
                <Check className="text-[#4A0E0E]" size={16} strokeWidth={3} />
              </div>
              <span className="text-[#4A0E0E] font-bold text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* پلان کارڈز */}
      <div className="mt-8 px-4 grid grid-cols-3 gap-3">
        {plans.map((plan, index) => (
          <div 
            key={index} 
            className={`relative flex flex-col items-center p-4 rounded-[25px] border-2 shadow-lg transition-transform active:scale-95 ${
              plan.popular ? 'border-[#D4AF37] bg-white scale-105 z-20' : 'border-gray-200 bg-white/50'
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3 bg-[#4A0E0E] text-[#D4AF37] text-[8px] font-black px-2 py-1 rounded-full">MOST POPULAR</span>
            )}
            
            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center mb-3 shadow-md`}>
              {plan.icon}
            </div>

            <h3 className="text-[#4A0E0E] font-black text-xs tracking-tighter">{plan.name}</h3>
            <p className="text-gray-500 text-[9px] font-bold mb-2">{plan.duration}</p>
            <div className="text-[#4A0E0E] font-black text-sm mb-4">{plan.price}</div>
            
            <button 
              onClick={() => onUpgrade && onUpgrade()}
              className={`w-full py-2 rounded-xl text-[10px] font-black text-white shadow-md uppercase tracking-wider ${plan.btnBg}`}
            >
              Subscribe
            </button>
          </div>
        ))}
      </div>

      {/* فوٹر ٹیکسٹ */}
      <div className="mt-10 px-10 text-center">
        <div className="flex items-center justify-center gap-2 text-gray-400 mb-2">
          <ShieldCheck size={16} />
          <span className="text-[10px]">Secure Encrypted Payment</span>
        </div>
        <p className="text-gray-400 text-[10px] leading-relaxed">
          Your subscription will renew automatically. <br />
          Cancel anytime from settings.
        </p>
      </div>
    </div>
  );
};

export default Subscription;

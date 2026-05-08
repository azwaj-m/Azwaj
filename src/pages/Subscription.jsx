import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '../context/UserContext';
import { PaymentService } from '../services/PaymentService';
import { Crown, Check, ShieldCheck, CreditCard, Lock, Smartphone, RefreshCw } from 'lucide-react';

const Subscription = () => {
  const { t } = useTranslation();
  const { userData, setUserData } = useUser();
  const [selectedPlan, setSelectedPlan] = useState('diamond_three_months');
  const [paymentMethod, setPaymentMethod] = useState('easypaisa'); // easypaisa, jazzcash
  const [mobileNumber, setMobileNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const plans = PaymentService.getPlans();
  const activePlan = plans.find(p => p.id === selectedPlan);

  const handlePay = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPaymentStatus(null);

    const result = await PaymentService.processPayment({
      planId: selectedPlan,
      paymentMethod,
      mobileNumber
    });

    setLoading(false);
    if (result.success) {
      setPaymentStatus({ success: true, message: result.message, txId: result.txId });
      // گلوبل اسٹیٹ اپ ڈیٹ کریں
      if (setUserData) {
        setUserData(prev => ({
          ...prev,
          isPremium: true,
          premiumPlan: selectedPlan
        }));
      }
    } else {
      setPaymentStatus({ success: false, message: result.message });
    }
  };

  return (
    <div className="bg-[#FDF5F5] min-h-screen pb-24 text-right" dir="rtl">
      {/* ہیڈر */}
      <div className="bg-gradient-to-l from-[#4A0E0E] to-[#631212] text-white p-8 rounded-b-[45px] text-center relative overflow-hidden shadow-lg">
        <Crown className="mx-auto text-[#D4AF37] mb-2 animate-bounce" size={40} />
        <h1 className="text-xl font-black font-serif text-[#D4AF37] mb-2">ازواج پریمیم ممبرشپ</h1>
        <p className="text-[11px] text-white/80 max-w-xs mx-auto">
          بہترین اور تصدیق شدہ ازدواجی رشتوں سے براہ راست واٹس ایپ اور فون پر فوری رابطہ کریں۔
        </p>
      </div>

      <div className="p-4 max-w-md mx-auto space-y-6">
        {/* پلانز کا انتخاب */}
        <div className="space-y-3">
          <h3 className="font-black text-xs text-[#4A0E0E] px-1">۱۔ اپنا پریمیم پلان منتخب کریں:</h3>
          <div className="grid grid-cols-1 gap-3">
            {plans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`p-4 rounded-3xl border-2 transition-all cursor-pointer relative bg-white ${
                  selectedPlan === plan.id 
                    ? 'border-[#D4AF37] bg-amber-50/10 shadow-md' 
                    : 'border-transparent shadow-sm hover:border-gray-200'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-2.5 left-4 bg-[#D4AF37] text-[#4A0E0E] text-[8px] font-black px-2.5 py-1 rounded-full uppercase">
                    سب سے مقبول
                  </span>
                )}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedPlan === plan.id ? 'border-[#D4AF37]' : 'border-gray-300'
                    }`}>
                      {selectedPlan === plan.id && <div className="w-2.5 h-2.5 bg-[#D4AF37] rounded-full" />}
                    </div>
                    <div>
                      <h4 className="font-black text-xs text-[#4A0E0E]">{plan.name}</h4>
                      <p className="text-[9px] text-gray-400 mt-0.5">مدت: {plan.duration}</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <span className="text-base font-black text-[#4A0E0E]">Rs. {plan.price}</span>
                    <p className="text-[8px] text-gray-400">یک وقتی ادائیگی</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* منتخب شدہ پلان کے فیچرز */}
        {activePlan && (
          <div className="bg-white p-5 rounded-[30px] shadow-sm border border-red-50/50 space-y-3">
            <h4 className="font-black text-[11px] text-[#4A0E0E] flex items-center gap-1.5 border-b pb-2">
              <Crown size={14} className="text-[#D4AF37]" />
              شامل فیچرز:
            </h4>
            <ul className="space-y-2">
              {activePlan.features.map((feat, idx) => (
                <li key={idx} className="flex items-center gap-2 text-[10px] font-bold text-gray-600">
                  <Check size={14} className="text-emerald-500 flex-shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ادائیگی کا فارم */}
        <div className="bg-white p-6 rounded-[35px] shadow-sm border border-red-50/50 space-y-4">
          <h3 className="font-black text-xs text-[#4A0E0E] border-b pb-2">۲۔ موبائل اکاؤنٹ سے ادائیگی کریں</h3>
          
          {/* ادائیگی کا طریقہ منتخب کریں */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setPaymentMethod('easypaisa')}
              className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-1.5 transition ${
                paymentMethod === 'easypaisa' ? 'border-[#3bb34a] bg-emerald-50/20' : 'border-gray-100 hover:border-gray-200'
              }`}
            >
              <Smartphone size={20} className={paymentMethod === 'easypaisa' ? 'text-[#3bb34a]' : 'text-gray-400'} />
              <span className="text-[10px] font-black text-[#3bb34a]">EasyPaisa</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('jazzcash')}
              className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-1.5 transition ${
                paymentMethod === 'jazzcash' ? 'border-[#e62020] bg-rose-50/10' : 'border-gray-100 hover:border-gray-200'
              }`}
            >
              <Smartphone size={20} className={paymentMethod === 'jazzcash' ? 'text-[#e62020]' : 'text-gray-400'} />
              <span className="text-[10px] font-black text-[#e62020]">JazzCash</span>
            </button>
          </div>

          <form onSubmit={handlePay} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 mb-1.5">اپنا موبائل اکاؤنٹ نمبر درج کریں:</label>
              <input
                type="tel"
                placeholder="مثال: 03001234567"
                required
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                disabled={loading}
                className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-100 focus:border-[#D4AF37] focus:bg-white transition text-center font-bold text-sm tracking-widest placeholder-gray-300"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-[#4A0E0E] text-[#D4AF37] rounded-2xl font-black text-xs flex items-center justify-center gap-2 transition hover:bg-[#320808] active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="animate-spin" size={14} />
                  ادائیگی کا عمل جاری ہے...
                </>
              ) : (
                <>
                  <Lock size={14} />
                  محفوظ ادائیگی کریں (Rs. {activePlan?.price})
                </>
              )}
            </button>
          </form>

          {/* سیکیورٹی نوٹس */}
          <div className="flex items-center justify-center gap-1.5 text-gray-400 text-[8px] font-bold">
            <ShieldCheck size={12} className="text-emerald-500" />
            256-Bit SSL انکرپٹڈ محفوظ ترین نظام
          </div>
        </div>

        {/* پیمنٹ رزلٹ الرٹس */}
        {paymentStatus && (
          <div className={`p-4 rounded-3xl text-center space-y-2 border animate-in fade-in ${
            paymentStatus.success 
              ? 'bg-emerald-50 border-emerald-100 text-emerald-800' 
              : 'bg-rose-50 border-rose-100 text-rose-800'
          }`}>
            <h4 className="font-black text-xs">{paymentStatus.success ? "شاندار کامیابی!" : "ادائیگی میں ناکامی"}</h4>
            <p className="text-[10px] font-bold leading-relaxed">{paymentStatus.message}</p>
            {paymentStatus.success && (
              <p className="text-[9px] font-mono opacity-70">ٹرانزیکشن ID: {paymentStatus.txId}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Subscription;

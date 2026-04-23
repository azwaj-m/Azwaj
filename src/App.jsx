import React, { useState, useEffect } from 'react';
import { db, auth } from './utils/firebase';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signInWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber 
} from 'firebase/auth';
import { collection, query, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import { Mail, Phone, Lock, Settings, Mic, Home, MessageCircle, Heart, User, ShieldCheck } from 'lucide-react';
import ProfileSettings from './components/ProfileSettings';

import 'swiper/css';
import 'swiper/css/effect-cards';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loginMethod, setLoginMethod] = useState(null); // 'email', 'phone', 'google'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 🛡️ فون OTP لاگ ان لاجک
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible'
      });
    }
  };

  const handlePhoneSignIn = async () => {
    setupRecaptcha();
    try {
      const result = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
      setConfirmationResult(result);
      alert("OTP بھیج دیا گیا ہے");
    } catch (error) { alert("نمبر غلط ہے یا فارمیٹ درست نہیں (+923...)"); }
  };

  const verifyOtp = async () => {
    try {
      await confirmationResult.confirm(otp);
    } catch (error) { alert("OTP غلط ہے"); }
  };

  // 📧 ای میل لاگ ان
  const handleEmailLogin = () => {
    signInWithEmailAndPassword(auth, email, password).catch(err => alert("ای میل یا پاس ورڈ غلط ہے"));
  };

  // 🌐 گوگل لاگ ان
  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  if (loading) return <div className="min-h-screen bg-[#4A0E0E] flex items-center justify-center text-[#D4AF37]">لوڈ ہو رہا ہے...</div>;

  // --- لاگ ان اسکرین ---
  if (!user) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-[#4A0E0E] p-8 flex flex-col justify-center items-center text-[#D4AF37]">
        <img src="/images/Logo.png" className="w-24 mb-6 shadow-2xl" alt="Logo" />
        <h1 className="text-2xl font-black mb-8 italic">AZWAJ SECURE LOGIN</h1>

        <div id="recaptcha-container"></div>

        {!loginMethod ? (
          <div className="w-full space-y-4">
            <button onClick={() => setLoginMethod('phone')} className="w-full bg-white/10 p-4 rounded-2xl flex items-center gap-4 border border-[#D4AF37]/20 hover:bg-white/20">
              <Phone size={20} /> فون نمبر سے لاگ ان
            </button>
            <button onClick={() => setLoginMethod('email')} className="w-full bg-white/10 p-4 rounded-2xl flex items-center gap-4 border border-[#D4AF37]/20 hover:bg-white/20">
              <Mail size={20} /> ای میل سے لاگ ان
            </button>
            <button onClick={handleGoogleLogin} className="w-full bg-white text-gray-800 p-4 rounded-2xl flex items-center gap-4 font-bold">
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5" /> گوگل سے لاگ ان
            </button>
          </div>
        ) : (
          <div className="w-full space-y-4 animate-in fade-in slide-in-from-bottom-4">
            {loginMethod === 'phone' && (
              <>
                {!confirmationResult ? (
                  <div className="space-y-4">
                    <input type="text" placeholder="+923000000000" onChange={(e)=>setPhone(e.target.value)} className="w-full p-4 rounded-xl bg-white/5 border border-[#D4AF37]/30 outline-none text-white" />
                    <button onClick={handlePhoneSignIn} className="w-full bg-[#D4AF37] text-[#4A0E0E] p-4 rounded-xl font-bold">OTP بھیجیں</button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <input type="text" placeholder="6 ہندسوں کا کوڈ" onChange={(e)=>setOtp(e.target.value)} className="w-full p-4 rounded-xl bg-white/5 border border-[#D4AF37]/30 outline-none text-white text-center tracking-[10px]" />
                    <button onClick={verifyOtp} className="w-full bg-green-600 text-white p-4 rounded-xl font-bold">تصدیق کریں</button>
                  </div>
                )}
              </>
            )}

            {loginMethod === 'email' && (
              <div className="space-y-4">
                <input type="email" placeholder="ای میل" onChange={(e)=>setEmail(e.target.value)} className="w-full p-4 rounded-xl bg-white/5 border border-[#D4AF37]/30 outline-none text-white" />
                <input type="password" placeholder="پاس ورڈ" onChange={(e)=>setPassword(e.target.value)} className="w-full p-4 rounded-xl bg-white/5 border border-[#D4AF37]/30 outline-none text-white" />
                <button onClick={handleEmailLogin} className="w-full bg-[#D4AF37] text-[#4A0E0E] p-4 rounded-xl font-bold">داخل ہوں</button>
              </div>
            )}
            
            <button onClick={() => {setLoginMethod(null); setConfirmationResult(null);}} className="w-full text-xs opacity-50 underline mt-4 text-center">واپس جائیں</button>
          </div>
        )}
        
        <div className="mt-12 flex items-center gap-2 text-[10px] opacity-40">
           <ShieldCheck size={14} /> سیکیورٹی پروٹیکشن آن ہے
        </div>
      </div>
    );
  }

  // --- ہوم اسکرین (لاگ ان کے بعد) ---
  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FDF5F5] pb-28 relative">
       {/* یہاں آپ کا پرانا کارڈ سوائپر اور ہیڈر والا کوڈ آئے گا جو ہم نے پہلے بنایا تھا */}
       {/* بس اس میں 'showSettings' کی لاجک شامل رہے گی */}
       <div className="bg-[#4A0E0E] p-6 pb-20 rounded-b-[60px] flex justify-between items-center shadow-xl">
          <img src="/images/Logo.png" className="h-10" />
          <div className="flex gap-4">
             <Settings className="text-[#D4AF37] cursor-pointer" onClick={() => setShowSettings(true)} />
             <button onClick={() => auth.signOut()} className="text-[#D4AF37] text-xs border border-[#D4AF37]/30 px-3 py-1 rounded-full">LOGOUT</button>
          </div>
       </div>

       <div className="p-10 text-center text-[#4A0E0E]">
          <h2 className="text-xl font-bold italic">خوش آمدید، {user.displayName || user.email || user.phoneNumber}</h2>
          <p className="text-sm opacity-60">آپ کامیابی سے لاگ ان ہو چکے ہیں</p>
       </div>

       {showSettings && (
         <div className="fixed inset-0 z-[500] bg-black/60 backdrop-blur-md flex items-end">
            <div className="w-full bg-white rounded-t-[40px] relative animate-in slide-in-from-bottom">
               <button onClick={() => setShowSettings(false)} className="absolute top-4 right-6 font-bold text-gray-400">X</button>
               <ProfileSettings userProfile={{}} lang="ur" />
            </div>
         </div>
       )}

       {/* فوٹر نیویگیشن */}
       <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-[#4A0E0E] p-4 flex justify-around rounded-full shadow-2xl z-[100]">
          <Home className="text-[#D4AF37]" size={24}/>
          <div className="bg-[#D4AF37] p-3 rounded-full -mt-12 border-4 border-[#FDF5F5] shadow-lg"><Heart size={28} fill="#4A0E0E" /></div>
          <User className="text-[#D4AF37]/40" size={24}/>
       </div>
    </div>
  );
};

export default App;

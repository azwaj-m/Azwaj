import React, { useState, useEffect } from 'react';
import { auth, db } from './utils/firebase';
import { 
  onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword,
  signInWithPopup, GoogleAuthProvider, RecaptchaVerifier, signInWithPhoneNumber 
} from 'firebase/auth';
import { Mail, Phone, Settings, Home, Heart, User, ShieldCheck, LogIn, Chrome } from 'lucide-react';
import ProfileSettings from './components/ProfileSettings';

// Swiper Components
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [method, setMethod] = useState(null); // 'email', 'phone', 'signup'
  const [showSettings, setShowSettings] = useState(false);
  
  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmResult, setConfirmResult] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // --- Auth Functions ---
  const handleGoogle = () => signInWithPopup(auth, new GoogleAuthProvider());
  
  const handleEmailAuth = async (isSignup) => {
    try {
      if (isSignup) await createUserWithEmailAndPassword(auth, email, password);
      else await signInWithEmailAndPassword(auth, email, password);
    } catch (err) { alert(err.message); }
  };

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', { size: 'invisible' });
    }
  };

  const sendOtp = async () => {
    setupRecaptcha();
    try {
      const res = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
      setConfirmResult(res);
      alert("OTP بھیج دیا گیا ہے");
    } catch (err) { alert("نمبر کا فارمیٹ غلط ہے (+92...)"); }
  };

  const verifyOtp = async () => {
    try {
      await confirmResult.confirm(otp);
    } catch (err) { alert("غلط کوڈ"); }
  };

  if (loading) return <div className="min-h-screen bg-[#4A0E0E] flex items-center justify-center text-[#D4AF37]">انتظار فرمائیں...</div>;

  // --- Login Screen ---
  if (!user) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-[#4A0E0E] p-8 flex flex-col justify-center text-[#D4AF37] font-sans" dir="rtl">
        <div className="text-center mb-10">
          <img src="/images/Logo.png" className="w-20 mx-auto mb-4" alt="Logo" />
          <h1 className="text-2xl font-black italic tracking-wider">AZWAJ SECURE</h1>
          <div id="recaptcha-container"></div>
        </div>

        {!method ? (
          <div className="space-y-4">
            <button onClick={() => setMethod('phone')} className="w-full bg-white/10 p-4 rounded-2xl flex items-center gap-4 border border-[#D4AF37]/20"><Phone size={20}/> فون نمبر</button>
            <button onClick={() => setMethod('email')} className="w-full bg-white/10 p-4 rounded-2xl flex items-center gap-4 border border-[#D4AF37]/20"><Mail size={20}/> ای میل / سائن اپ</button>
            <button onClick={handleGoogle} className="w-full bg-white text-black p-4 rounded-2xl flex items-center justify-center gap-3 font-bold"><Chrome size={20}/> گوگل اکاؤنٹ</button>
          </div>
        ) : (
          <div className="space-y-4 animate-in slide-in-from-bottom-5">
            {method === 'phone' ? (
              <>
                {!confirmResult ? (
                  <><input type="text" placeholder="+923000000000" onChange={e=>setPhone(e.target.value)} className="w-full p-4 bg-white/5 border border-[#D4AF37]/30 rounded-xl outline-none" />
                  <button onClick={sendOtp} className="w-full bg-[#D4AF37] text-[#4A0E0E] p-4 rounded-xl font-bold">OTP بھیجیں</button></>
                ) : (
                  <><input type="text" placeholder="6 ہندسوں کا کوڈ" onChange={e=>setOtp(e.target.value)} className="w-full p-4 bg-white/5 border border-[#D4AF37]/30 rounded-xl text-center tracking-[10px]" />
                  <button onClick={verifyOtp} className="w-full bg-green-600 text-white p-4 rounded-xl font-bold">تصدیق کریں</button></>
                )}
              </>
            ) : (
              <><input type="email" placeholder="ای میل" onChange={e=>setEmail(e.target.value)} className="w-full p-4 bg-white/5 border border-[#D4AF37]/30 rounded-xl" />
              <input type="password" placeholder="پاس ورڈ" onChange={e=>setPassword(e.target.value)} className="w-full p-4 bg-white/5 border border-[#D4AF37]/30 rounded-xl" />
              <div className="flex gap-2">
                <button onClick={()=>handleEmailAuth(false)} className="flex-1 bg-[#D4AF37] text-[#4A0E0E] p-4 rounded-xl font-bold">لاگ ان</button>
                <button onClick={()=>handleEmailAuth(true)} className="flex-1 border border-[#D4AF37] p-4 rounded-xl font-bold">سائن اپ</button>
              </div></>
            )}
            <button onClick={()=>setMethod(null)} className="w-full text-xs opacity-50 pt-4">واپس جائیں</button>
          </div>
        )}
      </div>
    );
  }

  // --- Main Home Screen with Swiper ---
  const dummyProfiles = [
    { id: 1, name: "عائشہ خان", age: 24, city: "لاہور", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400" },
    { id: 2, name: "سارہ احمد", age: 27, city: "کراچی", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" },
    { id: 3, name: "زینب علی", age: 22, city: "اسلام آباد", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400" }
  ];

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FDF5F5] pb-28 relative font-sans" dir="rtl">
      <div className="bg-[#4A0E0E] p-6 pb-24 rounded-b-[60px] flex justify-between items-center shadow-2xl relative">
        <img src="/images/Logo.png" className="h-10" alt="Logo" />
        <Settings className="text-[#D4AF37] cursor-pointer" onClick={() => setShowSettings(true)} />
      </div>

      <div className="-mt-16 px-6">
        <Swiper effect={'cards'} grabCursor={true} modules={[EffectCards]} className="w-[280px] h-[380px]">
          {dummyProfiles.map(p => (
            <SwiperSlide key={p.id} className="rounded-3xl shadow-xl bg-white border-4 border-white relative overflow-hidden">
              <img src={p.img} className="w-full h-full object-cover" alt={p.name} />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white text-right">
                <h3 className="text-xl font-bold">{p.name}, {p.age}</h3>
                <p className="text-sm opacity-80">{p.city}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="p-8 text-center">
        <h2 className="text-[#4A0E0E] text-xl font-bold">آپ کے لیے بہترین رشتے</h2>
        <p className="text-gray-500 text-sm">کارڈز کو دائیں بائیں سلائیڈ کریں</p>
      </div>

      {showSettings && (
        <div className="fixed inset-0 z-[500] bg-black/60 backdrop-blur-md flex items-end">
          <div className="w-full bg-white rounded-t-[40px] relative animate-in slide-in-from-bottom">
            <button onClick={() => setShowSettings(false)} className="absolute top-4 left-6 text-2xl text-gray-400">×</button>
            <ProfileSettings userProfile={user} />
          </div>
        </div>
      )}

      {/* Footer Nav */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-[#4A0E0E] p-4 flex justify-around rounded-full shadow-2xl z-[100]">
        <Home className="text-[#D4AF37]" size={24}/>
        <div className="bg-[#D4AF37] p-3 rounded-full -mt-12 border-4 border-[#FDF5F5] shadow-lg"><Heart size={28} fill="#4A0E0E" /></div>
        <User className="text-[#D4AF37]/40" size={24}/>
      </div>
    </div>
  );
};

export default App;

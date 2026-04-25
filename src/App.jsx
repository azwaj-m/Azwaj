import React, { useState, useEffect } from 'react';
import { auth, db } from './utils/firebase';
import { 
  onAuthStateChanged, RecaptchaVerifier, signInWithPhoneNumber 
} from 'firebase/auth';
import { Mail, Phone, Settings, Home, Heart, User, ShieldCheck, Lock, MapPin, Search } from 'lucide-react';
import ProfileSettings from './components/ProfileSettings';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';

// --- (پہلے ProfileSettings.jsx والا کوڈ کمپوننٹ فولڈر میں بنائیں) ---

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loginMethod, setLoginMethod] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [profiles, setProfiles] = useState([]);
  
  // لاگ ان سٹیٹس
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);

  useEffect(() => {
    // فائربیس لاگ ان چیک
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // --- 🛡️ سیکیور فون OTP لاگ ان ---
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => { /* reCAPTCHA solved */ }
      });
    }
  };

  const handlePhoneSignIn = async () => {
    setupRecaptcha();
    try {
      // نمبر کو انٹرنیشنل فارمیٹ میں سیٹ کریں (+92)
      const formattedPhone = phone.startsWith('+') ? phone : '+92' + phone.replace(/^0+/, '');
      const result = await signInWithPhoneNumber(auth, formattedPhone, window.recaptchaVerifier);
      setConfirmationResult(result);
      alert("OTP بھیج دیا گیا ہے");
    } catch (error) {
      alert("نمبر غلط ہے یا فارمیٹ درست نہیں (+92...)");
      console.error(error);
    }
  };

  const verifyOtp = async () => {
    try {
      await confirmationResult.confirm(otp);
    } catch (error) {
      alert("OTP غلط ہے");
    }
  };

  if (loading) return <div className="min-h-screen bg-[#4A0E0E] flex items-center justify-center text-[#D4AF37]">انتظار فرمائیں...</div>;

  // --- 🔒 لاگ ان اسکرین (صرف فون نمبر) ---
  if (!user) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-[#4A0E0E] p-8 flex flex-col justify-center items-center text-[#D4AF37] font-[Noto_Sans_Urdu]">
        <img src="/images/Logo.png" className="w-24 mb-6 shadow-2xl" alt="Logo" />
        <h1 className="text-2xl font-black mb-10 italic">AZWAJ SECURE LOGIN</h1>
        
        <div id="recaptcha-container"></div>

        {!confirmationResult ? (
          <div className="w-full space-y-4 animate-in fade-in">
            <div className="relative">
              <Phone className="absolute left-4 top-4 text-[#D4AF37]/50" size={20} />
              <input 
                type="text" 
                placeholder="03000000000" 
                onChange={(e)=>setPhone(e.target.value)} 
                className="w-full p-4 pl-12 rounded-xl bg-white/5 border border-[#D4AF37]/30 outline-none text-white text-lg placeholder:text-gray-500" 
              />
            </div>
            <button onClick={handlePhoneSignIn} className="w-full bg-[#D4AF37] text-[#4A0E0E] p-4 rounded-xl font-bold text-lg hover:bg-[#C19A2A]">OTP بھیجیں</button>
          </div>
        ) : (
          <div className="w-full space-y-4 animate-in slide-in-from-bottom-5">
            <input 
              type="text" 
              placeholder="6 ہندسوں کا کوڈ" 
              onChange={(e)=>setOtp(e.target.value)} 
              className="w-full p-4 rounded-xl bg-white/5 border border-[#D4AF37]/30 outline-none text-white text-center text-3xl tracking-[10px]" 
            />
            <button onClick={verifyOtp} className="w-full bg-green-600 text-white p-4 rounded-xl font-bold text-lg">تصدیق کریں</button>
            <button onClick={()=>setConfirmationResult(null)} className="w-full text-xs opacity-50 underline mt-4">واپس جائیں</button>
          </div>
        )}
        
        <div className="mt-12 flex items-center gap-2 text-[10px] opacity-40">
           <ShieldCheck size={14} /> سیکیورٹی پروٹیکشن آن ہے
        </div>
      </div>
    );
  }

  // --- 🏠 مین ہوم اسکرین (شجرہ ہٹا دیا گیا ہے) ---
  const dummyProfiles = [
    { 
      id: 1, 
      nickName: "سارہ احمد", 
      age: 27, 
      city: "کراچی", 
      district: "جنوبی", 
      isPremium: true, 
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500" 
    },
    { 
      id: 2, 
      nickName: "زینب علی", 
      age: 24, 
      city: "لاہور", 
      district: "وسطی", 
      isPremium: false, 
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500" 
    }
  ];

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FDF5F5] pb-28 relative font-[Noto_Sans_Urdu]" dir="rtl">
        {/* ہیڈر (تصویر 2 جیسا) */}
        <div className="bg-[#4A0E0E] p-6 pb-20 rounded-b-[60px] flex justify-between items-center shadow-2xl relative z-10">
          <Settings className="text-[#D4AF37] cursor-pointer" onClick={() => setShowSettings(true)} />
          <img src="/images/Logo.png" className="h-10" />
        </div>

        {/* سرچ بار (تصویر 4 جیسا، لیکن شجرہ ہٹا کر) */}
        <div className="p-4 bg-white shadow-sm mt-[-40px] relative z-20 rounded-t-xl mx-4 flex items-center gap-2 border">
            <Search className="text-gray-400" size={20} />
            <input type="text" placeholder="تلاش کریں..." className="flex-grow outline-none text-gray-700" />
        </div>

        {/* ٹیکسٹ ٹائٹل */}
        <div className="p-8 pb-4 text-center text-[#4A0E0E]">
          <h2 className="text-xl font-bold italic">آپ کے لیے بہترین رشتے</h2>
          <p className="text-sm opacity-60">کارڈز کو دائیں بائیں سلائیڈ کریں</p>
        </div>

        {/* سوائپر کارڈز (تصویر 2 جیسا تھیم) */}
        <div className="px-6 relative">
          <Swiper
            effect={'cards'}
            grabCursor={true}
            modules={[EffectCards]}
            className="w-[280px] h-[380px]"
          >
            {dummyProfiles.map(p => (
              <SwiperSlide key={p.id} className="rounded-3xl shadow-xl bg-white border-4 border-white relative overflow-hidden group">
                <img src={p.img} className="w-full h-full object-cover" />
                
                {/* پریمیئم بیج */}
                {p.isPremium && (
                    <div className="absolute top-4 left-4 bg-yellow-500 text-white text-[10px] px-3 py-1 rounded-full font-bold shadow-md z-10">PREMIUM</div>
                )}

                {/* بنیادی معلومات (تصویر 2 کی طرح نیچے شو رہیں گی) */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white text-right">
                  <h3 className="text-xl font-bold">{p.nickName}, {p.age}</h3>
                  <div className="flex items-center gap-1 opacity-80 text-xs">
                     <MapPin size={12} /> {p.city}, {p.district}
                  </div>
                  
                  {/* لاک کا نشان: باقی معلومات چھپی ہوئی ہے */}
                  <Lock size={16} className="absolute right-4 top-4 text-white/50" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ادائیگی کے بعد کھلنے والی معلومات (صرف پریمیئم صارف کے لیے) */}
        <div className="p-6 mt-8 space-y-4 border-t mx-4 bg-white rounded-2xl shadow-sm">
           <div className="flex justify-between items-center text-sm">
              <span className="font-bold text-[#4A0E0E]">باقی معلومات (لاکڈ)</span>
              <span className="text-gray-500 text-xs">یہ معلومات ادائیگی کے بعد کھلے گی</span>
           </div>
           
           <div className="grid grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-xl">
               <div className="flex items-center gap-2 text-gray-500"><Lock size={14}/> اصل نام: *****</div>
               <div className="flex items-center gap-2 text-gray-500"><Lock size={14}/> فون نمبر: *****</div>
               <div className="flex items-center gap-2 text-gray-500"><Lock size={14}/> چیٹ روم: بند</div>
               <div className="flex items-center gap-2 text-gray-500"><Lock size={14}/> ایڈریس: *****</div>
           </div>
           
           <button className="w-full bg-[#D4AF37] text-[#4A0E0E] p-3 rounded-xl font-bold text-sm">مکمل پروفائل دیکھنے کے لیے اپ گریڈ کریں</button>
        </div>

        {/* سیٹنگز (تصویر 3 جیسی) */}
        {showSettings && (
          <div className="fixed inset-0 z-[500] bg-black/60 backdrop-blur-md flex items-end">
            <div className="w-full bg-white rounded-t-[40px] relative animate-in slide-in-from-bottom">
                <button onClick={() => setShowSettings(false)} className="absolute top-4 right-6 font-bold text-gray-400">×</button>
                <ProfileSettings userProfile={user} lang="ur" />
            </div>
          </div>
        )}

        {/* فوٹر نیویگیشن (تصویر 2 کی طرح، لیکن ہارٹ سینٹر میں) */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-[#4A0E0E] p-4 flex justify-around rounded-full shadow-2xl z-[100]">
          <Home className="text-[#D4AF37]" size={24}/>
          <div className="bg-[#D4AF37] p-3 rounded-full -mt-12 border-4 border-[#FDF5F5] shadow-lg"><Heart size={28} fill="#4A0E0E" /></div>
          <User className="text-[#D4AF37]/40" size={24}/>
        </div>
    </div>
  );
};

export default App;

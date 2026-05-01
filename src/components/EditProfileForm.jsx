import React, { useState } from 'react';
import {
  ChevronRight, Save, User, Calendar, Ruler,
  GraduationCap, Briefcase, Moon, MapPin, AlignRight,
  Heart, Coffee, Home, Tag, Camera, Image as ImageIcon, Users
} from 'lucide-react';

const EditProfileForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    fullName: initialData?.fullName || "Ayesha",
    nickName: initialData?.nickName || "Ashi",
    dob: initialData?.dob || "1995-05-20",
    height: initialData?.height || "5'8\"",
    education: initialData?.education || "Master of Arts",
    job: initialData?.job || "Teacher",
    religion: initialData?.religion || "Islam",
    sect: initialData?.sect || "Sunni",
    ctiy: initialData?.ctiy || "Lahore",
    Address: initialData?.Address || "Iqbal park house # 34/3",
    family: initialData?.family || "2 sisters, 1 brother",
    hobbies: initialData?.hobbies || "Eating",
    intro: initialData?.intro || "I'm very very slow",
    likesDislikes: initialData?.likesDislikes || "Testy spicy food",
    profileImage: initialData?.profileImage || null,
    selfieImage: initialData?.selfieImage || null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, [field]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="h-screen w-full bg-[#2D0A0A] overflow-y-auto overflow-x-hidden flex flex-col" dir="rtl">
      
      {/* --- ہیڈر (Header) --- */}
      <header className="bg-gradient-to-l from-[#4A0E0E] to-[#631212] p-6 rounded-b-[40px] shadow-lg flex items-center justify-between sticky top-0 z-50">
        <button type="button" onClick={onCancel} className="text-white opacity-80 p-2 hover:bg-white/10 rounded-full transition-all">
          <ChevronRight size={24} />
        </button>
        <h2 className="text-xl font-bold text-[#D4AF37]">پروفائل ایڈٹ کریں</h2>
        <div className="w-10"></div>
      </header>

      {/* --- مین کنٹینٹ (Main Content) --- */}
      <div className="px-6 space-y-6 pt-8 pb-32">
        {/* فوٹو سیکشن */}
        <div className="relative flex justify-center">
          <label className="relative w-48 h-64 bg-[#3D1212] rounded-[30px] border-2 border-[#D4AF37] overflow-hidden shadow-2xl flex flex-col items-center justify-center cursor-pointer group">
            {formData.profileImage ? (
              <img src={formData.profileImage} className="w-full h-full object-cover" alt="Profile" />
            ) : (
              <div className="text-center">
                <ImageIcon className="text-[#D4AF37] mx-auto mb-2" size={40} />
                <span className="text-[#D4AF37] text-xs font-bold">پروفائل فوٹو</span>
              </div>
            )}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <Camera size={32} className="text-white" />
            </div>
            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'profileImage')} />
          </label>
        </div>

        {/* فارم ایریا */}
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-[35px] shadow-2xl border border-red-50">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-400 mr-2 flex items-center gap-1 justify-end">نام <User size={12} /></label>
              <input name="fullName" value={formData.fullName} onChange={handleChange} className="w-full bg-[#FDF5F5] border-none rounded-2xl p-4 text-xs text-[#4A0E0E] outline-none text-right focus:ring-1 ring-[#D4AF37]" required />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-400 mr-2 flex items-center gap-1 justify-end">عرفیت <Tag size={12} /></label>
              <input name="nickName" value={formData.nickName} onChange={handleChange} className="w-full bg-[#FDF5F5] border-none rounded-2xl p-4 text-xs text-[#4A0E0E] outline-none text-right" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-400 mr-2 flex items-center gap-1 justify-end">تاریخ پیدائش <Calendar size={12} /></label>
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full bg-[#FDF5F5] border-none rounded-2xl p-4 text-xs text-[#4A0E0E] outline-none text-right" />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-400 mr-2 flex items-center gap-1 justify-end">قد <Ruler size={12} /></label>
              <input name="height" value={formData.height} onChange={handleChange} className="w-full bg-[#FDF5F5] border-none rounded-2xl p-4 text-xs text-[#4A0E0E] outline-none text-right" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-400 mr-2 flex items-center gap-1 justify-end">شہر <MapPin size={12} /></label>
              <input name="ctiy" value={formData.ctiy} onChange={handleChange} className="w-full bg-[#FDF5F5] border-none rounded-2xl p-4 text-xs text-[#4A0E0E] outline-none text-right" />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-400 mr-2 flex items-center gap-1 justify-end">فیملی <Users size={12} /></label>
              <input name="family" value={formData.family} onChange={handleChange} className="w-full bg-[#FDF5F5] border-none rounded-2xl p-4 text-xs text-[#4A0E0E] outline-none text-right" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-400 mr-2 flex items-center gap-1 justify-end">پتہ <Home size={12} /></label>
            <input name="Address" value={formData.Address} onChange={handleChange} className="w-full bg-[#FDF5F5] border-none rounded-2xl p-4 text-xs text-[#4A0E0E] outline-none text-right" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-400 mr-2 flex items-center gap-1 justify-end">تعلیم <GraduationCap size={12} /></label>
              <input name="education" value={formData.education} onChange={handleChange} className="w-full bg-[#FDF5F5] border-none rounded-2xl p-4 text-xs text-[#4A0E0E] outline-none text-right" />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-400 mr-2 flex items-center gap-1 justify-end">پیشہ <Briefcase size={12} /></label>
              <input name="job" value={formData.job} onChange={handleChange} className="w-full bg-[#FDF5F5] border-none rounded-2xl p-4 text-xs text-[#4A0E0E] outline-none text-right" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-400 mr-2 flex items-center gap-1 justify-end">مذہب <Moon size={12} /></label>
              <input name="religion" value={formData.religion} onChange={handleChange} className="w-full bg-[#FDF5F5] border-none rounded-2xl p-4 text-xs text-[#4A0E0E] outline-none text-right" />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-400 mr-2 flex items-center gap-1 justify-end">مسلک <Moon size={12} /></label>
              <input name="sect" value={formData.sect} onChange={handleChange} className="w-full bg-[#FDF5F5] border-none rounded-2xl p-4 text-xs text-[#4A0E0E] outline-none text-right" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-400 mr-2 flex items-center gap-1 justify-end">تعارف <AlignRight size={12} /></label>
            <textarea name="intro" rows="3" value={formData.intro} onChange={handleChange} className="w-full bg-[#FDF5F5] border-none rounded-2xl p-4 text-xs text-[#4A0E0E] outline-none resize-none text-right" />
          </div>
        </form>
      </div>

      {/* --- فوٹر ایکشن بٹن (Footer) --- */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-gradient-to-t from-[#2D0A0A] via-[#2D0A0A] to-transparent z-50">
        <button 
          onClick={handleSubmit}
          className="w-full h-16 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#4A0E0E] rounded-2xl font-black flex items-center justify-center gap-3 shadow-[0_10px_20px_rgba(212,175,55,0.3)] active:scale-95 transition-all uppercase tracking-wider text-sm"
        >
          معلومات محفوظ کریں <Save size={20} />
        </button>
      </div>

    </div>
  );
};

export default EditProfileForm;

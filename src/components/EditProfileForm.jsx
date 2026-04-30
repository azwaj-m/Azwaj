import React, { useState } from 'react';
import { 
  ChevronRight, Save, User, Calendar, Ruler, 
  GraduationCap, Briefcase, Moon, MapPin, AlignRight, 
  Heart, Coffee, Home, Tag
} from 'lucide-react';

const EditProfileForm = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    fullName: "Ayesha",
    nickName: "Ashi",
    dob: "1995-05-20",
    height: "5'8\"",
    education: "Master of Arts",
    job: "Teacher",
    religion: "Islam",
    sect: "Sunni",
    ctiy: "Lahore",
    Address: "Iqbal park house # 34/3",
    family: "2 sisters, 1 brother",
    hobbies: "Eating",
    intro: "I'm very very slow",
    likesDislikes: "Testy spicy food"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#FDF5F5] pb-24" dir="rtl">
      <header className="bg-gradient-to-l from-[#4A0E0E] to-[#631212] p-6 rounded-b-[40px] shadow-lg flex items-center justify-between sticky top-0 z-50">
        <button onClick={onCancel} className="text-white opacity-80">
          <ChevronRight size={24} />
        </button>
        <h2 className="text-xl font-bold text-[#D4AF37]">پروفائل ایڈٹ کریں</h2>
        <div className="w-6"></div>
      </header>

      <div className="px-6 -mt-6 relative z-10">
        <form className="space-y-4 bg-white p-6 rounded-[35px] shadow-xl border border-red-50">
          
          {/* Full Name & Nickname */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-400 mr-2 flex items-center gap-1 justify-end">نام <User size={12} /></label>
              <input name="fullName" value={formData.fullName} onChange={handleChange} className="w-full bg-[#FDF5F5] border-none rounded-2xl p-4 text-xs text-[#4A0E0E] outline-none text-right" />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-400 mr-2 flex items-center gap-1 justify-end">عرفیت <Tag size={12} /></label>
              <input name="nickName" value={formData.nickName} onChange={handleChange} className="w-full bg-[#FDF5F5] border-none rounded-2xl p-4 text-xs text-[#4A0E0E] outline-none text-right" />
            </div>
          </div>

          {/* DOB & Height */}
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

          {/* City & Address */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-400 mr-2 flex items-center gap-1 justify-end">شہر <MapPin size={12} /></label>
            <input name="ctiy" value={formData.ctiy} onChange={handleChange} className="w-full bg-[#FDF5F5] border-none rounded-2xl p-4 text-xs text-[#4A0E0E] outline-none text-right" />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-400 mr-2 flex items-center gap-1 justify-end">پتہ <Home size={12} /></label>
            <input name="Address" value={formData.Address} onChange={handleChange} className="w-full bg-[#FDF5F5] border-none rounded-2xl p-4 text-xs text-[#4A0E0E] outline-none text-right" />
          </div>

          {/* Education & Job */}
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

          {/* Intro & Hobbies */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-400 mr-2 flex items-center gap-1 justify-end">تعارف <AlignRight size={12} /></label>
            <textarea name="intro" rows="2" value={formData.intro} onChange={handleChange} className="w-full bg-[#FDF5F5] border-none rounded-2xl p-4 text-xs text-[#4A0E0E] outline-none resize-none text-right" />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-400 mr-2 flex items-center gap-1 justify-end">مشغلے <Coffee size={12} /></label>
            <input name="hobbies" value={formData.hobbies} onChange={handleChange} className="w-full bg-[#FDF5F5] border-none rounded-2xl p-4 text-xs text-[#4A0E0E] outline-none text-right" />
          </div>

          {/* Likes/Dislikes */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-400 mr-2 flex items-center gap-1 justify-end">پسند/ناپسند <Heart size={12} /></label>
            <input name="likesDislikes" value={formData.likesDislikes} onChange={handleChange} placeholder="مثال: Spicy food" className="w-full bg-[#FDF5F5] border-none rounded-2xl p-4 text-xs text-[#4A0E0E] outline-none text-right" />
          </div>

          <button type="button" onClick={() => onSave(formData)} className="w-full h-16 bg-gradient-to-r from-[#4A0E0E] to-[#8B1A1A] text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all mt-6">
            معلومات محفوظ کریں <Save size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileForm;

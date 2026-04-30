
import React, { useState } from 'react';

import { 

  ChevronRight, Save, User, Calendar, Ruler, 

  GraduationCap, Briefcase, Moon, Users, MapPin, AlignRight 

} from 'lucide-react';



const EditProfileForm = ({ onSave, onCancel }) => {

  const [formData, setFormData] = useState({

    fullName: "Aisha Khan",

    dob: "1995-05-20",

    height: "5'8\"",

    education: "Master of Arts",

    job: "Doctor",

    religion: "Islam",

    sect: "Sunni",

    city: "Lahore",

    familyDetails: "2 sisters, 1 brother",

    aboutMe: "میں ایک ذمہ دار اور سلجھی ہوئی انسان ہوں..."

  });



  const handleChange = (e) => {

    setFormData({ ...formData, [e.target.name]: e.target.value });

  };



  return (

    <div className="min-h-screen bg-[#FDF5F5] pb-10" dir="rtl">

      {/* ہیڈر */}

      <header className="bg-gradient-to-l from-[#4A0E0E] to-[#631212] p-6 rounded-b-[40px] shadow-lg flex items-center justify-between">

        <button onClick={onCancel} className="text-white opacity-80">

          <ChevronRight size={24} className="rotate-180" />

        </button>

        <h2 className="text-xl font-bold text-[#D4AF37]">ذاتی معلومات درج کریں</h2>

        <div className="w-6"></div>

      </header>



      <div className="px-6 -mt-6">

        <form className="space-y-4 bg-white p-6 rounded-[35px] shadow-xl border border-red-50">

          

          {/* نام */}

          <div className="space-y-1">

            <label className="text-[11px] font-bold text-gray-400 mr-2 flex items-center gap-1 justify-end">

              مکمل نام <User size={12} />

            </label>

            <input 

              name="fullName"

              value={formData.fullName}

              onChange={handleChange}

              className="w-full bg-[#FDF5F5] border-none rounded-2xl p-4 text-sm text-[#4A0E0E] focus:ring-2 focus:ring-[#D4AF37] outline-none transition-all text-right"

              placeholder="اپنا نام لکھیں"

            />

          </div>



          <div className="grid grid-cols-2 gap-4">

            {/* تاریخ پیدائش */}

            <div className="space-y-1">

              <label className="text-[11px] font-bold text-gray-400 mr-2 flex items-center gap-1 justify-end">

                تاریخ پیدائش <Calendar size={12} />

              </label>

              <input 

                type="date"

                name="dob"

                value={formData.dob}

                onChange={handleChange}

                className="w-full bg-[#FDF5F5] border-none rounded-2xl p-4 text-xs text-[#4A0E0E] outline-none text-right"

              />

            </div>



            {/* قد */}

            <div className="space-y-1">

              <label className="text-[11px] font-bold text-gray-400 mr-2 flex items-center gap-1 justify-end">

                قد <Ruler size={12} />

              </label>

              <select 

                name="height"

                value={formData.height}

                onChange={handleChange}

                className="w-full bg-[#FDF5F5] border-none rounded-2xl p-4 text-xs text-[#4A0E0E] outline-none text-right appearance-none"

              >

                <option>5'0"</option>

                <option>5'5"</option>

                <option>5'8"</option>

                <option>6'0"</option>

              </select>

            </div>

          </div>



          {/* تعلیم اور پیشہ */}

          <div className="grid grid-cols-2 gap-4">

            <div className="space-y-1">

              <label className="text-[11px] font-bold text-gray-400 mr-2 flex items-center gap-1 justify-end">

                تعلیم <GraduationCap size={12} />

              </label>

              <input 

                name="education"

                value={formData.education}

                onChange={handleChange}

                className="w-full bg-[#FDF5F5] border-none rounded-2xl p-4 text-xs text-[#4A0E0E] outline-none text-right"

              />

            </div>

            <div className="space-y-1">

              <label className="text-[11px] font-bold text-gray-400 mr-2 flex items-center gap-1 justify-end">

                پیشہ <Briefcase size={12} />

              </label>

              <input 

                name="job"

                value={formData.job}

                onChange={handleChange}

                className="w-full bg-[#FDF5F5] border-none rounded-2xl p-4 text-xs text-[#4A0E0E] outline-none text-right"

              />

            </div>

          </div>



          {/* مسلک اور مذہب */}

          <div className="grid grid-cols-2 gap-4">

            <div className="space-y-1">

              <label className="text-[11px] font-bold text-gray-400 mr-2 flex items-center gap-1 justify-end">

                مذہب <Moon size={12} />

              </label>

              <input 

                name="religion"

                value={formData.religion}

                onChange={handleChange}

                className="w-full bg-[#FDF5F5] border-none rounded-2xl p-4 text-xs text-[#4A0E0E] outline-none text-right"

              />

            </div>

            <div className="space-y-1">

              <label className="text-[11px] font-bold text-gray-400 mr-2 flex items-center gap-1 justify-end">

                شہر <MapPin size={12} />

              </label>

              <input 

                name="city"

                value={formData.city}

                onChange={handleChange}

                className="w-full bg-[#FDF5F5] border-none rounded-2xl p-4 text-xs text-[#4A0E0E] outline-none text-right"

              />

            </div>

          </div>



          {/* فیملی کی تفصیل */}

          <div className="space-y-1">

            <label className="text-[11px] font-bold text-gray-400 mr-2 flex items-center gap-1 justify-end">

              فیملی کی تفصیل <Users size={12} />

            </label>

            <input 

              name="familyDetails"

              value={formData.familyDetails}

              onChange={handleChange}

              className="w-full bg-[#FDF5F5] border-none rounded-2xl p-4 text-sm text-[#4A0E0E] outline-none text-right"

              placeholder="مثلاً: 2 بہنیں، 1 بھائی"

            />

          </div>



          {/* میرے بارے میں */}

          <div className="space-y-1">

            <label className="text-[11px] font-bold text-gray-400 mr-2 flex items-center gap-1 justify-end">

              میرے بارے میں <AlignRight size={12} />

            </label>

            <textarea 

              name="aboutMe"

              rows="4"

              value={formData.aboutMe}

              onChange={handleChange}

              className="w-full bg-[#FDF5F5] border-none rounded-3xl p-4 text-sm text-[#4A0E0E] outline-none resize-none text-right"

              placeholder="اپنی شخصیت کے بارے میں کچھ لکھیں..."

            />

          </div>



          {/* محفوظ کریں بٹن */}

          <button 

            type="button"

            onClick={() => onSave(formData)}

            className="w-full h-16 bg-gradient-to-r from-[#4A0E0E] to-[#8B1A1A] text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all mt-6"

          >

            معلومات محفوظ کریں <Save size={20} />

          </button>

        </form>

      </div>

    </div>

  );

};



export default EditProfileForm;


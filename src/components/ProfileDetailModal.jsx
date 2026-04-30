
import React from 'react';

import { 

  X, MapPin, Calendar, Ruler, GraduationCap, Briefcase, 

  Moon, Users, Star, ThumbsUp, MessageCircle, Heart, Shield 

} from 'lucide-react';



const ProfileDetailModal = ({ profile, onClose }) => {

  const detailItems = [

    { icon: Calendar, label: "Date of Birth", value: "1995-05-20" },

    { icon: Ruler, label: "Height", value: "5'8\"" },

    { icon: GraduationCap, label: "Education", value: "Master of Arts" },

    { icon: Briefcase, label: "Job", value: profile.profession || "Doctor" },

    { icon: Moon, label: "Religion", value: "Islam (Sunni)" },

    { icon: MapPin, label: "City", value: profile.city },

    { icon: Users, label: "Family", value: "2 sisters, 1 brother" },

    { icon: Star, label: "Hobbies", value: "Reading, Traveling" },

    { icon: ThumbsUp, label: "Likes", value: "Traditional Food" },

  ];



  return (

    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm">

      <div className="w-full max-w-md bg-[#FDF5F5] h-[90vh] sm:h-auto sm:max-h-[85vh] rounded-t-[40px] sm:rounded-[40px] overflow-hidden flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-300">

        

        {/* ٹاپ امیج سیکشن */}

        <div className="relative h-72 flex-shrink-0">

          <img src={profile.profileImg} className="w-full h-full object-cover" alt={profile.fullName} />

          <div className="absolute inset-0 bg-gradient-to-t from-[#4A0E0E] via-transparent to-transparent"></div>

          

          <button onClick={onClose} className="absolute top-6 left-6 p-2 bg-black/20 backdrop-blur-md rounded-full text-white">

            <X size={20} />

          </button>



          <div className="absolute bottom-6 right-6 text-right text-white">

            <div className="flex items-center justify-end gap-2 mb-1">

              <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>

              <span className="text-[10px] font-bold uppercase tracking-widest">Online Now</span>

            </div>

            <h2 className="text-3xl font-bold flex items-center justify-end gap-2">

              {profile.fullName} <Shield size={20} className="text-yellow-500 fill-yellow-500/20" />

            </h2>

            <p className="text-sm opacity-90">{profile.age} • {profile.city}</p>

          </div>

        </div>



        {/* کوائف کا ایریا */}

        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-right" dir="rtl">

          

          {/* About Me */}

          <div className="bg-white p-5 rounded-3xl shadow-sm border border-red-50">

            <h3 className="text-[#4A0E0E] font-black text-sm mb-2 flex items-center justify-end gap-2">

              میرے بارے میں <User size={16} />

            </h3>

            <p className="text-xs text-gray-600 leading-relaxed">

              میں ایک ذمہ دار اور سلجھی ہوئی انسان ہوں، پیشے کے لحاظ سے ڈاکٹر ہوں اور اپنی روایات کا احترام کرتی ہوں۔ مجھے گھومنے پھرنے اور نئی چیزیں سیکھنے کا شوق ہے۔

            </p>

          </div>



          {/* کوائف کی فہرست (Grid Layout) */}

          <div className="bg-white p-5 rounded-3xl shadow-sm border border-red-50">

            <h3 className="text-[#4A0E0E] font-black text-sm mb-4 flex items-center justify-end gap-2">

              تفصیلی معلومات <Info size={16} />

            </h3>

            <div className="grid grid-cols-2 gap-y-4 gap-x-2">

              {detailItems.map((item, idx) => (

                <div key={idx} className="flex items-center justify-end gap-3 p-2 hover:bg-red-50 rounded-xl transition-colors">

                  <div className="text-right">

                    <p className="text-[9px] text-gray-400 font-bold uppercase">{item.label}</p>

                    <p className="text-[11px] font-bold text-[#4A0E0E]">{item.value}</p>

                  </div>

                  <div className="w-8 h-8 rounded-lg bg-[#FDF5F5] flex items-center justify-center text-[#4A0E0E]">

                    <item.icon size={16} />

                  </div>

                </div>

              ))}

            </div>

          </div>



          {/* Verification Badge Section */}

          <div className="bg-gradient-to-br from-yellow-50 to-white p-5 rounded-3xl border-2 border-yellow-100 flex items-center justify-between">

             <Shield size={40} className="text-yellow-600 opacity-20" />

             <div className="text-right">

               <h4 className="text-[#4A0E0E] font-bold text-xs">7-Generation Shajra Verified</h4>

               <p className="text-[10px] text-gray-500">پروفائل کی مکمل تصدیق ہو چکی ہے</p>

             </div>

          </div>

        </div>



        {/* ایکشن بٹنز */}

        <div className="p-6 bg-white border-t flex items-center gap-4">

          <button className="flex-1 h-14 bg-[#4A0E0E] text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all">

            <MessageCircle size={20} /> رابطہ کریں

          </button>

          <button className="w-14 h-14 bg-[#FDF5F5] text-[#4A0E0E] rounded-2xl flex items-center justify-center border-2 border-[#4A0E0E]/10 active:scale-95 transition-all">

            <Heart size={24} />

          </button>

        </div>



      </div>

    </div>

  );

};



export default ProfileDetailModal;


import React from 'react';
import { X, User, Settings, Shield, HelpCircle, LogOut, Heart, Star, Ban } from 'lucide-react';

const Sidebar = ({ isOpen, onClose, onAction }) => {
  const menuItems = [
    { icon: User, label: 'میری پروفائل', view: 'edit_profile' },
    { icon: Heart, label: 'پسندیدہ رشتے', view: 'favorites' },
    { icon: Ban, label: 'بلاک شدہ لسٹ', view: 'blocked' },
    { icon: Star, label: 'پریمیم ممبرشپ', view: 'premium' },
    { icon: Shield, label: 'پرائیویسی سیٹنگز', view: 'privacy' },
    { icon: HelpCircle, label: 'مدد اور سپورٹ', view: 'help' },
  ];

  const handleLogout = () => {
    if(confirm('کیا آپ لاگ آؤٹ کرنا چاہتے ہیں؟')) {
      window.location.reload();
    }
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={onClose}
      ></div>
      
      <div className={`fixed top-0 right-0 h-full w-72 bg-[#FFF9F2] z-[101] shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="bg-[#3D0A0A] p-6 text-center relative">
          <button onClick={onClose} className="absolute top-4 left-4 text-[#D4AF37] hover:rotate-90 transition-transform">
            <X size={24} />
          </button>
          <div className="w-20 h-20 rounded-full border-2 border-[#D4AF37] mx-auto mb-3 overflow-hidden bg-white shadow-xl shadow-black/20">
             <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200" alt="User" className="w-full h-full object-cover" />
          </div>
          <h3 className="text-[#D4AF37] font-black text-lg">صارف کا نام</h3>
          <p className="text-white/40 text-[8px] uppercase tracking-[3px] font-bold">Verified Account</p>
        </div>

        <div className="p-4 space-y-1" dir="rtl">
          {menuItems.map((item, index) => (
            <button 
              key={index} 
              onClick={() => onAction(item.view)} 
              className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-[#D4AF37]/10 text-[#4A0E0E] font-bold transition-all active:scale-95 group"
            >
              <div className="bg-[#D4AF37]/10 p-2 rounded-lg group-hover:bg-[#D4AF37] group-hover:text-white transition-colors">
                <item.icon size={18} />
              </div>
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
          
          <div className="border-t border-[#D4AF37]/10 my-4 pt-4">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-600 font-bold hover:bg-red-50 transition-colors active:scale-95"
            >
              <div className="bg-red-50 p-2 rounded-lg">
                <LogOut size={18} />
              </div>
              <span className="text-sm">لاگ آؤٹ</span>
            </button>
          </div>
        </div>

        <div className="absolute bottom-6 left-0 right-0 text-center">
          <p className="text-[10px] text-gray-400 font-medium">Version 2.0.4 • Azwaj Ecosystem</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

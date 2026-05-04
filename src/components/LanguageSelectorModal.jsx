import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, X, Globe, Check } from 'lucide-react';
import { allLanguages } from '../utils/languages';

const LanguageSelectorModal = ({ isOpen, onClose }) => {
  const { i18n, t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  // سرچ کی بنیاد پر زبانوں کو فلٹر کرنا
  const filteredLanguages = allLanguages.filter(lang => 
    lang.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    lang.native.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    document.documentElement.dir = i18n.dir(langCode);
    onClose(); 
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md h-[80vh] rounded-[30px] overflow-hidden flex flex-col shadow-2xl border border-[#D4AF37]/20">
        
        {/* ہیڈر */}
        <div className="p-6 bg-[#4A0E0E] text-white flex justify-between items-center">
          <div>
            <h2 className="text-xl font-black italic uppercase tracking-widest flex items-center gap-2">
              <Globe size={20} className="text-[#D4AF37]" />
              {t('select_language', 'Select Language')}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* سرچ بار */}
        <div className="p-4 border-b border-gray-100 bg-[#FDF5F5]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search language..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-bold outline-none focus:border-[#D4AF37] transition-all"
            />
          </div>
        </div>

        {/* زبانوں کی لسٹ */}
        <div className="flex-1 overflow-y-auto p-2">
          <div className="grid grid-cols-1 gap-1">
            {filteredLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`flex items-center justify-between p-4 rounded-2xl transition-all ${
                  i18n.language === lang.code 
                  ? 'bg-[#4A0E0E] text-[#D4AF37]' 
                  : 'hover:bg-[#FDF5F5] text-gray-700'
                }`}
              >
                <div className="text-left">
                  <p className="font-black text-sm">{lang.native}</p>
                  <p className={`text-[10px] uppercase tracking-tighter ${i18n.language === lang.code ? 'text-[#D4AF37]/70' : 'text-gray-400'}`}>
                    {lang.name}
                  </p>
                </div>
                {i18n.language === lang.code && <Check size={18} />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// یہ لائن لازمی ہونی چاہیے تاکہ ایرر ختم ہو جائے
export default LanguageSelectorModal;

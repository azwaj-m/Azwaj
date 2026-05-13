import React, { useState } from 'react';
import { X, Search, Globe } from 'lucide-react';
import { allLanguages } from '../utils/languages';
import { useTranslation } from 'react-i18next';

const LanguageSelectorModal = ({ isOpen, onClose }) => {
  const { i18n } = useTranslation();
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const handleLanguageSelect = (code) => {
    if (i18n && i18n.changeLanguage) {
      i18n.changeLanguage(code);
    }
    onClose();
  };

  const filteredLanguages = allLanguages.filter(lang =>
    lang.name.toLowerCase().includes(search.toLowerCase()) ||
    lang.native.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/60 z-[300] backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn" dir="rtl">
      <div className="bg-[#FFFDF9] w-full max-w-sm rounded-[32px] border border-[#D4AF37]/20 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* ہیڈر بار */}
        <div className="bg-gradient-to-r from-[#4A0E0E] to-[#3D0A0A] p-4 flex items-center justify-between border-b border-[#D4AF37]/20">
          <div className="flex items-center gap-2 text-[#D4AF37]">
            <Globe size={16} />
            <span className="text-xs font-black">زبان منتخب کریں (100 Languages)</span>
          </div>
          <button type="button" onClick={onClose} className="text-[#D4AF37] p-1 hover:bg-white/10 rounded-full">
            <X size={18} />
          </button>
        </div>

        {/* لائیو سرچ انجن پینل */}
        <div className="p-3 bg-white border-b border-gray-50 flex items-center gap-2">
          <Search size={14} className="text-gray-400" />
          <input
            type="text"
            placeholder="زبان تلاش کریں..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-xs font-bold text-[#4A0E0E] focus:outline-hidden"
          />
        </div>

        {/* زبانوں کی لسٹ اسکرول باکس */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1 content-start no-scrollbar">
          {filteredLanguages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleLanguageSelect(lang.code)}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-right font-bold transition-all text-xs ${
                i18n.language === lang.code 
                  ? 'bg-[#4A0E0E] text-[#D4AF37] shadow-sm' 
                  : 'text-[#4A0E0E] hover:bg-[#4A0E0E]/5'
              }`}
            >
              <span>{lang.native}</span>
              <span className={`text-[10px] ${i18n.language === lang.code ? 'text-gray-300' : 'text-gray-400'}`}>
                {lang.name}
              </span>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};

export default LanguageSelectorModal;

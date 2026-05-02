import React, { useState } from 'react';
import { Send, Plus, Smile, Phone, MoreVertical, ChevronLeft, ShieldCheck } from 'lucide-react';

const Chat = () => {
  const [message, setMessage] = useState('');

  const chatData = [
    { id: 1, text: "Assalamualaikum! Hope you're doing well.", time: "09:30 AM", isSender: false },
    { id: 2, text: "Wa Alaikum Assalam! I'm doing great, thank you. How are you?", time: "09:31 AM", isSender: true },
    { id: 3, text: "Alhamdulillah, I'm good too. It's nice to connect with you.", time: "09:32 AM", isSender: false },
    { id: 4, text: "It's nice to connect with you as well. Would you like to know more about me?", time: "09:33 AM", isSender: true },
  ];

  return (
    <div className="flex flex-col h-full bg-[#FDF5F5] animate-in fade-in duration-500">
      {/* چیٹ ہیڈر */}
      <div className="bg-[#4A0E0E] p-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <ChevronLeft className="text-[#D4AF37] cursor-pointer" />
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37] overflow-hidden">
              <img src="https://readymadeui.com/profile_2.webp" alt="Aisha" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#4A0E0E] rounded-full"></div>
          </div>
          <div>
            <h2 className="text-white font-bold text-sm">Aisha Khan</h2>
            <p className="text-[#D4AF37] text-xs">28, Doctor • Online</p>
          </div>
        </div>
        <div className="flex gap-4 text-[#D4AF37]">
          <button className="p-2 bg-white/10 rounded-full"><Phone size={20} /></button>
          <button className="p-2 bg-white/10 rounded-full"><MoreVertical size={20} /></button>
        </div>
      </div>

      {/* چیٹ ایریا */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar">
        {/* سیکیورٹی نوٹس */}
        <div className="bg-[#FFF3E0] border border-[#FFE0B2] p-3 rounded-2xl flex items-center gap-3 mx-4 mb-4 shadow-sm">
          <div className="bg-[#4A0E0E] p-2 rounded-xl text-[#D4AF37]">
            <ShieldCheck size={20} />
          </div>
          <p className="text-[10px] text-[#4A0E0E] leading-tight">
            This chat is secure and verified. <br />
            <span className="font-bold">Be respectful and keep conversations safe.</span>
          </p>
        </div>

        <div className="text-center">
          <span className="bg-gray-200 text-gray-500 text-[10px] px-3 py-1 rounded-full uppercase tracking-widest">Today</span>
        </div>

        {chatData.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isSender ? 'justify-end' : 'justify-start'} items-end gap-2`}>
            {!msg.isSender && (
              <div className="w-8 h-8 rounded-full border border-[#D4AF37] overflow-hidden mb-1">
                <img src="https://readymadeui.com/profile_2.webp" alt="avatar" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="max-w-[75%] space-y-1">
              <div className={`p-4 rounded-3xl text-sm shadow-sm ${
                msg.isSender 
                ? 'bg-[#4A0E0E] text-white rounded-br-none' 
                : 'bg-white text-[#4A0E0E] rounded-bl-none border border-gray-100'
              }`}>
                {msg.text}
              </div>
              <p className={`text-[10px] text-gray-400 px-2 ${msg.isSender ? 'text-right' : 'text-left'}`}>
                {msg.time} {msg.isSender && <span className="text-blue-500 ml-1">✓✓</span>}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ان پٹ بار */}
      <div className="p-4 bg-white border-t border-gray-100 flex items-center gap-3 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <button className="bg-[#4A0E0E] text-[#D4AF37] p-2 rounded-full active:scale-95 transition-all">
          <Plus size={24} />
        </button>
        <div className="flex-1 bg-gray-50 rounded-full flex items-center px-4 border border-gray-200 focus-within:border-[#D4AF37] transition-all">
          <input 
            type="text" 
            placeholder="Type a message..."
            className="w-full bg-transparent py-3 text-sm focus:outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="text-gray-400 hover:text-[#4A0E0E]">
            <Smile size={20} />
          </button>
        </div>
        <button className="bg-[#4A0E0E] text-[#D4AF37] p-3 rounded-full shadow-lg active:scale-90 transition-all">
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default Chat;

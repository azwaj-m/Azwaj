import React, { useState, useEffect, useRef } from 'react';
import { Send, ChevronRight, Phone, Video, MoreVertical, CheckCheck } from 'lucide-react';
import { sendMessage, getDummyMessages } from '../utils/chatLogic';

const ChatWindow = ({ user, onBack }) => {
  const [messages, setMessages] = useState(getDummyMessages());
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const msg = sendMessage(input, 'me', user.id);
    setMessages([...messages, msg]);
    setInput("");
    
    // فرضی آٹو ریپلائی
    setTimeout(() => {
      const reply = { id: Date.now(), text: "جزاک اللہ! میں جلد جواب دوں گا۔", senderId: 'other', timestamp: 'ابھی' };
      setMessages(prev => [...prev, reply]);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-screen bg-[#FDF5F5] animate-in slide-in-from-left duration-300">
      {/* چیٹ ہیڈر */}
      <header className="bg-[#4A0E0E] p-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="text-white"><ChevronRight size={28} /></button>
          <div className="relative">
            <img src={user.profileImg || "https://via.placeholder.com/150"} className="w-10 h-10 rounded-full object-cover border border-[#D4AF37]" alt="" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#4A0E0E]"></div>
          </div>
          <div className="text-right">
            <h4 className="text-white font-bold text-sm">{user.nickName || user.fullName}</h4>
            <p className="text-[10px] text-[#D4AF37]">آن لائن</p>
          </div>
        </div>
        <div className="flex gap-4 text-white/80">
          <Phone size={20} />
          <MoreVertical size={20} />
        </div>
      </header>

      {/* پیغامات کا ایریا */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.senderId === 'me' ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-[75%] p-3 rounded-2xl text-sm shadow-sm ${
              m.senderId === 'me' 
              ? 'bg-[#4A0E0E] text-white rounded-tl-none' 
              : 'bg-white text-gray-800 rounded-tr-none'
            }`}>
              <p className="text-right">{m.text}</p>
              <div className={`flex items-center justify-end gap-1 mt-1 opacity-60 text-[9px]`}>
                <span>{m.timestamp}</span>
                {m.senderId === 'me' && <CheckCheck size={12} className="text-[#D4AF37]" />}
              </div>
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      {/* ان پٹ بار */}
      <div className="p-4 bg-white border-t flex items-center gap-3">
        <button onClick={handleSend} className="bg-[#4A0E0E] p-3 rounded-xl text-[#D4AF37] active:scale-90 transition-transform">
          <Send size={20} className="rotate-180" />
        </button>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="پیغام لکھیں..."
          className="flex-1 bg-gray-100 p-3 rounded-xl outline-none text-right text-sm"
          dir="rtl"
        />
      </div>
    </div>
  );
};

export default ChatWindow;

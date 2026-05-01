import React, { useState, useEffect, useRef } from 'react';
import { Send, ChevronRight, Phone, Video, MoreVertical, CheckCheck } from 'lucide-react';

const Chat = ({ partner, onBack }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "اسلام علیکم! کیا حال ہے؟", sender: 'other', time: '10:00 AM' },
    { id: 2, text: "وعلیکم السلام، میں ٹھیک ہوں۔ آپ بتائیں؟", sender: 'me', time: '10:02 AM' }
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg = {
      id: Date.now(),
      text: input,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMsg]);
    setInput("");
  };

  // اگر کوئی مخصوص پارٹنر منتخب ہوا ہے تو چیٹ ونڈو دکھائیں
  if (partner) {
    return (
      <div className="fixed inset-0 bg-[#FDF5F5] z-[150] flex flex-col" dir="rtl">
        {/* چیٹ ہیڈر */}
        <div className="bg-[#4A0E0E] p-4 flex items-center justify-between text-white shadow-lg">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-1 hover:bg-white/10 rounded-full">
              <ChevronRight size={28} />
            </button>
            <img src={partner.profileImg} className="w-10 h-10 rounded-full object-cover border border-[#D4AF37]/50" alt="" />
            <div>
              <h2 className="font-bold text-sm">{partner.fullName}</h2>
              <p className="text-[10px] text-green-400">آن لائن</p>
            </div>
          </div>
          <div className="flex gap-4 opacity-80">
            <Phone size={20} />
            <Video size={20} />
            <MoreVertical size={20} />
          </div>
        </div>

        {/* میسجز لسٹ */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.sender === 'me' ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[75%] p-3 rounded-2xl text-sm shadow-sm ${
                m.sender === 'me' ? 'bg-[#4A0E0E] text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none'
              }`}>
                {m.text}
                <div className="flex items-center justify-end gap-1 mt-1 text-[9px] opacity-60">
                  {m.time}
                  {m.sender === 'me' && <CheckCheck size={12} className="text-[#D4AF37]" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ان پٹ بار */}
        <div className="p-4 bg-white border-t flex items-center gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="پیغام لکھیں..." 
            className="flex-1 bg-gray-100 p-3 rounded-full outline-none text-sm text-right" 
          />
          <button onClick={sendMessage} className="bg-[#D4AF37] p-3 rounded-full text-[#4A0E0E] active:scale-90 transition-all shadow-md">
            <Send size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ورنہ چیٹ لسٹ دکھائیں
  return (
    <div className="p-6">
      <h2 className="text-2xl font-black text-[#4A0E0E] mb-6">پیغامات</h2>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-4 rounded-3xl flex items-center gap-4 shadow-sm border border-gray-100">
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-gray-200"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-[#4A0E0E]">صارف نام {i}</h3>
              <p className="text-xs text-gray-400 truncate">سلام، کیا آپ کا رشتہ ابھی دستیاب ہے؟</p>
            </div>
            <div className="text-[10px] text-gray-400">12:30 PM</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;

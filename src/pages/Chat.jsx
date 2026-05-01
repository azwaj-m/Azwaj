import React, { useState } from 'react';
import ChatWindow from '../components/ChatWindow';

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const chats = [
    { id: 1, fullName: "سارہ احمد", nickName: "سارہ", lastMsg: "کیسے ہیں آپ؟", time: "10:00 AM", unread: 2, profileImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200" },
    { id: 2, fullName: "زینب خان", nickName: "زینب", lastMsg: "شکریہ!", time: "کل", unread: 0, profileImg: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200" },
  ];

  if (selectedUser) {
    return <ChatWindow user={selectedUser} onBack={() => setSelectedUser(null)} />;
  }

  return (
    <div className="min-h-screen bg-[#FDF5F5] pb-24 text-right" dir="rtl">
      <header className="p-6 bg-[#4A0E0E] rounded-b-[40px] shadow-lg">
        <h2 className="text-2xl font-black text-[#D4AF37]">پیغامات</h2>
        <p className="text-white/60 text-xs mt-1">آپ کے حالیہ رابطے</p>
      </header>

      <div className="mt-6 px-4 space-y-2">
        {chats.map(chat => (
          <div 
            key={chat.id} 
            onClick={() => setSelectedUser(chat)}
            className="bg-white p-4 rounded-[25px] flex items-center justify-between shadow-sm active:bg-gray-50 transition-all cursor-pointer border border-red-50"
          >
            <div className="flex items-center gap-4">
              <img src={chat.profileImg} className="w-14 h-14 rounded-full object-cover border-2 border-[#D4AF37]/20" alt="" />
              <div className="text-right">
                <h4 className="font-black text-[#4A0E0E]">{chat.nickName}</h4>
                <p className="text-xs text-gray-400 truncate w-40">{chat.lastMsg}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="text-[10px] text-gray-400 font-bold">{chat.time}</span>
              {chat.unread > 0 && (
                <span className="bg-[#D4AF37] text-[#4A0E0E] text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full">
                  {chat.unread}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;

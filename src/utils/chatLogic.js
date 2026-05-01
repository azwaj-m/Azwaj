export const sendMessage = (message, senderId, receiverId) => {
  const newMessage = {
    id: Date.now(),
    text: message,
    senderId,
    receiverId,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    status: 'sent'
  };
  return newMessage;
};

export const getDummyMessages = () => [
  { id: 1, text: "اسلام علیکم! کیسے ہیں آپ؟", senderId: 'other', timestamp: '10:00 AM' },
  { id: 2, text: "وعلیکم السلام، میں ٹھیک ہوں۔ آپ سنائیں؟", senderId: 'me', timestamp: '10:01 AM' },
  { id: 3, text: "الحمدللہ، میں نے آپ کا پروفائل دیکھا، کافی متاثر کن ہے۔", senderId: 'other', timestamp: '10:02 AM' },
];

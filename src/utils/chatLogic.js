import { db } from './firebase';
import { collection, addDoc, query, where, onSnapshot, orderBy } from 'firebase/firestore';

export const startPrivateChat = async (user1, user2) => {
  const chatId = [user1, user2].sort().join('_'); // منفرد آئی ڈی
  return chatId;
};

export const sendMessage = async (chatId, senderId, text) => {
  await addDoc(collection(db, "chats", chatId, "messages"), {
    text,
    senderId,
    timestamp: new Date()
  });
};

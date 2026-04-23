import { db } from './firebase';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';

export const sendMessage = async (chatId, senderId, text) => {
  if (!text.trim()) return;
  await addDoc(collection(db, "chats", chatId, "messages"), {
    text,
    senderId,
    time: serverTimestamp()
  });
};

export const listenMessages = (chatId, callback) => {
  const q = query(collection(db, "chats", chatId, "messages"), orderBy("time", "asc"));
  return onSnapshot(q, (snapshot) => {
    const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(msgs);
  });
};

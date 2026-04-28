import { db } from '../firebaseConfig';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';

export const sendMessage = async (chatId, senderId, text) => {
  await addDoc(collection(db, "chats", chatId, "messages"), {
    text,
    senderId,
    timestamp: new Date()
  });
};

// لائیو چیٹ سننے کا فنکشن (Real-time Sync)
export const listenMessages = (chatId, setMessages) => {
  const q = query(collection(db, "chats", chatId, "messages"), orderBy("timestamp", "asc"));
  return onSnapshot(q, (snapshot) => {
    setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  });
};
